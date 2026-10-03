import { handleBookingWebhook } from '@/lib/integrations/booking-webhook'
import { PostgresBookingLedger } from '@/lib/integrations/postgres-booking-ledger'
import { createPgPoolFromEnvironment } from '@/lib/integrations/pg-pool'
import { createZohoWriterFromEnvironment } from '@/lib/integrations/zoho-meeting-writer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

let dependencies: {
  ledger: PostgresBookingLedger
  writer: ReturnType<typeof createZohoWriterFromEnvironment>
} | null = null

export async function POST(request: Request): Promise<Response> {
  // Leave the enable flag unset until signing, payload shape, Zoho OAuth, and
  // organization notification behavior are all verified and approved.
  if (process.env.BOOKING_CRM_SYNC_ENABLED !== 'true') {
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
