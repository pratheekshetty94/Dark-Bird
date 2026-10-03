import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import test from 'node:test'
import { POST } from '../app/api/integrations/cal-booking/route.ts'

const secret = 'synthetic-cal-signing-secret-over-thirty-two-chars'
const environmentNames = [
  'BOOKING_CRM_SYNC_ENABLED', 'BOOKING_CRM_VALIDATE_ONLY',
  'BOOKING_CRM_TEST_SYNC_ENABLED', 'BOOKING_CRM_TEST_START_UTC',
  'BOOKING_CRM_TEST_END_UTC', 'CAL_WEBHOOK_SECRET',
  'DATABASE_URL', 'ZOHO_DC', 'ZOHO_CLIENT_ID', 'ZOHO_CLIENT_SECRET', 'ZOHO_REFRESH_TOKEN',
] as const

function request(triggerEvent: string, signed = true, payloadOverride: Record<string, unknown> = {},
  version = '2021-10-20') {
  const body = JSON.stringify({
    triggerEvent, createdAt: new Date().toISOString(),
    payload: {
      eventTypeId: 4773493, uid: 'synthetic-booking',
      iCalUID: 'synthetic-series', iCalSequence: 0,
      attendees: [{ email: 'synthetic@example.invalid' }],
      startTime: '2026-10-05T12:00:00.000Z', endTime: '2026-10-05T12:30:00.000Z',
      ...payloadOverride,
    },
  })
  return new Request('https://example.invalid/api/integrations/cal-booking', {
    method: 'POST', body,
    headers: {
      'x-cal-webhook-version': version,
      'x-cal-signature-256': createHmac('sha256', signed ? secret : 'wrong-secret')
        .update(body).digest('hex'),
    },
  })
}

