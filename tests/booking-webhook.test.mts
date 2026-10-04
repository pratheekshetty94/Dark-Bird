import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import test from 'node:test'
import { handleBookingWebhook } from '../lib/integrations/booking-webhook.ts'
import type { BookingLedger, ReservedOperation } from '../lib/integrations/booking-ledger.ts'

const secret = 'a-strong-local-test-secret-of-at-least-32-bytes'
const now = Date.parse('2026-10-03T12:00:00.000Z')

function request(
  trigger: 'BOOKING_CREATED' | 'BOOKING_RESCHEDULED' | 'BOOKING_CANCELLED' = 'BOOKING_CREATED',
  overrides: Record<string, unknown> = {}
): Request {
  const body = JSON.stringify({
    triggerEvent: trigger, createdAt: '2026-10-03T11:59:00.000Z',
    payload: {
      eventTypeId: 4773493, uid: 'booking-1', iCalUID: 'series-1',
      iCalSequence: trigger === 'BOOKING_CANCELLED' ? 1 : 0,
      startTime: '2026-10-04T12:00:00.000Z', endTime: '2026-10-04T12:30:00.000Z',
      attendees: [{ email: 'person@example.com', timeZone: 'Asia/Kolkata' }],
      metadata: { videoCallUrl: 'https://meet.google.com/abc-defg-hij' },
      organizer: { email: 'management@example.com' },
      ...overrides,
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
        id: '1', booking, action: 'create', crmTaskId: null,
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
    writer: { async apply() { calls.push('writer'); return { taskId: 'm1', contactId: 'c1' } } },
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
    writer: { async apply() { calls.push('writer'); return { taskId: 'm1', contactId: 'c1' } } },
  })
  assert.equal(result.status, 400)
  assert.deepEqual(calls, [])
})

test('missing signed booking URL fails before ledger reservation or CRM write', async () => {
  const calls: string[] = []
  const result = await handleBookingWebhook(request('BOOKING_CREATED', { metadata: {} }), {
    secret, ledger: ledger(calls), now: () => now,
    writer: { async apply() { calls.push('writer'); return { taskId: 'm1', contactId: 'c1' } } },
    testScope: {
      startAt: '2026-10-04T12:00:00.000Z', endAt: '2026-10-04T12:30:00.000Z',
      rescheduleStartAt: '2026-10-04T13:00:00.000Z',
      rescheduleEndAt: '2026-10-04T13:30:00.000Z',
      attendeeEmail: 'person@example.com', organizerEmail: 'management@example.com',
    },
  })
  assert.equal(result.status, 400)
  assert.deepEqual(calls, [])
})

test('test scope skips other booking UIDs, attendees and trigger types before ledger or CRM', async () => {
  const calls: string[] = []
  const scoped = {
    secret, ledger: ledger(calls), now: () => now,
    writer: { async apply() { calls.push('writer'); return { taskId: 'm1', contactId: 'c1' } } },
    testScope: {
      startAt: '2026-10-04T12:00:00.000Z', endAt: '2026-10-04T12:30:00.000Z',
      attendeeEmail: 'person@example.com', organizerEmail: 'management@example.com',
    },
  }
  for (const incoming of [
    request('BOOKING_CREATED', { startTime: '2026-10-04T13:00:00.000Z' }),
    request('BOOKING_CREATED', { endTime: '2026-10-04T12:45:00.000Z' }),
    request('BOOKING_CREATED', { attendees: [{ email: 'other@example.com' }] }),
    request('BOOKING_CREATED', { attendees: [
      { email: 'person@example.com' }, { email: 'guest@example.com' },
    ] }),
    request('BOOKING_CREATED', { guests: ['guest@example.com'] }),
    request('BOOKING_CREATED', { organizer: { email: 'other@example.com' } }),
    request('BOOKING_CREATED', { organizer: null }),
    request('BOOKING_RESCHEDULED', { rescheduleUid: 'prior-booking' }),
    request('BOOKING_CANCELLED'),
  ]) {
    const response = await handleBookingWebhook(incoming, scoped)
    assert.ok([202, 400].includes(response.status))
    if (response.status === 202) {
      assert.deepEqual(await response.json(), { outcome: 'test_scope_ignored' })
    }
  }
  assert.deepEqual(calls, [])
  const wrongEvent = await handleBookingWebhook(request('BOOKING_CREATED', { eventTypeId: 1 }), scoped)
  assert.equal(wrongEvent.status, 400)
  assert.deepEqual(calls, [])
  const accepted = await handleBookingWebhook(request(), scoped)
  assert.equal(accepted.status, 200)
  assert.deepEqual(calls, ['reserve', 'start', 'writer', 'apply'])
})

