'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import MagneticButton from '@/components/ui/MagneticButton'
import Image from 'next/image'

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — content */}
          <div>
            {/* Subtitle badge */}
            <div className="pill-badge pill-badge--purple mb-8">
              <span className="dot" />
              Beyond Expectations
            </div>

            {/* Headline */}
            <h1
              className="text-[2.5rem] sm:text-5xl md:text-6xl xl:text-[72px] font-extrabold leading-[1.05] tracking-[-0.03em] mb-5 sm:mb-6"
              style={{ fontFamily: "'Poppins', sans-serif", color: '#0E0E2C' }}
            >
              Crafting{' '}
              <span
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, #7B2FF2 0%, #E879F9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Success
              </span>
              <br />
              Through{' '}
              <span className="relative">
                Design
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                  <path d="M1 5.5C40 2 60 2 100 5S160 2 199 5.5" stroke="#7B2FF2" strokeWidth="2.5" strokeLinecap="round" opacity="0.3"/>
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-8 sm:mb-10 max-w-md">
              Empowering brands with innovative digital strategies to drive growth, engagement, and measurable success.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <MagneticButton strength={0.25} radius={150}>
                <Link
                  href="/portfolio"
                  className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-semibold text-white text-sm transition-all duration-300 hover:-translate-y-px hover:shadow-brand-lg"
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
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-ink text-sm border border-surface-border bg-white hover:border-brand-primary/20 hover:bg-brand-light transition-all duration-300"
                >
                  Start a Project
                </Link>
              </MagneticButton>
            </div>
          </div>

          {/* Right — visual card stack */}
          <div className="hidden lg:block relative h-[560px]">
            {/* Main card */}
            <div
              className="absolute top-8 right-0 w-[400px] rounded-3xl overflow-hidden animate-float-rotate tilt-card"
              style={{
                boxShadow: '0 24px 80px -16px rgba(123,47,242,0.20), 0 4px 16px rgba(123,47,242,0.08)',
                border: '1px solid rgba(255,255,255,0.8)',
              }}
            >
              <div className="relative h-56">
                <Image
                  src="/images/project-school.png"
                  alt="SVNS School project"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Purple overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/10 via-transparent to-transparent" />
              </div>
              <div className="bg-white p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-ink-muted">Institutional Website</span>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(123,47,242,0.08)', color: '#7B2FF2' }}
                  >
                    Live
                  </span>
                </div>
                <p className="font-semibold text-ink text-sm">SVNS School Khilchipur</p>
                <p className="text-xs text-ink-muted mt-1">Online admissions, fee status, full admin</p>
              </div>
            </div>

            {/* Stats card */}
            <div
              className="absolute bottom-16 left-4 w-52 rounded-2xl bg-white p-5 animate-float"
              style={{
                boxShadow: '0 8px 40px -8px rgba(123,47,242,0.18)',
                border: '1px solid rgba(232,229,245,0.8)',
                animationDelay: '1s',
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
              }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse-slow" style={{ background: '#A855F7' }} />
              <span className="text-white text-xs font-medium">Next.js · TypeScript · MongoDB</span>
            </div>

            {/* Floating badge */}
            <div
              className="absolute top-0 left-8 rounded-full px-4 py-2 animate-float"
              style={{
                background: 'linear-gradient(135deg, rgba(123,47,242,0.12), rgba(232,121,249,0.12))',
                border: '1px solid rgba(123,47,242,0.15)',
                animationDelay: '2s',
              }}
            >
              <span className="text-xs font-semibold text-brand-primary">⚡ Premium Quality</span>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hidden sm:flex">
          <span className="text-xs tracking-widest uppercase font-medium text-ink-muted">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-brand-primary/40 to-transparent" />
        </div>
      </div>
    </section>
  )
}
