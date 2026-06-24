'use client'

import { useState } from 'react'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'

const WHAT_WE_DO = [
  {
    title: 'Digital Strategy',
    description: 'We align your business goals with user needs to craft comprehensive roadmaps that drive measurable growth and long-term success.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
    )
  },
  {
    title: 'Experience Design',
    description: 'Creating intuitive, accessible, and stunning interfaces that captivate users and elevate your brand identity across all touchpoints.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
    )
  },
  {
    title: 'Engineering Excellence',
    description: 'Building robust, scalable, and high-performance applications using cutting-edge modern technologies and best practices.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
    )
  }
]

export default function AboutSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden bg-white mesh-gradient-bg">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Who We Are */}
          <AnimatedSection direction="left">
            <div className="sticky top-32">
              <SectionLabel>Who We Are</SectionLabel>
              <h2
                className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-tight tracking-[-0.03em] mb-6 sm:mb-8 text-ink"
              >
                We are architects of the <span className="text-gradient-purple font-display italic">digital realm</span>.
              </h2>
              <div className="space-y-6 text-base text-ink-secondary leading-relaxed">
                <p>
                  PrimeSoul isn&apos;t just another agency. We are a collective of passionate creators, strategic thinkers, and technical experts dedicated to transforming bold visions into extraordinary digital realities.
                </p>
                <p>
                  Founded on the belief that digital experiences should be both breathtaking and highly functional, we bridge the gap between aesthetic brilliance and engineering excellence. We don&apos;t just build websites; we craft digital ecosystems that empower brands to dominate their industries.
                </p>
                <p>
                  Our approach is rooted in partnership. We immerse ourselves in your business, understanding your unique challenges and objectives, to deliver bespoke solutions that create lasting impact.
                </p>
              </div>
              
              {/* Stats/Highlight ribbon */}
              <div className="mt-10 sm:mt-12 inline-flex items-center gap-6 p-4 rounded-2xl bg-surface-base border border-surface-border">
                <div className="flex -space-x-4">
                  <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden relative bg-brand-primary/20">
                     <Image src="/images/team-working.png" alt="Team" fill className="object-cover" />
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-brand-dark text-white font-bold text-sm" style={{ background: '#0E0E2C' }}>
                    100%
                  </div>
                </div>
                <div>
                  <p className="font-bold text-ink">In-House Talent</p>
                  <p className="text-sm text-ink-muted">No outsourcing, guaranteed.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column: What We Do */}
          <AnimatedSection direction="right" delay={200}>
            <div>
              <SectionLabel>What We Do</SectionLabel>
              <h3
                className="text-2xl sm:text-3xl font-extrabold mb-8 text-ink"
              >
                Comprehensive digital excellence.
              </h3>
              
              <div className="space-y-6 sm:space-y-8">
                {WHAT_WE_DO.map((item, index) => (
                  <div 
                    key={item.title}
                    className="relative p-6 sm:p-8 rounded-3xl transition-all duration-500 overflow-hidden group"
                    style={{
                      background: hoveredCard === index ? '#FAFAFE' : 'transparent',
                      border: `1px solid ${hoveredCard === index ? 'rgba(123,47,242,0.1)' : 'transparent'}`,
                      transform: hoveredCard === index ? 'translateY(-4px)' : 'translateY(0)'
                    }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Hover Glow */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: 'linear-gradient(135deg, rgba(123,47,242,0.03) 0%, rgba(232,121,249,0.03) 100%)' }}
                    />
                    
                    <div className="flex gap-5 sm:gap-6 relative z-10">
                      <div 
                        className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-500"
                        style={{
                          background: hoveredCard === index ? 'linear-gradient(135deg, #7B2FF2, #A855F7)' : 'rgba(123,47,242,0.08)',
                          color: hoveredCard === index ? 'white' : '#7B2FF2',
                          boxShadow: hoveredCard === index ? '0 12px 24px -8px rgba(123,47,242,0.4)' : 'none'
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h4 
                          className="text-lg sm:text-xl font-bold text-ink mb-2 sm:mb-3 transition-colors"
                        >
                          {item.title}
                        </h4>
                        <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}
