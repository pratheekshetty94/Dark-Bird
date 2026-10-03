import assert from 'node:assert/strict'
import test from 'node:test'
import type { ReservedOperation } from '../lib/integrations/booking-ledger.ts'
import { ZohoMeetingWriter } from '../lib/integrations/zoho-meeting-writer.ts'

const credentials = {
  clientId: 'local-client', clientSecret: 'local-secret',
  refreshToken: 'local-refresh', confirmedRegion: 'in',
}
const operation: ReservedOperation = {
  id: '1', action: 'create', crmMeetingId: null,
  booking: {
    trigger: 'BOOKING_CREATED', eventTypeId: 4773493, bookingUid: 'booking-1',
    calendarUid: 'calendar-1', sequence: 0, previousBookingUid: null,
    attendeeEmail: 'person@example.com', startAt: '2026-10-04T12:00:00.000Z',
    endAt: '2026-10-04T12:30:00.000Z', occurredAt: '2026-10-03T12:00:00.000Z',
    deliveryHash: 'a'.repeat(64),
  },
}

function json(body: unknown, status = 200): Response {
  return Response.json(body, { status })
}

function mockFetch(config: {
  contacts?: unknown[]
  moreRecords?: boolean
  noContact?: boolean
  writeError?: boolean
  wrongOrg?: boolean
  missingOrg?: boolean
  orgError?: boolean
} = {}) {
  const calls: { url: string; init: RequestInit | undefined }[] = []
  const request = async (input: string | URL | Request, init?: RequestInit): Promise<Response> => {
    const url = String(input)
    calls.push({ url, init })
    if (url === 'https://accounts.zoho.in/oauth/v2/token') {
      return json({ access_token: 'local-access', expires_in: 3600,
        api_domain: 'https://www.zohoapis.in' })
    }
    if (url === 'https://www.zohoapis.in/crm/v8/org') {
      if (config.orgError) return json({ code: 'NO_PERMISSION' }, 403)
      if (config.missingOrg) return json({ org: [] })
      return json({ org: [{ domain_name: config.wrongOrg ? 'org-other' : 'org60090260228',
        zgid: '60090260228', id: '1457002000000020813',
        type: 'production', country_code: 'IN' }] })
    }
    if (url.includes('/Contacts/search')) {
      if (config.noContact) return new Response(null, { status: 204 })
      return json({ data: config.contacts ?? [{ id: 'contact-1', Email: 'person@example.com' }],
        info: { more_records: config.moreRecords ?? false } })
    }
    if (url.includes('/Events')) {
      if (config.writeError) throw new Error('timeout')
      return json({ data: [{ code: 'SUCCESS', status: 'success',
        details: { id: 'meeting-1' } }] }, 201)
    }
    throw new Error('unexpected_endpoint')
  }
  return { request: request as typeof fetch, calls }
}

test('creates one CRM Event for one exact primary-email Contact', async () => {
  const mock = mockFetch({ contacts: [
    { id: 'secondary-match', Email: 'other@example.com' },
    { id: 'contact-1', Email: 'PERSON@example.com' },
  ] })
  const writer = new ZohoMeetingWriter(credentials, mock.request)
  assert.deepEqual(await writer.apply(operation), { meetingId: 'meeting-1', contactId: 'contact-1' })
  assert.equal(mock.calls.length, 4)
  assert.equal(mock.calls[0].url, 'https://accounts.zoho.in/oauth/v2/token')
  assert.ok(mock.calls[0].init?.body instanceof URLSearchParams)
  assert.equal(mock.calls[1].url, 'https://www.zohoapis.in/crm/v8/org')
  assert.equal(mock.calls[2].url.startsWith('https://www.zohoapis.in/crm/v8/Contacts/search?'), true)
  assert.equal(mock.calls[3].url, 'https://www.zohoapis.in/crm/v8/Events')
  const body = JSON.parse(String(mock.calls[3].init?.body))
  assert.deepEqual(Object.keys(body).sort(), ['data', 'skip_feature_execution', 'trigger'])
  assert.deepEqual(body.trigger, [])
  assert.deepEqual(body.skip_feature_execution, [{ name: 'cadences' }])
  assert.deepEqual(Object.keys(body.data[0]).sort(), [
    'Description', 'End_DateTime', 'Event_Title', 'Meeting_Venue__s',
    'Start_DateTime', 'Who_Id',
  ])
  assert.deepEqual(body.data[0].Who_Id, { id: 'contact-1' })
  assert.equal(body.data[0].Start_DateTime, '2026-10-04T12:00:00+00:00')
})

