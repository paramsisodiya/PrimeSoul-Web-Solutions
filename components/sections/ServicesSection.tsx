"use client";
import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { SERVICES } from '@/lib/data'

const SERVICE_CATEGORIES = [
  {
    id: 'strategy',
    label: 'Strategy',
    watermark: 'STRATEGY',
    services: [
      'Market Research & Analysis',
      'Brand Strategy',
      'Digital Marketing Strategy',
      'Content Strategy',
      'SEO & SEM Strategy',
      'Customer Journey Mapping',
      'Go-to-Market Strategy',
      'Social Media Strategy',
    ],
  },
  {
    id: 'development',
    label: 'Development',
    watermark: 'DEVELOPMENT',
    services: [
      'Web Design & Development',
      'Full-Stack Applications',
      'E-Commerce Solutions',
      'API Architecture',
      'Database Design (MongoDB/PostgreSQL)',
      'Admin Dashboards',
      'Performance Optimization',
      'Progressive Web Apps',
    ],
  },
  {
    id: 'design',
    label: 'Design',
    watermark: 'DESIGN',
    services: [
      'UI/UX Design',
      'Logo & Branding Design',
      'User Experience Research',
      'Wireframing & Prototyping',
      'Design Systems',
      'Motion Graphics',
      'Social Media Assets',
      'Print & Packaging Design',
    ],
  },
]

// 3D card tilt handler
function use3DTilt() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -10, y: x * 10 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
  }, [])

  return { ref, tilt, handleMouseMove, handleMouseLeave }
}

// Individual 3D service card
function ServiceCard3D({ service, index }: { service: typeof SERVICES[number]; index: number }) {
  const { ref, tilt, handleMouseMove, handleMouseLeave } = use3DTilt()

  return (
    <AnimatedSection delay={index * 60}>
      <div className="card-3d" ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <div
          className="card-3d-inner card-glow-hover group relative rounded-3xl p-8 bg-white cursor-default transition-all duration-300"
          style={{
            border: '1px solid #E8E5F5',
            boxShadow: '0 2px 24px -4px rgba(123,47,242,0.06)',
            transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          {/* Icon — floats in 3D */}
          <div
            className="card-3d-icon inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-6 transition-all duration-300 group-hover:shadow-lg"
            style={{
              background: 'rgba(123,47,242,0.08)',
              color: '#7B2FF2',
            }}
          >
            <ServiceIcon name={service.icon} />
          </div>

          {/* Content — slightly elevated */}
          <div className="card-3d-content">
            <h3 className="text-lg font-semibold text-ink mb-3">{service.title}</h3>
            <p className="text-sm text-ink-muted leading-relaxed mb-6">{service.description}</p>

            {/* Features */}
            <ul className="flex flex-col gap-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-xs text-ink-secondary">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="6" fill="rgba(123,47,242,0.08)" />
                    <path d="M3 6l2 2 4-4" stroke="#7B2FF2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom accent line on hover */}
          <div
            className="absolute bottom-0 left-8 right-8 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(123,47,242,0.4), transparent)' }}
          />
        </div>
      </div>
    </AnimatedSection>
  )
}

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState(0)
  const active = SERVICE_CATEGORIES[activeTab]

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden mesh-gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimatedSection className="mb-16">
          <div className="max-w-2xl">
            <SectionLabel>What We Do</SectionLabel>
            <h2
              className="text-[1.6rem] sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em] mb-4 sm:mb-5"
              style={{ color: '#0E0E2C' }}
            >
              Services Built for{' '}
              <span className="text-gradient-purple font-display italic">
                Real Business Growth
              </span>
            </h2>
            <p className="text-ink-secondary text-base leading-relaxed">
              Every service we offer is designed to solve a real problem — not to add complexity.
            </p>
          </div>
        </AnimatedSection>

        {/* Porto-style tabbed services */}
        <AnimatedSection>
          <div className="relative">
            {/* Watermark */}
            <div className="watermark-text text-[clamp(80px,12vw,180px)] top-1/2 right-0 -translate-y-1/2" aria-hidden="true">
              {active.watermark}
            </div>

            {/* Tab buttons */}
            <div className="flex gap-2 mb-8 sm:mb-12 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
              {SERVICE_CATEGORIES.map((cat, i) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(i)}
                  className="relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 btn-tap"
                  style={{
                    background: activeTab === i ? 'linear-gradient(135deg, #7B2FF2, #8B5CF6)' : 'white',
                    color: activeTab === i ? 'white' : '#4A4A6A',
                    border: `1px solid ${activeTab === i ? 'transparent' : '#E8E5F5'}`,
                    boxShadow: activeTab === i ? '0 8px 32px -8px rgba(123,47,242,0.35)' : '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Service list with stagger */}
            <div className="relative grid md:grid-cols-2 gap-x-12 gap-y-4 max-w-3xl">
              {active.services.map((service, i) => (
                <div
                  key={`${active.id}-${service}`}
                  className="flex items-center gap-3 py-3 border-b border-surface-border group cursor-default transition-all hover:border-brand-primary/20 hover:pl-2"
                  style={{
                    opacity: 1,
                    animation: `reveal-up 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 50}ms both`,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                    <circle cx="8" cy="8" r="8" fill="rgba(123,47,242,0.08)" />
                    <path d="M5 8l2.5 2.5L11 6" stroke="#7B2FF2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-ink-secondary group-hover:text-ink transition-colors font-medium">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 3D Service cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          {SERVICES.map((service, i) => (
            <ServiceCard3D key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:gap-4 transition-all duration-200"
          >
            Explore all services
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}

function ServiceIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    monitor: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
    layers: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    code: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    sparkles: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" /><path d="M5 17l.75 2.25L8 20l-2.25.75L5 23l-.75-2.25L2 20l2.25-.75L5 17z" />
      </svg>
    ),
    'trending-up': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    shield: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  }
  return <>{icons[name] || icons.monitor}</>
}
