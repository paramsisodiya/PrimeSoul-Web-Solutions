'use client'

import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Logo from '@/components/shared/Logo'
import { ArrowRight, Code, ShieldCheck, Cpu } from 'lucide-react'

export default function PrimeOMSBuiltByPrimeSoul() {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-[#07091B] text-white border-y border-white/10">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Logo variant="dark" iconSize={32} />
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Built & Maintained by PrimeSoul Web Solutions
            </h3>

            <p className="text-sm text-white/70 leading-relaxed">
              PrimeOMS is a restaurant technology SaaS platform engineered in-house by PrimeSoul Web Solutions. We don&apos;t just build digital experiences for businesses — we build and operate products of our own.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-white/60 pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#00C9A7]" /> Enterprise Reliability
              </span>
              <span className="flex items-center gap-1.5">
                <Code size={14} className="text-[#1E3AE0]" /> Continuous Product Updates
              </span>
              <span className="flex items-center gap-1.5">
                <Cpu size={14} className="text-[#FF5A1F]" /> Full Cloud Infrastructure
              </span>
            </div>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all hover:scale-105"
            >
              <span>Visit PrimeSoul Studio</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
