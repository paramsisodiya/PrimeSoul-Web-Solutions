'use client'

import Link from 'next/link'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Zap, QrCode, Play } from 'lucide-react'

export default function PrimeOMSHero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-28 overflow-hidden bg-[#0A0D24] text-white">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[500px] bg-gradient-to-br from-[#FF5A1F]/20 via-[#7B2FF2]/15 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#FF5A1F]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '36px 36px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Badges */}
        <AnimatedSection className="flex flex-wrap items-center justify-center gap-3 mb-6 sm:mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 text-xs font-bold text-[#FF5A1F]">
            <Sparkles size={13} />
            <span>Smart Orders · Happy Customers</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-white/90">
            <span>Built & Operated by</span>
            <strong className="text-white font-bold">PrimeSoul</strong>
          </div>
        </AnimatedSection>

        {/* Main Headline */}
        <AnimatedSection className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] leading-[1.1] text-white mb-6">
            Run your restaurant smarter with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] via-[#FF8A4C] to-[#FFA066]">
              PrimeOMS
            </span>
          </h1>

          <p className="text-base sm:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto">
            QR table ordering, digital menus, real-time kitchen tracking, direct UPI billing, and automated customer loyalty — brought together in one unified restaurant operating system.
          </p>
        </AnimatedSection>

        {/* CTAs */}
        <AnimatedSection delay={150} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="https://wa.me/918770404559?text=Hi%20PrimeSoul%2C%20I'm%20interested%20in%20a%2014-Day%20Free%20Trial%20of%20PrimeOMS%20for%20my%20restaurant."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-center"
            style={{
              background: 'linear-gradient(135deg, #FF5A1F 0%, #FF7A3D 100%)',
              boxShadow: '0 12px 35px -8px rgba(255,90,31,0.5)',
            }}
          >
            <span>Start 14-Day Free Trial</span>
            <ArrowRight size={18} />
          </a>

          <a
            href="#workflow"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-sm font-semibold text-white/90 bg-white/10 hover:bg-white/15 border border-white/15 transition-all duration-300 text-center"
          >
            <span>See How It Works</span>
            <Play size={14} className="fill-white/80" />
          </a>
        </AnimatedSection>

        {/* Feature Pills */}
        <AnimatedSection delay={200} className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-white/70 mb-14 sm:mb-16">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#FF5A1F]" />
            <span>14-Day Free Trial</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#FF5A1F]" />
            <span>Instant Setup in 15 Mins</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#FF5A1F]" />
            <span>Zero Gateway Commission</span>
          </div>
        </AnimatedSection>

        {/* Hero Visual Mockup Composition */}
        <AnimatedSection delay={300} className="relative max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl p-2 sm:p-4 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.8)]">
            <div className="relative h-72 sm:h-[460px] md:h-[540px] w-full rounded-2xl overflow-hidden bg-black/40">
              <Image
                src="/images/primeoms-hero-mockup.jpg"
                alt="PrimeOMS Restaurant Management Software laptop dashboard, table QR standee, and mobile digital menu"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1100px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D24]/70 via-transparent to-transparent opacity-40" />

              {/* Real-time Order Alert Tag */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-md p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#FF5A1F] text-white flex items-center justify-center flex-shrink-0 font-bold shadow-lg">
                  <QrCode size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Live Table QR Ordering</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                      Active
                    </span>
                  </div>
                  <p className="text-[11px] text-white/70 mt-0.5">
                    Guests scan table standees, browse photos, and place instant orders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
