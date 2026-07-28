'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface PricingPlan {
  id: string
  name: string
  price: string
  priceUSD?: string
  period?: string
  timeline?: string
  description: string
  features: string[]
  highlighted?: boolean
  visible?: boolean
  badge?: string
  cta?: string
  ctaText?: string
  order?: number
}

export default function PricingSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [plans, setPlans] = useState<PricingPlan[]>([])

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'pricing'), where('visible', '==', true)))
        const data = snap.docs
          .map(d => ({ id: d.id, ...d.data() } as PricingPlan))
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        setPlans(data.length > 0 ? data : [])
      } catch (err) {
        console.error('Error fetching pricing:', err)
        setPlans([])
      }
    }
    fetchPlans()
  }, [])

  return (
    <section
      id="pricing"
      className="relative py-14 sm:py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0B0B24 0%, #0E0E2C 50%, #120F30 100%)' }}
    >
      {/* Ambient glow effects */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(123,47,242,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(232,121,249,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimatedSection className="mb-8 sm:mb-12 text-center">
          <SectionLabel dark>Pricing</SectionLabel>
          <h2
            className="text-[1.4rem] sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-[-0.03em] mb-3"
            style={{ color: '#FFFFFF' }}
          >
            Invest in Your{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7B2FF2 0%, #E879F9 50%, #A855F7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Digital Future
            </span>
          </h2>
          <p
            className="max-w-lg mx-auto text-sm sm:text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            Transparent pricing, premium quality. Every project is unique — these are starting points we&apos;ll tailor to your needs.
          </p>
        </AnimatedSection>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto items-stretch">
          {plans.map((plan, i) => (
            <AnimatedSection key={plan.id} delay={i * 100}>
              <div
                className="relative h-full flex flex-col transition-all duration-500 ease-out"
                style={{
                  borderRadius: '24px',
                  transform: hoveredIndex === i ? 'translateY(-8px)' : 'translateY(0)',
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Card background */}
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    borderRadius: '24px',
                    ...(plan.highlighted
                      ? {
                        background: 'linear-gradient(165deg, rgba(123,47,242,0.25) 0%, rgba(123,47,242,0.08) 40%, rgba(232,121,249,0.08) 100%)',
                        border: '1px solid rgba(123,47,242,0.35)',
                        boxShadow: hoveredIndex === i
                          ? '0 32px 80px -20px rgba(123,47,242,0.5), 0 0 60px -10px rgba(123,47,242,0.2), inset 0 1px 0 rgba(255,255,255,0.08)'
                          : '0 16px 48px -12px rgba(123,47,242,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
                      }
                      : {
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        boxShadow: hoveredIndex === i
                          ? '0 20px 60px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)'
                          : '0 4px 24px -8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
                      }),
                  }}
                />

                {/* Popular ribbon glow for highlighted plan */}
                {plan.highlighted && (
                  <>
                    <div
                      className="absolute -top-px left-8 right-8 h-[2px]"
                      style={{
                        background: 'linear-gradient(90deg, transparent, #7B2FF2, #E879F9, #7B2FF2, transparent)',
                      }}
                    />
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"
                    >
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full whitespace-nowrap"
                        style={{
                          background: 'linear-gradient(135deg, #7B2FF2, #9D5CF5)',
                          color: '#FFFFFF',
                          boxShadow: '0 4px 16px -4px rgba(123,47,242,0.5)',
                          }}
                      >
                        {plan.badge || 'Most Popular'}
                      </span>
                    </div>
                  </>
                )}

                {/* Card content */}
                <div className="relative z-10 p-5 sm:p-6 flex flex-col h-full">
                  {/* Plan name */}
                  <div className="mb-4">
                    <span
                      className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                      style={{
                        color: plan.highlighted ? '#A855F7' : 'rgba(255,255,255,0.35)',
                      }}
                    >
                      {plan.name}
                    </span>
                  </div>

                  {/* Price block */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span
                        className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                        style={{
                          ...(plan.highlighted
                            ? {
                              background: 'linear-gradient(135deg, #FFFFFF 0%, #E0D4FF 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                            }
                            : { color: '#FFFFFF' }),
                        }}
                      >
                        {plan.price}
                      </span>
                    </div>
                    {plan.priceUSD && plan.priceUSD !== 'Custom' && (
                      <div
                        className="text-xs mt-2 font-medium"
                        style={{ color: 'rgba(255,255,255,0.25)' }}
                      >
                        ≈ {plan.priceUSD} USD
                      </div>
                    )}
                  </div>

                  {/* Timeline badge */}
                  <div
                    className="inline-flex items-center gap-2 text-[11px] font-medium mb-4 px-3 py-1.5 rounded-lg w-fit"
                    style={{
                      background: plan.highlighted
                        ? 'rgba(123,47,242,0.15)'
                        : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${plan.highlighted ? 'rgba(123,47,242,0.25)' : 'rgba(255,255,255,0.06)'}`,
                      color: plan.highlighted ? '#C4A8FF' : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M6 3V6l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    {plan.timeline || plan.period || 'Project based'}
                  </div>

                  {/* Description */}
                  <p
                    className="text-xs leading-relaxed mb-5"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                  >
                    {plan.description}
                  </p>

                  {/* Divider */}
                  <div
                    className="h-px mb-5"
                    style={{
                      background: plan.highlighted
                        ? 'linear-gradient(90deg, transparent, rgba(123,47,242,0.3), transparent)'
                        : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
                    }}
                  />

                  {/* Features */}
                  <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-xs">
                        <div
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                          style={{
                            background: plan.highlighted
                              ? 'rgba(123,47,242,0.2)'
                              : 'rgba(255,255,255,0.06)',
                          }}
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path
                              d="M2.5 5L4.5 7L7.5 3"
                              stroke={plan.highlighted ? '#A855F7' : 'rgba(255,255,255,0.4)'}
                              strokeWidth="1.3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <span style={{ color: 'rgba(255,255,255,0.55)' }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href="/contact"
                    className="w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-300 block relative overflow-hidden group"
                    style={
                      plan.highlighted
                        ? {
                          background: 'linear-gradient(135deg, #7B2FF2 0%, #9D5CF5 100%)',
                          color: '#FFFFFF',
                          boxShadow: '0 8px 24px -8px rgba(123,47,242,0.4)',
                        }
                        : {
                          background: 'rgba(255,255,255,0.04)',
                          color: 'rgba(255,255,255,0.7)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }
                    }
                  >
                    <span className="relative z-10">{plan.ctaText || plan.cta || 'Get Started'}</span>
                    {plan.highlighted && (
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(135deg, #9D5CF5 0%, #E879F9 100%)',
                        }}
                      />
                    )}
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Maintenance Care Plan Tier */}
        <AnimatedSection delay={300} className="mt-16 max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-[#7B2FF2]/30 p-8 sm:p-10" style={{ background: 'linear-gradient(135deg, rgba(123,47,242,0.1) 0%, rgba(232,121,249,0.05) 100%)', boxShadow: '0 24px 60px -15px rgba(123,47,242,0.15)' }}>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-[#7B2FF2]/20 to-[#E879F9]/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#7B2FF2]/30 bg-[#7B2FF2]/10 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#E879F9] animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-[#E879F9]">Ongoing Support</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Website Care & Maintenance</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-md">Protect your investment with our comprehensive maintenance plans. We handle updates, security, backups, and content changes so you can focus on your business.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'Weekly Software Updates', 'Daily Cloud Backups', '24/7 Security Monitoring', 'Performance Optimization', 'Priority Technical Support', 'Monthly Analytics Report'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#E879F9] flex-shrink-0">
                        <path d="M11.666 3.5L5.249 9.917 2.333 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 w-full md:w-auto bg-[#0E0E2C]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 text-center min-w-[280px]">
                <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-2">Starting at</p>
                <div className="flex items-end justify-center gap-1 mb-2">
                  <span className="text-4xl font-extrabold text-white">₹999</span>
                  <span className="text-white/40 text-sm mb-1">/ month</span>
                </div>
                <p className="text-white/40 text-xs mb-6">Billed monthly or annually</p>
                <Link
                  href="/contact?service=Maintenance"
                  className="inline-block w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg, #7B2FF2, #E879F9)', boxShadow: '0 8px 20px -6px rgba(123,47,242,0.5)' }}
                >
                  Secure Your Site
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Bottom trust text */}
        <AnimatedSection className="mt-10 text-center">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {['Free consultation', 'No hidden fees', 'Secure payment'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#7B2FF2' }}
                />
                <span
                  className="text-xs font-medium"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
