import type { VerifiedCalBooking } from './cal-booking'

export type BookingSeries = {
  eventTypeId: number
  calendarUid: string
  sequence: number
  bookingUid: string
  trigger: VerifiedCalBooking['trigger']
  crmMeetingId: string | null
  contactId: string | null
}

export type RevisionDecision = 'newer' | 'stale' | 'ambiguous'

/** Equal revisions with different content need investigation, never a second CRM write. */
export function compareRevision(
  current: Pick<BookingSeries, 'sequence' | 'bookingUid' | 'trigger'>,
  incoming: VerifiedCalBooking
): RevisionDecision {
  if (incoming.sequence < current.sequence) return 'stale'
  if (incoming.sequence > current.sequence) return 'newer'
  return 'ambiguous'
}

export type ReservedOperation = {
  id: string
  booking: VerifiedCalBooking
  action: 'create' | 'update'
  crmMeetingId: string | null
}

/**
 * Required adapter contract, with no live implementation yet. Each transition
 * must commit before the next step or network request. The first transaction
 * serializes by calendar UID, checks the delivery/revision uniqueness gates,
 * and reserves an operation. markStarted commits BEFORE sending a CRM request.
 * After started, any crash, timeout, or ambiguous response is quarantined:
 * automatic retry must never resend it. A human must reconcile the CRM record
 * and then explicitly resolve the operation. This preserves at-most-once
 * automatic writes, although it can leave a booking unsynced pending review.
 */
export interface BookingLedger {
  reserve(booking: VerifiedCalBooking): Promise<
    | { outcome: 'reserved'; operation: ReservedOperation }
    | { outcome: 'duplicate' | 'stale' | 'quarantined' }
  >
  markStarted(operationId: string): Promise<void>
  markApplied(operationId: string, crmMeetingId: string, contactId: string): Promise<void>
  quarantine(operationId: string, reason: string): Promise<void>
}
