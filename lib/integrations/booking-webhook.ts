import { CalWebhookError, readBoundedWebhookBody, verifyCalBookingWebhook } from './cal-booking.ts'
import type { BookingLedger, ReservedOperation } from './booking-ledger.ts'

export interface CrmTaskWriter {
  /** Must return only after a definitive Zoho success and exact one-Contact match. */
  apply(operation: ReservedOperation): Promise<{ taskId: string; contactId: string }>
}

export type BookingWebhookDependencies = {
  secret: string | undefined
  ledger: BookingLedger
  writer: CrmTaskWriter
  testScope?: {
    startAt: string; endAt: string; attendeeEmail: string; organizerEmail: string
    rescheduleStartAt?: string; rescheduleEndAt?: string
    createOnly?: boolean; attendeeName?: string
  }
  now?: () => number
  log?: (code: string) => void
}

/** Only prewrite, non-personal Contact lookup reasons may be persisted verbatim. */
function safeQuarantineReason(error: unknown): string {
  if (!(error instanceof Error)) return 'uncertain_crm_result'
  switch (error.message) {
    case 'zoho_contact_missing':
    case 'zoho_contact_duplicate':
    case 'zoho_contact_secondary_match':
    case 'zoho_contact_page_incomplete':
    case 'zoho_contact_result_invalid':
    case 'zoho_contact_search_failed':
    case 'zoho_contact_name_missing':
    case 'zoho_contact_create_claim_exists':
      return error.message
    default:
      return 'uncertain_crm_result'
  }
}

export async function handleBookingWebhook(
  request: Request,
  dependencies: BookingWebhookDependencies
): Promise<Response> {
  if (!dependencies.secret || dependencies.secret.length < 32) {
    return Response.json({ error: 'not_configured' }, { status: 503 })
  }
  const declaredLength = Number(request.headers.get('content-length'))
  if (Number.isFinite(declaredLength) && declaredLength > 128 * 1024) {
    return Response.json({ error: 'invalid_size' }, { status: 413 })
  }
  let booking
  try {
    const rawBody = await readBoundedWebhookBody(request)
    booking = verifyCalBookingWebhook(rawBody, request.headers, dependencies.secret, dependencies.now?.())
  } catch (error) {
    const code = error instanceof CalWebhookError ? error.code : 'invalid_request'
    dependencies.log?.(code)
    return Response.json({ error: code }, { status: code === 'not_configured' ? 503 : 400 })
  }

  const scope = dependencies.testScope
  const exactCreate = booking.trigger === 'BOOKING_CREATED' && booking.sequence === 0 &&
    booking.previousBookingUid === null && booking.startAt === scope?.startAt &&
    booking.endAt === scope?.endAt
  const exactFollowUp = !!scope?.rescheduleStartAt && !!scope?.rescheduleEndAt &&
    (booking.trigger === 'BOOKING_RESCHEDULED' || booking.trigger === 'BOOKING_CANCELLED') &&
    booking.sequence > 0 && booking.startAt === scope.rescheduleStartAt &&
    booking.endAt === scope.rescheduleEndAt
  if (scope && (
    booking.hasOtherGuests === true ||
    booking.attendeeEmail !== scope.attendeeEmail ||
    booking.organizerEmail !== scope.organizerEmail ||
    (scope.attendeeName !== undefined && booking.attendeeName !== scope.attendeeName) ||
    (scope.createOnly === true && booking.trigger !== 'BOOKING_CREATED') ||
    !(exactCreate || exactFollowUp)
  )) {
    dependencies.log?.('test_scope_ignored')
    return Response.json({ outcome: 'test_scope_ignored' }, { status: 202 })
  }

  let reservation
  try {
    reservation = await dependencies.ledger.reserve(booking)
  } catch {
    dependencies.log?.('ledger_unavailable')
    return Response.json({ error: 'ledger_unavailable' }, { status: 503 })
  }
  if (reservation.outcome !== 'reserved') {
    dependencies.log?.(`ledger_${reservation.outcome}`)
    return Response.json({ outcome: reservation.outcome }, {
      status: reservation.outcome === 'quarantined' || reservation.outcome === 'test_scope_ignored' ? 202 : 200,
    })
  }

  const { operation } = reservation
  try {
    // This transition must commit before the first outbound CRM request.
    await dependencies.ledger.markStarted(operation.id)
  } catch {
    dependencies.log?.('start_failed')
    return Response.json({ error: 'start_failed' }, { status: 503 })
  }
  try {
    const result = await dependencies.writer.apply(operation)
    if (!result.taskId || !result.contactId) throw new Error('ambiguous_crm_result')
    await dependencies.ledger.markApplied(operation.id, result.taskId, result.contactId)
    return Response.json({ outcome: 'applied' })
  } catch (error) {
    // Even an apparent timeout can mean Zoho committed. Never resend.
    const reason = safeQuarantineReason(error)
    await dependencies.ledger.quarantine(operation.id, reason).catch(() => undefined)
    dependencies.log?.(`crm_${reason}_quarantined`)
    return Response.json({ outcome: 'quarantined' }, { status: 202 })
  }
}
