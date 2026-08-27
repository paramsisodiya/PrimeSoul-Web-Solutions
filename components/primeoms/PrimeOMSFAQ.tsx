'use client'

import { useState } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { ChevronDown } from 'lucide-react'
import { PRIMEOMS_FAQS } from '@/lib/data'

export default function PrimeOMSFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#FAFAFE]">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimatedSection className="text-center mb-14 sm:mb-16">
          <SectionLabel>Got Questions?</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em] text-[#0E0E2C] mb-4">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] to-[#FF8A4C]">
              Questions
            </span>
          </h2>
          <p className="text-base text-ink-secondary leading-relaxed">
            Everything you need to know about PrimeOMS onboarding, features, and pricing.
          </p>
        </AnimatedSection>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {PRIMEOMS_FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <AnimatedSection key={faq.question} delay={idx * 60}>
                <div
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-[#FF5A1F]/40 shadow-lg shadow-orange-500/5'
                      : 'bg-white/80 border-[#E2E8F8] hover:border-[#FF5A1F]/20'
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-extrabold text-[#0E0E2C] hover:text-[#FF5A1F] transition-colors text-base sm:text-lg min-h-[48px]"
                  >
                    <span>{faq.question}</span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'bg-[#FF5A1F] text-white rotate-180' : 'bg-[#FAFAFE] text-ink-muted'
                      }`}
                    >
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  <div
                    className="transition-all duration-300 ease-in-out overflow-hidden"
                    style={{
                      maxHeight: isOpen ? '240px' : '0px',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-ink-secondary leading-relaxed border-t border-[#F0F2FA]">
                      {faq.answer}
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
