'use client'

import Link from 'next/link'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { QrCode, UtensilsCrossed, CreditCard, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'

const PRODUCT_HIGHLIGHTS = [
  {
    icon: QrCode,
    title: 'QR Table Ordering',
    desc: 'Printable QR standees for contactless guest self-ordering directly at tables.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Live Kitchen Pipeline',
    desc: 'Real-time order stage progression from Pending to Preparing and Served.',
  },
  {
    icon: CreditCard,
    title: 'Direct UPI & Split Bills',
    desc: 'Instant zero-fee UPI settlement to owner account and digital PDF invoices.',
  },
  {
    icon: Sparkles,
    title: 'Automated Diner Loyalty',
    desc: 'Built-in points accrual, customer CRM database, and coupon promotions.',
  },
]

export default function PrimeOMSShowcase() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#0A0D24] text-white">
      {/* Background Glow Spheres */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#FF5A1F]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#7B2FF2]/10 rounded-full blur-[160px] pointer-events-none" />
      
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <AnimatedSection className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 text-xs font-bold uppercase tracking-widest text-[#FF5A1F] mb-4">
            <Zap size={13} className="text-[#FF5A1F]" />
            <span>Our Flagship SaaS Product</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em] text-white mb-4">
            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] via-[#FF8A4C] to-[#FFA066]">PrimeOMS</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-white/90 mt-1 font-sans">
              The smarter way to run your restaurant.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
            PrimeOMS brings restaurant operations into one powerful platform — from digital menus and QR ordering to billing, customer engagement, and everyday kitchen management.
          </p>
        </AnimatedSection>

        {/* Showcase Main Layout */}
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-center mb-14">
          {/* Left: Product Hero Mockup Visual */}
          <AnimatedSection className="lg:col-span-7">
            <div className="group relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl p-2 sm:p-3 shadow-2xl transition-all duration-500 hover:border-[#FF5A1F]/50">
              <div className="relative h-64 sm:h-96 md:h-[420px] w-full rounded-2xl overflow-hidden bg-black/40">
                <Image
                  src="/images/primeoms-hero-mockup.jpg"
                  alt="PrimeOMS Restaurant Management SaaS laptop dashboard, table QR standee, and phone menu"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D24]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                {/* Floating Badge linking to live app */}
                <a
                  href="https://primeoms.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/20 text-xs font-bold text-white transition-all hover:scale-105"
                >
                  <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse" />
                  <span>Live App: primeoms.vercel.app ↗</span>
                </a>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/15 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/60">Built & Maintained by</p>
                    <p className="text-sm font-bold text-white">PrimeSoul Web Solutions</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#FF5A1F] font-bold">14-Day Free Trial</span>
                    <p className="text-[10px] text-white/50">No card required</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Feature Highlights & CTAs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
              {PRODUCT_HIGHLIGHTS.map((item, idx) => {
                const Icon = item.icon
                return (
                  <AnimatedSection key={item.title} delay={idx * 80}>
                    <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#FF5A1F]/40 hover:bg-white/[0.07] transition-all group">
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 flex items-center justify-center text-[#FF5A1F] flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Icon size={19} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white group-hover:text-[#FF5A1F] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs text-white/60 leading-relaxed mt-1">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>

            {/* Pricing Callout Banner */}
            <AnimatedSection delay={350}>
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FF5A1F]/20 via-[#FF8A4C]/10 to-transparent border border-[#FF5A1F]/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#FF8A4C]">Simple Pricing</span>
                  <p className="text-sm font-bold text-white">Starting from ₹799/month</p>
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                  Zero Commission
                </span>
              </div>
            </AnimatedSection>

            {/* CTAs */}
            <AnimatedSection delay={400} className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/primeoms"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #FF5A1F 0%, #FF8A4C 100%)',
                  boxShadow: '0 10px 30px -5px rgba(255,90,31,0.4)',
                }}
              >
                <span>Explore PrimeOMS</span>
                <ArrowRight size={16} />
              </Link>

              <a
                href="https://primeoms.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-2xl text-sm font-semibold text-white/90 bg-white/10 hover:bg-white/20 border border-white/15 transition-all duration-300 hover:scale-105"
              >
                <span>Launch App</span>
                <ArrowRight size={14} className="opacity-75" />
              </a>

              <a
                href="https://primeoms.vercel.app/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-3.5 rounded-2xl text-xs font-bold text-[#FF8A4C] hover:text-white transition-colors"
              >
                Sign Up Free →
              </a>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
