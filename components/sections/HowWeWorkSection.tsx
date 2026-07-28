'use client'

import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'

const CARDS = [
  {
    id: 'listen',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
    title: 'We Listen First',
    description: 'Every project starts with understanding your business, goals, and audience deeply.',
  },
  {
    id: 'build',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
    title: 'We Build Fast',
    description: 'Rapid development with daily updates — most projects live within 1-2 weeks.',
  },
  {
    id: 'deliver',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
    title: 'We Deliver Results',
    description: 'Not just a website — a business tool that brings you real clients and revenue.',
  },
]

export default function HowWeWorkSection() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#0A0A1E] text-white">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7B2FF2]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#2EC4C4]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14">
          <SectionLabel dark>Made To Flex</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
            How We Partner <span className="text-gradient-purple italic font-display">With You</span>
          </h2>
          <p className="text-base text-white/60 leading-relaxed">
            Our agile, client-first approach ensures speed, precision, and business outcomes.
          </p>
        </AnimatedSection>

        {/* 3 Column Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CARDS.map((card, index) => (
            <AnimatedSection key={card.id} delay={index * 100}>
              <div
                className="group relative rounded-2xl overflow-hidden h-[300px] md:h-[400px] border border-white/10 shadow-2xl cursor-pointer"
                data-cursor-image
              >
                {/* Background Image */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A1E] via-[#0A0A1E]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col justify-end z-10">
                  <span className="text-xs font-mono font-bold text-[#00C9A7] uppercase tracking-widest mb-2">
                    0{index + 1}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-[#00C9A7] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
