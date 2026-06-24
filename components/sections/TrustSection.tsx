'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { STATS } from '@/lib/data'

const TECH = ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'MongoDB', 'GSAP', 'Framer Motion', 'Node.js']

// ─── Animated counter hook ───────────────────────────
function useCounter(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!start) return

    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [target, duration, start])

  return count
}

// ─── Single stat card with counter ───────────────────
function StatCounter({
  stat,
  index,
  isVisible,
}: {
  stat: (typeof STATS)[number]
  index: number
  isVisible: boolean
}) {
  const count = useCounter(stat.numericValue, 2000 + index * 300, isVisible)

  return (
    <div
      className="group relative"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Large watermark number behind */}
      <div
        className="absolute -top-4 sm:-top-8 -left-2 text-[80px] sm:text-[120px] md:text-[160px] font-black leading-none pointer-events-none select-none transition-all duration-700"
        style={{
          color: 'rgba(123,47,242,0.04)',
        }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Number with animated counter */}
      <div className="relative mb-4">
        <span
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight inline-block transition-transform duration-500 group-hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #7B2FF2 0%, #A855F7 50%, #E879F9 100%)',
            backgroundSize: '200% 200%',
            animation: isVisible ? 'gradient-shift 4s ease infinite' : 'none',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {'prefix' in stat && stat.prefix ? stat.prefix : ''}{count}{'suffix' in stat && stat.suffix ? stat.suffix : ''}
        </span>
        {/* Animated underline */}
        <div
          className="h-1 rounded-full mt-3 transition-all duration-700"
          style={{
            width: isVisible ? '60px' : '0px',
            background: 'linear-gradient(90deg, #7B2FF2, #E879F9)',
            transitionDelay: `${600 + index * 200}ms`,
          }}
        />
      </div>

      {/* Label */}
      <h3
        className="text-lg md:text-xl font-bold mb-3 tracking-tight text-ink"
      >
        {stat.label}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed max-w-sm"
        style={{ color: '#7A7A9E' }}
      >
        {stat.description}
      </p>
    </div>
  )
}

