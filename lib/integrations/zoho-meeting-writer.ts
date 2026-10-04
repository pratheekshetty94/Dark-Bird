import type { ReservedOperation } from './booking-ledger.ts'
import type { CrmMeetingWriter } from './booking-webhook.ts'

const ACCOUNTS_HOST = 'https://accounts.zoho.in'
const API_HOST = 'https://www.zohoapis.in'
const EXPECTED_ORG_DOMAIN = 'org60090260228'
const EXPECTED_ORG_ZGID = '60090260228'
const EXPECTED_ORG_RECORD_ID = '1457002000000020813'
const TOKEN_TIMEOUT_MS = 5000
const READ_TIMEOUT_MS = 5000
const WRITE_TIMEOUT_MS = 7000
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
  'zoho_contact_search_failed', 'zoho_contact_ambiguous',
  'zoho_test_contact_mismatch', 'zoho_missing_meeting_id',
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

function crmDate(iso: string): string {
  return new Date(iso).toISOString().replace(/\.\d{3}Z$/, '+00:00')
}

/** The only Events fields this integration is allowed to send. */
export function meetingFields(operation: ReservedOperation, contactId: string) {
  const { booking } = operation
  if (booking.trigger === 'BOOKING_CANCELLED') throw new Error('zoho_cancellation_manual_review')
  return {
    Event_Title: 'Discovery Call',
    Start_DateTime: crmDate(booking.startAt),
    End_DateTime: crmDate(booking.endAt),
    Who_Id: { id: contactId },
    Meeting_Venue__s: 'Online',
    $send_notification: false,
    Description: `Cal.com iCalUID: ${booking.calendarUid}\nBooking UID: ${booking.bookingUid}`,
  }
}

/**
 * Server-only writer. Never retries a CRM write: a timeout can mean the
 * Meeting was committed. The ledger has already committed `started` before
 * apply() is called and quarantines every uncertain outcome.
 */
export class ZohoMeetingWriter implements CrmMeetingWriter {
  private readonly credentials: ZohoCredentials
  private readonly request: typeof fetch
  private readonly now: () => number
  private readonly requiredContactId: string | undefined
  private readonly logDiagnostic: ((code: string) => void) | undefined
  private accessToken: { value: string; expiresAt: number } | null = null
  private tokenInFlight: Promise<string> | null = null
  private verifiedOrgToken: string | null = null
  private orgCheckInFlight: { token: string; promise: Promise<void> } | null = null

  private async logHttpFailure(stage: 'token' | 'org' | 'contacts' | 'events', response: Response) {
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
    const result = object(await response.json())
    if (!Array.isArray(result.data) || !result.info ||
        object(result.info).more_records !== false) {
      throw new Error('zoho_contact_ambiguous')
    }
    const exact = result.data.map(object).filter(contact =>
      typeof contact.Email === 'string' && contact.Email.trim().toLowerCase() === email
    )
    if (exact.length !== 1 || typeof exact[0].id !== 'string' || !exact[0].id) {
      throw new Error('zoho_contact_ambiguous')
    }
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

  /** OAuth refresh and GET /org only. Never searches Contacts or writes Events. */
  async verifyOrganizationReadOnly(): Promise<void> {
    const token = await this.token()
    await this.verifyOrg(token)
  }

  /** Signed validation mode only: refresh, verify org, and find one internal Contact. */
  async verifyInternalContactReadOnly(email: string): Promise<void> {
    if (!this.requiredContactId) throw new Error('zoho_test_contact_not_configured')
    await this.exactContact(email)
  }

  async apply(operation: ReservedOperation): Promise<{ meetingId: string; contactId: string }> {
    if (operation.booking.trigger === 'BOOKING_CANCELLED') {
      throw new Error('zoho_cancellation_manual_review')
    }
    let contactId: string
    let token: string
    try {
      contactId = await this.exactContact(operation.booking.attendeeEmail)
      if (operation.action === 'update' && !operation.crmMeetingId) {
        throw new Error('zoho_missing_meeting_id')
      }
      token = await this.token()
      await this.verifyOrg(token)
    } catch (error) {
      const code = error instanceof Error && PREWRITE_CODES.has(error.message)
        ? error.message : 'other'
      this.logDiagnostic?.(`prewrite_${code}`)
      throw error
    }
    const url = operation.action === 'create'
      ? `${API_HOST}/crm/v8/Events`
      : `${API_HOST}/crm/v8/Events/${encodeURIComponent(operation.crmMeetingId!)}`
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
            ? { id: operation.crmMeetingId, ...meetingFields(operation, contactId) }
            : meetingFields(operation, contactId)],
          trigger: [],
          skip_feature_execution: [{ name: 'cadences' }],
        }),
        signal: AbortSignal.timeout(WRITE_TIMEOUT_MS),
        cache: 'no-store',
        redirect: 'error',
      })
    } catch (error) {
      this.logDiagnostic?.('events_transport_failure')
      throw error
    }
    // A non-2xx or malformed response is uncertain once the request was sent.
    if (!response.ok || response.status === 207) {
      await this.logHttpFailure('events', response)
      throw new Error('zoho_write_uncertain')
    }
    let result: Record<string, unknown>
    try { result = object(await response.json()) } catch {
      this.logDiagnostic?.('events_response_malformed')
      throw new Error('zoho_write_uncertain')
    }
    if (!Array.isArray(result.data) || result.data.length !== 1) {
      this.logDiagnostic?.('events_response_malformed')
      throw new Error('zoho_write_uncertain')
    }
    let item: Record<string, unknown>
    try { item = object(result.data[0]) } catch {
      this.logDiagnostic?.('events_response_malformed')
      throw new Error('zoho_write_uncertain')
    }
    if (item.code !== 'SUCCESS' || item.status !== 'success') {
      this.logDiagnostic?.(`events_result_${response.status}_${safeProviderCode(item.code)}`)
      throw new Error('zoho_write_uncertain')
    }
    let details: Record<string, unknown>
    try { details = object(item.details) } catch {
      this.logDiagnostic?.('events_response_malformed')
      throw new Error('zoho_write_uncertain')
    }
    const id = details.id
    if (typeof id !== 'string' || !id ||
        (operation.action === 'update' && id !== operation.crmMeetingId)) {
      this.logDiagnostic?.('events_response_malformed')
      throw new Error('zoho_write_uncertain')
    }
    return { meetingId: id, contactId }
  }
}

/** Do not call until Zoho India DC and server-side OAuth setup are reviewed. */
export function createZohoWriterFromEnvironment(
  requiredContactId?: string,
  logDiagnostic?: (code: string) => void
): ZohoMeetingWriter {
  return new ZohoMeetingWriter({
    clientId: process.env.ZOHO_CLIENT_ID ?? '',
    clientSecret: process.env.ZOHO_CLIENT_SECRET ?? '',
    refreshToken: process.env.ZOHO_REFRESH_TOKEN ?? '',
    confirmedRegion: process.env.ZOHO_DC ?? '',
  }, fetch, Date.now, requiredContactId, logDiagnostic)
}
