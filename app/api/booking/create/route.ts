import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Room for Cal.com's slow spells (see availability route).
export const maxDuration = 30

const CAL_API_KEY = process.env.CAL_API_KEY || ''
const CAL_EVENT_TYPE_ID = 4773493 // 30 min Discovery Call
const CAL_API_VERSION = '2024-08-13'
const TIME_ZONE = 'Asia/Kolkata'

// Build a UTC instant from an IST date + "hh:mm AM/PM" slot, with the
// offset stated explicitly so the result never depends on server timezone.
function parseTimeToISO(dateStr: string, timeStr: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return ''
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return ''
  let hours = parseInt(match[1], 10)
  const minutes = parseInt(match[2], 10)
  if (hours < 1 || hours > 12 || minutes > 59) return ''
  const ampm = match[3].toUpperCase()
  if (ampm === 'PM' && hours !== 12) hours += 12
  if (ampm === 'AM' && hours === 12) hours = 0

  const hh = String(hours).padStart(2, '0')
  const mm = String(minutes).padStart(2, '0')
  const d = new Date(`${dateStr}T${hh}:${mm}:00.000+05:30`)
  if (isNaN(d.getTime())) return ''
  return d.toISOString()
}

// Cal.com requires E.164. Indian numbers are commonly typed as "09108955609"
// or "9108955609" — a naive "+91" prefix would keep the trunk 0 and produce an
// invalid number, so strip it before defaulting to the India country code.
function normalizePhone(raw: unknown): string {
  if (typeof raw !== 'string') return ''
  let phone = raw.replace(/[\s\-().]/g, '')
  if (!phone) return ''

  if (phone.startsWith('00')) phone = `+${phone.slice(2)}`
  if (phone.startsWith('+')) return phone

  phone = phone.replace(/^0+/, '')
  if (phone.startsWith('91') && phone.length > 10) return `+${phone}`
  return `+91${phone}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { date, time, name, email, phone: rawPhone, notes } = body

    const phone = normalizePhone(rawPhone)

    if (!date || !time || !name || !email) {
      return NextResponse.json(
        { error: 'Date, time, name, and email are required' },
        { status: 400 }
      )
    }

    const startTime = parseTimeToISO(date, time)
    if (!startTime) {
      return NextResponse.json({ error: 'Invalid time format' }, { status: 400 })
    }


    // Create booking via Cal.com API v2 (v1 was decommissioned 08-04-2026)
    const calHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'cal-api-version': CAL_API_VERSION,
    }
    if (CAL_API_KEY) calHeaders.Authorization = `Bearer ${CAL_API_KEY}`

    const calResponse = await fetch('https://api.cal.com/v2/bookings', {
      method: 'POST',
      headers: calHeaders,
      signal: AbortSignal.timeout(25000),
      body: JSON.stringify({
        start: startTime,
        eventTypeId: CAL_EVENT_TYPE_ID,
        attendee: {
          name,
          email,
          timeZone: TIME_ZONE,
          language: 'en',
          phoneNumber: phone || undefined,
        },
        bookingFieldsResponses: {
          attendeePhoneNumber: phone || '',
          ...(notes ? { notes } : {}),
        },
        metadata: {
          source: 'darkbirdfilms.com',
        },
      }),
    })

    const calData = await calResponse.json()

    if (!calResponse.ok) {
      console.error('Cal.com booking error:', JSON.stringify(calData, null, 2))

      // Map Cal.com error codes to user-friendly messages
      // v2 nests the message under `error`; keep the flat read as a fallback.
      const rawMsg: string = calData?.error?.message || calData?.message || ''
      let userMessage = 'Failed to create booking. Please try again or contact us directly.'
      const lower = rawMsg.toLowerCase()
      if (
        lower.includes('no_available_users_found') ||
        lower.includes('not available') ||
        lower.includes('already has booking') ||
        lower.includes('no longer available')
      ) {
        userMessage = 'This time slot is no longer available. Please pick a different time.'
      } else if (lower.includes('invalid_number') || lower.includes('attendeephonenumber')) {
        userMessage = 'Please enter a valid phone number with country code (e.g. +91...).'
      } else if (lower.includes('error_required_field')) {
        userMessage = 'Please fill in all required fields.'
      }

      return NextResponse.json(
        { error: userMessage },
        { status: 400 }
      )
    }

    // Send confirmation email via SMTP
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      // Email to the team
      await transporter.sendMail({
        from: '"Dark Bird Films" <management@darkbirdfilms.com>',
        to: 'management@darkbirdfilms.com',
        subject: `📞 New Discovery Call Booked: ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #E85A3F;">New Discovery Call Booked</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666;">Name</td><td style="padding: 8px 0; font-weight: bold;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0;">${phone || 'Not provided'}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Date</td><td style="padding: 8px 0; font-weight: bold;">${date}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Time</td><td style="padding: 8px 0; font-weight: bold;">${time} IST</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Notes</td><td style="padding: 8px 0;">${notes || 'None'}</td></tr>
            </table>
          </div>
        `,
      })

      // Confirmation to the client
      await transporter.sendMail({
        from: '"Dark Bird Films" <management@darkbirdfilms.com>',
        to: email,
        subject: 'Your Discovery Call with Dark Bird Films is Confirmed ✓',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #080808; color: #FAF6EF; border-radius: 12px;">
            <div style="text-align: center; padding: 30px 0;">
              <h1 style="color: #E85A3F; margin-bottom: 10px;">You're Booked! 🎬</h1>
              <p style="color: #999; font-size: 14px;">Your discovery call with Dark Bird Films has been confirmed.</p>
            </div>
            <div style="background: #1a1a1a; padding: 24px; border-radius: 12px; margin: 20px 0;">
              <p style="margin: 8px 0;"><strong style="color: #E85A3F;">📅 Date:</strong> ${date}</p>
              <p style="margin: 8px 0;"><strong style="color: #E85A3F;">🕐 Time:</strong> ${time} IST</p>
              <p style="margin: 8px 0;"><strong style="color: #E85A3F;">⏱ Duration:</strong> 30 minutes</p>
              <p style="margin: 8px 0;"><strong style="color: #E85A3F;">📍 Location:</strong> Video call (link in calendar invite)</p>
            </div>
            <p style="color: #666; font-size: 13px; text-align: center; margin-top: 30px;">
              You'll receive a calendar invite with the meeting link shortly.<br>
              If you need to reschedule, reply to this email.
            </p>
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
              <p style="color: #666; font-size: 12px;">Dark Bird Films · management@darkbirdfilms.com</p>
            </div>
          </div>
        `,
      })
    } catch (emailError) {
      console.error('Email notification failed:', emailError)
      // Don't fail the booking if email fails
    }

    return NextResponse.json({
      success: true,
      bookingId: calData?.data?.uid || calData?.data?.id || calData?.uid || calData?.id,
      message: 'Booking confirmed!',
    })
  } catch (error) {
    console.error('Booking creation failed:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
