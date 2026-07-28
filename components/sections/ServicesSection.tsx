'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { SERVICES } from '@/lib/data'
import { Monitor, Layers, Code, Sparkles, TrendingUp, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react'

// Unsplash thumbnails mapping for Service Cards (PART 8b)
const SERVICE_THUMBNAILS: Record<string, string> = {
  'web-design-development': 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&q=80',
  'ui-ux-design': 'https://images.unsplash.com/photo-1611162616305-c69b3037c7bb?w=400&q=80',
  'full-stack-applications': 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=80',
  'brand-identity': 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80',
  'seo-performance': 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&q=80',
  'maintenance-support': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
}

function ServiceIcon({ name, className = '' }: { name: string; className?: string }) {
  const iconProps = { size: 20, strokeWidth: 1.8, className }
  switch (name) {
    case 'monitor': return <Monitor {...iconProps} />
    case 'layers': return <Layers {...iconProps} />
    case 'code': return <Code {...iconProps} />
    case 'sparkles': return <Sparkles {...iconProps} />
    case 'trending-up': return <TrendingUp {...iconProps} />
    case 'shield': return <ShieldCheck {...iconProps} />
    default: return <Monitor {...iconProps} />
  }
}

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

    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const tiltX = (y - centerY) / 25
    const tiltY = (centerX - x) / 25
    setTilt({ x: tiltX, y: tiltY })
  }, [])

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  const thumbUrl = SERVICE_THUMBNAILS[service.id] || SERVICE_THUMBNAILS['web-design-development']

  return (
    <AnimatedSection delay={index * 100}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative rounded-3xl bg-white p-6 sm:p-7 border border-surface-border transition-all duration-300 cursor-pointer overflow-hidden"
        style={{
          boxShadow: isHovered
            ? '0 24px 60px -15px rgba(30, 58, 224, 0.18)'
            : '0 4px 20px -4px rgba(0, 0, 0, 0.03)',
          transform: isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Radial spotlight glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(123, 47, 242, 0.1), transparent 80%)`,
          }}
        />

        {/* Top Active Accent Line */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl"
          style={{
            background: 'linear-gradient(135deg, #1E3AE0 0%, #2EC4C4 100%)',
          }}
        />

        {/* Top Header: Unsplash 80x80 Thumbnail + Icon Pill + Number */}
        <div className="flex items-center justify-between mb-5 relative z-10">
          <div className="flex items-center gap-3">
            {/* 80px x 80px Unsplash Image Thumbnail */}
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-surface-border group-hover:border-brand-primary/40 transition-colors">
              <Image
                src={thumbUrl}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Icon Circle */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm"
              style={{
                background: isHovered
                  ? 'linear-gradient(135deg, #1E3AE0 0%, #2EC4C4 100%)'
                  : 'rgba(30, 58, 224, 0.08)',
                color: isHovered ? '#FFFFFF' : '#1E3AE0',
              }}
            >
              <ServiceIcon name={service.icon} />
            </div>
          </div>

          <span className="text-xs font-mono font-bold text-ink-muted/60 group-hover:text-[#1E3AE0] transition-colors">
            0{index + 1}
          </span>
        </div>

        {/* Title & Description */}
        <div className="relative z-10">
          <h3 className="text-xl font-extrabold text-[#0E0E2C] group-hover:text-[#1E3AE0] transition-colors mb-2.5 leading-tight">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed mb-6 font-normal">
            {service.description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-6 border-t border-surface-border pt-4">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-xs font-semibold text-ink-secondary group-hover:text-[#0E0E2C] transition-colors"
              >
                <CheckCircle2
                  size={14}
                  className="text-[#1E3AE0] group-hover:text-[#2EC4C4] transition-colors flex-shrink-0"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-xs font-bold text-[#1E3AE0] uppercase tracking-wider group-hover:text-[#2EC4C4] transition-colors">
            <span>Explore Service</span>
            <ArrowRight
              size={14}
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
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#1E3AE0]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#2EC4C4]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
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

        {/* Bottom Callout Banner */}
        <AnimatedSection className="mt-16 sm:mt-20">
          <div className="relative rounded-3xl overflow-hidden bg-[#080B1E] border border-white/10 shadow-2xl p-6 sm:p-10 md:p-12 text-white">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#1E3AE0]/20 to-[#2EC4C4]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
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
                    className="btn-shimmer inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-white shadow-lg"
                  >
                    <span>Talk to Our Engineering Team</span>
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/portfolio"
                    className="btn-ghost-secondary inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold"
                  >
                    Explore Case Studies
                  </Link>
                </div>
              </div>

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
