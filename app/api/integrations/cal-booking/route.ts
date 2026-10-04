import { handleBookingWebhook } from '../../../../lib/integrations/booking-webhook.ts'
import { handleBookingValidation } from '../../../../lib/integrations/booking-validation.ts'
import { PostgresBookingLedger } from '../../../../lib/integrations/postgres-booking-ledger.ts'
import { createPgPoolFromEnvironment } from '../../../../lib/integrations/pg-pool.ts'
import { createZohoTaskWriterFromEnvironment } from '../../../../lib/integrations/zoho-task-writer.ts'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type WriterDependencies = {
  ledger: PostgresBookingLedger
  writer: ReturnType<typeof createZohoTaskWriterFromEnvironment>
}
let dependencies: WriterDependencies | null = null
let validationWriter: ReturnType<typeof createZohoTaskWriterFromEnvironment> | null = null
let testDependencies: WriterDependencies | null = null
const TEST_ATTENDEE_EMAIL = 'pratheek@darkbirdfilms.com'
const TEST_ORGANIZER_EMAIL = 'management@darkbirdfilms.com'
const TEST_CONTACT_ID = '1457002000000562075'

function validUtcSlot(value: string | undefined): value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) return false
  return Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value
}

export async function POST(request: Request): Promise<Response> {
  const syncEnabled = process.env.BOOKING_CRM_SYNC_ENABLED === 'true'
  const validationEnabled = process.env.BOOKING_CRM_VALIDATE_ONLY === 'true'
  const testEnabled = process.env.BOOKING_CRM_TEST_SYNC_ENABLED === 'true'
  if (Number(syncEnabled) + Number(validationEnabled) + Number(testEnabled) > 1) {
    return Response.json({ error: 'conflicting_modes' }, { status: 503 })
  }
  if (validationEnabled) {
    const contactPreflight = process.env.BOOKING_CRM_CONTACT_PREFLIGHT === 'true'
    const taskReadPreflight = process.env.BOOKING_CRM_TASK_READ_PREFLIGHT === 'true'
    const writer = () => {
      if (!validationWriter) validationWriter = createZohoTaskWriterFromEnvironment(TEST_CONTACT_ID,
        code => console.info('booking_crm_zoho', code))
      return validationWriter
    }
    return handleBookingValidation(request, {
      secret: process.env.CAL_WEBHOOK_SECRET,
      verifyOrg: () => writer().verifyOrganizationReadOnly(),
      verifyContact: contactPreflight
        ? () => writer().verifyInternalContactReadOnly(TEST_ATTENDEE_EMAIL) : undefined,
      verifyTasks: taskReadPreflight ? () => writer().verifyTasksReadOnly() : undefined,
      log: code => console.info('booking_crm_validation', code),
    })
  }
  // Leave the enable flag unset until signing, payload shape, Zoho OAuth, and
  // organization notification behavior are all verified and approved.
  if (!syncEnabled && !testEnabled) {
    return Response.json({ error: 'not_configured' }, { status: 503 })
  }
  const secret = process.env.CAL_WEBHOOK_SECRET
  const testStartAt = process.env.BOOKING_CRM_TEST_START_UTC
  const testEndAt = process.env.BOOKING_CRM_TEST_END_UTC
  if (!secret || secret.length < 32 || !process.env.DATABASE_URL ||
      process.env.ZOHO_DC !== 'in' || !process.env.ZOHO_CLIENT_ID ||
      !process.env.ZOHO_CLIENT_SECRET || !process.env.ZOHO_REFRESH_TOKEN ||
      (testEnabled && (!validUtcSlot(testStartAt) || !validUtcSlot(testEndAt) ||
        Date.parse(testEndAt) <= Date.parse(testStartAt)))) {
    return Response.json({ error: 'not_configured' }, { status: 503 })
  }
  try {
    if (testEnabled && !testDependencies) testDependencies = {
      ledger: new PostgresBookingLedger(createPgPoolFromEnvironment(), { claimSingleTestCreate: true }),
      writer: createZohoTaskWriterFromEnvironment(TEST_CONTACT_ID,
        code => console.info('booking_crm_zoho', code)),
    }
    if (syncEnabled && !dependencies) dependencies = {
      ledger: new PostgresBookingLedger(createPgPoolFromEnvironment()),
      writer: createZohoTaskWriterFromEnvironment(),
    }
  } catch {
    return Response.json({ error: 'not_configured' }, { status: 503 })
  }
  const active = testEnabled ? testDependencies : dependencies
  if (!active) return Response.json({ error: 'not_configured' }, { status: 503 })
  return handleBookingWebhook(request, {
    secret,
    ledger: active.ledger,
    writer: active.writer,
    testScope: testEnabled ? {
      startAt: testStartAt!, endAt: testEndAt!, attendeeEmail: TEST_ATTENDEE_EMAIL,
      organizerEmail: TEST_ORGANIZER_EMAIL,
    } : undefined,
    log: code => console.info('booking_crm_webhook', code),
  })
}
