'use client'

import { useState } from 'react'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { CheckCircle2 } from 'lucide-react'

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

const STATS = [
  { value: '3+', label: 'Years of Experience' },
  { value: '35+', label: 'Projects Delivered' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '8–10', label: 'Team Members' },
]

export default function AboutSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden bg-white mesh-gradient-bg">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column: Company Intro + Mission + Stats */}
          <AnimatedSection direction="left">
            <div className="sticky top-32">
              <SectionLabel>Who We Are</SectionLabel>
              <h2 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-tight tracking-[-0.03em] mb-6 sm:mb-8 text-[#0E0E2C]">
                Built to Deliver. <span className="text-gradient-purple font-display italic">Driven by Results.</span>
              </h2>
              <div className="space-y-6 text-base text-ink-secondary leading-relaxed">
                <p>
                  PrimeSoul Web Solutions is a focused digital agency based in Rajgarh, Madhya Pradesh — helping businesses across India establish a powerful online presence. With 3 years of experience, 35+ successful projects, and a dedicated team of professionals, we combine strategy, design, and technology to deliver real business outcomes.
                </p>
              </div>

              {/* Our Mission */}
              <div className="mt-10 sm:mt-12 p-6 rounded-2xl bg-surface-base border border-surface-border">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-primary mb-3">OUR MISSION</p>
                <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                  To empower every business — big or small — with a premium digital presence that drives real growth, builds trust, and creates lasting impact.
                </p>
              </div>

              {/* Company Stats Row */}
              <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-2xl bg-surface-subtle/50 border border-surface-border transition-all duration-300 hover:border-brand-primary/20 hover:shadow-sm"
                  >
                    <p
                      className="text-2xl sm:text-3xl font-extrabold mb-1"
                      style={{
                        background: 'linear-gradient(135deg, #1E3AE0 0%, #2EC4C4 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm text-ink-muted font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column: What We Do */}
          <AnimatedSection direction="right" delay={200}>
            <div>
              <SectionLabel>What We Do</SectionLabel>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-8 text-[#0E0E2C]">
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
                        <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 transition-colors text-[#0E0E2C]">
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

        {/* PART 8a — Split 50/50 Section BELOW: Our Work Process + Unsplash Stock Photo */}
        <AnimatedSection className="pt-12 border-t border-surface-border">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side: Heading + Bullet points */}
            <div className="space-y-6">
              <SectionLabel>Our Execution Blueprint</SectionLabel>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0E0E2C] leading-tight">
                Our Work Process & <span className="text-gradient-purple font-display italic">Engineering Standards</span>
              </h3>
              <p className="text-base text-ink-secondary leading-relaxed">
                We follow a disciplined agile framework that blends strategy, modern component design, and daily deployment pipelines.
              </p>

              <ul className="space-y-4 pt-2">
                {[
                  'In-depth business discovery & technical architecture scoping',
                  'Figma UI/UX wireframing with interactive prototype demos',
                  'Clean Next.js 14 App Router & TypeScript codebase development',
                  'Comprehensive 100/100 Core Web Vitals performance & SEO testing',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base font-semibold text-[#0E0E2C]">
                    <CheckCircle2 size={20} className="text-[#7B2FF2] flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side: Stock photo with hover zoom */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-surface-border group h-[320px] sm:h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80"
                alt="Developer working on laptop clean professional workspace"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E2C]/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/20 shadow-md">
                <p className="text-xs font-bold text-[#0E0E2C]">Rajgarh Digital Studio</p>
                <p className="text-[11px] text-ink-muted">High-performance Next.js & React Applications</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
