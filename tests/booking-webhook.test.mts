import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import test from 'node:test'
import { handleBookingWebhook } from '../lib/integrations/booking-webhook.ts'
import type { BookingLedger, ReservedOperation } from '../lib/integrations/booking-ledger.ts'

const secret = 'a-strong-local-test-secret-of-at-least-32-bytes'
const now = Date.parse('2026-10-03T12:00:00.000Z')

function request(trigger: 'BOOKING_CREATED' | 'BOOKING_CANCELLED' = 'BOOKING_CREATED'): Request {
  const body = JSON.stringify({
    triggerEvent: trigger, createdAt: '2026-10-03T11:59:00.000Z',
    payload: {
      eventTypeId: 4773493, uid: 'booking-1', iCalUID: 'series-1',
      iCalSequence: trigger === 'BOOKING_CANCELLED' ? 1 : 0,
      startTime: '2026-10-04T12:00:00.000Z', endTime: '2026-10-04T12:30:00.000Z',
      attendees: [{ email: 'person@example.com' }],
    },
  })
  return new Request('https://example.test/api/integrations/cal-booking', {
    method: 'POST', body,
    headers: {
      'x-cal-signature-256': createHmac('sha256', secret).update(body).digest('hex'),
      'x-cal-webhook-version': '2021-10-20',
    },
  })
}

function ledger(calls: string[]): BookingLedger {
  return {
    async reserve(booking) {
      calls.push('reserve')
      return { outcome: 'reserved', operation: {
        id: '1', booking, action: 'create', crmMeetingId: null,
      } satisfies ReservedOperation }
    },
    async markStarted() { calls.push('start') },
    async markApplied() { calls.push('apply') },
    async quarantine() { calls.push('quarantine') },
  }
}

test('authenticates before reserving and commits started before writer', async () => {
  const calls: string[] = []
  const result = await handleBookingWebhook(request(), {
    secret, ledger: ledger(calls), now: () => now,
    writer: { async apply() { calls.push('writer'); return { meetingId: 'm1', contactId: 'c1' } } },
  })
  assert.equal(result.status, 200)
  assert.deepEqual(calls, ['reserve', 'start', 'writer', 'apply'])
})

test('invalid signature never reaches ledger or writer', async () => {
  const calls: string[] = []
  const incoming = request()
  incoming.headers.set('x-cal-signature-256', '0'.repeat(64))
  const result = await handleBookingWebhook(incoming, {
    secret, ledger: ledger(calls), now: () => now,
    writer: { async apply() { calls.push('writer'); return { meetingId: 'm1', contactId: 'c1' } } },
  })
  assert.equal(result.status, 400)
  assert.deepEqual(calls, [])
})

test('uncertain writer result is quarantined without retry', async () => {
  const calls: string[] = []
  const result = await handleBookingWebhook(request(), {
    secret, ledger: ledger(calls), now: () => now,
    writer: { async apply() { calls.push('writer'); throw new Error('timeout') } },
  })
  assert.equal(result.status, 202)
  assert.deepEqual(calls, ['reserve', 'start', 'writer', 'quarantine'])
})

test('failed start prevents outbound request', async () => {
  const calls: string[] = []
  const original = ledger(calls)
  original.markStarted = async () => { calls.push('start'); throw new Error('database unavailable') }
  const result = await handleBookingWebhook(request(), {
    secret, ledger: original, now: () => now,
    writer: { async apply() { calls.push('writer'); return { meetingId: 'm1', contactId: 'c1' } } },
  })
  assert.equal(result.status, 503)
  assert.deepEqual(calls, ['reserve', 'start'])
})

test('cancellation is durably quarantined for manual reconciliation without CRM call', async () => {
  const calls: string[] = []
  const result = await handleBookingWebhook(request('BOOKING_CANCELLED'), {
    secret, ledger: ledger(calls), now: () => now,
    writer: { async apply() { calls.push('writer'); return { meetingId: 'm1', contactId: 'c1' } } },
  })
  assert.equal(result.status, 202)
  assert.deepEqual(calls, ['reserve', 'quarantine'])
})
