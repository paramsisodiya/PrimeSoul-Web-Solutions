'use client'

import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'

const PROCESS_STEPS_ALTERNATING = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    description: 'We dive deep into your business goals, target audience, and competitive market to engineer a custom digital roadmap.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80',
    imageAlt: 'Discovery and strategy meeting',
  },
  {
    step: '02',
    title: 'UI/UX Experience Design',
    description: 'Creating high-fidelity Figma prototypes, modern color systems, and intuitive user journeys crafted for high conversions.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80',
    imageAlt: 'UI/UX experience design',
  },
  {
    step: '03',
    title: 'Next.js Engineering',
    description: 'Building fast, accessible, and responsive applications using Next.js 14, React, TypeScript, and serverless backends.',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500&q=80',
    imageAlt: 'Web engineering and code development',
  },
  {
    step: '04',
    title: 'Launch & Continuous Growth',
    description: 'Rigorous 100/100 Core Web Vitals optimization, live domain deployment, SEO indexing, and ongoing technical support.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&q=80',
    imageAlt: 'Product launch and growth monitoring',
  },
]

export default function ProcessSection() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#FAFAFE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <AnimatedSection className="mb-16 sm:mb-20 text-center max-w-2xl mx-auto">
          <SectionLabel>How We Work</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em] mb-4 text-[#0E0E2C]">
            A Process Designed for{' '}
            <span className="text-gradient-purple font-display italic">Clarity & Speed</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
            No black boxes. No surprises. You get complete transparency and real-time progress updates at every stage.
          </p>
        </AnimatedSection>

        {/* Alternating 50/50 Layout for 4 Steps (PART 8e) */}
        <div className="space-y-16 sm:space-y-24">
          {PROCESS_STEPS_ALTERNATING.map((step, index) => {
            const isEven = index % 2 === 0
            return (
              <AnimatedSection key={step.step} delay={index * 80}>
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Text Column */}
                  <div className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="inline-flex items-center gap-3">
                      <span className="w-12 h-12 rounded-2xl bg-[#7B2FF2]/10 text-[#7B2FF2] font-black text-lg flex items-center justify-center border border-[#7B2FF2]/20">
                        {step.step}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#00C9A7] uppercase tracking-widest">
                        Phase 0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0E0E2C] leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Image Column */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative rounded-2xl overflow-hidden h-[260px] sm:h-[280px] w-full border border-surface-border shadow-xl group">
                      <Image
                        src={step.image}
                        alt={step.imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E2C]/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
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
