'use client'

import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { ArrowRight, Phone, CheckCircle2, Sparkles } from 'lucide-react'

export default function PrimeOMSCTA() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#0A0D24] text-white">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#FF5A1F]/20 via-[#7B2FF2]/15 to-[#00C9A7]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#12163A] via-[#161B48] to-[#0A0D24] border border-white/15 p-8 sm:p-12 md:p-16 shadow-2xl">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Text & CTAs */}
              <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5A1F]/20 border border-[#FF5A1F]/40 text-xs font-bold uppercase tracking-widest text-[#FF8A4C]">
                  <Sparkles size={13} />
                  <span>Start in 15 Minutes</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Ready to run your restaurant{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] to-[#FFA066]">
                    smarter?
                  </span>
                </h2>

                <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl">
                  Get your digital menu online, print your table QR standees, and take your first contactless table order today with zero risk.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                  <a
                    href="https://primeoms.vercel.app/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, #FF5A1F 0%, #FF7A3D 100%)',
                      boxShadow: '0 12px 35px -8px rgba(255,90,31,0.5)',
                    }}
                  >
                    <span>Start 14-Day Free Trial</span>
                    <ArrowRight size={18} />
                  </a>

                  <a
                    href="https://primeoms.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-sm font-semibold text-white/90 bg-white/10 hover:bg-white/15 border border-white/15 transition-all duration-300 hover:scale-105"
                  >
                    <span>Launch Web App</span>
                    <ArrowRight size={14} className="opacity-70" />
                  </a>

                  <Link
                    href="/contact?product=primeoms"
                    className="inline-flex items-center justify-center px-6 py-4 rounded-2xl text-sm font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
                  >
                    Schedule Live Walkthrough
                  </Link>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-white/60 pt-3">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#FF5A1F]" /> 14 Days 100% Free
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#FF5A1F]" /> No Credit Card Required
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#FF5A1F]" /> Zero Commission Fees
                  </span>
                </div>
              </div>

              {/* Right Column: Chef Image Card */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl group">
                  <Image
                    src="/images/primeoms-chef.jpg"
                    alt="Professional restaurant executive chef using PrimeOMS"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 240px, 300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D24]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-center">
                    <p className="text-xs font-bold text-white">Engineered for Kitchens & Diners</p>
                    <p className="text-[10px] text-[#FF8A4C]">Instant QR Orders · Happy Guests</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
