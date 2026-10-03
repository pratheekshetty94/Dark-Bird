import { handleBookingWebhook } from '../../../../lib/integrations/booking-webhook.ts'
import { handleBookingValidation } from '../../../../lib/integrations/booking-validation.ts'
import { PostgresBookingLedger } from '../../../../lib/integrations/postgres-booking-ledger.ts'
import { createPgPoolFromEnvironment } from '../../../../lib/integrations/pg-pool.ts'
import { createZohoWriterFromEnvironment } from '../../../../lib/integrations/zoho-meeting-writer.ts'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

let dependencies: {
  ledger: PostgresBookingLedger
  writer: ReturnType<typeof createZohoWriterFromEnvironment>
} | null = null
let validationWriter: ReturnType<typeof createZohoWriterFromEnvironment> | null = null

export async function POST(request: Request): Promise<Response> {
  const syncEnabled = process.env.BOOKING_CRM_SYNC_ENABLED === 'true'
  const validationEnabled = process.env.BOOKING_CRM_VALIDATE_ONLY === 'true'
  if (syncEnabled && validationEnabled) {
    return Response.json({ error: 'conflicting_modes' }, { status: 503 })
  }
  if (validationEnabled) {
    return handleBookingValidation(request, {
      secret: process.env.CAL_WEBHOOK_SECRET,
      verifyOrg: async () => {
        if (!validationWriter) validationWriter = createZohoWriterFromEnvironment()
        await validationWriter.verifyOrganizationReadOnly()
      },
      log: code => console.info('booking_crm_validation', code),
    })
  }
  // Leave the enable flag unset until signing, payload shape, Zoho OAuth, and
  // organization notification behavior are all verified and approved.
  if (!syncEnabled) {
    return Response.json({ error: 'not_configured' }, { status: 503 })
  }
  const secret = process.env.CAL_WEBHOOK_SECRET
  if (!secret || secret.length < 32 || !process.env.DATABASE_URL ||
      process.env.ZOHO_DC !== 'in' || !process.env.ZOHO_CLIENT_ID ||
      !process.env.ZOHO_CLIENT_SECRET || !process.env.ZOHO_REFRESH_TOKEN) {
    return Response.json({ error: 'not_configured' }, { status: 503 })
  }
  try {
    if (!dependencies) dependencies = {
      ledger: new PostgresBookingLedger(createPgPoolFromEnvironment()),
      writer: createZohoWriterFromEnvironment(),
    }
  } catch {
    return Response.json({ error: 'not_configured' }, { status: 503 })
  }
  return handleBookingWebhook(request, {
    secret,
    ledger: dependencies.ledger,
    writer: dependencies.writer,
    log: code => console.info('booking_crm_webhook', code),
  })
}
