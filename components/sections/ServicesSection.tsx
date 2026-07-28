'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { SERVICES } from '@/lib/data'
import { Monitor, Layers, Code, Sparkles, TrendingUp, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react'

// Icon mapping dictionary
function ServiceIcon({ name, className = '' }: { name: string; className?: string }) {
  const iconProps = { size: 24, strokeWidth: 1.8, className }
  switch (name) {
    case 'monitor':
      return <Monitor {...iconProps} />
    case 'layers':
      return <Layers {...iconProps} />
    case 'code':
      return <Code {...iconProps} />
    case 'sparkles':
      return <Sparkles {...iconProps} />
    case 'trending-up':
      return <TrendingUp {...iconProps} />
    case 'shield':
      return <ShieldCheck {...iconProps} />
    default:
      return <Monitor {...iconProps} />
  }
}

// Custom 3D Tilt + Cursor Spotlight Card Component
function InteractiveServiceCard({
  service,
  index,
}: {
  service: typeof SERVICES[number]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })

    // Calculate 3D tilt
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const tiltX = (y - centerY) / 18
    const tiltY = (centerX - x) / 18
    setTilt({ x: tiltX, y: tiltY })
  }, [])

  const handleMouseEnter = () => setIsHovered(true)

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <AnimatedSection delay={index * 100}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative rounded-3xl bg-white p-7 sm:p-8 border border-surface-border transition-all duration-300 cursor-pointer overflow-hidden"
        style={{
          boxShadow: isHovered
            ? '0 24px 60px -15px rgba(30, 58, 224, 0.18)'
            : '0 4px 20px -4px rgba(0, 0, 0, 0.03)',
          transform: isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        }}
      >
        {/* Dynamic Cursor Spotlight Radial Glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(30, 58, 224, 0.08), transparent 80%)`,
          }}
        />

        {/* Top Active Accent Line */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl"
          style={{
            background: 'linear-gradient(135deg, #1E3AE0 0%, #2EC4C4 100%)',
          }}
        />

        {/* Header Icon + Number Badge */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-md"
            style={{
              background: isHovered
                ? 'linear-gradient(135deg, #1E3AE0 0%, #2EC4C4 100%)'
                : 'rgba(30, 58, 224, 0.08)',
              color: isHovered ? '#FFFFFF' : '#1E3AE0',
              boxShadow: isHovered ? '0 10px 25px -5px rgba(30, 58, 224, 0.35)' : 'none',
            }}
          >
            <ServiceIcon name={service.icon} />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-ink-muted/50 group-hover:text-[#1E3AE0] transition-colors">
            0{index + 1}
          </span>
        </div>

        {/* Title & Description */}
        <div className="relative z-10">
          <h3 className="text-xl font-extrabold text-[#0E0E2C] group-hover:text-[#1E3AE0] transition-colors mb-3 leading-tight">
            {service.title}
          </h3>
          <p className="text-sm text-ink-secondary leading-relaxed mb-6 font-normal">
            {service.description}
          </p>

          {/* Features List */}
          <ul className="space-y-2.5 mb-8 border-t border-surface-border pt-5">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-ink-secondary group-hover:text-[#0E0E2C] transition-colors"
              >
                <CheckCircle2
                  size={16}
                  className="text-[#1E3AE0] group-hover:text-[#2EC4C4] transition-colors flex-shrink-0"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Footer CTA Link */}
          <div className="flex items-center gap-2 text-xs font-bold text-[#1E3AE0] uppercase tracking-wider group-hover:text-[#2EC4C4] transition-colors">
            <span>Explore Service</span>
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1.5 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default function ServicesSection() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#FAFAFE]">
      {/* Background Ambient Glow Spheres */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#1E3AE0]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#2EC4C4]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <SectionLabel>What We Do</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em] text-[#0E0E2C] mb-4">
            Services Built for{' '}
            <span className="text-gradient-purple font-display italic">
              Real Business Growth
            </span>
          </h2>
          <p className="text-base text-ink-secondary leading-relaxed">
            Every solution we engineer combines high-end design, cutting-edge technology, and performance optimization to turn visitors into loyal clients.
          </p>
        </AnimatedSection>

        {/* 3D Spotlight Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service, index) => (
            <InteractiveServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* Bottom Callout Visual Banner */}
        <AnimatedSection className="mt-16 sm:mt-20">
          <div className="relative rounded-3xl overflow-hidden bg-[#080B1E] border border-white/10 shadow-2xl p-6 sm:p-10 md:p-12 text-white">
            {/* Ambient Backlight Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#1E3AE0]/20 to-[#2EC4C4]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Text Info */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold uppercase tracking-widest text-[#2EC4C4]">
                  <span>✦ Direct Studio Access</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  Need a custom web application or enterprise solution?
                </h3>

                <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-xl">
                  Work directly with our lead developers and UX designers. We build custom Next.js architectures, scalable backend databases, and real-time dashboards.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-white shadow-lg transition-all hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #1E3AE0 0%, #2EC4C4 100%)',
                    }}
                  >
                    <span>Talk to Our Engineering Team</span>
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all"
                  >
                    Explore Case Studies
                  </Link>
                </div>
              </div>

              {/* Right Column: Authentic Team Office Photo Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-xl group">
                  <div className="relative h-64 sm:h-72 w-full">
                    <Image
                      src="/images/agency-office-team.png"
                      alt="PrimeSoul agency team developers working on web app"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 35vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080B1E]/70 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/15">
                    <p className="text-xs font-bold text-white">Rajgarh Engineering Studio</p>
                    <p className="text-[10px] text-white/60">Full-stack Next.js & React Specialists</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
