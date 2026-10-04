import type { ReservedOperation } from './booking-ledger.ts'
import type { CrmTaskWriter } from './booking-webhook.ts'

const ACCOUNTS_HOST = 'https://accounts.zoho.in'
const API_HOST = 'https://www.zohoapis.in'
const EXPECTED_ORG_DOMAIN = 'org60090260228'
const EXPECTED_ORG_ZGID = '60090260228'
const EXPECTED_ORG_RECORD_ID = '1457002000000020813'
const TOKEN_TIMEOUT_MS = 5000
const READ_TIMEOUT_MS = 5000
const WRITE_TIMEOUT_MS = 7000
const BUSINESS_TIME_ZONE = 'Asia/Kolkata'
const PROVIDER_CODES = new Set([
  'INVALID_DATA', 'MANDATORY_NOT_FOUND', 'INVALID_MODULE', 'NO_PERMISSION',
  'OAUTH_SCOPE_MISMATCH', 'INVALID_TOKEN', 'RECORD_LOCKED', 'DUPLICATE_DATA',
  'LIMIT_EXCEEDED', 'INVALID_REQUEST', 'INVALID_URL_PATTERN',
  'INTERNAL_ERROR', 'PROCESSING_ERROR', 'INVALID_REQUEST_METHOD',
  'DEPENDENT_FIELD_MISSING', 'DEPENDENT_MISMATCH', 'DEPENDENT_SERVICE_ERROR',
  'MULTIPLE_OR_MULTI_ERRORS',
])
const PREWRITE_CODES = new Set([
  'zoho_token_rejected', 'zoho_token_invalid', 'zoho_org_check_failed',
  'zoho_org_invalid', 'zoho_org_mismatch', 'zoho_contact_missing',
  'zoho_contact_search_failed', 'zoho_contact_page_incomplete',
  'zoho_contact_result_invalid', 'zoho_contact_duplicate',
  'zoho_test_contact_mismatch', 'zoho_missing_task_id', 'zoho_missing_join_url',
])

function safeProviderCode(value: unknown): string {
  return typeof value === 'string' && PROVIDER_CODES.has(value) ? value : 'OTHER'
}

function responseCode(value: unknown): string {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return 'OTHER'
  const result = value as Record<string, unknown>
  const item = Array.isArray(result.data) && result.data.length === 1 ? result.data[0] : null
  if (item && typeof item === 'object' && !Array.isArray(item)) {
    return safeProviderCode((item as Record<string, unknown>).code)
  }
  return safeProviderCode(result.code)
}

export type ZohoCredentials = {
  clientId: string
  clientSecret: string
  refreshToken: string
  confirmedRegion: string
}

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('zoho_invalid_response')
  return value as Record<string, unknown>
}

