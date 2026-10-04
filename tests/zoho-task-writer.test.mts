import assert from 'node:assert/strict'
import test from 'node:test'
import type { ReservedOperation } from '../lib/integrations/booking-ledger.ts'
import { ZohoTaskWriter, taskFields } from '../lib/integrations/zoho-task-writer.ts'

const credentials = {
  clientId: 'local-client', clientSecret: 'local-secret',
  refreshToken: 'local-refresh', confirmedRegion: 'in',
}
const operation: ReservedOperation = {
  id: '1', action: 'create', crmTaskId: null,
  booking: {
    trigger: 'BOOKING_CREATED', eventTypeId: 4773493, bookingUid: 'booking-1',
    calendarUid: 'calendar-1', sequence: 0, previousBookingUid: null,
    attendeeEmail: 'person@example.com', startAt: '2026-10-04T12:00:00.000Z',
    endAt: '2026-10-04T12:30:00.000Z', attendeeTimeZone: 'Asia/Kolkata',
  joinUrl: 'https://meet.google.com/abc-defg-hij', occurredAt: '2026-10-03T12:00:00.000Z',
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
  writeStatus?: number
  writeBody?: unknown
  contactStatus?: number
  contactBody?: unknown
  wrongOrg?: boolean
  missingOrg?: boolean
  orgError?: boolean
  taskReminder?: boolean
  taskStatus?: string
} = {}) {
  const calls: { url: string; init: RequestInit | undefined }[] = []
  let taskState: Record<string, unknown> = { id: 'task-1', Who_Id: { id: 'contact-1' },
    Description: 'Original join URL: https://meet.google.com/abc-defg-hij\nCal.com iCalUID: calendar-1',
    Remind_At: config.taskReminder ? { ALARM: 'FREQ=NONE;ACTION=EMAIL;TRIGGER=-PT15M' } : null,
    Recurring_Activity: null, Status: config.taskStatus ?? 'Not Started' }
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
      if (config.contactStatus) return json(config.contactBody, config.contactStatus)
      if (config.noContact) return new Response(null, { status: 204 })
      return json({ data: config.contacts ?? [{ id: 'contact-1', Email: 'person@example.com' }],
        info: { more_records: config.moreRecords ?? false } })
    }
    if (url.includes('/Tasks') && init?.method !== 'PUT' && init?.method !== 'POST') {
      return json({ data: [taskState] })
    }
    if (url.includes('/Tasks')) {
      if (config.writeError) throw new Error('timeout')
      if (config.writeStatus) return json(config.writeBody, config.writeStatus)
      if (init?.method === 'PUT' || init?.method === 'POST') taskState = { ...taskState,
        ...JSON.parse(String(init.body)).data[0] }
      return json({ data: [{ code: 'SUCCESS', status: 'success',
        details: { id: 'task-1' } }] }, 201)
    }
    throw new Error('unexpected_endpoint')
  }
  return { request: request as typeof fetch, calls }
}

test('creates one CRM Task for one exact primary-email Contact', async () => {
  const mock = mockFetch({ contacts: [
    { id: 'secondary-match', Email: 'other@example.com' },
    { id: 'contact-1', Email: 'PERSON@example.com' },
  ] })
  const writer = new ZohoTaskWriter(credentials, mock.request)
  assert.deepEqual(await writer.apply(operation), { taskId: 'task-1', contactId: 'contact-1' })
  assert.equal(mock.calls.length, 5)
  assert.equal(mock.calls[0].url, 'https://accounts.zoho.in/oauth/v2/token')
  assert.ok(mock.calls[0].init?.body instanceof URLSearchParams)
  assert.equal(mock.calls[1].url, 'https://www.zohoapis.in/crm/v8/org')
  assert.equal(mock.calls[2].url.startsWith('https://www.zohoapis.in/crm/v8/Contacts/search?'), true)
  assert.equal(mock.calls[3].url, 'https://www.zohoapis.in/crm/v8/Tasks')
  const body = JSON.parse(String(mock.calls[3].init?.body))
  assert.deepEqual(Object.keys(body).sort(), ['data', 'skip_feature_execution', 'trigger'])
  assert.deepEqual(body.trigger, [])
  assert.deepEqual(body.skip_feature_execution, [{ name: 'cadences' }])
  assert.deepEqual(Object.keys(body.data[0]).sort(), [
    'Description', 'Due_Date', 'Send_Notification_Email', 'Status', 'Subject', 'Who_Id',
  ])
  assert.equal(body.data[0].Send_Notification_Email, false)
  assert.equal(body.data[0].Status, 'Not Started')
  assert.deepEqual(body.data[0].Who_Id, { id: 'contact-1' })
  assert.equal(body.data[0].Due_Date, '2026-10-04')
  assert.match(body.data[0].Description, /Original join URL: https:\/\/meet.google.com\/abc-defg-hij/)
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
    const writer = new ZohoTaskWriter(credentials, mock.request)
    await assert.rejects(writer.apply(operation))
    assert.ok(!mock.calls.some(call => call.url.includes('/Tasks')))
  })
}

test('updates the known Task once and includes its id', async () => {
  const mock = mockFetch()
  const writer = new ZohoTaskWriter(credentials, mock.request)
  const update: ReservedOperation = { ...operation, action: 'update', crmTaskId: 'task-1',
    booking: { ...operation.booking, trigger: 'BOOKING_RESCHEDULED' } }
  await writer.apply(update)
  const call = mock.calls.find(item => item.url.includes('/Tasks/') && item.init?.method === 'PUT')
  assert.equal(call?.init?.method, 'PUT')
  const body = JSON.parse(String(call?.init?.body))
  assert.equal(body.data[0].id, 'task-1')
  assert.match(body.data[0].Subject, /Discovery Call/)
  assert.ok(!('Participants' in body.data[0]))
  assert.ok(!('Remind_At' in body.data[0]))
  assert.equal(body.data[0].Send_Notification_Email, false)
  assert.ok(!('Status' in body.data[0]))
  assert.equal(mock.calls.filter(item => item.url.endsWith('/Tasks/task-1') && !item.init?.method).length, 2)
})

