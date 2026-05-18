'use client'

import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 group"
      style={{
        background: 'linear-gradient(135deg, #7B2FF2 0%, #A855F7 100%)',
        boxShadow: show ? '0 8px 24px -8px rgba(123,47,242,0.5)' : 'none',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <svg
        width="18" height="18" viewBox="0 0 18 18" fill="none"
        className="text-white transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        <path d="M9 14V4M4 8l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}
