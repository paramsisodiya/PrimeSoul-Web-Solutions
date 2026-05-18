import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/contact
 *
 * Ready-to-wire contact form endpoint.
 * When backend is connected:
 * 1. Uncomment MongoDB section → saves lead to DB
 * 2. Uncomment Nodemailer section → sends email notification
 *
 * Current behavior: validates payload and returns 200 (for frontend testing).
 */

interface ContactPayload {
  name: string
  email: string
  phone?: string
  service: string
  budget?: string
  message: string
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json()

    // ── Validation ──────────────────────────────────────────────────────────
    const { name, email, service, message } = body

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }
    if (!service?.trim()) {
      return NextResponse.json({ error: 'Service selection is required' }, { status: 400 })
    }
    if (!message?.trim() || message.trim().length < 20) {
      return NextResponse.json({ error: 'Message must be at least 20 characters' }, { status: 400 })
    }

    // ── MongoDB (uncomment when DB is connected) ─────────────────────────────
    /*
    import { connectDB } from '@/lib/db'
    import Lead from '@/models/Lead'

    await connectDB()
    await Lead.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      service: service.trim(),
      budget: body.budget || null,
      message: message.trim(),
      source: 'website_contact_form',
      createdAt: new Date(),
    })
    */

    // ── Nodemailer (uncomment when SMTP is configured) ───────────────────────
    /*
    import nodemailer from 'nodemailer'

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"PrimeSoul Website" <${process.env.SMTP_USER}>`,
      to: 'paramsisodiya061@gmail.com',
      subject: `New Lead: ${name} — ${service}`,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Budget:</strong> ${body.budget || 'Not specified'}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    })
    */

    return NextResponse.json(
      { success: true, message: 'Your message has been received. We\'ll get back to you within 24 hours.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Contact API Error]', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or contact us directly on WhatsApp.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: 'PrimeSoul Contact API — POST only' }, { status: 405 })
}
