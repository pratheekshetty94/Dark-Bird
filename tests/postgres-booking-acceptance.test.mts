import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { Pool } from 'pg'
import { handleBookingWebhook } from '../lib/integrations/booking-webhook.ts'
import { PostgresBookingLedger } from '../lib/integrations/postgres-booking-ledger.ts'
import type { ReservedOperation } from '../lib/integrations/booking-ledger.ts'
import type { VerifiedCalBooking } from '../lib/integrations/cal-booking.ts'

const databaseUrl = process.env.BOOKING_TEST_DATABASE_URL
const secret = 'synthetic-test-signing-secret-of-at-least-32-chars'
const fixedCreatedAt = new Date().toISOString()

function safeDisposableUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return ['postgres:', 'postgresql:'].includes(url.protocol) &&
      ['localhost', '127.0.0.1', '::1'].includes(url.hostname) &&
      /^booking_test_[a-z0-9_]+$/.test(url.pathname.slice(1))
  } catch { return false }
}

function signedRequest(series: string, uid: string, sequence: number,
  trigger: 'BOOKING_CREATED' | 'BOOKING_RESCHEDULED' | 'BOOKING_CANCELLED' = 'BOOKING_CREATED',
  previousUid?: string): Request {
  const body = JSON.stringify({
    triggerEvent: trigger,
    createdAt: fixedCreatedAt,
    payload: {
      eventTypeId: 4773493, uid, iCalUID: series, iCalSequence: sequence,
      rescheduleUid: previousUid, attendees: [{ email: 'synthetic@example.invalid' }],
      startTime: '2026-10-05T12:00:00.000Z', endTime: '2026-10-05T12:30:00.000Z',
    },
  })
  return new Request('https://example.invalid/api/integrations/cal-booking', {
    method: 'POST',
    headers: {
      'x-cal-webhook-version': '2021-10-20',
      'x-cal-signature-256': createHmac('sha256', secret).update(body).digest('hex'),
    },
    body,
  })
}

function syntheticBooking(series: string, hash: string): VerifiedCalBooking {
  return {
    trigger: 'BOOKING_CREATED', eventTypeId: 4773493, bookingUid: `${series}-uid`,
    calendarUid: series, sequence: 0, previousBookingUid: null,
    attendeeEmail: 'synthetic@example.invalid',
    startAt: '2026-10-05T12:00:00.000Z', endAt: '2026-10-05T12:30:00.000Z',
    occurredAt: fixedCreatedAt, deliveryHash: hash.repeat(64),
  }
}

test('disposable PostgreSQL: concurrency, replay, crash and uncertainty stay at most once',
  { skip: !databaseUrl ? 'set BOOKING_TEST_DATABASE_URL to a fresh local booking_test_* database' : false },
  async () => {
    assert.ok(safeDisposableUrl(databaseUrl!), 'refusing a nonlocal or non-test database')
    const pool = new Pool({ connectionString: databaseUrl, max: 4, connectionTimeoutMillis: 3000 })
    try {
      const existing = await pool.query("SELECT to_regclass('public.cal_booking_series') AS name")
      assert.equal(existing.rows[0].name, null, 'test database must be fresh')
      await pool.query(await readFile(new URL('../db/migrations/001_booking_ledger.sql', import.meta.url), 'utf8'))
      const ledger = new PostgresBookingLedger(pool)
      const writes: ReservedOperation[] = []
      const writer = { async apply(operation: ReservedOperation) {
        writes.push(operation)
        return { meetingId: `meeting-${writes.length}`, contactId: 'contact-synthetic' }
      } }
      const send = (request: Request) => handleBookingWebhook(request, { secret, ledger, writer })

      const [a, b] = await Promise.all([
        send(signedRequest('concurrent', 'booking-1', 0)),
        send(signedRequest('concurrent', 'booking-1', 0)),
      ])
      assert.deepEqual([a.status, b.status].sort(), [200, 200])
      assert.equal(writes.length, 1)
      assert.equal((await pool.query("SELECT count(*)::int AS n FROM cal_crm_operations WHERE calendar_uid = 'concurrent'")).rows[0].n, 1)

      const reschedule = signedRequest('concurrent', 'booking-2', 1, 'BOOKING_RESCHEDULED', 'booking-1')
      assert.equal((await send(reschedule)).status, 200)
      assert.equal(writes.length, 2)

      const earlyCancel = await ledger.reserve({ ...syntheticBooking('out-of-order', 'd'),
        trigger: 'BOOKING_CANCELLED', sequence: 1 })
      assert.deepEqual(earlyCancel, { outcome: 'quarantined' })
      assert.deepEqual(await ledger.reserve(syntheticBooking('out-of-order', 'e')), { outcome: 'quarantined' })
      assert.equal((await pool.query("SELECT count(*)::int AS n FROM cal_crm_operations WHERE calendar_uid = 'out-of-order'")).rows[0].n, 0)
      assert.equal(writes[1].action, 'update')
      assert.equal(writes[1].crmMeetingId, 'meeting-1')
      assert.equal((await send(signedRequest('concurrent', 'booking-2', 1, 'BOOKING_RESCHEDULED', 'booking-1'))).status, 200)
      assert.equal(writes.length, 2)

      const crashed = await ledger.reserve(syntheticBooking('crashed', 'b'))
      assert.equal(crashed.outcome, 'reserved')
      if (crashed.outcome !== 'reserved') return
      await ledger.markStarted(crashed.operation.id)
      assert.deepEqual(await ledger.reserve(syntheticBooking('crashed', 'b')), { outcome: 'duplicate' })
      const later = { ...syntheticBooking('crashed', 'c'), trigger: 'BOOKING_RESCHEDULED' as const,
        bookingUid: 'crashed-next', previousBookingUid: 'crashed-uid', sequence: 1 }
      assert.deepEqual(await ledger.reserve(later), { outcome: 'quarantined' })
      assert.equal((await pool.query("SELECT state FROM cal_crm_operations WHERE calendar_uid = 'crashed'")).rows[0].state, 'started')

      const uncertainWriter = { async apply(_operation: ReservedOperation): Promise<{ meetingId: string; contactId: string }> {
        throw new Error('synthetic_timeout_after_send')
      } }
      const uncertain = await handleBookingWebhook(signedRequest('uncertain', 'booking-3', 0),
        { secret, ledger, writer: uncertainWriter })
      assert.equal(uncertain.status, 202)
      assert.equal((await pool.query("SELECT state FROM cal_crm_operations WHERE calendar_uid = 'uncertain'")).rows[0].state, 'quarantined')
      assert.equal((await send(signedRequest('uncertain', 'booking-4', 1, 'BOOKING_RESCHEDULED', 'booking-3'))).status, 202)
      assert.equal(writes.length, 2)
    } finally {
      await pool.end()
    }
  })
