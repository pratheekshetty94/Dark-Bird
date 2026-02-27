import { NextRequest, NextResponse } from 'next/server'

const CAL_API_KEY = process.env.CAL_API_KEY || ''
const CAL_USERNAME = 'team-darkbirdfilms'
const CAL_EVENT_SLUG = '30min'

// All bookable time slots (IST) — 30 min intervals, Mon–Fri 10am–6pm
const ALL_SLOTS = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM',
]

function parseSlotToISO(dateStr: string, timeStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!match) return ''
  let hours = parseInt(match[1])
  const minutes = parseInt(match[2])
  const ampm = match[3].toUpperCase()
  if (ampm === 'PM' && hours !== 12) hours += 12
  if (ampm === 'AM' && hours === 12) hours = 0

  // Convert IST to UTC (IST = UTC+5:30)
  const istDate = new Date(year, month - 1, day, hours, minutes, 0)
  return istDate.toISOString()
}

function formatSlotFromDate(d: Date): string {
  // Convert to IST
  const istOffset = 5.5 * 60 * 60 * 1000
  const istDate = new Date(d.getTime() + istOffset)
  let hours = istDate.getUTCHours()
  const minutes = istDate.getUTCMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  if (hours > 12) hours -= 12
  if (hours === 0) hours = 12
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date') // YYYY-MM-DD

  if (!date) {
    return NextResponse.json({ error: 'Date parameter required' }, { status: 400 })
  }

  try {
    // Get available slots from Cal.com
    const startTime = `${date}T00:00:00.000Z`
    const endTime = `${date}T23:59:59.000Z`

    const response = await fetch(
      `https://api.cal.com/v1/slots?apiKey=${CAL_API_KEY}&startTime=${startTime}&endTime=${endTime}&eventTypeSlug=${CAL_EVENT_SLUG}&usernameList[]=${CAL_USERNAME}`,
      { next: { revalidate: 60 } }
    )

    if (!response.ok) {
      // If Cal.com API fails, return all slots as available (fallback)
      return NextResponse.json({ busySlots: [], allSlots: ALL_SLOTS })
    }

    const data = await response.json()

    // Cal.com returns available slots — anything NOT in this list is busy
    const availableSlotTimes: string[] = []

    if (data.slots && data.slots[date]) {
      for (const slot of data.slots[date]) {
        const slotDate = new Date(slot.time)
        const formatted = formatSlotFromDate(slotDate)
        availableSlotTimes.push(formatted)
      }
    }

    // Busy slots = all slots minus available slots
    const busySlots = ALL_SLOTS.filter(s => !availableSlotTimes.includes(s))

    return NextResponse.json({ busySlots, allSlots: ALL_SLOTS })
  } catch (error) {
    console.error('Availability check failed:', error)
    return NextResponse.json({ busySlots: [], allSlots: ALL_SLOTS })
  }
}
