'use client'

import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { PROCESS_STEPS } from '@/lib/data'

export default function ProcessSection() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: '#FAFAFE' }}>
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#1D4ED8]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <AnimatedSection className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto">
          <SectionLabel>How We Work</SectionLabel>
          <h2
            className="text-[1.8rem] sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em] mb-3 sm:mb-4 text-[#0E0E2C]"
          >
            A Process Designed for{' '}
            <span className="text-gradient-purple font-display italic">Clarity & Speed</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
            No black boxes. No surprises. You get complete transparency and real-time progress updates at every stage.
          </p>
        </AnimatedSection>

        {/* Split Layout: Authentic Photo + Process Steps Grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Authentic Team Strategy Photo Card (5 cols) */}
          <AnimatedSection direction="left" className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-surface-border group">
              <div className="relative h-[340px] sm:h-[420px] w-full">
                <Image
                  src="/images/agency-collaboration.png"
                  alt="PrimeSoul web development team collaborating on client strategy"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E2C]/80 via-[#0E0E2C]/20 to-transparent" />
              </div>

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#00C9A7] animate-pulse" />
                  <div>
                    <p className="text-xs font-bold text-[#0E0E2C]">Agile 2-Week Sprints</p>
                    <p className="text-[11px] text-ink-muted">Continuous delivery & live staging demos</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column: Process Steps Stack (7 cols) */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5 sm:gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <AnimatedSection key={step.step} delay={i * 100}>
                <div className="relative p-6 rounded-2xl bg-white border border-surface-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand-primary/20 group">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black"
                      style={{
                        background: 'linear-gradient(135deg, rgba(30,58,224,0.08) 0%, rgba(46,196,196,0.08) 100%)',
                        color: '#1E3AE0',
                      }}
                    >
                      {step.step}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-ink-faint group-hover:text-[#00C9A7] transition-colors">
                      Phase 0{i + 1}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0E0E2C] mb-2 group-hover:text-[#1E3AE0] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
