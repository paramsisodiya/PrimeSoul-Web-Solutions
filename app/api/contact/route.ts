import { NextRequest, NextResponse } from 'next/server'
import { sendWebhookNotification } from '@/lib/webhooks'
import { initializeApp as initializeClientApp, getApps as getClientApps } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'

function getDb() {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  }
  const app = getClientApps().length === 0 ? initializeClientApp(config) : getClientApps()[0]
  return getFirestore(app)
}

interface ContactPayload {
  name: string
  email: string
  phone?: string
  service: string
  budget?: string
  timeline?: string
  message: string
  turnstileToken: string
  referralCode?: string
  tag?: string
}

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.warn('[Contact API] TURNSTILE_SECRET_KEY not set, skipping verification')
    return true // Allow through if not configured (dev mode)
  }

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    })
    const data = await res.json()
    return data.success === true
  } catch (err) {
    console.error('[Contact API] Turnstile verification failed:', err)
    return false
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json()

    // ── Validation ──────────────────────────────────────────────────────────
    const { name, email, service, message, turnstileToken, tag } = body

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    // Callback requests only need name + phone
    if (tag !== 'callback_request') {
      if (!service?.trim()) {
        return NextResponse.json({ error: 'Service selection is required' }, { status: 400 })
      }
      if (!message?.trim() || message.trim().length < 20) {
        return NextResponse.json({ error: 'Message must be at least 20 characters' }, { status: 400 })
      }
    }

    // ── Turnstile Verification ──────────────────────────────────────────────
    if (!turnstileToken) {
      return NextResponse.json({ error: 'Please complete the captcha verification' }, { status: 400 })
    }

    const isHuman = await verifyTurnstile(turnstileToken)
    if (!isHuman) {
      return NextResponse.json({ error: 'Captcha verification failed. Please try again.' }, { status: 403 })
    }

    // ── Save to Firestore ───────────────────────────────────────────────────
    const db = getDb()
    await addDoc(collection(db, 'leads'), {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: body.phone?.trim() || '',
      service: tag === 'callback_request' ? 'Callback Request' : service.trim(),
      budget: body.budget || '',
      timeline: body.timeline || '',
      message: tag === 'callback_request' ? 'Callback request' : message.trim(),
      referralCode: body.referralCode?.trim() || '',
      tag: tag || '',
      status: 'new',
      notes: '',
      createdAt: serverTimestamp(),
    })

    // ── Send EmailJS notification ───────────────────────────────────────────
    try {
      const emailjsPayload = {
        service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        template_params: {
          name: name.trim(),
          email: email.trim(),
          phone: body.phone || 'Not provided',
          service: tag === 'callback_request' ? 'Callback Request' : service,
          budget: body.budget || 'Not specified',
          timeline: body.timeline || 'Not specified',
          message: tag === 'callback_request' ? 'Callback request' : message,
        },
      }

      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailjsPayload),
      })
    } catch {
      // Email failure should not block submission
    }

    // ── Send auto-reply ─────────────────────────────────────────────────────
    try {
      const autoReplyTemplateId = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID
      if (autoReplyTemplateId) {
        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            template_id: autoReplyTemplateId,
            user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
            template_params: {
              to_name: name.trim(),
              to_email: email.trim(),
              service: tag === 'callback_request' ? 'Callback Request' : service,
            },
          }),
        })
      }
    } catch {
      // Auto-reply failure should not block main submission
    }

    // ── Send webhook notifications ──────────────────────────────────────────
    sendWebhookNotification({
      name: name.trim(),
      email: email.trim(),
      phone: body.phone,
      service: tag === 'callback_request' ? 'Callback Request' : service,
      message: tag === 'callback_request' ? 'Callback request' : message,
    }).catch(() => { })

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
