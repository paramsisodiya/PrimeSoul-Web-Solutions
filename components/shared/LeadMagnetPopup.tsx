'use client'

import { useState, useEffect, useCallback } from 'react'
import TurnstileWidget from '@/components/shared/TurnstileWidget'

export default function LeadMagnetPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const [turnstileToken, setTurnstileToken] = useState('')

  useEffect(() => {
    // Show after 30 seconds if not dismissed before
    const dismissed = sessionStorage.getItem('leadMagnetDismissed')
    if (dismissed) return

    const timer = setTimeout(() => {
      setVisible(true)
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  const handleTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    if (!turnstileToken) {
      alert('Please complete the captcha verification')
      return
    }
    setStatus('sending')

    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, turnstileToken }),
      })

      if (!res.ok) throw new Error('Failed')
    } catch {
      // Continue even if API fails
    }

    setStatus('success')
    sessionStorage.setItem('leadMagnetDismissed', 'true')
    setTimeout(() => setVisible(false), 3000)
  }

  const handleClose = () => {
    setVisible(false)
    sessionStorage.setItem('leadMagnetDismissed', 'true')
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
        style={{ animation: 'fadeIn 0.3s ease' }}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
        style={{
          animation: 'scale-in 0.4s cubic-bezier(0.22,1,0.36,1)',
          boxShadow: '0 24px 80px -16px rgba(123,47,242,0.25)',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-ink-muted hover:text-ink hover:bg-surface-subtle transition-all"
          aria-label="Close popup"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Decorative gradient */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
          style={{ background: 'linear-gradient(135deg, rgba(123,47,242,0.1), rgba(232,121,249,0.1))' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7B2FF2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
        </div>

        {status === 'success' ? (
          <div>
            <h3 className="text-xl font-extrabold text-ink mb-2">Thank You! 🎉</h3>
            <p className="text-sm text-ink-secondary leading-relaxed">
              We&apos;ll send your free website audit within 24 hours. Check your inbox!
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-extrabold text-ink mb-2 tracking-[-0.02em]">
              Get a Free Website Audit
            </h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-6">
              We&apos;ll analyze your website&apos;s performance, SEO, design, and give you a detailed report with actionable improvements — completely free.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full border border-surface-border rounded-xl px-4 py-3 text-sm text-ink placeholder-ink-faint focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              />
              <TurnstileWidget onToken={handleTurnstileToken} onExpire={() => setTurnstileToken('')} />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-tap w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-px disabled:opacity-60"
                style={{
                  background: 'linear-gradient(135deg, #7B2FF2 0%, #A855F7 100%)',
                  boxShadow: '0 8px 24px -8px rgba(123,47,242,0.4)',
                }}
              >
                {status === 'sending' ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  'Get My Free Audit →'
                )}
              </button>
            </form>

            <p className="text-xs text-ink-faint text-center mt-3">
              No spam. We respect your privacy.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