test('test writer rejects any Contact other than its exact allowed ID before a Task write', async () => {
  const mock = mockFetch()
  const writer = new ZohoTaskWriter(credentials, mock.request, Date.now, 'internal-test-contact')
  await assert.rejects(writer.apply(operation), /zoho_test_contact_mismatch/)
  assert.equal(mock.calls.filter(call => call.url.includes('/Tasks')).length, 0)
})

for (const [name, config] of [
  ['wrong org', { wrongOrg: true }],
  ['missing org', { missingOrg: true }],
  ['org API error', { orgError: true }],
] as const) {
  test(`${name} fails before Contact search or Task write`, async () => {
    const mock = mockFetch(config)
    const writer = new ZohoTaskWriter(credentials, mock.request)
    await assert.rejects(writer.apply(operation))
    assert.equal(mock.calls.filter(call => call.url.includes('/Contacts/search')).length, 0)
    assert.equal(mock.calls.filter(call => call.url.includes('/Tasks')).length, 0)
  })
}

test('cancellation completes the existing Task without losing its original link', async () => {
  const mock = mockFetch()
  const writer = new ZohoTaskWriter(credentials, mock.request)
  await writer.apply({ ...operation, action: 'update', crmTaskId: 'task-1',
    booking: { ...operation.booking, trigger: 'BOOKING_CANCELLED', joinUrl: null } })
  const call = mock.calls.find(item => item.init?.method === 'PUT')
  const body = JSON.parse(String(call?.init?.body))
  assert.equal(body.data[0].Status, 'Completed')
  assert.match(body.data[0].Subject, /^CANCELLED —/)
  assert.match(body.data[0].Description, /Cal.com iCalUID: calendar-1/)
  assert.equal(body.data[0].Send_Notification_Email, false)
})

test('an uncertain write is not retried by the writer', async () => {
  const mock = mockFetch({ writeError: true })
  const writer = new ZohoTaskWriter(credentials, mock.request)
  await assert.rejects(writer.apply(operation))
  assert.equal(mock.calls.filter(call => call.url.includes('/Tasks')).length, 1)
})

test('fixed diagnostics separate Contact rejection, Tasks rejection and transport failure', async () => {
  const sensitive = 'private@example.invalid secret-value'
  const cases = [
    {
      config: { contactStatus: 403, contactBody: { code: 'OAUTH_SCOPE_MISMATCH', message: sensitive } },
      expected: ['contacts_http_403_OAUTH_SCOPE_MISMATCH', 'prewrite_zoho_contact_search_failed'],
      taskCalls: 0,
    },
    {
      config: { writeStatus: 400, writeBody: { data: [{ code: 'INVALID_DATA', message: sensitive }] } },
      expected: ['tasks_http_400_INVALID_DATA'], taskCalls: 1,
    },
    {
      config: { writeStatus: 422, writeBody: { code: sensitive } },
      expected: ['tasks_http_422_OTHER'], taskCalls: 1,
    },
    {
      config: { writeError: true },
      expected: ['tasks_transport_failure'], taskCalls: 1,
    },
  ] as const
  for (const item of cases) {
    const mock = mockFetch(item.config)
    const logs: string[] = []
    const writer = new ZohoTaskWriter(credentials, mock.request, Date.now, undefined,
      code => logs.push(code))
    await assert.rejects(writer.apply(operation))
    assert.deepEqual(logs, item.expected)
    assert.equal(mock.calls.filter(call => call.url.includes('/Tasks')).length, item.taskCalls)
    assert.ok(logs.every(code => !code.includes(sensitive)))
  }
})

test('concurrent calls share one in-flight token refresh', async () => {
  const mock = mockFetch()
  const writer = new ZohoTaskWriter(credentials, mock.request)
  await Promise.all([writer.apply(operation), writer.apply(operation)])
  assert.equal(mock.calls.filter(call => call.url.includes('/oauth/v2/token')).length, 1)
})

test('non-India region fails closed before any request', () => {
  assert.throws(() => new ZohoTaskWriter({ ...credentials, confirmedRegion: 'us' }),
    /zoho_not_configured/)
})


test('Task due date uses business Asia/Kolkata across a UTC and attendee date boundary', () => {
  const fields = taskFields({ ...operation, booking: { ...operation.booking,
    startAt: '2026-10-04T23:30:00.000Z', endAt: '2026-10-05T00:00:00.000Z',
    attendeeTimeZone: 'America/Los_Angeles' } }, 'contact-1')
  assert.equal(fields.Due_Date, '2026-10-05')
  assert.match(fields.Subject, /Asia\/Kolkata/)
  assert.match(fields.Description, /Attendee time zone: America\/Los_Angeles/)
  assert.match(fields.Description, /Start \(UTC\): 2026-10-04T23:30:00.000Z/)
})


test('existing reminder or completed Task blocks a reschedule before PUT', async () => {
  for (const config of [{ taskReminder: true }, { taskStatus: 'Completed' }]) {
    const mock = mockFetch(config)
    const writer = new ZohoTaskWriter(credentials, mock.request)
    const update: ReservedOperation = { ...operation, action: 'update', crmTaskId: 'task-1',
      booking: { ...operation.booking, trigger: 'BOOKING_RESCHEDULED' } }
    await assert.rejects(writer.apply(update), /zoho_task_update_unsafe/)
    assert.equal(mock.calls.filter(item => item.init?.method === 'PUT').length, 0)
  }
})
