import { handleBookingWebhook } from '../../../../lib/integrations/booking-webhook.ts'
import { handleBookingValidation } from '../../../../lib/integrations/booking-validation.ts'
import { PostgresBookingLedger } from '../../../../lib/integrations/postgres-booking-ledger.ts'
import { createPgPoolFromEnvironment } from '../../../../lib/integrations/pg-pool.ts'
import { createZohoTaskWriterFromEnvironment } from '../../../../lib/integrations/zoho-task-writer.ts'
import { PostgresContactCreationGate } from '../../../../lib/integrations/postgres-contact-claim.ts'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type WriterDependencies = {
  ledger: PostgresBookingLedger
  writer: ReturnType<typeof createZohoTaskWriterFromEnvironment>
}
let dependencies: WriterDependencies | null = null
let validationWriter: ReturnType<typeof createZohoTaskWriterFromEnvironment> | null = null
let testDependencies: WriterDependencies | null = null
let contactTestDependencies: WriterDependencies | null = null
const TEST_ATTENDEE_EMAIL = 'pratheek@darkbirdfilms.com'
const TEST_ORGANIZER_EMAIL = 'management@darkbirdfilms.com'
const TEST_CONTACT_ID = '1457002000000562075'
const CONTACT_TEST_EMAIL = 'pratheek+crm-contact-test-20261004@darkbirdfilms.com'
const CONTACT_TEST_NAME = 'CRM Contact Test 2026-10-04'

function validUtcSlot(value: string | undefined): value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) return false
  return Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value
}

export async function POST(request: Request): Promise<Response> {
  const syncEnabled = process.env.BOOKING_CRM_SYNC_ENABLED === 'true'
  const validationEnabled = process.env.BOOKING_CRM_VALIDATE_ONLY === 'true'
  const testEnabled = process.env.BOOKING_CRM_TEST_SYNC_ENABLED === 'true'
  const contactTestEnabled = process.env.BOOKING_CRM_CONTACT_TEST_ENABLED === 'true'
  if (Number(syncEnabled) + Number(validationEnabled) + Number(testEnabled) +
      Number(contactTestEnabled) > 1 ||
      (contactTestEnabled && process.env.BOOKING_CRM_NEW_CONTACT_ENABLED === 'true')) {
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
  if (!syncEnabled && !testEnabled && !contactTestEnabled) {
    return Response.json({ error: 'not_configured' }, { status: 503 })
  }
  const secret = process.env.CAL_WEBHOOK_SECRET
  const testStartAt = process.env.BOOKING_CRM_TEST_START_UTC
  const testEndAt = process.env.BOOKING_CRM_TEST_END_UTC
  const testRescheduleStartAt = process.env.BOOKING_CRM_TEST_RESCHEDULE_START_UTC
  const testRescheduleEndAt = process.env.BOOKING_CRM_TEST_RESCHEDULE_END_UTC
  const taskTestRunId = process.env.BOOKING_CRM_TASK_TEST_RUN_ID
  const contactTestStartAt = process.env.BOOKING_CRM_CONTACT_TEST_START_UTC
  const contactTestEndAt = process.env.BOOKING_CRM_CONTACT_TEST_END_UTC
  const contactTestRunId = process.env.BOOKING_CRM_CONTACT_TEST_RUN_ID
  if (!secret || secret.length < 32 || !process.env.DATABASE_URL ||
      process.env.ZOHO_DC !== 'in' || !process.env.ZOHO_CLIENT_ID ||
      !process.env.ZOHO_CLIENT_SECRET || !process.env.ZOHO_REFRESH_TOKEN ||
      (testEnabled && (!validUtcSlot(testStartAt) || !validUtcSlot(testEndAt) ||
        Date.parse(testEndAt) <= Date.parse(testStartAt) ||
        !validUtcSlot(testRescheduleStartAt) || !validUtcSlot(testRescheduleEndAt) ||
        Date.parse(testRescheduleEndAt) <= Date.parse(testRescheduleStartAt) ||
        testRescheduleStartAt === testStartAt ||
        !taskTestRunId || !/^task-[a-z0-9]{8,40}$/.test(taskTestRunId))) ||
      (contactTestEnabled && (!validUtcSlot(contactTestStartAt) ||
        !validUtcSlot(contactTestEndAt) ||
        Date.parse(contactTestEndAt) <= Date.parse(contactTestStartAt) ||
        !contactTestRunId || !/^contact-[a-z0-9]{8,40}$/.test(contactTestRunId)))) {
    return Response.json({ error: 'not_configured' }, { status: 503 })
  }
  try {
    if (testEnabled && !testDependencies) testDependencies = {
      ledger: new PostgresBookingLedger(createPgPoolFromEnvironment(), { claimTaskTestRun: taskTestRunId }),
      writer: createZohoTaskWriterFromEnvironment(TEST_CONTACT_ID,
        code => console.info('booking_crm_zoho', code)),
    }
    if (contactTestEnabled && !contactTestDependencies) {
      const pool = createPgPoolFromEnvironment()
      contactTestDependencies = {
        ledger: new PostgresBookingLedger(pool, { claimContactTestRun: contactTestRunId }),
        writer: createZohoTaskWriterFromEnvironment(undefined,
          code => console.info('booking_crm_zoho', code), new PostgresContactCreationGate(pool)),
      }
    }
    if (syncEnabled && !dependencies) {
      const pool = createPgPoolFromEnvironment()
      dependencies = {
        ledger: new PostgresBookingLedger(pool),
        writer: createZohoTaskWriterFromEnvironment(undefined,
          code => console.info('booking_crm_zoho', code),
          process.env.BOOKING_CRM_NEW_CONTACT_ENABLED === 'true'
            ? new PostgresContactCreationGate(pool) : undefined),
      }
    }
  } catch {
    return Response.json({ error: 'not_configured' }, { status: 503 })
  }
  const active = contactTestEnabled ? contactTestDependencies
    : testEnabled ? testDependencies : dependencies
  if (!active) return Response.json({ error: 'not_configured' }, { status: 503 })
  return handleBookingWebhook(request, {
    secret,
    ledger: active.ledger,
    writer: active.writer,
    testScope: contactTestEnabled ? {
      startAt: contactTestStartAt!, endAt: contactTestEndAt!,
      attendeeEmail: CONTACT_TEST_EMAIL, attendeeName: CONTACT_TEST_NAME,
      organizerEmail: TEST_ORGANIZER_EMAIL, createOnly: true,
    } : testEnabled ? {
      startAt: testStartAt!, endAt: testEndAt!, attendeeEmail: TEST_ATTENDEE_EMAIL,
      organizerEmail: TEST_ORGANIZER_EMAIL,
      rescheduleStartAt: testRescheduleStartAt!, rescheduleEndAt: testRescheduleEndAt!,
    } : undefined,
    log: code => console.info('booking_crm_webhook', code),
  })
}
