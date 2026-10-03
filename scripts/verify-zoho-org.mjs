import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const accountsHost = 'https://accounts.zoho.in'
const apiHost = 'https://www.zohoapis.in'

/** Read-only build-time preflight. Never returns a token or provider response. */
export async function verifyZohoOrg(env, request = fetch) {
  if (env.ZOHO_DC !== 'in' || !env.ZOHO_CLIENT_ID || !env.ZOHO_CLIENT_SECRET ||
      !env.ZOHO_REFRESH_TOKEN) return false

  try {
    const tokenResponse = await request(`${accountsHost}/oauth/v2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: env.ZOHO_CLIENT_ID,
        client_secret: env.ZOHO_CLIENT_SECRET,
        refresh_token: env.ZOHO_REFRESH_TOKEN,
      }),
      signal: AbortSignal.timeout(5000),
      cache: 'no-store',
      redirect: 'error',
    })
    if (!tokenResponse.ok) return false
    const token = await tokenResponse.json()
    if (!token || typeof token.access_token !== 'string' || !token.access_token ||
        token.api_domain !== apiHost) return false

    const orgResponse = await request(`${apiHost}/crm/v8/org`, {
      method: 'GET',
      headers: { Authorization: `Zoho-oauthtoken ${token.access_token}` },
      signal: AbortSignal.timeout(5000),
      cache: 'no-store',
      redirect: 'error',
    })
    if (!orgResponse.ok) return false
    const result = await orgResponse.json()
    if (!result || !Array.isArray(result.org) || result.org.length !== 1) return false
    const org = result.org[0]
    return org?.domain_name === 'org60090260228' &&
      org.zgid === '60090260228' &&
      org.id === '1457002000000020813' &&
      org.type === 'production' && org.country_code === 'IN'
  } catch {
    return false
  }
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  if (process.env.ZOHO_ORG_PREFLIGHT !== '1') {
    console.error('zoho_org_preflight_not_opted_in')
    process.exitCode = 2
  } else {
    const valid = await verifyZohoOrg(process.env)
    console.log(valid ? 'zoho_org_preflight_ok' : 'zoho_org_preflight_failed')
    if (!valid) process.exitCode = 1
  }
}
