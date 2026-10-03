import {
  authenticateCalWebhook, CalWebhookError, readBoundedWebhookBody,
  verifyCalBookingWebhook,
} from './cal-booking.ts'

type ValidationDependencies = {
  secret: string | undefined
  verifyOrg: () => Promise<void>
  log?: (code: string) => void
  now?: () => number
}

/** Signed dry-run receiver. It has no ledger or CRM writer dependency. */
export async function handleBookingValidation(
  request: Request,
  dependencies: ValidationDependencies
): Promise<Response> {
  if (!dependencies.secret || dependencies.secret.length < 32) {
    return Response.json({ error: 'not_configured' }, { status: 503 })
  }
  const declaredLength = Number(request.headers.get('content-length'))
  if (Number.isFinite(declaredLength) && declaredLength > 128 * 1024) {
    return Response.json({ error: 'invalid_size' }, { status: 413 })
  }

  let outcome: 'booking_payload_valid' | 'signed_transport_only'
  try {
    const rawBody = await readBoundedWebhookBody(request)
    authenticateCalWebhook(rawBody, request.headers, dependencies.secret)
    const decoded: unknown = JSON.parse(Buffer.from(rawBody).toString('utf8'))
    if (!decoded || typeof decoded !== 'object' || Array.isArray(decoded)) {
      throw new CalWebhookError('invalid_payload')
    }
    const trigger = (decoded as Record<string, unknown>).triggerEvent
    if (trigger === 'BOOKING_CREATED' || trigger === 'BOOKING_RESCHEDULED' ||
        trigger === 'BOOKING_CANCELLED') {
      verifyCalBookingWebhook(rawBody, request.headers, dependencies.secret, dependencies.now?.())
      outcome = 'booking_payload_valid'
    } else {
      // Cal does not document a ping payload. This proves signature transport
      // and org binding only, never booking-payload compatibility.
      outcome = 'signed_transport_only'
    }
  } catch (error) {
    const code = error instanceof CalWebhookError ? error.code : 'invalid_request'
    dependencies.log?.(code)
    return Response.json({ error: code }, { status: code === 'invalid_size' ? 413 : 400 })
  }

  try {
    await dependencies.verifyOrg()
  } catch {
    dependencies.log?.('org_unavailable')
    return Response.json({ error: 'org_unavailable' }, { status: 503 })
  }
  dependencies.log?.(outcome)
  return Response.json({ outcome }, { status: outcome === 'booking_payload_valid' ? 200 : 202 })
}