test('validation-only route authenticates first and never calls DB, Contacts or Events', async () => {
  const saved = Object.fromEntries(environmentNames.map(name => [name, process.env[name]]))
  const originalFetch = globalThis.fetch
  const originalInfo = console.info
  const calls: { url: string; method: string }[] = []
  const logs: string[][] = []
  try {
    process.env.DATABASE_URL = 'must-not-be-used'
    delete process.env.BOOKING_CRM_SYNC_ENABLED
    delete process.env.BOOKING_CRM_VALIDATE_ONLY
    delete process.env.BOOKING_CRM_TEST_SYNC_ENABLED
    delete process.env.BOOKING_CRM_TEST_START_UTC
    delete process.env.BOOKING_CRM_TEST_END_UTC
    process.env.CAL_WEBHOOK_SECRET = secret
    process.env.ZOHO_DC = 'in'
    process.env.ZOHO_CLIENT_ID = 'synthetic-id'
    process.env.ZOHO_CLIENT_SECRET = 'synthetic-secret'
    process.env.ZOHO_REFRESH_TOKEN = 'synthetic-refresh'
    console.info = (...args: unknown[]) => { logs.push(args.map(String)) }
    globalThis.fetch = (async (input: string | URL | Request, init: RequestInit = {}) => {
      const url = String(input)
      const method = init.method ?? 'GET'
      calls.push({ url, method })
      if (url === 'https://accounts.zoho.in/oauth/v2/token' && method === 'POST') {
        return new Response(JSON.stringify({ access_token: 'synthetic-access',
          expires_in: 3600, api_domain: 'https://www.zohoapis.in' }), { status: 200 })
      }
      if (url === 'https://www.zohoapis.in/crm/v8/org' && method === 'GET') {
        return new Response(JSON.stringify({ org: [{ domain_name: 'org60090260228',
          zgid: '60090260228', id: '1457002000000020813', type: 'production',
          country_code: 'IN' }] }), { status: 200 })
      }
      throw new Error('unexpected_provider_call')
    }) as typeof fetch

    assert.equal((await POST(request('BOOKING_CREATED'))).status, 503)
    process.env.BOOKING_CRM_VALIDATE_ONLY = 'true'
    delete process.env.CAL_WEBHOOK_SECRET
    assert.equal((await POST(request('BOOKING_CREATED'))).status, 503)
    process.env.CAL_WEBHOOK_SECRET = secret
    const mismatch = await POST(request('BOOKING_CREATED', false))
    assert.equal(mismatch.status, 400)
    assert.deepEqual(await mismatch.json(), { error: 'digest_mismatch' })
    for (const [header, failure] of [
      [null, 'header_absent'],
      ['no-secret-provided', 'no_secret_marker'],
      ['sha256=bad', 'malformed_digest'],
    ] as const) {
      const malformed = request('UNSPECIFIED_TEST_PING')
      if (header === null) malformed.headers.delete('x-cal-signature-256')
      else malformed.headers.set('x-cal-signature-256', header)
      const response = await POST(malformed)
      assert.equal(response.status, 400)
      assert.deepEqual(await response.json(), { error: failure })
    }
    assert.equal((await POST(request('UNSPECIFIED_TEST_PING', true, {}, 'unsupported'))).status, 400)
    assert.equal((await POST(request('BOOKING_CREATED', true, { eventTypeId: 1 }))).status, 400)
    const oversizedBody = 'x'.repeat(128 * 1024 + 1)
    const oversized = new Request('https://example.invalid/api/integrations/cal-booking', {
      method: 'POST', body: oversizedBody,
      headers: {
        'x-cal-webhook-version': '2021-10-20',
        'x-cal-signature-256': createHmac('sha256', secret).update(oversizedBody).digest('hex'),
      },
    })
    assert.equal((await POST(oversized)).status, 413)
    assert.equal(calls.length, 0, 'invalid signature/payload cannot reach provider')

    const ping = await POST(request('UNSPECIFIED_TEST_PING'))
    assert.equal(ping.status, 202)
    assert.deepEqual(await ping.json(), { outcome: 'signed_transport_only' })
    const booking = await POST(request('BOOKING_CREATED'))
    assert.equal(booking.status, 200)
    assert.deepEqual(await booking.json(), { outcome: 'booking_payload_valid' })
    assert.equal((await POST(request('UNSPECIFIED_TEST_PING'))).status, 202)
    assert.deepEqual(calls, [
      { url: 'https://accounts.zoho.in/oauth/v2/token', method: 'POST' },
      { url: 'https://www.zohoapis.in/crm/v8/org', method: 'GET' },
    ], 'repeated signed validation reuses the verified process-local token')

    process.env.BOOKING_CRM_SYNC_ENABLED = 'true'
    assert.equal((await POST(request('BOOKING_CREATED'))).status, 503)
    delete process.env.BOOKING_CRM_SYNC_ENABLED
    process.env.BOOKING_CRM_TEST_SYNC_ENABLED = 'true'
    assert.equal((await POST(request('BOOKING_CREATED'))).status, 503,
      'validation and test modes cannot run together')
    delete process.env.BOOKING_CRM_VALIDATE_ONLY
    assert.equal((await POST(request('BOOKING_CREATED'))).status, 503,
      'test mode requires an exact UTC slot')
    process.env.BOOKING_CRM_TEST_START_UTC = '2026-10-05T12:00:00.000Z'
    process.env.BOOKING_CRM_TEST_END_UTC = '2026-10-05T12:30:00.000Z'
    process.env.DATABASE_URL = 'postgresql://synthetic:synthetic@127.0.0.1:5432/test'
    const skipped = await POST(request('BOOKING_CREATED'))
    assert.equal(skipped.status, 202)
    assert.deepEqual(await skipped.json(), { outcome: 'test_scope_ignored' })
    assert.equal(calls.length, 2, 'conflicting modes fail before provider work')
    assert.ok(logs.every(args => ['booking_crm_validation', 'booking_crm_webhook'].includes(args[0]) &&
      ['digest_mismatch', 'header_absent', 'no_secret_marker', 'malformed_digest',
        'unsupported_version', 'wrong_event_type', 'invalid_size',
        'signed_transport_only', 'booking_payload_valid', 'test_scope_ignored'].includes(args[1])))
  } finally {
    globalThis.fetch = originalFetch
    console.info = originalInfo
    for (const name of environmentNames) {
      if (saved[name] === undefined) delete process.env[name]
      else process.env[name] = saved[name]
    }
  }
})
