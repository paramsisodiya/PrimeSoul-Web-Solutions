'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import MagneticButton from '@/components/ui/MagneticButton'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { doc, getDoc, getDocs, collection, addDoc, serverTimestamp, query, orderBy, limit } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const ParticleBackground = dynamic(() => import('@/components/ui/ParticleBackground'), { ssr: false })

interface ABTest {
  id: string
  name: string
  elementId: string
  variants: string[]
  traffic: number[]
  active: boolean
}

interface HeroSlide {
  img: string
  title: string
  category: string
  description: string
  tech: string
}

const FALLBACK_SLIDES: HeroSlide[] = [
  {
    img: '/images/project-school.png',
    title: 'SVNS School Khilchipur',
    category: 'Institutional Website',
    description: 'Online admissions, fee status, full admin',
    tech: 'Next.js · TypeScript · MongoDB',
  },
  {
    img: '/images/project-solar.png',
    title: 'A&S Solar Solutions',
    category: 'Business Website',
    description: 'Solar energy company with lead generation',
    tech: 'Next.js · Firebase · Tailwind',
  },
  {
    img: '/images/project-portfolio.png',
    title: 'Personal Portfolio',
    category: 'Portfolio Website',
    description: 'Developer portfolio with project showcase',
    tech: 'Next.js · TypeScript · Framer Motion',
  },
  {
    img: '/images/project-ecommerce.avif',
    title: 'E-Commerce Platform',
    category: 'E-Commerce',
    description: 'Full-stack store with payments and admin',
    tech: 'Next.js · Supabase · Stripe',
  },
]

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [abVariantWord, setAbVariantWord] = useState('Success')
  const abRef = useRef<{ testId: string; variant: number } | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<HeroSlide[]>(FALLBACK_SLIDES)
  const [slidesLoading, setSlidesLoading] = useState(true)

  // Fetch latest portfolio items from Firestore
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'), limit(5)))
        if (!snap.empty) {
          const items: HeroSlide[] = snap.docs.map(d => {
            const data = d.data()
            const techRaw = data.tech || data.technologies || ''
            const tech = Array.isArray(techRaw) ? techRaw.join(' · ') : String(techRaw)
            return {
              img: data.image || '/images/project-school.png',
              title: data.title || 'Untitled Project',
              category: data.category || 'Website',
              description: data.description || data.shortDescription || '',
              tech,
            }
          })
          if (items.length > 0) setSlides(items)
        }
      } catch {
        // Keep fallback slides on error
      } finally {
        setSlidesLoading(false)
      }
    }
    fetchPortfolio()
  }, [])

  // Auto-advance hero slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [slides.length])

  // Log A/B conversion on CTA click
  const logConversion = useCallback(async () => {
    if (!abRef.current) return
    try {
      await addDoc(collection(db, 'ab_test_events'), {
        testId: abRef.current.testId,
        variant: abRef.current.variant,
        type: 'conversion',
        timestamp: serverTimestamp(),
      })
    } catch {}
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    // Trigger text reveal animation after mount
    setLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      hero.style.setProperty('--mx', `${x}%`)
      hero.style.setProperty('--my', `${y}%`)
    }

    hero.addEventListener('mousemove', handleMouseMove)
    return () => hero.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // A/B test logic
  useEffect(() => {
    const runABTest = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'ab_tests'))
        if (!snap.exists()) return
        const data = snap.data()
        const tests: ABTest[] = data.tests || []
        const activeTest = tests.find(t => t.active)
        if (!activeTest || activeTest.variants.length < 2) return

        // Determine variant
        const storageKey = `ab_assigned_variant_${activeTest.id}`
        let assignedVariant: number
        const stored = localStorage.getItem(storageKey)
        if (stored !== null) {
          assignedVariant = parseInt(stored, 10)
        } else {
          assignedVariant = Math.random() < 0.5 ? 0 : 1
          localStorage.setItem(storageKey, String(assignedVariant))
        }

        // Set the variant text as the gradient word
        if (activeTest.variants[assignedVariant]) {
          setAbVariantWord(activeTest.variants[assignedVariant])
        }

        abRef.current = { testId: activeTest.id, variant: assignedVariant }

        // Log impression
        await addDoc(collection(db, 'ab_test_events'), {
          testId: activeTest.id,
          variant: assignedVariant,
          type: 'impression',
          timestamp: serverTimestamp(),
        })
      } catch {}
    }
    runABTest()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: '#FAFAFE',
        '--mx': '50%',
        '--my': '50%',
      } as React.CSSProperties}
    >
      {/* Particle background */}
      <ParticleBackground />

      {/* Animated mesh gradient — purple theme */}
      <div
        className="absolute inset-0 opacity-70 transition-opacity duration-300"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 10% 60%, rgba(123,47,242,0.09) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 85% 15%, rgba(139,92,246,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 60% 85%, rgba(232,121,249,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 30% 30% at var(--mx) var(--my), rgba(123,47,242,0.05) 0%, transparent 60%)
          `,
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(123,47,242,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(123,47,242,1) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Floating gradient orbs */}
      <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full opacity-20 blur-[100px] pointer-events-none" style={{ background: 'linear-gradient(135deg, #7B2FF2, #E879F9)', animation: 'float-orb 20s ease-in-out infinite' }} />
      <div className="absolute bottom-20 right-[15%] w-56 h-56 rounded-full opacity-15 blur-[80px] pointer-events-none" style={{ background: 'linear-gradient(135deg, #A855F7, #3B82F6)', animation: 'float-orb 25s ease-in-out infinite reverse' }} />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full opacity-10 blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" style={{ background: 'radial-gradient(circle, #7B2FF2, transparent 70%)', animation: 'float-orb 30s ease-in-out infinite' }} />

      {/* Large watermark text */}
      <div
        className="watermark-text text-[clamp(120px,18vw,280px)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        PRIMESOUL
      </div>

      {/* Floating orbs */}
      <div
        className="absolute top-20 right-20 w-80 h-80 rounded-full opacity-[0.06] animate-float"
        style={{ background: 'radial-gradient(circle, #7B2FF2 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-32 right-1/3 w-52 h-52 rounded-full opacity-[0.05] animate-float"
        style={{ background: 'radial-gradient(circle, #E879F9 0%, transparent 70%)', animationDelay: '2s' }}
      />
      <div
        className="absolute top-40 left-10 w-36 h-36 rounded-full opacity-[0.04] animate-float"
        style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)', animationDelay: '4s' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — content */}
          <div>
            {/* Subtitle badge */}
            <div
              className="pill-badge pill-badge--purple mb-8"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s',
              }}
            >
              <span className="dot" />
              Beyond Expectations
            </div>

            {/* Headline with text reveal animation */}
            <h1
              className="text-[2.5rem] sm:text-5xl md:text-6xl xl:text-[72px] font-extrabold leading-[1.05] tracking-[-0.03em] mb-5 sm:mb-6 text-ink"
            >
              {/* Word-by-word reveal */}
              <span
                className="inline-block"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0) rotateX(0deg)' : 'translateY(40px) rotateX(10deg)',
                  filter: loaded ? 'blur(0px)' : 'blur(4px)',
                  transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s',
                }}
              >
                Crafting{' '}
              </span>
              <span
                className="relative inline-block font-display italic"
                style={{
                  background: 'linear-gradient(135deg, #7B2FF2 0%, #E879F9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0) rotateX(0deg)' : 'translateY(40px) rotateX(10deg)',
                  filter: loaded ? 'blur(0px)' : 'blur(4px)',
                  transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1) 0.35s',
                }}
              >
                {abVariantWord}
              </span>
              <br />
              <span
                className="inline-block"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0) rotateX(0deg)' : 'translateY(40px) rotateX(10deg)',
                  filter: loaded ? 'blur(0px)' : 'blur(4px)',
                  transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1) 0.5s',
                }}
              >
                Through{' '}
              </span>
              <span
                className="relative inline-block"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0) rotateX(0deg)' : 'translateY(40px) rotateX(10deg)',
                  filter: loaded ? 'blur(0px)' : 'blur(4px)',
                  transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1) 0.65s',
                }}
              >
                Design
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                  <path
                    d="M1 5.5C40 2 60 2 100 5S160 2 199 5.5"
                    stroke="#7B2FF2"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.3"
                    style={{
                      strokeDasharray: 200,
                      strokeDashoffset: loaded ? 0 : 200,
                      transition: 'stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1) 0.9s',
                    }}
                  />
                </svg>
              </span>
            </h1>

            <p
              className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-8 sm:mb-10 max-w-md"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.22,1,0.36,1) 0.8s',
              }}
            >
              Empowering brands with innovative digital strategies to drive growth, engagement, and measurable success.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.22,1,0.36,1) 0.95s',
              }}
            >
              <MagneticButton strength={0.25} radius={150}>
                <Link
                  href="/portfolio"
                  onClick={logConversion}
                  className="btn-tap group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-semibold text-white text-sm transition-all duration-300 hover:-translate-y-px hover:shadow-brand-lg"
                  style={{
                    background: 'linear-gradient(135deg, #7B2FF2 0%, #8B5CF6 100%)',
                    boxShadow: '0 8px 32px -8px rgba(123,47,242,0.45)',
                  }}
                >
                  View Our Work
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.2} radius={120}>
                <Link
                  href="/contact"
                  className="btn-tap inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-ink text-sm border border-surface-border bg-white hover:border-brand-primary/20 hover:bg-brand-light transition-all duration-300"
                >
                  Start a Project
                </Link>
              </MagneticButton>
            </div>
          </div>

          {/* Right — visual card stack (desktop) */}
          <div className="hidden lg:block relative h-[560px]">
            {/* Main card — auto-sliding portfolio carousel */}
            <div
              className="absolute top-8 right-0 w-[400px] rounded-3xl overflow-hidden animate-float-rotate tilt-card"
              style={{
                boxShadow: '0 24px 80px -16px rgba(123,47,242,0.20), 0 4px 16px rgba(123,47,242,0.08)',
                border: '1px solid rgba(255,255,255,0.8)',
                opacity: loaded ? 1 : 0,
                transform: loaded ? undefined : 'translateY(40px) scale(0.95)',
                transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
              }}
            >
              {/* Story-style progress bar */}
              <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-2">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-[3px] rounded-full overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.3)' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        background: '#FFFFFF',
                        width: i < currentSlide ? '100%' : i === currentSlide ? '100%' : '0%',
                        animation: i === currentSlide ? 'hero-progress-fill 3s linear forwards' : 'none',
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Image area with cross-fade */}
              <div className="relative h-56">
                {slidesLoading ? (
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-50 animate-pulse rounded-t-3xl" />
                ) : (
                  slides.map((slide, i) => (
                    <Image
                      key={`${slide.img}-${i}`}
                      src={slide.img}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority={i === 0}
                      style={{
                        opacity: i === currentSlide ? 1 : 0,
                        transition: 'opacity 0.4s ease',
                      }}
                    />
                  ))
                )}
                {/* Purple overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/10 via-transparent to-transparent" />
              </div>
              <div className="bg-white p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                    {slides[currentSlide]?.category}
                  </span>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(123,47,242,0.08)', color: '#7B2FF2' }}
                  >
                    Live
                  </span>
                </div>
                <p className="font-semibold text-ink text-sm">{slides[currentSlide]?.title}</p>
                <p className="text-xs text-ink-muted mt-1">{slides[currentSlide]?.description}</p>
              </div>
            </div>

            {/* Stats card — glass morphism */}
            <div
              className="absolute bottom-16 left-4 w-52 rounded-2xl p-5 animate-float glass-card"
              style={{
                animationDelay: '1s',
                opacity: loaded ? 1 : 0,
                transform: loaded ? undefined : 'translateY(30px)',
                transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full animate-pulse-slow" style={{ background: '#7B2FF2' }} />
                <p className="text-xs text-ink-muted font-semibold uppercase tracking-wider">Impact</p>
              </div>
              {[
                { label: 'Years of Growth', value: '2+' },
                { label: 'Revenue Generated', value: '₹5L+' },
                { label: 'Businesses Served', value: '4+' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between py-1.5 border-b border-surface-border last:border-0">
                  <span className="text-xs text-ink-muted">{stat.label}</span>
                  <span className="text-xs font-bold text-gradient-purple">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Tech stack chip */}
            <div
              className="absolute bottom-44 right-4 rounded-full px-5 py-3 flex items-center gap-2.5 animate-float"
              style={{
                background: '#0E0E2C',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                animationDelay: '3s',
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.8s ease 0.7s',
              }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse-slow" style={{ background: '#A855F7' }} />
              <span className="text-white text-xs font-medium">{slides[currentSlide]?.tech}</span>
            </div>

            {/* Floating badge */}
            <div
              className="absolute top-0 left-8 rounded-full px-4 py-2 animate-float glass-card"
              style={{
                animationDelay: '2s',
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.8s ease 0.6s',
              }}
            >
              <span className="text-xs font-semibold text-brand-primary">⚡ Premium Quality</span>
            </div>
          </div>

          {/* Mobile hero visual — auto-sliding carousel */}
          <div className="lg:hidden relative w-full">
            <div
              className="rounded-2xl overflow-hidden bg-white"
              style={{
                border: '1px solid #E8E5F5',
                boxShadow: '0 4px 20px -4px rgba(123,47,242,0.1)',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.22,1,0.36,1) 0.4s',
              }}
            >
              {/* Progress bar */}
              <div className="flex gap-1 p-2">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-[3px] rounded-full overflow-hidden"
                    style={{ background: 'rgba(123,47,242,0.15)' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        background: '#7B2FF2',
                        width: i < currentSlide ? '100%' : i === currentSlide ? '100%' : '0%',
                        animation: i === currentSlide ? 'hero-progress-fill 3s linear forwards' : 'none',
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Image cross-fade */}
              <div className="relative h-44">
                {slides.map((slide, i) => (
                  <Image
                    key={`mobile-${slide.img}-${i}`}
                    src={slide.img}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    style={{
                      opacity: i === currentSlide ? 1 : 0,
                      transition: 'opacity 0.4s ease',
                    }}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">{slides[currentSlide]?.category}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(123,47,242,0.08)', color: '#7B2FF2' }}>Live</span>
                </div>
                <p className="font-semibold text-ink text-sm">{slides[currentSlide]?.title}</p>
                <p className="text-xs text-ink-muted mt-1">{slides[currentSlide]?.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-40 hidden sm:flex">
          <span className="text-xs tracking-widest uppercase font-medium text-ink-muted">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-brand-primary/40 to-transparent" />
        </div>
      </div>
    </section>
  )
}
