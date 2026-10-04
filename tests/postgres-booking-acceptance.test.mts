import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { Pool } from 'pg'
import { handleBookingWebhook } from '../lib/integrations/booking-webhook.ts'
import { PostgresBookingLedger } from '../lib/integrations/postgres-booking-ledger.ts'
import { PostgresContactCreationGate } from '../lib/integrations/postgres-contact-claim.ts'
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
  previousUid?: string, startAt = '2026-10-05T12:00:00.000Z',
  endAt = '2026-10-05T12:30:00.000Z'): Request {
  const body = JSON.stringify({
    triggerEvent: trigger,
    createdAt: fixedCreatedAt,
    payload: {
      eventTypeId: 4773493, uid, iCalUID: series, iCalSequence: sequence,
      rescheduleUid: previousUid, attendees: [{ email: 'synthetic@example.invalid', timeZone: 'Asia/Kolkata' }],
      metadata: { videoCallUrl: 'https://meet.google.com/abc-defg-hij' },
      organizer: { email: 'management@example.invalid' },
      startTime: startAt, endTime: endAt,
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
    startAt: '2026-10-05T12:00:00.000Z', endAt: '2026-10-05T12:30:00.000Z', attendeeTimeZone: 'Asia/Kolkata',
    joinUrl: 'https://meet.google.com/abc-defg-hij',
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
      await pool.query(await readFile(new URL('../db/migrations/002_single_booking_test_claim.sql', import.meta.url), 'utf8'))
      await pool.query(await readFile(new URL('../db/migrations/003_crm_task_ids.sql', import.meta.url), 'utf8'))
      await pool.query(await readFile(new URL('../db/migrations/004_task_test_run_claim.sql', import.meta.url), 'utf8'))
      await pool.query(await readFile(new URL('../db/migrations/005_contact_creation_claims.sql', import.meta.url), 'utf8'))
      await pool.query(await readFile(new URL('../db/migrations/006_contact_test_claim.sql', import.meta.url), 'utf8'))
      const ledger = new PostgresBookingLedger(pool)
      const contactTestLedger = new PostgresBookingLedger(pool, { claimContactTestRun: 'contact-localtest01' })
      const contactTestResults = await Promise.all([
        contactTestLedger.reserve(syntheticBooking('contact-test-first', 'p')),
        contactTestLedger.reserve(syntheticBooking('contact-test-second', 'q')),
      ])
      assert.deepEqual(contactTestResults.map(result => result.outcome).sort(),
        ['reserved', 'test_scope_ignored'])
      const contactTestClaim = await pool.query(
        'SELECT run_id, booking_uid, calendar_uid FROM cal_booking_contact_test_claim'
      )
      assert.equal(contactTestClaim.rowCount, 1)
      assert.equal(contactTestClaim.rows[0].run_id, 'contact-localtest01')
      const secondRun = new PostgresBookingLedger(pool, { claimContactTestRun: 'contact-localtest02' })
      assert.equal((await secondRun.reserve(syntheticBooking('contact-test-third', 'r'))).outcome,
        'test_scope_ignored')
      const contactGate = new PostgresContactCreationGate(pool)
      const firstProspect = await ledger.reserve(syntheticBooking('prospect-first', 'm'))
      const secondProspect = await ledger.reserve(syntheticBooking('prospect-second', 'n'))
      const appliedProspect = await ledger.reserve(syntheticBooking('prospect-applied', 'o'))
      assert.equal(firstProspect.outcome, 'reserved')
      assert.equal(secondProspect.outcome, 'reserved')
      assert.equal(appliedProspect.outcome, 'reserved')
      if (firstProspect.outcome === 'reserved' && secondProspect.outcome === 'reserved') {
        const email = 'new@example.invalid'
        const attempts = await Promise.allSettled([
          contactGate.reserve(firstProspect.operation.id, email),
          contactGate.reserve(secondProspect.operation.id, email),
        ])
        assert.equal(attempts.filter(item => item.status === 'fulfilled').length, 1)
        const winner = attempts[0].status === 'fulfilled'
          ? firstProspect.operation.id : secondProspect.operation.id
        await contactGate.markStarted(winner, email)
        await contactGate.quarantine(winner, email)
        await assert.rejects(contactGate.reserve(winner, email), /zoho_contact_create_claim_exists/)
        assert.equal((await pool.query('SELECT state, contact_id FROM cal_contact_creation_claims')).rows[0].state,
          'quarantined')
        assert.equal((await pool.query('SELECT count(*)::int AS n FROM cal_contact_creation_claims')).rows[0].n, 1)
      }
      if (appliedProspect.outcome === 'reserved') {
        await contactGate.reserve(appliedProspect.operation.id, 'applied@example.invalid')
        await contactGate.markStarted(appliedProspect.operation.id, 'applied@example.invalid')
        await contactGate.markApplied(appliedProspect.operation.id, 'applied@example.invalid', 'contact-new')
        await assert.rejects(contactGate.reserve(secondProspect.outcome === 'reserved'
          ? secondProspect.operation.id : appliedProspect.operation.id, 'applied@example.invalid'),
        /zoho_contact_create_claim_exists/)
        const result = await pool.query(
          "SELECT state, contact_id FROM cal_contact_creation_claims WHERE contact_id = 'contact-new'"
        )
        assert.deepEqual(result.rows[0], { state: 'applied', contact_id: 'contact-new' })
      }
      const writes: ReservedOperation[] = []
      const writer = { async apply(operation: ReservedOperation) {
        writes.push(operation)
        return { taskId: `task-${writes.length}`, contactId: 'contact-synthetic' }
      } }
      const send = (request: Request) => handleBookingWebhook(request, { secret, ledger, writer })

      const testLedger = new PostgresBookingLedger(pool, { claimSingleTestCreate: true })
      const testWrites: ReservedOperation[] = []
      const testScope = {
        startAt: '2026-10-05T12:00:00.000Z', endAt: '2026-10-05T12:30:00.000Z', attendeeTimeZone: 'Asia/Kolkata',
    joinUrl: 'https://meet.google.com/abc-defg-hij',
        attendeeEmail: 'synthetic@example.invalid', organizerEmail: 'management@example.invalid',
      }
      const sendTest = (request: Request) => handleBookingWebhook(request, {
        secret, ledger: testLedger, testScope,
        writer: { async apply(operation) {
          testWrites.push(operation)
          return { taskId: 'test-meeting', contactId: 'test-contact' }
        } },
      })
      const testResults = await Promise.all([
        sendTest(signedRequest('test-series-one', 'test-uid-one', 0)),
        sendTest(signedRequest('test-series-two', 'test-uid-two', 0)),
      ])
      assert.deepEqual(testResults.map(result => result.status).sort(), [200, 202])
      assert.equal(testWrites.length, 1, 'only the first claimed UID can reach CRM')
      const testClaim = await pool.query('SELECT booking_uid, calendar_uid FROM cal_booking_test_claim')
      assert.equal(testClaim.rowCount, 1)
      assert.equal(testClaim.rows[0].booking_uid, testWrites[0].booking.bookingUid)
      assert.equal(testClaim.rows[0].calendar_uid, testWrites[0].booking.calendarUid)
      assert.equal((await sendTest(signedRequest('different-series', testClaim.rows[0].booking_uid, 0))).status, 202)
      assert.equal((await sendTest(signedRequest(testClaim.rows[0].calendar_uid,
        testClaim.rows[0].booking_uid, 0))).status, 200)
      assert.equal(testWrites.length, 1, 'another series and an exact replay make no second write')

      const lifecycleLedger = new PostgresBookingLedger(pool, { claimTaskTestRun: 'task-localtest01' })
      const lifecycleWrites: ReservedOperation[] = []
      const lifecycleScope = {
        startAt: '2026-10-05T12:00:00.000Z', endAt: '2026-10-05T12:30:00.000Z',
        rescheduleStartAt: '2026-10-05T13:00:00.000Z',
        rescheduleEndAt: '2026-10-05T13:30:00.000Z',
        attendeeEmail: 'synthetic@example.invalid', organizerEmail: 'management@example.invalid',
      }
      const sendLifecycle = (request: Request) => handleBookingWebhook(request, {
        secret, ledger: lifecycleLedger, testScope: lifecycleScope,
        writer: { async apply(operation) {
          lifecycleWrites.push(operation)
          return { taskId: 'lifecycle-task-1', contactId: 'test-contact' }
        } },
      })
      const first = signedRequest('task-lifecycle-series', 'task-uid-1', 0)
      assert.equal((await sendLifecycle(first)).status, 200)
      assert.equal((await sendLifecycle(signedRequest('task-other-series', 'other-uid', 0))).status, 202)
      assert.equal((await sendLifecycle(signedRequest('task-lifecycle-series', 'task-uid-2', 1,
        'BOOKING_RESCHEDULED', 'task-uid-1', '2026-10-05T13:00:00.000Z',
        '2026-10-05T13:30:00.000Z'))).status, 200)
      assert.equal((await sendLifecycle(signedRequest('task-lifecycle-series', 'task-uid-3', 2,
        'BOOKING_RESCHEDULED', 'task-uid-2', '2026-10-05T13:00:00.000Z',
        '2026-10-05T13:30:00.000Z'))).status, 202)
      assert.equal((await sendLifecycle(signedRequest('task-lifecycle-series', 'task-uid-2', 2,
        'BOOKING_CANCELLED', undefined, '2026-10-05T13:00:00.000Z',
        '2026-10-05T13:30:00.000Z'))).status, 200)
      assert.equal(lifecycleWrites.length, 3)
      assert.deepEqual(lifecycleWrites.map(item => item.action), ['create', 'update', 'update'])
      assert.equal((await pool.query('SELECT count(*)::int AS n FROM cal_booking_test_claim')).rows[0].n, 1,
        'legacy claim remains untouched')
      const lifecycleClaim = await pool.query(
        'SELECT run_id, booking_uid, calendar_uid, rescheduled, cancelled FROM cal_booking_task_test_claim'
      )
      assert.deepEqual(lifecycleClaim.rows, [{ run_id: 'task-localtest01', booking_uid: 'task-uid-1',
        calendar_uid: 'task-lifecycle-series', rescheduled: true, cancelled: true }])

      // Isolate the following order tests in this disposable database. The
      // legacy production-style claim is never reset or deleted.
      await pool.query('DELETE FROM cal_booking_task_test_claim')
      const earlyReschedule = await sendLifecycle(signedRequest('task-early-reschedule',
        'early-uid-2', 1, 'BOOKING_RESCHEDULED', 'early-uid-1',
        '2026-10-05T13:00:00.000Z', '2026-10-05T13:30:00.000Z'))
      assert.equal(earlyReschedule.status, 202)
      assert.deepEqual(await earlyReschedule.json(), { outcome: 'quarantined' })
      assert.equal((await sendLifecycle(signedRequest('task-early-reschedule', 'early-uid-1', 0))).status, 202)
      assert.equal(lifecycleWrites.length, 3, 'late create cannot write an obsolete Task')
      assert.equal((await pool.query(
        "SELECT reason FROM cal_booking_unresolved WHERE calendar_uid = 'task-early-reschedule'"
      )).rows[0].reason, 'revision_before_create')

      await pool.query('DELETE FROM cal_booking_task_test_claim')
      assert.equal((await sendLifecycle(signedRequest('task-early-cancel', 'cancel-uid-1', 0))).status, 200)
      const earlyCancelTask = await sendLifecycle(signedRequest('task-early-cancel',
        'cancel-uid-1', 1, 'BOOKING_CANCELLED', undefined,
        '2026-10-05T13:00:00.000Z', '2026-10-05T13:30:00.000Z'))
      assert.equal(earlyCancelTask.status, 202)
      assert.deepEqual(await earlyCancelTask.json(), { outcome: 'quarantined' })
      assert.equal((await sendLifecycle(signedRequest('task-early-cancel',
        'cancel-uid-2', 2, 'BOOKING_RESCHEDULED', 'cancel-uid-1',
        '2026-10-05T13:00:00.000Z', '2026-10-05T13:30:00.000Z'))).status, 202)
      assert.equal(lifecycleWrites.length, 4, 'late reschedule cannot update an obsolete Task')
      assert.equal((await pool.query(
        "SELECT reason FROM cal_booking_unresolved WHERE calendar_uid = 'task-early-cancel'"
      )).rows[0].reason, 'chain_conflict')

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
      assert.equal(writes[1].crmTaskId, 'task-1')
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

      const uncertainWriter = { async apply(_operation: ReservedOperation): Promise<{ taskId: string; contactId: string }> {
        throw new Error('synthetic_timeout_after_send')
      } }
      const uncertain = await handleBookingWebhook(signedRequest('uncertain', 'booking-3', 0),
        { secret, ledger, writer: uncertainWriter })
      assert.equal(uncertain.status, 202)
      assert.equal((await pool.query("SELECT state FROM cal_crm_operations WHERE calendar_uid = 'uncertain'")).rows[0].state, 'quarantined')
      assert.equal((await send(signedRequest('uncertain', 'booking-4', 1, 'BOOKING_RESCHEDULED', 'booking-3'))).status, 202)
      assert.equal(writes.length, 2)

      // The operator report must include old quarantines and aged open work,
      // with category counts and only existing IDs in its result.
      const reserved = await ledger.reserve(syntheticBooking('aged-reserved', 'f'))
      assert.equal(reserved.outcome, 'reserved')
      for (const [series, hash, reason] of [
        ['missing-review', 'g', 'zoho_contact_missing'],
        ['duplicate-review', 'h', 'zoho_contact_duplicate'],
      ]) {
        const review = await ledger.reserve(syntheticBooking(series, hash))
        assert.equal(review.outcome, 'reserved')
        if (review.outcome === 'reserved') {
          await ledger.markStarted(review.operation.id)
          await ledger.quarantine(review.operation.id, reason)
        }
      }
      await pool.query("UPDATE cal_crm_operations SET started_at = now() - interval '16 minutes' WHERE calendar_uid = 'crashed'")
      await pool.query("UPDATE cal_webhook_deliveries SET received_at = now() - interval '16 minutes' WHERE body_sha256 = $1",
        [syntheticBooking('aged-reserved', 'f').deliveryHash])
      const reportSql = await readFile(new URL('../scripts/booking-crm-review-queue.sql', import.meta.url), 'utf8')
      assert.ok(!/\b(?:email|name|description|url|token)\b/i.test(reportSql.split('WITH categories')[1]))
      const report = await pool.query(reportSql)
      const categories = Object.fromEntries(report.rows.map(row => [row.category, row]))
      assert.equal(report.rowCount, 7)
      assert.ok(Number(categories.unresolved.total_count) >= 2)
      assert.ok(Number(categories.contact_missing.total_count) >= 1)
      assert.ok(Number(categories.contact_duplicate.total_count) >= 1)
      assert.ok(Number(categories.other_quarantined.total_count) >= 1)
      assert.ok(Number(categories.aged_started.total_count) >= 1)
      assert.ok(Number(categories.aged_reserved.total_count) >= 1)
      assert.ok(categories.other_quarantined.ids.some((id: { calendar_uid: string }) => id.calendar_uid === 'uncertain'))
      const missingId = categories.contact_missing.ids.find(
        (id: { calendar_uid: string }) => id.calendar_uid === 'missing-review'
      )?.operation_id
      assert.ok(missingId)
      const detailSql = (await readFile(new URL('../scripts/booking-crm-review-case.sql', import.meta.url), 'utf8'))
        .replace("'SET_OPERATION_ID'", String(missingId))
      const detail = await pool.query(detailSql)
      assert.equal(detail.rowCount, 1)
      assert.equal(detail.rows[0].quarantine_reason, 'zoho_contact_missing')
      assert.equal(detail.rows[0].calendar_uid, 'missing-review')

      const reconcileTemplate = await readFile(
        new URL('../scripts/booking-crm-reconcile-contact.sql', import.meta.url), 'utf8'
      )
      const renderReconcile = (id: string, contactId: string, taskId: string, reason: string) =>
        reconcileTemplate.replaceAll('SET_OPERATION_ID', id)
          .replaceAll('SET_CONTACT_ID', contactId).replaceAll('SET_TASK_ID', taskId)
          .replaceAll('SET_EXPECTED_REASON', reason)
      const manualCreate = await ledger.reserve(syntheticBooking('manual-link', 'i'))
      assert.equal(manualCreate.outcome, 'reserved')
      if (manualCreate.outcome === 'reserved') {
        await ledger.markStarted(manualCreate.operation.id)
        await ledger.quarantine(manualCreate.operation.id, 'zoho_contact_missing')
        await assert.rejects(pool.query(renderReconcile(manualCreate.operation.id,
          '1234567890123456', '1234567890123457', 'zoho_contact_duplicate')))
        assert.equal((await pool.query('SELECT state FROM cal_crm_operations WHERE id = $1',
          [manualCreate.operation.id])).rows[0].state, 'quarantined')
        await pool.query(renderReconcile(manualCreate.operation.id,
          '1234567890123456', '1234567890123457', 'zoho_contact_missing'))
        const linked = await pool.query('SELECT o.state, o.crm_task_id, s.contact_id FROM cal_crm_operations o JOIN cal_booking_series s ON s.id = o.series_id WHERE o.id = $1',
          [manualCreate.operation.id])
        assert.deepEqual(linked.rows[0], { state: 'applied', crm_task_id: '1234567890123457',
          contact_id: '1234567890123456' })
      }

      const manualUpdateCreate = await ledger.reserve(syntheticBooking('manual-update', 'j'))
      assert.equal(manualUpdateCreate.outcome, 'reserved')
      if (manualUpdateCreate.outcome === 'reserved') {
        await ledger.markStarted(manualUpdateCreate.operation.id)
        await ledger.markApplied(manualUpdateCreate.operation.id,
          '1234567890123458', '1234567890123456')
        const manualUpdate = await ledger.reserve({ ...syntheticBooking('manual-update', 'k'),
          trigger: 'BOOKING_RESCHEDULED', bookingUid: 'manual-update-next',
          previousBookingUid: 'manual-update-uid', sequence: 1 })
        assert.equal(manualUpdate.outcome, 'reserved')
        if (manualUpdate.outcome === 'reserved') {
          await ledger.markStarted(manualUpdate.operation.id)
          await ledger.quarantine(manualUpdate.operation.id, 'zoho_contact_duplicate')
          await assert.rejects(pool.query(renderReconcile(manualUpdate.operation.id,
            '1234567890123456', '1234567890123459', 'zoho_contact_duplicate')))
          await pool.query(renderReconcile(manualUpdate.operation.id,
            '1234567890123456', '1234567890123458', 'zoho_contact_duplicate'))
          assert.equal((await pool.query('SELECT state FROM cal_crm_operations WHERE id = $1',
            [manualUpdate.operation.id])).rows[0].state, 'applied')
        }
      }
    } finally {
      await pool.end()
    }
  })
