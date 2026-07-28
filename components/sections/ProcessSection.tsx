'use client'

import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { PROCESS_STEPS } from '@/lib/data'

const STEP_IMAGES = [
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80', // Step 1: Discovery
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80', // Step 2: Strategy/Design
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500&q=80', // Step 3: Development
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&q=80', // Step 4: Launch
]

export default function ProcessSection() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: '#FAFAFE' }}>
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#1D4ED8]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <AnimatedSection className="mb-16 sm:mb-20 text-center max-w-2xl mx-auto">
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

        {/* Alternating Steps Stack */}
        <div className="space-y-16">
          {PROCESS_STEPS.map((step, i) => {
            const isImageLeft = i % 2 === 1
            const imageSrc = STEP_IMAGES[i] || STEP_IMAGES[0]

            return (
              <AnimatedSection key={step.step} delay={i * 100}>
                <div
                  className={`flex flex-col ${
                    isImageLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'
                  } items-center gap-10 bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/60 shadow-xl hover:shadow-2xl hover:border-[#7B2FF2]/30 transition-all duration-300`}
                >
                  {/* Text Content */}
                  <div className="w-full lg:w-1/2 space-y-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black"
                        style={{
                          background: 'linear-gradient(135deg, rgba(30,58,224,0.08) 0%, rgba(46,196,196,0.08) 100%)',
                          color: '#1E3AE0',
                        }}
                      >
                        {step.step}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#7B2FF2]">
                        Phase 0{i + 1}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#0E0E2C]">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative rounded-2xl overflow-hidden shadow-md group h-[220px] sm:h-[280px] w-full">
                      <Image
                        src={imageSrc}
                        alt={`${step.title} - PrimeSoul Process`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        unoptimized
                      />
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
