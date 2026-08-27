'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { AlertCircle, CheckCircle2, ArrowDown, Clock, Receipt, Users, TrendingDown, Layers } from 'lucide-react'

const PAIN_POINTS = [
  {
    icon: Clock,
    title: 'Manual & Slow Order Taking',
    problem: 'Waiters running back and forth with paper notepads leads to delayed orders and missed items during peak hours.',
    solution: 'Diners scan table QR standees and place instant orders directly into the kitchen.',
  },
  {
    icon: Receipt,
    title: 'Complicated Billing & Queues',
    problem: 'Customers waiting 10-15 minutes just to get their paper bill and make payment creates checkout friction.',
    solution: 'Instant digital receipts with direct UPI QR codes displayed on phone or printed standee.',
  },
  {
    icon: Users,
    title: 'Zero Customer Retention',
    problem: 'Most restaurants have no record of who walks in, preventing re-engagement and regular diner loyalty.',
    solution: 'Automated diner CRM with point rewards on every purchase to bring customers back.',
  },
  {
    icon: TrendingDown,
    title: 'Heavy Third-Party Commissions',
    problem: 'Food aggregators charge 20% to 30% per order, eating into thin restaurant profit margins.',
    solution: '100% direct-to-bank revenue with flat low-cost subscription and 0% commission.',
  },
]

export default function PrimeOMSPainPoints() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#FAFAFE]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel>The Problem We Solved</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em] text-[#0E0E2C] mb-4">
            Running a restaurant shouldn&apos;t mean{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-[#FF5A1F]">
              managing five different tools.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
            From handwritten order tickets to disconnected billing machines, disjointed systems waste time, cause kitchen errors, and leave money on the table.
          </p>
        </AnimatedSection>

        {/* Pain Points vs Solutions Grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {PAIN_POINTS.map((item, idx) => {
            const Icon = item.icon
            return (
              <AnimatedSection key={item.title} delay={idx * 100}>
                <div className="h-full rounded-3xl p-7 sm:p-8 bg-white border border-[#E2E8F8] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-[#FF5A1F]/30">
                  <div>
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF5A1F]/10 group-hover:text-[#FF5A1F] transition-colors">
                        <Icon size={22} />
                      </div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#0E0E2C]">
                        {item.title}
                      </h3>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="p-3.5 rounded-xl bg-red-50/70 border border-red-100 text-xs sm:text-sm text-red-950 flex items-start gap-2.5">
                        <AlertCircle size={17} className="text-red-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Problem:</strong> {item.problem}</span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-100 text-xs sm:text-sm text-emerald-950 flex items-start gap-2.5">
                        <CheckCircle2 size={17} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span><strong>PrimeOMS Solution:</strong> {item.solution}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>

        {/* Transition Bridge Callout */}
        <AnimatedSection>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0A0D24] via-[#161640] to-[#0A0D24] border border-white/10 p-8 sm:p-12 text-center text-white shadow-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5A1F]/20 border border-[#FF5A1F]/30 text-xs font-bold uppercase tracking-widest text-[#FF5A1F] mb-3">
              <span>✦ The Unified Solution</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
              PrimeOMS brings your entire restaurant operations together.
            </h3>
            
            <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-6">
              One unified cloud system for table QR standees, live kitchen tickets, instant UPI billing, and customer loyalty rewards.
            </p>

            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#FF8A4C]">
              <span>Explore Live Feature Modules Below</span>
              <ArrowDown size={16} className="animate-bounce" />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
