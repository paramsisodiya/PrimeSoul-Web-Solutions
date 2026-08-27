'use client'

import { useState } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { PRIMEOMS_PRODUCT } from '@/lib/data'
import { Check, Zap, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'

export default function PrimeOMSPricing() {
  const [annual, setAnnual] = useState(false)
  const { basic, pro } = PRIMEOMS_PRODUCT.pricing

  return (
    <section id="pricing" className="py-20 sm:py-28 relative overflow-hidden bg-white scroll-mt-20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <SectionLabel>Transparent Pricing</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em] text-[#0E0E2C] mb-4">
            Simple, honest pricing.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] to-[#FF8A4C]">
              Zero hidden fees.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-8">
            All plans include a 14-day risk-free trial. No credit card required. Flat subscription with 0% commissions on all your orders.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-[#FAFAFE] border border-[#E2E8F8]">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 min-h-[38px] ${
                !annual ? 'bg-[#0E0E2C] text-white shadow-md' : 'text-ink-secondary hover:text-[#0E0E2C]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 min-h-[38px] ${
                annual ? 'bg-[#FF5A1F] text-white shadow-md' : 'text-ink-secondary hover:text-[#0E0E2C]'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/20 text-white">
                2 Months Free
              </span>
            </button>
          </div>
        </AnimatedSection>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Basic Plan */}
          <AnimatedSection delay={100} className="h-full">
            <div className="h-full rounded-3xl p-8 sm:p-10 bg-white border border-[#E2E8F8] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:border-[#1E3AE0]/30">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-extrabold text-[#0E0E2C]">
                    {basic.name}
                  </h3>
                  <span className="text-xs font-bold text-ink-muted bg-[#FAFAFE] border border-[#E2E8F8] px-3 py-1 rounded-full">
                    Starter
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed mb-6">
                  {basic.description}
                </p>

                <div className="mb-8 pb-6 border-b border-[#F0F2FA]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black text-[#0E0E2C]">
                      ₹{annual ? Math.round(basic.price * 10) : basic.price}
                    </span>
                    <span className="text-sm font-medium text-ink-muted">
                      /{annual ? 'year' : 'month'}
                    </span>
                  </div>
                  <p className="text-[11px] text-ink-muted mt-1">
                    {annual ? 'Billed annually (Includes 2 months free)' : 'Billed monthly · Cancel anytime'}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0E0E2C]">
                    Included in Basic:
                  </p>
                  {basic.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-secondary font-medium">
                      <div className="w-5 h-5 rounded-full bg-blue-50 text-[#1E3AE0] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} strokeWidth={2.5} />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={`https://wa.me/918770404559?text=Hi%20PrimeSoul%2C%20I'd%20like%20to%20start%20my%2014-Day%20Free%20Trial%20for%20the%20PrimeOMS%20Basic%20Plan%20(${annual ? 'Annual' : 'Monthly'}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold text-[#0E0E2C] bg-[#FAFAFE] hover:bg-[#0E0E2C] hover:text-white border border-[#E2E8F8] transition-all duration-300 shadow-sm"
              >
                <span>Start 14-Day Free Trial</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </AnimatedSection>

          {/* Pro Plan (Most Popular) */}
          <AnimatedSection delay={200} className="h-full">
            <div className="h-full rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#0A0D24] via-[#12163A] to-[#0A0D24] border-2 border-[#FF5A1F] shadow-2xl transition-all duration-300 flex flex-col justify-between text-white relative overflow-hidden">
              {/* Top Most Popular Ribbon */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-[#FF5A1F] to-[#FF8A4C] text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-md flex items-center gap-1.5">
                <Sparkles size={11} />
                <span>Most Popular</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-extrabold text-white">
                    {pro.name}
                  </h3>
                  <span className="text-xs font-bold text-[#FF8A4C] bg-[#FF5A1F]/20 border border-[#FF5A1F]/40 px-3 py-1 rounded-full">
                    All-in-One
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                  {pro.description}
                </p>

                <div className="mb-8 pb-6 border-b border-white/10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black text-white">
                      ₹{annual ? Math.round(pro.price * 10) : pro.price}
                    </span>
                    <span className="text-sm font-medium text-white/60">
                      /{annual ? 'year' : 'month'}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/60 mt-1">
                    {annual ? 'Billed annually (Includes 2 months free)' : 'Billed monthly · Cancel anytime'}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#FF8A4C]">
                    Everything in Basic, plus:
                  </p>
                  {pro.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90 font-medium">
                      <div className="w-5 h-5 rounded-full bg-[#FF5A1F] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <Check size={12} strokeWidth={2.5} />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={`https://wa.me/918770404559?text=Hi%20PrimeSoul%2C%20I'd%20like%20to%20start%20my%2014-Day%20Free%20Trial%20for%20the%20PrimeOMS%20Pro%20Plan%20(${annual ? 'Annual' : 'Monthly'}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #FF5A1F 0%, #FF8A4C 100%)',
                  boxShadow: '0 10px 30px -5px rgba(255,90,31,0.5)',
                }}
              >
                <span>Start 14-Day Free Trial</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
