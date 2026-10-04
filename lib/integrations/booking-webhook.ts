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
  testScope?: { startAt: string; endAt: string; attendeeEmail: string; organizerEmail: string }
  now?: () => number
  log?: (code: string) => void
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

  if (dependencies.testScope && (
    booking.trigger !== 'BOOKING_CREATED' ||
    booking.sequence !== 0 || booking.previousBookingUid !== null ||
    booking.hasOtherGuests === true ||
    booking.startAt !== dependencies.testScope.startAt ||
    booking.endAt !== dependencies.testScope.endAt ||
    booking.attendeeEmail !== dependencies.testScope.attendeeEmail ||
    booking.organizerEmail !== dependencies.testScope.organizerEmail
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
  } catch {
    // Even an apparent timeout can mean Zoho committed. Never resend.
    await dependencies.ledger.quarantine(operation.id, 'uncertain_crm_result').catch(() => undefined)
    dependencies.log?.('crm_uncertain_quarantined')
    return Response.json({ outcome: 'quarantined' }, { status: 202 })
  }
}