for (const [name, config] of [
  ['missing', { noContact: true }],
  ['duplicate primary', { contacts: [
    { id: 'contact-1', Email: 'person@example.com' },
    { id: 'contact-2', Email: 'person@example.com' },
  ] }],
  ['incomplete page', { moreRecords: true }],
] as const) {
  test(`${name} Contact result blocks CRM write`, async () => {
    const mock = mockFetch(config)
    const writer = new ZohoMeetingWriter(credentials, mock.request)
    await assert.rejects(writer.apply(operation))
    assert.ok(!mock.calls.some(call => call.url.includes('/Events')))
  })
}

test('updates the known Meeting once and includes its id', async () => {
  const mock = mockFetch()
  const writer = new ZohoMeetingWriter(credentials, mock.request)
  const update: ReservedOperation = { ...operation, action: 'update', crmMeetingId: 'meeting-1',
    booking: { ...operation.booking, trigger: 'BOOKING_RESCHEDULED' } }
  await writer.apply(update)
  const call = mock.calls.find(item => item.url.includes('/Events/'))
  assert.equal(call?.init?.method, 'PUT')
  const body = JSON.parse(String(call?.init?.body))
  assert.equal(body.data[0].id, 'meeting-1')
  assert.equal(body.data[0].Event_Title, 'Discovery Call')
  assert.ok(!('Participants' in body.data[0]))
})

for (const [name, config] of [
  ['wrong org', { wrongOrg: true }],
  ['missing org', { missingOrg: true }],
  ['org API error', { orgError: true }],
] as const) {
  test(`${name} fails before Contact search or Meeting write`, async () => {
    const mock = mockFetch(config)
    const writer = new ZohoMeetingWriter(credentials, mock.request)
    await assert.rejects(writer.apply(operation))
    assert.equal(mock.calls.filter(call => call.url.includes('/Contacts/search')).length, 0)
    assert.equal(mock.calls.filter(call => call.url.includes('/Events')).length, 0)
  })
}

test('cancellation refuses every Zoho request', async () => {
  const mock = mockFetch()
  const writer = new ZohoMeetingWriter(credentials, mock.request)
  await assert.rejects(writer.apply({ ...operation, action: 'update', crmMeetingId: 'meeting-1',
    booking: { ...operation.booking, trigger: 'BOOKING_CANCELLED' } }),
  /zoho_cancellation_manual_review/)
  assert.equal(mock.calls.length, 0)
})

test('an uncertain write is not retried by the writer', async () => {
  const mock = mockFetch({ writeError: true })
  const writer = new ZohoMeetingWriter(credentials, mock.request)
  await assert.rejects(writer.apply(operation))
  assert.equal(mock.calls.filter(call => call.url.includes('/Events')).length, 1)
})

test('concurrent calls share one in-flight token refresh', async () => {
  const mock = mockFetch()
  const writer = new ZohoMeetingWriter(credentials, mock.request)
  await Promise.all([writer.apply(operation), writer.apply(operation)])
  assert.equal(mock.calls.filter(call => call.url.includes('/oauth/v2/token')).length, 1)
})

test('non-India region fails closed before any request', () => {
  assert.throws(() => new ZohoMeetingWriter({ ...credentials, confirmedRegion: 'us' }),
    /zoho_not_configured/)
})