/** The only Task fields this integration is allowed to send. */
export function taskFields(operation: ReservedOperation, contactId: string, existingTask?: Record<string, unknown>) {
  const { booking } = operation
  if (booking.trigger === 'BOOKING_CANCELLED') {
    if (operation.action !== 'update' || !existingTask ||
        typeof existingTask.Description !== 'string') throw new Error('zoho_cancellation_manual_review')
    const description = `${existingTask.Description}\nCancelled in Cal.com: ${booking.occurredAt}`
    if (description.length > 32000) throw new Error('zoho_cancellation_manual_review')
    return {
      Subject: `CANCELLED — Discovery Call`,
      Status: 'Completed',
      Send_Notification_Email: false,
      Description: description,
    }
  }
  if (!booking.joinUrl) throw new Error('zoho_missing_join_url')
  const start = new Date(booking.startAt)
  const localStart = new Intl.DateTimeFormat('en-GB', {
    timeZone: BUSINESS_TIME_ZONE, dateStyle: 'medium', timeStyle: 'short',
  }).format(start)
  const dateParts = new Intl.DateTimeFormat('en-US', {
    timeZone: BUSINESS_TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(start)
  const part = (type: string) => dateParts.find(item => item.type === type)?.value
  return {
    Subject: `Discovery Call — ${localStart} (${BUSINESS_TIME_ZONE})`,
    Due_Date: `${part('year')}-${part('month')}-${part('day')}`,
    ...(operation.action === 'create' ? { Status: 'Not Started' } : {}),
    Who_Id: { id: contactId },
    Send_Notification_Email: false,
    Description: `Booking: Discovery Call\nStart (UTC): ${booking.startAt}\nEnd (UTC): ${booking.endAt}` +
      `\nBusiness time zone: ${BUSINESS_TIME_ZONE}\nAttendee time zone: ${booking.attendeeTimeZone}\nOriginal join URL: ${booking.joinUrl}` +
      `\nCal.com iCalUID: ${booking.calendarUid}\nBooking UID: ${booking.bookingUid}`,
  }
}

/**
 * Server-only writer. Never retries a CRM write: a timeout can mean the
 * Task was committed. The ledger has already committed `started` before
 * apply() is called and quarantines every uncertain outcome.
 */
export class ZohoTaskWriter implements CrmTaskWriter {
  private readonly credentials: ZohoCredentials
  private readonly request: typeof fetch
  private readonly now: () => number
  private readonly requiredContactId: string | undefined
  private readonly logDiagnostic: ((code: string) => void) | undefined
  private accessToken: { value: string; expiresAt: number } | null = null
  private tokenInFlight: Promise<string> | null = null
  private verifiedOrgToken: string | null = null
  private orgCheckInFlight: { token: string; promise: Promise<void> } | null = null

  private async logHttpFailure(stage: 'token' | 'org' | 'contacts' | 'tasks', response: Response) {
    const data = await response.json().catch(() => null)
    this.logDiagnostic?.(`${stage}_http_${response.status}_${responseCode(data)}`)
  }

  constructor(
    credentials: ZohoCredentials,
    request: typeof fetch = fetch,
    now: () => number = Date.now,
    requiredContactId?: string,
    logDiagnostic?: (code: string) => void
  ) {
    if (credentials.confirmedRegion !== 'in' || !credentials.clientId ||
        !credentials.clientSecret || !credentials.refreshToken) {
      throw new Error('zoho_not_configured')
    }
    this.credentials = credentials
    this.request = request
    this.now = now
    this.requiredContactId = requiredContactId
    this.logDiagnostic = logDiagnostic
  }

  private async token(): Promise<string> {
    if (this.accessToken && this.accessToken.expiresAt > this.now() + 60_000) {
      return this.accessToken.value
    }
    if (this.tokenInFlight) return this.tokenInFlight
    this.tokenInFlight = this.refreshToken()
    try { return await this.tokenInFlight } finally { this.tokenInFlight = null }
  }

  private async refreshToken(): Promise<string> {
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: this.credentials.clientId,
      client_secret: this.credentials.clientSecret,
      refresh_token: this.credentials.refreshToken,
    })
    const response = await this.request(`${ACCOUNTS_HOST}/oauth/v2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(TOKEN_TIMEOUT_MS),
      cache: 'no-store',
      redirect: 'error',
    })
    if (!response.ok) {
      await this.logHttpFailure('token', response)
      throw new Error('zoho_token_rejected')
    }
    const data = object(await response.json())
    if (typeof data.access_token !== 'string' || !data.access_token ||
        typeof data.expires_in !== 'number' || data.expires_in < 120 ||
        data.api_domain !== API_HOST) {
      throw new Error('zoho_token_invalid')
    }
    this.accessToken = {
      value: data.access_token,
      expiresAt: this.now() + Math.min(data.expires_in, 3600) * 1000,
    }
    return data.access_token
  }

  private async exactContact(email: string): Promise<string> {
    const token = await this.token()
    await this.verifyOrg(token)
    const url = new URL(`${API_HOST}/crm/v8/Contacts/search`)
    url.searchParams.set('email', email)
    url.searchParams.set('page', '1')
    url.searchParams.set('per_page', '200')
    const response = await this.request(url, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
      signal: AbortSignal.timeout(READ_TIMEOUT_MS),
      cache: 'no-store',
      redirect: 'error',
    })
    if (response.status === 204) throw new Error('zoho_contact_missing')
    if (!response.ok) {
      await this.logHttpFailure('contacts', response)
      throw new Error('zoho_contact_search_failed')
    }
    const raw: unknown = await response.json().catch(() => null)
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      throw new Error('zoho_contact_result_invalid')
    }
    const result = raw as Record<string, unknown>
    if (!Array.isArray(result.data) || !result.info ||
        typeof result.info !== 'object' || Array.isArray(result.info) ||
        result.data.some(item => !item || typeof item !== 'object' || Array.isArray(item))) {
      throw new Error('zoho_contact_result_invalid')
    }
    const moreRecords = (result.info as Record<string, unknown>).more_records
    if (moreRecords === true) throw new Error('zoho_contact_page_incomplete')
    if (moreRecords !== false) throw new Error('zoho_contact_result_invalid')
    const exact = (result.data as Record<string, unknown>[]).filter(contact =>
      typeof contact.Email === 'string' && contact.Email.trim().toLowerCase() === email
    )
    if (exact.length === 0) throw new Error('zoho_contact_missing')
    if (exact.length > 1) throw new Error('zoho_contact_duplicate')
    if (typeof exact[0].id !== 'string' || !exact[0].id) throw new Error('zoho_contact_result_invalid')
    if (this.requiredContactId && exact[0].id !== this.requiredContactId) {
      throw new Error('zoho_test_contact_mismatch')
    }
    return exact[0].id
  }

  private async verifyOrg(token: string): Promise<void> {
    if (this.verifiedOrgToken === token) return
    if (this.orgCheckInFlight?.token === token) return this.orgCheckInFlight.promise
    const promise = (async () => {
      const response = await this.request(`${API_HOST}/crm/v8/org`, {
        headers: { Authorization: `Zoho-oauthtoken ${token}` },
        signal: AbortSignal.timeout(READ_TIMEOUT_MS),
        cache: 'no-store',
        redirect: 'error',
      })
      if (!response.ok) {
        await this.logHttpFailure('org', response)
        throw new Error('zoho_org_check_failed')
      }
      const result = object(await response.json())
      if (!Array.isArray(result.org) || result.org.length !== 1) throw new Error('zoho_org_invalid')
      const org = object(result.org[0])
      if (org.domain_name !== EXPECTED_ORG_DOMAIN || org.zgid !== EXPECTED_ORG_ZGID ||
          org.id !== EXPECTED_ORG_RECORD_ID || org.type !== 'production' ||
          org.country_code !== 'IN') {
        throw new Error('zoho_org_mismatch')
      }
      this.verifiedOrgToken = token
    })()
    this.orgCheckInFlight = { token, promise }
    try { await promise } finally {
      if (this.orgCheckInFlight?.promise === promise) this.orgCheckInFlight = null
    }
  }

  /** OAuth refresh and GET /org only. Never searches Contacts or writes Tasks. */
  async verifyOrganizationReadOnly(): Promise<void> {
    const token = await this.token()
    await this.verifyOrg(token)
  }

  /** Signed validation mode only: refresh, verify org, and find one internal Contact. */
  async verifyInternalContactReadOnly(email: string): Promise<void> {
    if (!this.requiredContactId) throw new Error('zoho_test_contact_not_configured')
    await this.exactContact(email)
  }

  /** Permission check only. Fetch at most one Task ID; do not expose record data. */
  async verifyTasksReadOnly(): Promise<void> {
    const token = await this.token()
    await this.verifyOrg(token)
    const url = new URL(`${API_HOST}/crm/v8/Tasks`)
    url.searchParams.set('fields', 'id')
    url.searchParams.set('per_page', '1')
    const response = await this.request(url, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
      signal: AbortSignal.timeout(READ_TIMEOUT_MS), cache: 'no-store', redirect: 'error',
    })
    if (response.status === 204) return
    if (!response.ok) {
      await this.logHttpFailure('tasks', response)
      throw new Error('zoho_task_read_failed')
    }
    const result = object(await response.json())
    if (!Array.isArray(result.data) || result.data.length > 1) {
      throw new Error('zoho_task_read_invalid')
    }
  }

  private async verifyExistingTask(taskId: string, contactId: string, calendarUid: string): Promise<Record<string, unknown>> {
    const token = await this.token()
    await this.verifyOrg(token)
    const response = await this.request(`${API_HOST}/crm/v8/Tasks/${encodeURIComponent(taskId)}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
      signal: AbortSignal.timeout(READ_TIMEOUT_MS), cache: 'no-store', redirect: 'error',
    })
    if (!response.ok) {
      await this.logHttpFailure('tasks', response)
      throw new Error('zoho_task_read_failed')
    }
    const result = object(await response.json())
    if (!Array.isArray(result.data) || result.data.length !== 1) throw new Error('zoho_task_read_invalid')
    const task = object(result.data[0])
    const who = object(task.Who_Id)
    if (task.id !== taskId || who.id !== contactId ||
        typeof task.Description !== 'string' ||
        !task.Description.includes(`Cal.com iCalUID: ${calendarUid}`) ||
        !task.Description.includes('Original join URL: https://') ||
        task.Remind_At != null || task.Recurring_Activity != null) {
      throw new Error('zoho_task_update_unsafe')
    }
    return task
  }

  async apply(operation: ReservedOperation): Promise<{ taskId: string; contactId: string }> {
    let contactId: string
    let token: string
    try {
      contactId = await this.exactContact(operation.booking.attendeeEmail)
      if (operation.booking.trigger === 'BOOKING_CANCELLED' && operation.action !== 'update') {
        throw new Error('zoho_cancellation_manual_review')
      }
      if (operation.action === 'update' && !operation.crmTaskId) {
        throw new Error('zoho_missing_task_id')
      }
      token = await this.token()
      await this.verifyOrg(token)
    } catch (error) {
      const code = error instanceof Error && PREWRITE_CODES.has(error.message)
        ? error.message : 'other'
      this.logDiagnostic?.(`prewrite_${code}`)
      throw error
    }
    // A reschedule may only update the Task previously linked to this series.
    // Check that it has no reminder before modifying it.
    let existingTask: Record<string, unknown> | undefined
    if (operation.action === 'update') {
      existingTask = await this.verifyExistingTask(operation.crmTaskId!, contactId, operation.booking.calendarUid)
      if (operation.booking.trigger !== 'BOOKING_CANCELLED' && existingTask.Status === 'Completed') {
        throw new Error('zoho_task_update_unsafe')
      }
    }
    const url = operation.action === 'create'
      ? `${API_HOST}/crm/v8/Tasks`
      : `${API_HOST}/crm/v8/Tasks/${encodeURIComponent(operation.crmTaskId!)}`
    let response: Response
    try {
      response = await this.request(url, {
        method: operation.action === 'create' ? 'POST' : 'PUT',
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [operation.action === 'update'
            ? { id: operation.crmTaskId, ...taskFields(operation, contactId, existingTask) }
            : taskFields(operation, contactId)],
          trigger: [],
          skip_feature_execution: [{ name: 'cadences' }],
        }),
        signal: AbortSignal.timeout(WRITE_TIMEOUT_MS),
        cache: 'no-store',
        redirect: 'error',
      })
    } catch (error) {
      this.logDiagnostic?.('tasks_transport_failure')
      throw error
    }
    // A non-2xx or malformed response is uncertain once the request was sent.
    if (!response.ok || response.status === 207) {
      await this.logHttpFailure('tasks', response)
      throw new Error('zoho_write_uncertain')
    }
    let result: Record<string, unknown>
    try { result = object(await response.json()) } catch {
      this.logDiagnostic?.('tasks_response_malformed')
      throw new Error('zoho_write_uncertain')
    }
    if (!Array.isArray(result.data) || result.data.length !== 1) {
      this.logDiagnostic?.('tasks_response_malformed')
      throw new Error('zoho_write_uncertain')
    }
    let item: Record<string, unknown>
    try { item = object(result.data[0]) } catch {
      this.logDiagnostic?.('tasks_response_malformed')
      throw new Error('zoho_write_uncertain')
    }
    if (item.code !== 'SUCCESS' || item.status !== 'success') {
      this.logDiagnostic?.(`tasks_result_${response.status}_${safeProviderCode(item.code)}`)
      throw new Error('zoho_write_uncertain')
    }
    let details: Record<string, unknown>
    try { details = object(item.details) } catch {
      this.logDiagnostic?.('tasks_response_malformed')
      throw new Error('zoho_write_uncertain')
    }
    const id = details.id
    if (typeof id !== 'string' || !id ||
        (operation.action === 'update' && id !== operation.crmTaskId)) {
      this.logDiagnostic?.('tasks_response_malformed')
      throw new Error('zoho_write_uncertain')
    }
    // Verify the saved Task is linked to the Contact and has no reminder.
    const task = await this.verifyExistingTask(id, contactId, operation.booking.calendarUid)
    if (operation.booking.trigger === 'BOOKING_CANCELLED' &&
        (task.Status !== 'Completed' || typeof task.Subject !== 'string' ||
          !task.Subject.startsWith('CANCELLED —'))) throw new Error('zoho_task_update_unsafe')
    return { taskId: id, contactId }
  }
}

/** Do not call until Zoho India DC and server-side OAuth setup are reviewed. */
export function createZohoTaskWriterFromEnvironment(
  requiredContactId?: string,
  logDiagnostic?: (code: string) => void
): ZohoTaskWriter {
  return new ZohoTaskWriter({
    clientId: process.env.ZOHO_CLIENT_ID ?? '',
    clientSecret: process.env.ZOHO_CLIENT_SECRET ?? '',
    refreshToken: process.env.ZOHO_REFRESH_TOKEN ?? '',
    confirmedRegion: process.env.ZOHO_DC ?? '',
  }, fetch, Date.now, requiredContactId, logDiagnostic)
}
