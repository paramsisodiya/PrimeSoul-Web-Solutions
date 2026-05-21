'use client'

import { useState, useEffect, useRef } from 'react'
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

  const goTo = (i: number) => {
    setActive(i)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 8000)
  }

  const goNext = () => goTo((active + 1) % testimonials.length)
  const goPrev = () => goTo((active - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: '#0E0E2C' }}>
      {/* Mesh gradient */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(123,47,242,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(232,121,249,0.2) 0%, transparent 40%)'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="mb-10 sm:mb-16 text-center">
          <SectionLabel dark>Client Stories</SectionLabel>
          <h2
            className="text-[1.6rem] sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em] mb-4 text-white"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            See What Our{' '}
            <span style={{
              background: 'linear-gradient(135deg, #A855F7 0%, #E879F9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Clients Say
            </span>
          </h2>
        </AnimatedSection>

        {/* Main testimonial */}
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center relative">
            {/* Quote icon */}
            <svg width="36" height="28" viewBox="0 0 48 36" fill="none" className="mx-auto mb-4 sm:mb-6">
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
                <p className="text-base sm:text-xl md:text-2xl text-white/70 leading-relaxed font-light mb-6 sm:mb-8">
                  &ldquo;{t.message || t.content}&rdquo;
                </p>

                {typeof t.rating === 'number' && (
                  <div className="flex items-center justify-center gap-1 mb-6" aria-label={`${t.rating} out of 5 rating`}>
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
                    <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-[#7B2FF2]/30" />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #7B2FF2 0%, #E879F9 100%)' }}
                    >
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>{t.name}</p>
                    <p className="text-xs text-white/40">{[t.role, t.company].filter(Boolean).join(', ')}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation arrows */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={goPrev}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-[#7B2FF2] hover:bg-[#7B2FF2]/10 transition-all"
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
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-[#7B2FF2] hover:bg-[#7B2FF2]/10 transition-all"
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
