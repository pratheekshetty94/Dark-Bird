import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import { test } from 'node:test'
import { compareRevision } from '../lib/integrations/booking-ledger.ts'
import { CalWebhookError, verifyCalBookingWebhook } from '../lib/integrations/cal-booking.ts'

const secret = 'test-only-cal-webhook-secret-0123456789'
const now = Date.parse('2026-10-03T12:00:00.000Z')

function payload(overrides: Record<string, unknown> = {}) {
  return {
    triggerEvent: 'BOOKING_CREATED',
    createdAt: '2026-10-03T11:59:00.000Z',
    payload: {
      eventTypeId: 4773493,
      uid: 'cal-booking-1',
      iCalUID: 'calendar-booking-1@example.com',
      iCalSequence: 0,
      attendees: [{ email: 'Person@Example.com', timeZone: 'Asia/Kolkata' }],
      metadata: { videoCallUrl: 'https://meet.google.com/abc-defg-hij' },
      startTime: '2026-10-05T10:00:00Z',
      endTime: '2026-10-05T10:30:00Z',
      ...overrides,
    },
  }
}

function signed(body: unknown, signatureOverride?: string, version = '2021-10-20') {
  const raw = Buffer.from(JSON.stringify(body))
  const signature = signatureOverride ?? createHmac('sha256', secret).update(raw).digest('hex')
  return { raw, headers: new Headers({ 'x-cal-signature-256': signature, 'x-cal-webhook-version': version }) }
}

function reject(body: unknown, code: string, signatureOverride?: string) {
  const { raw, headers } = signed(body, signatureOverride)
  assert.throws(
    () => verifyCalBookingWebhook(raw, headers, secret, now),
    (error: unknown) => error instanceof CalWebhookError && error.code === code
  )
}

test('valid signed discovery booking yields bounded normalized data', () => {
  const { raw, headers } = signed(payload())
  const parsed = verifyCalBookingWebhook(raw, headers, secret, now)
  assert.equal(parsed.attendeeEmail, 'person@example.com')
  assert.equal(parsed.eventTypeId, 4773493)
  assert.equal(parsed.sequence, 0)
  assert.match(parsed.deliveryHash, /^[a-f0-9]{64}$/)
  assert.equal(parsed.attendeeName, null)
})

test('signed attendee name is trimmed and bounded for opt-in Contact creation', () => {
  const { raw, headers } = signed(payload({ attendees: [
    { email: 'Person@Example.com', name: '  New Prospect  ', timeZone: 'Asia/Kolkata' },
  ] }))
  assert.equal(verifyCalBookingWebhook(raw, headers, secret, now).attendeeName, 'New Prospect')
  reject(payload({ attendees: [
    { email: 'Person@Example.com', name: 'x'.repeat(256), timeZone: 'Asia/Kolkata' },
  ] }), 'invalid_payload')
})

test('missing configuration, unsigned and tampered deliveries fail closed', () => {
  const { raw, headers } = signed(payload())
  assert.throws(() => verifyCalBookingWebhook(raw, headers, undefined, now), /not_configured/)
  reject(payload(), 'invalid_signature', '0'.repeat(64))
  const tampered = Buffer.from(raw)
  tampered[tampered.length - 2] ^= 1
  assert.throws(() => verifyCalBookingWebhook(tampered, headers, secret, now), /invalid_signature/)
})

test('wrong event, stale timestamp and unsupported version fail closed', () => {
  reject(payload({ eventTypeId: 123 }), 'wrong_event_type')
  reject({ ...payload(), createdAt: '2026-09-01T00:00:00.000Z' }, 'stale_delivery')
  const { raw, headers } = signed(payload(), undefined, 'other-version')
  assert.throws(() => verifyCalBookingWebhook(raw, headers, secret, now), /unsupported_version/)
})

