'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { ShieldCheck, Zap, TrendingUp, Users, HeartHandshake, DollarSign, CheckCircle2 } from 'lucide-react'

const REASONS = [
  {
    icon: DollarSign,
    title: 'Zero Commissions on Orders',
    description: 'Unlike third-party aggregator apps that take 20%–30% cuts on every order, PrimeOMS is 100% commission-free. All payments go directly into your bank account.',
  },
  {
    icon: Zap,
    title: 'Faster Table Turn Times',
    description: 'Guests no longer have to wait 10 minutes for a menu or bill. They scan, order, eat, pay, and go — allowing your restaurant to serve more guests per service.',
  },
  {
    icon: ShieldCheck,
    title: 'Zero Order Miscommunications',
    description: 'Special cooking instructions, spice preferences, and customized add-ons are transmitted directly into the kitchen display without handwriting errors.',
  },
  {
    icon: HeartHandshake,
    title: 'Built-in Diner Loyalty System',
    description: 'Turn one-time diners into high-frequency repeat regulars with automated points earned on every bill and redeemable on future visits.',
  },
  {
    icon: TrendingUp,
    title: 'Actionable Performance Insights',
    description: 'Identify your top-selling dishes, peak dining hours, and daily revenue patterns so you can optimize inventory and staff shifts accurately.',
  },
  {
    icon: Users,
    title: 'Simple, Transparent Flat Pricing',
    description: 'Predictable monthly pricing with no hidden setup costs, no long-term lock-ins, and free updates maintained directly by PrimeSoul Web Solutions.',
  },
]

export default function PrimeOMSWhyUs() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#FAFAFE]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <SectionLabel>The PrimeOMS Advantage</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em] text-[#0E0E2C] mb-4">
            Why restaurants choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] to-[#FF8A4C]">
              PrimeOMS
            </span>
          </h2>
          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
            One unified system instead of scattered paper tickets, manual bill books, and disjointed tools.
          </p>
        </AnimatedSection>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {REASONS.map((r, idx) => {
            const Icon = r.icon
            return (
              <AnimatedSection key={r.title} delay={idx * 80}>
                <div className="h-full rounded-3xl p-7 sm:p-8 bg-white border border-[#E2E8F8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-[#FF5A1F]/30 hover:-translate-y-1">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#FF5A1F]/10 text-[#FF5A1F] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon size={22} />
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-[#0E0E2C] mb-3 group-hover:text-[#FF5A1F] transition-colors">
                      {r.title}
                    </h3>

                    <p className="text-sm text-ink-secondary leading-relaxed font-normal">
                      {r.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-[#F0F2FA] flex items-center gap-2 text-xs font-bold text-emerald-600">
                    <CheckCircle2 size={15} />
                    <span>Included in all active plans</span>
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
