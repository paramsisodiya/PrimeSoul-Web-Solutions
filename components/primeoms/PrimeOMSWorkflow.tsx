'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { PRIMEOMS_PRODUCT } from '@/lib/data'
import { QrCode, Smartphone, Send, ChefHat, CheckSquare, Receipt, ArrowRight } from 'lucide-react'

const STEP_ICONS = [QrCode, Smartphone, Send, ChefHat, CheckSquare, Receipt]

export default function PrimeOMSWorkflow() {
  return (
    <section id="workflow" className="py-20 sm:py-28 relative overflow-hidden bg-white scroll-mt-20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em] text-[#0E0E2C] mb-4">
            From QR Scan to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] to-[#FF8A4C]">
              Paid Bill
            </span>
          </h2>
          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
            The frictionless dining journey that eliminates order bottlenecks and delights guests from the second they take their seats.
          </p>
        </AnimatedSection>

        {/* Workflow Timeline Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PRIMEOMS_PRODUCT.workflow.map((item, idx) => {
            const Icon = STEP_ICONS[idx] || QrCode
            return (
              <AnimatedSection key={item.step} delay={idx * 80}>
                <div className="h-full rounded-3xl p-7 sm:p-8 bg-[#FAFAFE] border border-[#E2E8F8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-[#FF5A1F]/40 hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#FF5A1F]/10 text-[#FF5A1F] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon size={22} />
                      </div>
                      <span className="text-xs font-mono font-black text-[#FF5A1F] bg-[#FF5A1F]/10 px-3 py-1 rounded-full">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-[#0E0E2C] mb-2 group-hover:text-[#FF5A1F] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E8EAF8] flex items-center justify-between text-xs font-bold text-ink-muted group-hover:text-[#FF5A1F] transition-colors">
                    <span>Step {idx + 1} of 6</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
