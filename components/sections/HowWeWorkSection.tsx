'use client'

import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'

const CARDS = [
  {
    title: 'We Listen First',
    description: 'Every project starts with understanding your business, goals, and audience deeply.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
  },
  {
    title: 'We Build Fast',
    description: 'Rapid development with daily updates — most projects live within 1-2 weeks.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
  },
  {
    title: 'We Deliver Results',
    description: 'Not just a website — a business tool that brings real clients and revenue.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
  },
]

export default function HowWeWorkSection() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden select-none bg-[#0E0E2C] text-white">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-60 bg-[#7B2FF2]/10 blur-[120px] pointer-events-none" />

      {/* Top Divider Line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(123, 47, 242, 0.4) 50%, transparent 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A855F7] mb-3">
            HOW WE WORK
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Work With a Team That&apos;s Built to Deliver
          </h2>
        </AnimatedSection>

        {/* 3 Column Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {CARDS.map((card, index) => (
            <AnimatedSection key={card.title} delay={index * 100}>
              <div className="group relative rounded-2xl overflow-hidden h-[300px] lg:h-[400px] w-full cursor-pointer border border-white/10 shadow-xl">
                {/* Background Image */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-400 ease-out group-hover:scale-105"
                  unoptimized
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-all duration-400" />

                {/* Bottom Glassmorphic Text Panel */}
                <div className="absolute bottom-4 left-4 right-4 p-5 sm:p-6 z-10 space-y-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 group-hover:bg-white/15 group-hover:border-[#2EC4C4]/40">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                    {card.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Bottom Divider Line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(123, 47, 242, 0.3) 50%, transparent 100%)',
        }}
      />
    </section>
  )
}
