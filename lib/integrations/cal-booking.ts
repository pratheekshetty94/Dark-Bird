import { createHash, createHmac, timingSafeEqual } from 'node:crypto'

export const DISCOVERY_EVENT_TYPE_ID = 4773493
export const CAL_WEBHOOK_VERSIONS = ['2021-10-20', '2026-07-27'] as const
const MAX_BODY_BYTES = 128 * 1024
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000
const MAX_FUTURE_MS = 5 * 60 * 1000

export type BookingTrigger =
  | 'BOOKING_CREATED'
  | 'BOOKING_RESCHEDULED'
  | 'BOOKING_CANCELLED'

export type VerifiedCalBooking = {
  trigger: BookingTrigger
  eventTypeId: typeof DISCOVERY_EVENT_TYPE_ID
  bookingUid: string
  calendarUid: string
  sequence: number
  previousBookingUid: string | null
  attendeeEmail: string
  attendeeName?: string | null
  organizerEmail?: string | null
  hasOtherGuests?: boolean
  startAt: string
  endAt: string
  attendeeTimeZone: string
  joinUrl: string | null
  occurredAt: string
  deliveryHash: string
}

export class CalWebhookError extends Error {
  readonly code: string
  readonly signatureFailure?: 'header_absent' | 'no_secret_marker' | 'malformed_digest' | 'digest_mismatch'

  constructor(code: string, signatureFailure?: CalWebhookError['signatureFailure']) {
    super(code)
    this.code = code
    this.signatureFailure = signatureFailure
  }
}

export async function readBoundedWebhookBody(request: Request): Promise<Uint8Array> {
  if (!request.body) throw new CalWebhookError('invalid_size')
  const reader = request.body.getReader()
  const chunks: Uint8Array[] = []
  let size = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > MAX_BODY_BYTES) throw new CalWebhookError('invalid_size')
      chunks.push(value)
    }
  } finally {
    reader.releaseLock()
  }
  if (!size) throw new CalWebhookError('invalid_size')
  const body = new Uint8Array(size)
  let offset = 0
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.length }
  return body
}

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new CalWebhookError('invalid_payload')
  }
  return value as Record<string, unknown>
}

function boundedString(value: unknown, max = 255): string {
  if (typeof value !== 'string' || !value || value.length > max || /[\x00-\x1f]/.test(value)) {
    throw new CalWebhookError('invalid_payload')
  }
  return value
}

function isoTime(value: unknown): string {
  const text = boundedString(value, 64)
  const match = text.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/i
  )
  if (!match) throw new CalWebhookError('invalid_timestamp')
  const [, yearText, monthText, dayText, hourText, minuteText, secondText, zone] = match
  const year = Number(yearText)
  const month = Number(monthText)
  const day = Number(dayText)
  const hour = Number(hourText)
  const minute = Number(minuteText)
  const second = Number(secondText)
  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
  const daysInMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]
  const offset = zone === 'Z' || zone === 'z' ? null : zone.match(/^[+-](\d{2}):(\d{2})$/)
  if (
    year < 1 || month < 1 || month > 12 || day < 1 || day > daysInMonth ||
    hour > 23 || minute > 59 || second > 59 ||
    (offset && (Number(offset[1]) > 14 || Number(offset[2]) > 59 ||
      (Number(offset[1]) === 14 && Number(offset[2]) !== 0)))
  ) throw new CalWebhookError('invalid_timestamp')
  const date = new Date(text)
  if (!Number.isFinite(date.getTime())) {
    throw new CalWebhookError('invalid_timestamp')
  }
  return date.toISOString()
}

/** Authenticate transport before parsing or contacting any provider. */
export function authenticateCalWebhook(
  rawBody: Uint8Array,
  headers: Headers,
  secret: string | undefined
): void {
  if (!secret || secret.length < 32) throw new CalWebhookError('not_configured')
  if (!rawBody.length || rawBody.length > MAX_BODY_BYTES) throw new CalWebhookError('invalid_size')

  const signature = headers.get('x-cal-signature-256')
  if (!signature) throw new CalWebhookError('invalid_signature', 'header_absent')
  if (signature === 'no-secret-provided') {
    throw new CalWebhookError('invalid_signature', 'no_secret_marker')
  }
  if (!/^[a-fA-F0-9]{64}$/.test(signature)) {
    throw new CalWebhookError('invalid_signature', 'malformed_digest')
  }
  const expected = createHmac('sha256', secret).update(rawBody).digest()
  if (!timingSafeEqual(expected, Buffer.from(signature, 'hex'))) {
    throw new CalWebhookError('invalid_signature', 'digest_mismatch')
  }

  const version = headers.get('x-cal-webhook-version')
  if (!CAL_WEBHOOK_VERSIONS.some(allowed => allowed === version)) {
    throw new CalWebhookError('unsupported_version')
  }
}

