'use client'

import { useState } from 'react'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { BarChart3, QrCode, HeartHandshake, Utensils, CheckCircle2 } from 'lucide-react'

const TABS = [
  {
    id: 'analytics',
    label: 'Analytics Dashboard',
    icon: BarChart3,
    image: '/images/primeoms-dashboard.jpg',
    heading: 'Real-time sales, order volume, and performance insights',
    description: 'Track daily and hourly revenue, average order value, category breakdowns, and peak customer hours to optimize your staffing and menu profitability.',
    bullets: [
      'Daily & Hourly Revenue Trends with visual line charts',
      'Best-Selling Items ranking (e.g., Paneer Tikka, Gulab Jamun)',
      'Category performance (Starters, Main Course, Desserts)',
      'Peak dining hours distribution analysis',
    ],
  },
  {
    id: 'tables-qr',
    label: 'Tables & QR Codes',
    icon: QrCode,
    image: '/images/primeoms-tables-qr.jpg',
    heading: 'High-resolution printable QR table standees',
    description: 'Generate dedicated QR codes for every table and VIP lounge. Download ready-to-print standee templates for effortless diner self-ordering.',
    bullets: [
      'Quick bulk generate or single table customization',
      'Download high-res printable table standee graphics',
      'Separate QR codes for indoor tables, patio, and VIP areas',
      'Direct link to mobile menu without app downloads',
    ],
  },
  {
    id: 'loyalty',
    label: 'Loyalty & Rewards CRM',
    icon: HeartHandshake,
    image: '/images/primeoms-loyalty.jpg',
    heading: 'Turn first-time diners into loyal repeat customers',
    description: 'Automated points system credits diners on every visit. Maintain a central customer CRM database with phone numbers and order history.',
    bullets: [
      'Customer CRM directory with lifetime spend tracking',
      'Automated points accrual & bill discount redemption',
      'Outstanding points and reward liability dashboard',
      'Manual point adjustments and custom member profiles',
    ],
  },
  {
    id: 'orders',
    label: 'Live Orders & Kitchen (KDS)',
    icon: Utensils,
    image: '/images/primeoms-orders.jpg',
    heading: 'Real-time order progression from Pending to Served',
    description: 'Live order pipeline with kitchen display sync. Keep chefs, waitstaff, and cashiers on the same page with instantaneous order status transitions.',
    bullets: [
      'Status pipeline: Pending → Accepted → Preparing → Ready → Served',
      'Special customer cooking instructions and spice level flags',
      'Table number, timestamp, and itemized bill preview',
      'Direct order notifications to kitchen display staff',
    ],
  },
]

export default function PrimeOMSFeatureTabs() {
  const [activeTab, setActiveTab] = useState(TABS[0].id)
  const current = TABS.find((t) => t.id === activeTab) || TABS[0]

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#0A0D24] text-white">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#FF5A1F]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 text-xs font-bold uppercase tracking-widest text-[#FF5A1F] mb-4">
            <span>✦ Interactive Product Tour</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em] text-white mb-4">
            Powerful dashboard.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] via-[#FF8A4C] to-[#FFA066]">
              Complete control.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            Explore the actual interface restaurant managers and owners use every day to orchestrate tables, kitchen tickets, billing, and loyalty.
          </p>
        </AnimatedSection>

        {/* Tab Selection Buttons */}
        <AnimatedSection className="flex items-center justify-center mb-10 sm:mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 overflow-x-auto max-w-full gap-1 sm:gap-2">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap min-h-[44px] ${
                    isActive
                      ? 'bg-[#FF5A1F] text-white shadow-lg shadow-orange-500/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </AnimatedSection>

        {/* Active Tab Screen & Content */}
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left / Top: Interactive UI Screenshot */}
          <AnimatedSection key={current.id} className="lg:col-span-8">
            <div className="group relative rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl p-2 sm:p-3 shadow-2xl transition-all duration-500">
              <div className="relative h-64 sm:h-[420px] md:h-[480px] w-full rounded-2xl overflow-hidden bg-black/40">
                <Image
                  src={current.image}
                  alt={current.heading}
                  fill
                  className="object-contain sm:object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Right / Bottom: Feature Breakdown */}
          <AnimatedSection key={`${current.id}-text`} className="lg:col-span-4 space-y-6">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF8A4C] bg-[#FF5A1F]/15 px-3 py-1 rounded-full border border-[#FF5A1F]/30">
                Live Module
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-3 mb-3 leading-snug">
                {current.heading}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed font-normal">
                {current.description}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {current.bullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-3 text-xs sm:text-sm text-white/80 font-medium">
                  <CheckCircle2 size={16} className="text-[#FF5A1F] flex-shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/918770404559?text=Hi%20PrimeSoul%2C%20I'd%20like%20to%20see%20a%20live%20walkthrough%20of%20the%20PrimeOMS%20dashboard."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#FF8A4C] hover:text-white transition-colors"
              >
                <span>Request Custom Demo Session →</span>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