test('reschedule requires prior UID and revision ordering is conservative', () => {
  reject({ ...payload(), triggerEvent: 'BOOKING_RESCHEDULED' }, 'missing_previous_uid')
  reject({ ...payload({ rescheduleUid: 'cal-booking-1' }), triggerEvent: 'BOOKING_RESCHEDULED' }, 'self_reschedule')
  const { raw, headers } = signed({ ...payload({ uid: 'cal-booking-2', iCalSequence: 1, rescheduleUid: 'cal-booking-1' }), triggerEvent: 'BOOKING_RESCHEDULED' })
  const booking = verifyCalBookingWebhook(raw, headers, secret, now)
  assert.equal(compareRevision({ sequence: 0, bookingUid: 'cal-booking-1', trigger: 'BOOKING_CREATED' }, booking), 'newer')
  assert.equal(compareRevision({ sequence: 2, bookingUid: 'cal-booking-3', trigger: 'BOOKING_RESCHEDULED' }, booking), 'stale')
  assert.equal(compareRevision({ sequence: 1, bookingUid: 'cal-booking-2', trigger: 'BOOKING_RESCHEDULED' }, booking), 'ambiguous')
})

test('impossible calendar dates and invalid timezone offsets fail closed', () => {
  reject(payload({ startTime: '2026-02-30T10:00:00Z' }), 'invalid_timestamp')
  reject(payload({ startTime: '2026-10-05T10:00:00+14:30' }), 'invalid_timestamp')
  const { raw, headers } = signed(payload({ startTime: '2028-02-29T10:00:00Z', endTime: '2028-02-29T10:30:00Z' }))
  assert.equal(verifyCalBookingWebhook(raw, headers, secret, now).startAt, '2028-02-29T10:00:00.000Z')
})

test('ambiguous attendee and invalid meeting window fail closed', () => {
  reject(payload({ attendees: [{ email: 'a@example.com' }, { email: 'b@example.com' }] }), 'ambiguous_attendee')
  reject(payload({ endTime: '2026-10-05T09:00:00Z' }), 'invalid_window')
})

test('replayed bytes retain the same delivery key; old cancellation cannot overwrite a reschedule', () => {
  const { raw, headers } = signed({ ...payload({ iCalSequence: 1 }), triggerEvent: 'BOOKING_CANCELLED' })
  const cancellation = verifyCalBookingWebhook(raw, headers, secret, now)
  assert.equal(verifyCalBookingWebhook(raw, headers, secret, now).deliveryHash, cancellation.deliveryHash)
  assert.equal(compareRevision({ sequence: 2, bookingUid: 'cal-booking-2', trigger: 'BOOKING_RESCHEDULED' }, cancellation), 'stale')
  assert.equal(compareRevision({ sequence: 1, bookingUid: 'cal-booking-1', trigger: 'BOOKING_CREATED' }, cancellation), 'ambiguous')
})

test('unsupported trigger and oversized body are rejected before ledger access', () => {
  reject({ ...payload(), triggerEvent: 'BOOKING_REQUESTED' }, 'unsupported_trigger')
  const { headers } = signed(payload())
  assert.throws(() => verifyCalBookingWebhook(Buffer.alloc(128 * 1024 + 1), headers, secret, now), /invalid_size/)
})


test('create and reschedule require the original approved join URL before ledger work', () => {
  reject(payload({ metadata: {} }), 'invalid_payload')
  reject(payload({ metadata: { videoCallUrl: 'https://meet.google.com.evil.invalid/x' } }), 'invalid_join_url')
  reject(payload({ metadata: { videoCallUrl: 'http://meet.google.com/abc-defg-hij' } }), 'invalid_join_url')
  const { raw, headers } = signed(payload({ metadata: {
    videoCallUrl: 'https://meet.google.com/abc-defg-hij?authuser=1',
  } }))
  const booking = verifyCalBookingWebhook(raw, headers, secret, now)
  assert.equal(booking.joinUrl, 'https://meet.google.com/abc-defg-hij?authuser=1')
  assert.equal(booking.attendeeTimeZone, 'Asia/Kolkata')
})


test('missing or invalid attendee timezone fails before ledger reservation', () => {
  reject(payload({ attendees: [{ email: 'person@example.com' }] }), 'invalid_payload')
  reject(payload({ attendees: [{ email: 'person@example.com', timeZone: 'Invalid/Zone' }] }), 'invalid_timezone')
})
