'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  message?: string
  content?: string
  rating?: number
  photo?: string
  visible?: boolean
  createdAt?: { toMillis?: () => number }
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Touch/swipe support
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const snap = await getDocs(
          query(collection(db, 'testimonials'), where('visible', '==', true))
        )
        const items = snap.docs
          .map(d => ({ id: d.id, ...d.data() } as Testimonial))
          .sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0))
        setTestimonials(items)
      } catch (err) {
        console.error('Error fetching testimonials:', err)
        setTestimonials([])
      }
    }
    fetchTestimonials()
  }, [])

  useEffect(() => {
    if (testimonials.length === 0 || isPaused) return
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [testimonials.length, isPaused])

  const goTo = useCallback((i: number) => {
    setActive(i)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 8000)
  }, [])

  const goNext = useCallback(() => {
    if (testimonials.length === 0) return
    goTo((active + 1) % testimonials.length)
  }, [active, testimonials.length, goTo])

  const goPrev = useCallback(() => {
    if (testimonials.length === 0) return
    goTo((active - 1 + testimonials.length) % testimonials.length)
  }, [active, testimonials.length, goTo])

  // Pause on focus for accessibility
  const handleFocus = useCallback(() => setIsPaused(true), [])
  const handleBlur = useCallback(() => setIsPaused(false), [])

  // Touch handlers for mobile swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext()
      else goPrev()
    }
  }, [goNext, goPrev])

  return (
    <section
      className="py-14 sm:py-20 relative overflow-hidden noise-overlay"
      style={{ background: 'linear-gradient(135deg, #0E0E2C 0%, #1a1a4e 50%, #0E0E2C 100%)' }}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {/* Mesh gradient */}
      <div className="absolute inset-0 opacity-20 z-0" style={{
        backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(123,47,242,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(232,121,249,0.2) 0%, transparent 40%)'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
        <AnimatedSection className="mb-8 sm:mb-10 text-center">
          <SectionLabel dark>Client Stories</SectionLabel>
          <h2
            className="text-[1.4rem] sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-[-0.03em] mb-3 text-white"
          >
            See What Our{' '}
            <span className="font-display italic" style={{
              background: 'linear-gradient(135deg, #A855F7 0%, #E879F9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Clients Say
            </span>
          </h2>
        </AnimatedSection>

        {/* Main testimonial with swipe support */}
        <AnimatedSection>
          <div
            ref={containerRef}
            className="max-w-3xl mx-auto text-center relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Quote icon */}
            <svg width="28" height="22" viewBox="0 0 48 36" fill="none" className="mx-auto mb-3 sm:mb-4">
              <path d="M0 36V20.727C0 7.527 8 0 24 0v6.545C16 6.545 12 10.455 12 18.327V21.6h12V36H0zm24 0V20.727C24 7.527 32 0 48 0v6.545c-8 0-12 3.91-12 11.782V21.6h12V36H24z" fill="rgba(123,47,242,0.2)" />
            </svg>

            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className="transition-all duration-500 absolute inset-0"
                style={{
                  opacity: active === i ? 1 : 0,
                  transform: active === i ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.98)',
                  pointerEvents: active === i ? 'auto' : 'none',
                  position: i === 0 ? 'relative' : 'absolute',
                }}
              >
                <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed font-light mb-4 sm:mb-6">
                  &ldquo;{t.message || t.content}&rdquo;
                </p>

                {typeof t.rating === 'number' && (
                  <div className="flex items-center justify-center gap-1 mb-4" aria-label={`${t.rating} out of 5 rating`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} width="16" height="16" viewBox="0 0 20 20" fill={star <= t.rating! ? '#F59E0B' : 'rgba(255,255,255,0.14)'}>
                        <path d="M10 1.5l2.5 5.1 5.6.8-4 3.9.9 5.5-5-2.6-5 2.6.9-5.5-4-3.9 5.6-.8L10 1.5z" />
                      </svg>
                    ))}
                  </div>
                )}

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  {t.photo ? (
                    <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-[#7B2FF2]/30" />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #7B2FF2 0%, #E879F9 100%)' }}
                    >
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/50">{[t.role, t.company].filter(Boolean).join(', ')}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation arrows */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={goPrev}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#7B2FF2] hover:bg-[#7B2FF2]/10 transition-all btn-tap"
                  aria-label="Previous testimonial"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className="transition-all duration-300"
                      style={{
                        width: active === i ? '32px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        background: active === i
                          ? 'linear-gradient(135deg, #7B2FF2, #E879F9)'
                          : 'rgba(255,255,255,0.15)',
                      }}
                      aria-label={`Testimonial ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goNext}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#7B2FF2] hover:bg-[#7B2FF2]/10 transition-all btn-tap"
                  aria-label="Next testimonial"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
