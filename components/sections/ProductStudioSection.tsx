'use client'

import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { Rocket, Layers, Code2, Sparkles, ArrowRight, Check } from 'lucide-react'

export default function ProductStudioSection() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#FAFAFE]">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-[#1E3AE0]/5 via-[#7B2FF2]/5 to-[#FF5A1F]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel>Product Studio Evolution</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em] text-[#0E0E2C] mb-5">
            We don&apos;t just build websites.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B2FF2] via-[#1E3AE0] to-[#FF5A1F]">
              We build products.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
            PrimeSoul Web Solutions started by building high-converting digital experiences for growing businesses. Today, we are also engineering and operating our own software products — starting with PrimeOMS.
          </p>
        </AnimatedSection>

        {/* Dual Pillar Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-14">
          {/* Pillar 1: Digital Agency */}
          <AnimatedSection delay={100}>
            <div className="h-full rounded-3xl p-8 sm:p-10 bg-white/90 backdrop-blur-xl border border-[#E2E8F8] shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-[#1E3AE0]/30">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#1E3AE0]/10 text-[#1E3AE0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Layers size={26} />
                </div>
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3AE0]/10 text-[#1E3AE0] text-xs font-bold uppercase tracking-wider mb-3">
                  Pillar 01 · Client Services
                </div>

                <h3 className="text-2xl font-extrabold text-[#0E0E2C] mb-3">
                  Digital Agency
                </h3>

                <p className="text-sm text-ink-secondary leading-relaxed mb-6">
                  We partner with forward-thinking businesses, founders, and institutions to engineer high-performance web applications, conversion-driven websites, and automated growth systems.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    'Bespoke Next.js & React Architectures',
                    'High-Converting UI/UX Interface Design',
                    'Full-Stack Applications & Custom APIs',
                    'SEO & Core Web Vitals Optimization',
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-ink-secondary">
                      <div className="w-5 h-5 rounded-full bg-[#1E3AE0]/15 flex items-center justify-center flex-shrink-0 text-[#1E3AE0]">
                        <Check size={12} strokeWidth={2.5} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#1E3AE0] hover:text-[#0E0E2C] transition-colors group-hover:translate-x-1 duration-300"
              >
                <span>Explore Agency Services</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>

          {/* Pillar 2: Product Studio */}
          <AnimatedSection delay={200}>
            <div className="h-full rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#FFF7ED] via-white to-[#FFF5EB] backdrop-blur-xl border border-[#FFEDD5] shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-[#FF5A1F]/40 relative overflow-hidden">
              {/* Top Accent Pill */}
              <div className="absolute top-0 right-0 bg-[#FF5A1F] text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-sm">
                Flagship In-House
              </div>

              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FF5A1F]/15 text-[#FF5A1F] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Rocket size={26} />
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5A1F]/15 text-[#FF5A1F] text-xs font-bold uppercase tracking-wider mb-3">
                  Pillar 02 · Product Studio
                </div>

                <h3 className="text-2xl font-extrabold text-[#0E0E2C] mb-3">
                  Product Studio
                </h3>

                <p className="text-sm text-ink-secondary leading-relaxed mb-6">
                  We build, launch, and operate proprietary SaaS products. Our flagship product, <strong className="text-[#0E0E2C]">PrimeOMS</strong>, is transforming how restaurants handle QR orders, bills, and diner loyalty.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    'PrimeOMS: Restaurant Operations & QR Ordering',
                    'Direct-to-Bank UPI & Zero Commission Billing',
                    'Automated Customer Loyalty Points CRM',
                    'Continuous In-House Feature Innovation',
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-ink-secondary">
                      <div className="w-5 h-5 rounded-full bg-[#FF5A1F]/20 flex items-center justify-center flex-shrink-0 text-[#FF5A1F]">
                        <Check size={12} strokeWidth={2.5} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/primeoms"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FF5A1F] hover:text-[#0E0E2C] transition-colors group-hover:translate-x-0.5 duration-300"
                >
                  <span>Discover PrimeOMS SaaS</span>
                  <ArrowRight size={15} />
                </Link>

                <a
                  href="https://primeoms.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-ink-muted hover:text-[#FF5A1F] transition-colors underline underline-offset-2"
                >
                  <span>Open Live Web App ↗</span>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
