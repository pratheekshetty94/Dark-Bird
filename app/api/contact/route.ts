import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { name, email, phone, company, service, budget, message } = await request.json()

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }

    // Create SMTP transporter using Google Workspace or GoDaddy
    // For Google Workspace: smtp.gmail.com, port 587
    // For GoDaddy: smtpout.secureserver.net, port 465
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER, // e.g. management@darkbirdfilms.com
        pass: process.env.SMTP_PASS, // App Password (not regular password)
      },
    })

    // Send email to both addresses
    await transporter.sendMail({
      from: `"Dark Bird Website" <${process.env.SMTP_USER}>`,
      to: 'management@darkbirdfilms.com, pratheek@darkbirdfilms.com',
      replyTo: email,
      subject: `New Lead: ${name} — ${service}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1A1818; color: #FAF6EF; border-radius: 12px; overflow: hidden;">
          <div style="background: #E85A3F; padding: 24px 32px;">
            <h1 style="margin: 0; font-size: 20px; color: #FAF6EF; font-weight: 600;">
              New Project Inquiry
            </h1>
          </div>

          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(250,246,239,0.1); color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 120px; vertical-align: top;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(250,246,239,0.1); font-size: 15px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(250,246,239,0.1); color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(250,246,239,0.1); font-size: 15px;">
                  <a href="mailto:${email}" style="color: #E85A3F; text-decoration: none;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(250,246,239,0.1); color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Phone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(250,246,239,0.1); font-size: 15px;">
                  <a href="tel:${phone}" style="color: #E85A3F; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              ` : ''}
              ${company ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(250,246,239,0.1); color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Company</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(250,246,239,0.1); font-size: 15px;">${company}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(250,246,239,0.1); color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Service</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(250,246,239,0.1); font-size: 15px;">
                  <span style="background: rgba(232,90,63,0.15); color: #E85A3F; padding: 4px 12px; border-radius: 20px; font-size: 13px;">${service}</span>
                </td>
              </tr>
              ${budget ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(250,246,239,0.1); color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Budget</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(250,246,239,0.1); font-size: 15px;">${budget}</td>
              </tr>
              ` : ''}
            </table>

            <div style="margin-top: 24px; padding: 20px; background: rgba(250,246,239,0.05); border-radius: 8px; border-left: 3px solid #E85A3F;">
              <p style="margin: 0 0 8px 0; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
              <p style="margin: 0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(250,246,239,0.1); text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background: #E85A3F; color: #FAF6EF; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
                Reply to ${name}
              </a>
            </div>
          </div>

          <div style="padding: 16px 32px; background: rgba(0,0,0,0.3); text-align: center;">
            <p style="margin: 0; font-size: 11px; color: #666;">
              Sent from darkbirdfilms.com contact form
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or email us directly.' },
      { status: 500 }
    )
  }
}
