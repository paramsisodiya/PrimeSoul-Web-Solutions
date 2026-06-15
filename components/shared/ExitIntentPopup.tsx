'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 5 && !dismissed && !show) {
      // Check if already shown this session
      if (sessionStorage.getItem('exit_popup_shown')) return
      setShow(true)
      sessionStorage.setItem('exit_popup_shown', 'true')
    }
  }, [dismissed, show])

  useEffect(() => {
    // Don't show on admin pages or mobile
    if (typeof window === 'undefined') return
    if (window.location.pathname.startsWith('/admin')) return
    if (window.innerWidth < 768) return
    if (sessionStorage.getItem('exit_popup_shown')) return

    // Delay attaching listener so it doesn't fire on page load
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 5000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseLeave])

  const handleClose = () => {
    setShow(false)
    setDismissed(true)
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={handleClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" style={{ animation: 'fadeIn 0.3s ease' }} />
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{
          animation: 'scale-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          boxShadow: '0 24px 80px -16px rgba(123,47,242,0.35)',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all"
        >
          ✕
        </button>

        {/* Top gradient section */}
        <div
          className="relative px-8 pt-10 pb-8 text-center"
          style={{ background: 'linear-gradient(135deg, #0E0E2C 0%, #1a1a4a 100%)' }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at 50% 0%, rgba(123,47,242,0.4) 0%, transparent 60%)',
            }}
          />
          <div className="relative">
            <div className="text-4xl mb-4">⚡</div>
            <h3
              className="text-2xl font-bold text-white mb-2"
            >
              Wait — Don&apos;t Leave Yet!
            </h3>
            <p className="text-white/50 text-sm">
              Get a <span className="text-[#A855F7] font-semibold">free website audit</span> and discover what&apos;s holding your site back.
            </p>
          </div>
        </div>

        {/* Bottom white section */}
        <div className="bg-white px-8 py-8 text-center">
          <div className="space-y-3 mb-6">
            {['Performance & speed analysis', 'SEO health check', 'Mobile responsiveness review'].map(item => (
              <div key={item} className="flex items-center gap-3 text-left">
                <div className="w-5 h-5 rounded-full bg-[#7B2FF2]/10 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="#7B2FF2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm text-[#4A4A6A]">{item}</span>
              </div>
            ))}
          </div>
          <Link
            href="/contact"
            onClick={handleClose}
            className="block w-full py-3.5 rounded-xl text-sm font-semibold text-white text-center transition-all hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #7B2FF2 0%, #A855F7 100%)',
              boxShadow: '0 8px 24px -8px rgba(123,47,242,0.4)',
            }}
          >
            Get My Free Audit →
          </Link>
          <button onClick={handleClose} className="mt-3 text-xs text-[#AEAEC8] hover:text-[#4A4A6A] transition-colors">
            No thanks, I&apos;m good
          </button>
        </div>
      </div>
    </div>
  )
}
