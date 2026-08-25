#!/usr/bin/env node
/**
 * Production health check for darkbirdfilms.com lead-capture paths.
 *
 * Exists because Cal.com decommissioned API v1 on 08-04-2026 and the booking
 * flow failed silently for ~4.5 months — the old code hid the outage behind a
 * fallback that reported every slot as free. Nothing alerted anyone.
 *
 * Exit code 0 = healthy, 1 = at least one check failed.
 * Run: node scripts/healthcheck.mjs
 */

const SITE = process.env.HEALTHCHECK_SITE || 'https://www.darkbirdfilms.com'
const CAL_API_KEY = process.env.CAL_API_KEY || ''
const failures = []
const notes = []

function nextWeekday() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

async function check(name, fn) {
  try {
    const detail = await fn()
    notes.push(`PASS  ${name}${detail ? ` — ${detail}` : ''}`)
  } catch (err) {
    failures.push(`FAIL  ${name} — ${err.message}`)
  }
}

// 1. Booking availability must return real slots, not an empty/failed response.
await check('booking availability', async () => {
  const date = nextWeekday()
  const r = await fetch(`${SITE}/api/booking/availability?date=${date}`)
  const body = await r.json()
  if (!r.ok) throw new Error(`HTTP ${r.status} ${JSON.stringify(body).slice(0, 120)}`)
  if (!Array.isArray(body.slots)) throw new Error(`no slots array: ${JSON.stringify(body).slice(0, 120)}`)
  if (body.slots.length === 0) throw new Error(`zero slots for ${date} — Cal.com may be down or fully booked`)
  return `${body.slots.length} slots for ${date}`
})

// 2. Contact route must be alive and validating (400 on empty body, no mail sent).
await check('contact form route', async () => {
  const r = await fetch(`${SITE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{}',
  })
  if (r.status !== 400) throw new Error(`expected HTTP 400, got ${r.status}`)
  return 'validating correctly'
})

// 3. Cal.com API version we depend on must still be live (this is what broke).
await check('cal.com api v2 reachable', async () => {
  const headers = { 'cal-api-version': '2024-08-13' }
  if (CAL_API_KEY) headers.Authorization = `Bearer ${CAL_API_KEY.trim()}`
  const r = await fetch('https://api.cal.com/v2/me', { headers })
  if (r.status === 410) throw new Error('API v2 DECOMMISSIONED — migrate again')
  if (!CAL_API_KEY) return 'reachable (no key configured, auth unverified)'
  if (r.status === 401 || r.status === 403) throw new Error('CAL_API_KEY rejected — key expired or revoked')
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return 'key valid'
})

const stamp = new Date().toISOString()
console.log(`darkbirdfilms.com health check — ${stamp}`)
for (const n of notes) console.log(n)
for (const f of failures) console.log(f)

if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED — lead capture may be broken.`)
  process.exit(1)
}
console.log('\nAll checks passed.')