// ─── Main Section ────────────────────────────────────
export default function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    if (entry.isIntersecting) {
      setIsVisible(true)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px',
    })

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [handleIntersect])

  return (
    <>
      {/* ═══════════════════════════════════════════════
          PART 1: Empowering Text + Photo (Porto-style)
          ═══════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden" style={{ background: '#FAFAFE' }}>
        {/* Subtle mesh gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 80% 30%, rgba(123,47,242,0.04) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(232,121,249,0.03) 0%, transparent 50%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Left: Text content */}
            <AnimatedSection direction="left">
              <SectionLabel>Beyond Expectations</SectionLabel>
              <h2
                className="text-[1.7rem] sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-[-0.03em] mb-5 sm:mb-6 text-ink"
              >
                Empowering brands with{' '}
                <span className="text-gradient-purple font-display italic">innovative strategies</span>{' '}
                to drive growth and success.
              </h2>
              <p className="text-base text-ink-secondary leading-relaxed mb-6 sm:mb-8 max-w-lg">
                Unlock your brand&apos;s potential with tailored digital solutions that connect, engage, and drive measurable results. We don&apos;t just build websites — we craft experiences.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2.5 text-sm font-semibold text-brand-primary hover:gap-4 transition-all duration-300 group"
              >
                Learn More
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </AnimatedSection>

            {/* Right: Professional photo composition */}
            <AnimatedSection direction="right">
              <div className="relative h-[320px] sm:h-[420px] md:h-[480px]">
                {/* Main photo — workspace */}
                <div
                  className="absolute top-0 right-0 w-[80%] sm:w-[75%] h-[260px] sm:h-[340px] md:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden transition-transform duration-500 hover:scale-[1.02]"
                  style={{
                    boxShadow: '0 32px 80px -20px rgba(123,47,242,0.18)',
                    border: '1px solid rgba(232,229,245,0.6)',
                  }}
                >
                  <Image
                    src="/images/team-working.png"
                    alt="Professional workspace showing modern web development"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Subtle purple overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(145deg, rgba(123,47,242,0.05) 0%, transparent 60%)' }}
                  />
                </div>

                {/* Secondary photo — phone mockup */}
                <div
                  className="absolute bottom-0 left-0 w-[50%] sm:w-[55%] h-[200px] sm:h-[260px] md:h-[300px] rounded-2xl sm:rounded-3xl overflow-hidden transition-transform duration-500 hover:scale-[1.02] z-10"
                  style={{
                    boxShadow: '0 24px 64px -16px rgba(0,0,0,0.15)',
                    border: '4px solid white',
                  }}
                >
                  <Image
                    src="/images/phone-mockup.png"
                    alt="Mobile responsive design showcase"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </div>

                {/* Floating stat badge */}
                <div
                  className="absolute top-8 left-0 rounded-2xl px-5 py-4 bg-white z-20 animate-float"
                  style={{
                    boxShadow: '0 12px 40px -8px rgba(123,47,242,0.15)',
                    border: '1px solid #E8E5F5',
                    animationDelay: '1s',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(123,47,242,0.08)' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 2l2 6h6l-5 3.5 2 6.5-5-4-5 4 2-6.5L2 8h6l2-6z" fill="#7B2FF2" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-ink">
                        100% Satisfaction
                      </p>
                      <p className="text-[10px] text-ink-muted">Client approval rate</p>
                    </div>
                  </div>
                </div>

                {/* Decorative dotted pattern */}
                <div
                  className="absolute -bottom-4 right-12 w-20 h-20 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #7B2FF2 1.5px, transparent 1.5px)',
                    backgroundSize: '12px 12px',
                  }}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PART 2: Impact Numbers (Porto counters style)
          ═══════════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        className="py-20 sm:py-28 md:py-36 relative overflow-hidden"
        style={{ background: '#FFFFFF' }}
      >
        {/* Subtle top border gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(123,47,242,0.15), transparent)' }}
        />

        {/* Large watermark text */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="text-[clamp(100px,15vw,240px)] font-black tracking-[-0.04em] leading-none whitespace-nowrap"
            style={{
              color: 'rgba(123,47,242,0.025)',
            }}
          >
            IMPACT
          </span>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section header */}
          <AnimatedSection className="text-center mb-12 sm:mb-20">
            <SectionLabel>Impact Numbers</SectionLabel>
            <h2
              className="text-[1.6rem] sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-[-0.03em] mb-3 sm:mb-4 text-ink"
            >
              Numbers That{' '}
              <span className="text-gradient-purple font-display italic">Speak Volumes</span>
            </h2>
            <p className="text-base text-ink-secondary max-w-lg mx-auto">
              Real results from real projects — not vanity metrics, but genuine impact on businesses we&apos;ve partnered with.
            </p>
          </AnimatedSection>

          {/* Stats grid — 3 columns like Porto */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12 lg:gap-20 mb-14 sm:mb-20">
            {STATS.map((stat, i) => (
              <StatCounter
                key={stat.label}
                stat={stat}
                index={i}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Divider */}
          <div
            className="h-px max-w-4xl mx-auto mb-16"
            style={{
              background: 'linear-gradient(90deg, transparent, #E8E5F5, transparent)',
            }}
          />

          {/* Tech stack */}
          <AnimatedSection>
            <div className="flex flex-col items-center gap-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint">
                Built with modern technology
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {TECH.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-medium text-ink-secondary transition-all duration-300 cursor-default hover:text-brand-primary hover:border-brand-primary/20 hover:shadow-sm"
                    style={{
                      background: 'rgba(123,47,242,0.03)',
                      border: '1px solid #E8E5F5',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(123,47,242,0.15), transparent)' }}
        />
      </section>
    </>
  )
}
