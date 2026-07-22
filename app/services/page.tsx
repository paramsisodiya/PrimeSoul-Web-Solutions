import type { Metadata } from 'next'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import PricingCalculator from '@/components/sections/PricingCalculator'
import { PROCESS_STEPS, PRICING_PLANS } from '@/lib/data'
import { SERVICE_PAGES } from '@/lib/service-pages'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Web development, UI/UX design, full-stack applications, and brand identity services from PrimeSoul.',
}

const ICONS: Record<string, React.ReactNode> = {
  monitor: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  layers: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  code: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  sparkles: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M5 17l.75 2.25L8 20l-2.25.75L5 23l-.75-2.25L2 20l2.25-.75L5 17z"/></svg>,
  'trending-up': <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  shield: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: '#F8F9FE' }}>
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 50% 60% at 80% 40%, rgba(46,196,196,0.07) 0%, transparent 60%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection className="max-w-2xl">
            <SectionLabel>Services</SectionLabel>
            <h1
              className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-5"
              style={{ color: '#0D1340' }}
            >
              Everything Your{' '}
              <span style={{
                background: 'linear-gradient(135deg, #1E3AE0 0%, #2EC4C4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Digital Presence
              </span>{' '}
              Needs
            </h1>
            <p className="text-lg text-ink-secondary leading-relaxed max-w-lg">
              From a simple landing page to a full-scale web application — we scope every engagement to match your actual needs, not to upsell you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services detailed */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-8">
            {SERVICE_PAGES.map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 60}>
                <div
                  className="rounded-3xl p-8 md:p-10 grid md:grid-cols-3 gap-8 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F8',
                    boxShadow: '0 2px 24px -4px rgba(30,58,224,0.05)',
                  }}
                >
                  {/* Icon + Title */}
                  <div className="md:col-span-1">
                    <div
                      className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
                      style={{ background: `${service.accent}10`, color: service.accent }}
                    >
                      {ICONS[service.icon] || ICONS['monitor']}
                    </div>
                    <h2 className="text-xl font-semibold text-ink mb-3">{service.title}</h2>
                    <p className="text-sm text-ink-muted leading-relaxed line-clamp-3">{service.heroDescription}</p>
                  </div>

                  {/* Features */}
                  <div className="md:col-span-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint mb-4">Includes</p>
                    <ul className="flex flex-col gap-3">
                      {service.features.slice(0, 4).map((feature) => (
                        <li key={feature.title} className="flex items-start gap-2.5 text-sm text-ink-secondary">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: `${service.accent}12` }}
                          >
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M2 5l2 2 4-4" stroke={service.accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span>{feature.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="md:col-span-1 flex flex-col justify-center md:items-end">
                    <div
                      className="h-px md:hidden mb-6"
                      style={{ background: '#E2E8F8' }}
                    />
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:gap-3"
                        style={{ background: `${service.accent}10`, color: service.accent }}
                      >
                        Learn More
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-ink-muted hover:text-ink transition-colors"
                      >
                        Get a Quote →
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24" style={{ background: '#F8F9FE' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-14 text-center">
            <SectionLabel>Our Process</SectionLabel>
            <h2
              className="text-3xl md:text-4xl font-bold text-ink mb-4"
            >
              How Every Project Unfolds
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <AnimatedSection key={step.step} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 border border-surface-border">
                  <div
                    className="text-3xl font-bold mb-4"
                    style={{
                      color: i % 2 === 0 ? '#1E3AE0' : '#2EC4C4',
                    }}
                  >
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-ink mb-2">{step.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <SectionLabel>Estimate Your Project</SectionLabel>
              <h2
                className="text-3xl md:text-4xl font-bold text-ink mb-4"
              >
                Get an Instant Quote
              </h2>
              <p className="text-ink-secondary mb-8 max-w-md">
                Use our interactive estimator to get a ballpark figure for your project. Configure your requirements and see the price update in real-time.
              </p>
              <div className="space-y-4">
                {['Transparent pricing, no hidden fees', 'Custom scope for every project', 'Flexible payment plans available'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#7B2FF2]/10 flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="#7B2FF2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-sm text-ink-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <PricingCalculator />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-ink mb-4">
              Not sure which service fits?
            </h2>
            <p className="text-ink-secondary mb-8 max-w-md mx-auto">
              Tell us about your project and we&apos;ll recommend the right approach.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #1E3AE0 0%, #2B47D9 100%)', boxShadow: '0 8px 32px -8px rgba(30,58,224,0.45)' }}
            >
              Let&apos;s Discuss
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