/** Verify the raw bytes before parsing. No unverified payload reaches the ledger. */
export function verifyCalBookingWebhook(
  rawBody: Uint8Array,
  headers: Headers,
  secret: string | undefined,
  nowMs = Date.now()
): VerifiedCalBooking {
  authenticateCalWebhook(rawBody, headers, secret)

  let decoded: unknown
  try {
    decoded = JSON.parse(Buffer.from(rawBody).toString('utf8'))
  } catch {
    throw new CalWebhookError('invalid_json')
  }
  const envelope = object(decoded)
  const trigger = envelope.triggerEvent
  if (trigger !== 'BOOKING_CREATED' && trigger !== 'BOOKING_RESCHEDULED' && trigger !== 'BOOKING_CANCELLED') {
    throw new CalWebhookError('unsupported_trigger')
  }
  const payload = object(envelope.payload)
  if (payload.eventTypeId !== DISCOVERY_EVENT_TYPE_ID) throw new CalWebhookError('wrong_event_type')
  const occurredAt = isoTime(envelope.createdAt)
  const age = nowMs - Date.parse(occurredAt)
  if (age > MAX_AGE_MS || age < -MAX_FUTURE_MS) throw new CalWebhookError('stale_delivery')

  const attendees = payload.attendees
  if (!Array.isArray(attendees) || attendees.length !== 1) throw new CalWebhookError('ambiguous_attendee')
  const attendee = object(attendees[0])
  const email = boundedString(attendee.email, 320).trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new CalWebhookError('invalid_email')
  const attendeeName = typeof attendee.name === 'string' && attendee.name.trim()
    ? boundedString(attendee.name.trim(), 255) : null
  const attendeeTimeZone = boundedString(attendee.timeZone, 80)
  try { new Intl.DateTimeFormat('en-US', { timeZone: attendeeTimeZone }) } catch {
    throw new CalWebhookError('invalid_timezone')
  }
  let joinUrl: string | null = null
  if (trigger !== 'BOOKING_CANCELLED') {
    const metadata = object(payload.metadata)
    const value = boundedString(metadata.videoCallUrl, 2048)
    let parsed: URL
    try { parsed = new URL(value) } catch { throw new CalWebhookError('invalid_join_url') }
    const calVideo = ['app.cal.com', 'cal.com'].includes(parsed.hostname) &&
      parsed.pathname.startsWith('/video/') && parsed.pathname.length > '/video/'.length
    const googleMeet = parsed.hostname === 'meet.google.com' && parsed.pathname.length > 1
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password ||
        !googleMeet && !calVideo) {
      throw new CalWebhookError('invalid_join_url')
    }
    joinUrl = value
  }
  const organizer = payload.organizer && typeof payload.organizer === 'object' &&
    !Array.isArray(payload.organizer) ? payload.organizer as Record<string, unknown> : null
  const organizerEmail = typeof organizer?.email === 'string'
    ? organizer.email.trim().toLowerCase() : null
  const hasOtherGuests = ['guests', 'additionalGuests', 'additionalAttendees'].some(key => {
    const value = payload[key]
    return value != null && (!Array.isArray(value) || value.length > 0)
  })
  const sequence = payload.iCalSequence
  if (!Number.isSafeInteger(sequence) || (sequence as number) < 0) {
    throw new CalWebhookError('invalid_sequence')
  }
  const startAt = isoTime(payload.startTime)
  const endAt = isoTime(payload.endTime)
  if (Date.parse(endAt) <= Date.parse(startAt)) throw new CalWebhookError('invalid_window')
  const previousBookingUid = payload.rescheduleUid == null
    ? null
    : boundedString(payload.rescheduleUid)
  const bookingUid = boundedString(payload.uid)
  if (trigger === 'BOOKING_RESCHEDULED' && !previousBookingUid) {
    throw new CalWebhookError('missing_previous_uid')
  }
  if (trigger === 'BOOKING_RESCHEDULED' && previousBookingUid === bookingUid) {
    throw new CalWebhookError('self_reschedule')
  }

  return {
    trigger,
    eventTypeId: DISCOVERY_EVENT_TYPE_ID,
    bookingUid,
    calendarUid: boundedString(payload.iCalUID),
    sequence: sequence as number,
    previousBookingUid,
    attendeeEmail: email,
    attendeeName,
    organizerEmail,
    hasOtherGuests,
    startAt,
    endAt,
    attendeeTimeZone,
    joinUrl,
    occurredAt,
    deliveryHash: createHash('sha256').update(rawBody).digest('hex'),
  }
}
