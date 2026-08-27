'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { PRIMEOMS_PRODUCT } from '@/lib/data'
import { QrCode, LayoutDashboard, CreditCard, HeartHandshake, CheckCircle2 } from 'lucide-react'

const CATEGORY_ICONS = {
  ordering: QrCode,
  management: LayoutDashboard,
  billing: CreditCard,
  crm: HeartHandshake,
}

export default function PrimeOMSFeatureGrid() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#FAFAFE]">
      {/* Ambient background glow */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#FF5A1F]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <SectionLabel>Product Architecture</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em] text-[#0E0E2C] mb-4">
            Everything your restaurant needs,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] to-[#FF8A4C]">
              in one place.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
            Organized into dedicated operational modules to simplify everyday restaurant management without bloating your workflow.
          </p>
        </AnimatedSection>

        {/* 4-Category Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
          {PRIMEOMS_PRODUCT.featureCategories.map((cat, idx) => {
            const Icon = CATEGORY_ICONS[cat.id as keyof typeof CATEGORY_ICONS] || QrCode
            return (
              <AnimatedSection key={cat.id} delay={idx * 100}>
                <div className="h-full rounded-3xl p-8 sm:p-10 bg-white border border-[#E2E8F8] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:border-[#FF5A1F]/40 relative overflow-hidden">
                  {/* Top Accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF5A1F] to-[#FF8A4C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#FF5A1F]/10 text-[#FF5A1F] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon size={26} />
                      </div>
                      <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF5A1F] bg-[#FF5A1F]/10 px-3 py-1 rounded-full">
                        Module 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-[#0E0E2C] mb-2 group-hover:text-[#FF5A1F] transition-colors">
                      {cat.title}
                    </h3>

                    <p className="text-sm text-ink-secondary leading-relaxed mb-6 font-normal">
                      {cat.description}
                    </p>

                    {/* Sub-items */}
                    <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-[#F0F2FA]">
                      {cat.items.map((item) => (
                        <div key={item.title} className="space-y-1">
                          <div className="flex items-center gap-2 text-sm font-bold text-[#0E0E2C]">
                            <CheckCircle2 size={15} className="text-[#FF5A1F] flex-shrink-0" />
                            <span>{item.title}</span>
                          </div>
                          <p className="text-xs text-ink-muted leading-relaxed pl-5">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
