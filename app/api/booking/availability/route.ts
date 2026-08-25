import { NextRequest, NextResponse } from 'next/server'

const CAL_API_KEY = process.env.CAL_API_KEY || ''
const CAL_EVENT_TYPE_ID = 4773493 // 30 min Discovery Call
const CAL_API_VERSION = '2024-09-04'
const TIME_ZONE = 'Asia/Kolkata'

// Cal.com returns slots already in IST (we pass timeZone), so read the
// wall-clock time straight off the string — no Date/UTC juggling.
function formatSlot(iso: string): string {
  const m = iso.match(/T(\d{2}):(\d{2})/)
  if (!m) return ''
  let hours = parseInt(m[1], 10)
  const minutes = m[2]
  const ampm = hours >= 12 ? 'PM' : 'AM'
  if (hours > 12) hours -= 12
  if (hours === 0) hours = 12
  return `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date') // YYYY-MM-DD

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: 'Valid date parameter (YYYY-MM-DD) required', slots: [] },
      { status: 400 }
    )
  }

  try {
    const url =
      `https://api.cal.com/v2/slots?eventTypeId=${CAL_EVENT_TYPE_ID}` +
      `&start=${date}&end=${date}&timeZone=${encodeURIComponent(TIME_ZONE)}`

    const headers: Record<string, string> = { 'cal-api-version': CAL_API_VERSION }
    if (CAL_API_KEY) headers.Authorization = `Bearer ${CAL_API_KEY}`

    const response = await fetch(url, { headers, next: { revalidate: 60 } })

    if (!response.ok) {
      // Never invent availability — a wrong "free" slot costs a real lead.
      const body = await response.text()
      console.error('Cal.com slots error:', response.status, body.slice(0, 300))
      return NextResponse.json({ error: 'unavailable', slots: [] }, { status: 502 })
    }

    const data = await response.json()
    const raw = data?.data?.[date]

    if (!Array.isArray(raw)) {
      console.error('Cal.com slots: unexpected shape', JSON.stringify(data).slice(0, 300))
      return NextResponse.json({ error: 'unavailable', slots: [] }, { status: 502 })
    }

    const slots = raw
      .map((s: unknown) => formatSlot(typeof s === 'string' ? s : (s as { start: string })?.start ?? ''))
      .filter(Boolean)

    return NextResponse.json({ slots })
  } catch (error) {
    console.error('Availability check failed:', error)
    return NextResponse.json({ error: 'unavailable', slots: [] }, { status: 502 })
  }
}
