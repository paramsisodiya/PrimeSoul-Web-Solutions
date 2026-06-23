import { NextRequest, NextResponse } from 'next/server'
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

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true // Allow through if not configured

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    })
    const data = await res.json()
    return data.success === true
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, turnstileToken } = body

    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    if (!turnstileToken) {
      return NextResponse.json({ error: 'Please complete the captcha verification' }, { status: 400 })
    }

    const isHuman = await verifyTurnstile(turnstileToken)
    if (!isHuman) {
      return NextResponse.json({ error: 'Captcha verification failed' }, { status: 403 })
    }

    const db = getDb()
    await addDoc(collection(db, 'audit-leads'), {
      email: email.trim().toLowerCase(),
      source: 'lead-magnet-popup',
      createdAt: serverTimestamp(),
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[Lead Magnet API Error]', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
