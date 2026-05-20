'use client'

import { useState, useEffect, useCallback } from 'react'

const PROOF_ITEMS = [
  { emoji: '🔥', text: 'Param just completed a project for A&S Solar Solutions', time: '2 hours ago' },
  { emoji: '⚡', text: 'New client onboarded this week — Website Design', time: '5 hours ago' },
  { emoji: '🎉', text: 'SVNS School website reached 300+ students served', time: '1 day ago' },
  { emoji: '🚀', text: '3 new projects launched this quarter', time: '3 days ago' },
  { emoji: '💼', text: 'PrimeSoul reached 4+ businesses served', time: '1 week ago' },
  { emoji: '✨', text: 'New testimonial: "Professional, reliable, and helpful"', time: 'Recently' },
  { emoji: '📈', text: 'Client revenue generated crossed ₹5L+', time: '2 weeks ago' },
]

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dismissed, setDismissed] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const hideToast = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => {
      setVisible(false)
      setIsExiting(false)
    }, 400)
  }, [])

  useEffect(() => {
    // Don't show on admin pages
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) return
    if (dismissed) return

    // Show first toast after 8 seconds
    const initialDelay = setTimeout(() => {
      setVisible(true)

      // Auto-hide after 5 seconds
      const autoHide = setTimeout(() => {
        hideToast()
      }, 5000)

      return () => clearTimeout(autoHide)
    }, 8000)

    return () => clearTimeout(initialDelay)
  }, [dismissed, hideToast])

  // Show subsequent toasts every 25 seconds
  useEffect(() => {
    if (dismissed) return

    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) return

      setCurrentIndex(prev => (prev + 1) % PROOF_ITEMS.length)
      setVisible(true)
      setIsExiting(false)

      // Auto-hide after 5 seconds
      setTimeout(() => {
        hideToast()
      }, 5000)
    }, 25000)

    return () => clearInterval(interval)
  }, [dismissed, hideToast])

  if (!visible || dismissed) return null

  const item = PROOF_ITEMS[currentIndex]

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 max-w-sm ${
        isExiting ? 'animate-toast-exit' : 'animate-toast-enter'
      }`}
      style={{
        pointerEvents: 'auto',
      }}
    >
      <div
        className="relative flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl border"
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: 'rgba(123,47,242,0.12)',
          boxShadow: '0 16px 48px -12px rgba(123,47,242,0.18), 0 4px 12px rgba(0,0,0,0.06)',
        }}
      >
        {/* Close button */}
        <button
          onClick={() => {
            hideToast()
            setDismissed(true)
          }}
          className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-[#AEAEC8] hover:text-[#4A4A6A] transition-colors rounded-full hover:bg-gray-100"
          aria-label="Dismiss"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Emoji */}
        <span className="text-xl flex-shrink-0 mt-0.5">{item.emoji}</span>

        {/* Content */}
        <div className="flex-1 pr-4">
          <p className="text-sm font-medium text-[#0E0E2C] leading-snug">{item.text}</p>
          <p className="text-xs text-[#AEAEC8] mt-1">{item.time}</p>
        </div>

        {/* Animated progress bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl overflow-hidden"
        >
          <div
            className="h-full rounded-b-2xl animate-toast-progress"
            style={{
              background: 'linear-gradient(90deg, #7B2FF2, #E879F9)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
