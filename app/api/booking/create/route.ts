import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const CAL_API_KEY = process.env.CAL_API_KEY || ''
const CAL_EVENT_TYPE_ID = 4773493 // 30 min meeting

function parseTimeToISO(dateStr: string, timeStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!match) return ''
  let hours = parseInt(match[1])
  const minutes = parseInt(match[2])
  const ampm = match[3].toUpperCase()
  if (ampm === 'PM' && hours !== 12) hours += 12
  if (ampm === 'AM' && hours === 12) hours = 0

  // IST offset: +5:30 — convert to UTC
  const istDate = new Date(Date.UTC(year, month - 1, day, hours - 5, minutes - 30, 0))
  return istDate.toISOString()
}

function formatEndTime(startISO: string): string {
  const start = new Date(startISO)
  start.setMinutes(start.getMinutes() + 30)
  return start.toISOString()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { date, time, name, email, phone, notes } = body

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

    const endTime = formatEndTime(startTime)

    // Create booking via Cal.com API
    const calResponse = await fetch(`https://api.cal.com/v1/bookings?apiKey=${CAL_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventTypeId: CAL_EVENT_TYPE_ID,
        start: startTime,
        end: endTime,
        responses: {
          name: name,
          email: email,
          phone: phone || undefined,
          notes: notes || undefined,
        },
        timeZone: 'Asia/Kolkata',
        language: 'en',
        metadata: {
          source: 'darkbirdfilms.com',
        },
      }),
    })

    const calData = await calResponse.json()

    if (!calResponse.ok) {
      console.error('Cal.com booking error:', calData)
      return NextResponse.json(
        { error: calData.message || 'Failed to create booking. This slot might no longer be available.' },
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
      bookingId: calData.id || calData.uid,
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