test('new-prospect test scope admits only the exact name, identity and create slot', async () => {
  const calls: string[] = []
  const scoped = {
    secret, ledger: ledger(calls), now: () => now,
    writer: { async apply() { calls.push('writer'); return { taskId: 'task-1', contactId: 'contact-new' } } },
    testScope: {
      startAt: '2026-10-04T12:00:00.000Z', endAt: '2026-10-04T12:30:00.000Z',
      attendeeEmail: 'person@example.com', attendeeName: 'New Prospect',
      organizerEmail: 'management@example.com', createOnly: true,
    },
  }
  assert.equal((await handleBookingWebhook(request('BOOKING_CREATED'), scoped)).status, 202)
  assert.equal((await handleBookingWebhook(request('BOOKING_RESCHEDULED', {
    attendees: [{ email: 'person@example.com', name: 'New Prospect', timeZone: 'Asia/Kolkata' }],
    rescheduleUid: 'booking-0', iCalSequence: 1,
  }), scoped)).status, 202)
  assert.deepEqual(calls, [])
  assert.equal((await handleBookingWebhook(request('BOOKING_CREATED', {
    attendees: [{ email: 'person@example.com', name: 'New Prospect', timeZone: 'Asia/Kolkata' }],
  }), scoped)).status, 200)
  assert.deepEqual(calls, ['reserve', 'start', 'writer', 'apply'])
})

test('lifecycle test scope admits only the second exact slot for follow-ups', async () => {
  const calls: string[] = []
  const scoped = {
    secret, ledger: ledger(calls), now: () => now,
    writer: { async apply() { calls.push('writer'); return { taskId: 'm1', contactId: 'c1' } } },
    testScope: {
      startAt: '2026-10-04T12:00:00.000Z', endAt: '2026-10-04T12:30:00.000Z',
      rescheduleStartAt: '2026-10-04T13:00:00.000Z',
      rescheduleEndAt: '2026-10-04T13:30:00.000Z',
      attendeeEmail: 'person@example.com', organizerEmail: 'management@example.com',
    },
  }
  assert.equal((await handleBookingWebhook(request('BOOKING_RESCHEDULED', {
    uid: 'booking-2', rescheduleUid: 'booking-1', iCalSequence: 1,
    startTime: '2026-10-04T13:00:00.000Z', endTime: '2026-10-04T13:30:00.000Z',
  }), scoped)).status, 200)
  assert.equal((await handleBookingWebhook(request('BOOKING_CANCELLED', {
    uid: 'booking-2', iCalSequence: 2,
    startTime: '2026-10-04T13:00:00.000Z', endTime: '2026-10-04T13:30:00.000Z',
  }), scoped)).status, 200)
  assert.equal((await handleBookingWebhook(request('BOOKING_RESCHEDULED', {
    uid: 'booking-2', rescheduleUid: 'booking-1', iCalSequence: 1,
  }), scoped)).status, 202)
  assert.deepEqual(calls, ['reserve', 'start', 'writer', 'apply', 'reserve', 'start', 'writer', 'apply'])
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

test('Contact lookup failures persist only allowlisted review reasons', async () => {
  for (const [message, expected] of [
    ['zoho_contact_missing', 'zoho_contact_missing'],
    ['zoho_contact_duplicate', 'zoho_contact_duplicate'],
    ['zoho_contact_secondary_match', 'zoho_contact_secondary_match'],
    ['zoho_contact_name_missing', 'zoho_contact_name_missing'],
    ['zoho_contact_create_claim_exists', 'zoho_contact_create_claim_exists'],
    ['zoho_contact_create_uncertain', 'uncertain_crm_result'],
    ['person@example.invalid private failure', 'uncertain_crm_result'],
  ]) {
    const reasons: string[] = []
    const logs: string[] = []
    const stub = ledger([])
    stub.quarantine = async (_id, reason) => { reasons.push(reason) }
    const response = await handleBookingWebhook(request(), {
      secret, ledger: stub, now: () => now,
      writer: { async apply() { throw new Error(message) } },
      log: code => logs.push(code),
    })
    assert.equal(response.status, 202)
    assert.deepEqual(reasons, [expected])
    assert.deepEqual(logs, [`crm_${expected}_quarantined`])
    assert.ok(logs.every(code => !code.includes('@')))
  }
})

test('failed start prevents outbound request', async () => {
  const calls: string[] = []
  const original = ledger(calls)
  original.markStarted = async () => { calls.push('start'); throw new Error('database unavailable') }
  const result = await handleBookingWebhook(request(), {
    secret, ledger: original, now: () => now,
    writer: { async apply() { calls.push('writer'); return { taskId: 'm1', contactId: 'c1' } } },
  })
  assert.equal(result.status, 503)
  assert.deepEqual(calls, ['reserve', 'start'])
})

test('cancellation updates only a previously reserved Task operation', async () => {
  const calls: string[] = []
  const result = await handleBookingWebhook(request('BOOKING_CANCELLED'), {
    secret, ledger: { ...ledger(calls), async reserve(booking) {
      calls.push('reserve')
      return { outcome: 'reserved', operation: { id: '1', booking, action: 'update',
        crmTaskId: 'task-1' } } as const
    } }, now: () => now,
    writer: { async apply() { calls.push('writer'); return { taskId: 'task-1', contactId: 'c1' } } },
  })
  assert.equal(result.status, 200)
  assert.deepEqual(calls, ['reserve', 'start', 'writer', 'apply'])
})
