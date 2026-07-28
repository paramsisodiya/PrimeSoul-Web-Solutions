'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { Check, X, Zap, ShieldCheck, Sparkles } from 'lucide-react'

const COMPARISON_ITEMS = [
  {
    feature: 'Delivery Timeline',
    others: '6 to 8 Weeks (Slow & Delayed)',
    primeSoul: '1 to 2 Weeks (Rapid Launch)',
    highlight: true,
  },
  {
    feature: 'Technology Stack',
    others: 'Bloated WordPress / Drag-and-Drop Templates',
    primeSoul: 'Custom Next.js 14, React & TypeScript',
    highlight: false,
  },
  {
    feature: 'Google PageSpeed Score',
    others: '30/100 to 50/100 (Slow 4-6s Load)',
    primeSoul: '100/100 Ultra-Fast (<0.8s Load)',
    highlight: true,
  },
  {
    feature: 'Design Quality',
    others: 'Generic, Overused Browser Defaults',
    primeSoul: 'Premium Glassmorphism & Modern UI',
    highlight: false,
  },
  {
    feature: 'Ongoing Support & Security',
    others: 'Expensive Hourly Fees or Unresponsive',
    primeSoul: '24/7 Dedicated Support & Monitoring',
    highlight: true,
  },
  {
    feature: 'Pricing Transparency',
    others: 'Hidden Costs & Unexpected Add-ons',
    primeSoul: '100% Transparent Fixed Project Quote',
    highlight: false,
  },
]

export default function ComparisonSection() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#FAFAFE]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#7B2FF2]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <SectionLabel>THE PRIMESOUL ADVANTAGE</SectionLabel>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0E0E2C] tracking-tight leading-tight mb-4">
            Why Growing Brands Choose <span className="text-gradient-purple italic font-display">PrimeSoul</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
            See how we compare against traditional web agencies and generic freelancers.
          </p>
        </AnimatedSection>

        {/* Glassmorphic Comparison Matrix */}
        <AnimatedSection>
          <div className="rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/80 shadow-[0_20px_60px_-15px_rgba(123,47,242,0.12)] overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-surface-subtle/80 border-b border-surface-border p-4 sm:p-6 text-xs sm:text-sm font-extrabold text-[#0E0E2C]">
              <div className="col-span-4 sm:col-span-4 flex items-center gap-2">
                <Sparkles size={16} className="text-[#7B2FF2]" />
                <span>Feature / Capability</span>
              </div>
              <div className="col-span-4 sm:col-span-4 text-center text-ink-muted flex items-center justify-center gap-1.5">
                <X size={16} className="text-red-500" />
                <span>Traditional Agencies</span>
              </div>
              <div className="col-span-4 sm:col-span-4 text-center text-[#7B2FF2] flex items-center justify-center gap-1.5 bg-[#7B2FF2]/10 py-1.5 px-3 rounded-xl border border-[#7B2FF2]/20">
                <Zap size={16} className="text-[#7B2FF2] fill-current" />
                <span className="font-extrabold">PrimeSoul Web Solutions</span>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-surface-border">
              {COMPARISON_ITEMS.map((item, idx) => (
                <div
                  key={item.feature}
                  className={`grid grid-cols-12 p-4 sm:p-6 text-xs sm:text-sm items-center transition-colors duration-200 ${
                    item.highlight ? 'bg-white/50' : 'bg-transparent'
                  } hover:bg-[#7B2FF2]/5`}
                >
                  {/* Feature Label */}
                  <div className="col-span-4 sm:col-span-4 font-bold text-[#0E0E2C] pr-2">
                    {item.feature}
                  </div>

                  {/* Traditional Agencies */}
                  <div className="col-span-4 sm:col-span-4 text-center text-ink-secondary flex items-center justify-center gap-1.5 px-2">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                      <X size={12} strokeWidth={2.5} />
                    </span>
                    <span className="hidden sm:inline font-medium">{item.others}</span>
                    <span className="sm:hidden font-medium line-clamp-1">{item.others}</span>
                  </div>

                  {/* PrimeSoul Web Solutions */}
                  <div className="col-span-4 sm:col-span-4 text-center font-bold text-[#0E0E2C] flex items-center justify-center gap-1.5 bg-[#7B2FF2]/5 py-2 px-2 sm:px-3 rounded-xl border border-[#7B2FF2]/15">
                    <span className="w-5 h-5 rounded-full bg-[#00C9A7]/15 text-[#00C9A7] flex items-center justify-center flex-shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-[#0E0E2C]">{item.primeSoul}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Footer Banner */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-[#1E3AE0] via-[#7B2FF2] to-[#2EC4C4] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <ShieldCheck size={28} className="text-white flex-shrink-0" />
                <div>
                  <h4 className="text-base sm:text-lg font-extrabold">Ready to experience the PrimeSoul standard?</h4>
                  <p className="text-xs sm:text-sm text-white/90">Get a custom quote & 100/100 speed guarantee for your project.</p>
                </div>
              </div>

              <a
                href="https://wa.me/918770404559?text=Hi%20PrimeSoul%2C%20I%20want%20to%20discuss%20my%20website%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-white text-[#0E0E2C] font-extrabold text-xs sm:text-sm hover:bg-surface-subtle transition-transform duration-300 hover:scale-105 shadow-xl flex-shrink-0"
              >
                Chat on WhatsApp Now →
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
