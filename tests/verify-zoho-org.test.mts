import assert from 'node:assert/strict'
import test from 'node:test'
import { verifyZohoOrg } from '../scripts/verify-zoho-org.mjs'

const env = {
  ZOHO_DC: 'in', ZOHO_CLIENT_ID: 'synthetic-id',
  ZOHO_CLIENT_SECRET: 'synthetic-secret', ZOHO_REFRESH_TOKEN: 'synthetic-refresh',
}
const expectedOrg = {
  domain_name: 'org60090260228', zgid: '60090260228',
  id: '1457002000000020813', type: 'production', country_code: 'IN',
}

test('org preflight performs only token refresh and read-only org request', async () => {
  const calls: { url: string; method: string }[] = []
  const request = async (url: string | URL, options: RequestInit = {}) => {
    calls.push({ url: String(url), method: options.method ?? 'GET' })
    if (calls.length === 1) return new Response(JSON.stringify({
      access_token: 'synthetic-access', api_domain: 'https://www.zohoapis.in',
    }), { status: 200 })
    return new Response(JSON.stringify({ org: [expectedOrg] }), { status: 200 })
  }
  assert.equal(await verifyZohoOrg(env, request as typeof fetch), true)
  assert.deepEqual(calls, [
    { url: 'https://accounts.zoho.in/oauth/v2/token', method: 'POST' },
    { url: 'https://www.zohoapis.in/crm/v8/org', method: 'GET' },
  ])
})

test('org preflight fails closed for mismatched org and missing configuration', async () => {
  let calls = 0
  const request = async () => {
    calls++
    return new Response(JSON.stringify(calls === 1
      ? { access_token: 'synthetic-access', api_domain: 'https://www.zohoapis.in' }
      : { org: [{ ...expectedOrg, zgid: 'other-org' }] }), { status: 200 })
  }
  assert.equal(await verifyZohoOrg(env, request as typeof fetch), false)
  assert.equal(calls, 2)
  assert.equal(await verifyZohoOrg({ ...env, ZOHO_DC: 'com' }, request as typeof fetch), false)
  assert.equal(calls, 2)
})
