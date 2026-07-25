'use client'

import { useState } from 'react'
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

const STATS = [
  { value: '3+', label: 'Years of Experience' },
  { value: '35+', label: 'Projects Delivered' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '8–10', label: 'Team Members' },
]

const LEADERSHIP = [
  {
    name: 'Param Sisodiya',
    role: 'Founder',
    description: 'Visionary behind PrimeSoul, driving the agency\u2019s direction, client relationships, and overall growth strategy.',
    isPrimary: true,
  },
  {
    name: 'Shyam Sisodiya',
    role: 'CEO',
    description: 'Leading day-to-day operations and ensuring every project is delivered with precision, quality, and on time.',
    isPrimary: false,
  },
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
          
          {/* Left Column: Company Intro + Mission + Stats */}
          <AnimatedSection direction="left">
            <div className="sticky top-32">
              <SectionLabel>Who We Are</SectionLabel>
              <h2
                className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-tight tracking-[-0.03em] mb-6 sm:mb-8"
              >
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
                        background: 'linear-gradient(135deg, #0a46aa 0%, #1EB4C8 100%)',
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

              {/* Leadership Section */}
              <div className="mt-10 sm:mt-12">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink-muted mb-5">LEADERSHIP</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {LEADERSHIP.map((leader) => (
                    <div
                      key={leader.name}
                      className="relative p-5 sm:p-6 rounded-2xl bg-white border transition-all duration-300 hover:shadow-md"
                      style={{
                        borderColor: leader.isPrimary ? 'rgba(123,47,242,0.25)' : '#E8E5F5',
                        borderLeftWidth: leader.isPrimary ? '3px' : '1px',
                        borderLeftColor: leader.isPrimary ? '#7B2FF2' : '#E8E5F5',
                      }}
                    >
                      <h4
                        className="text-base sm:text-lg font-bold mb-1"
                        style={{
                          fontWeight: leader.isPrimary ? 800 : 700,
                        }}
                      >
                        {leader.name}
                      </h4>
                      <span
                        className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3"
                        style={{
                          background: 'rgba(123,47,242,0.08)',
                          color: '#7B2FF2',
                        }}
                      >
                        {leader.role}
                      </span>
                      <p className="text-sm text-ink-secondary leading-relaxed">
                        {leader.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column: What We Do */}
          <AnimatedSection direction="right" delay={200}>
            <div>
              <SectionLabel>What We Do</SectionLabel>
              <h3
                className="text-2xl sm:text-3xl font-extrabold mb-8"
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
                          className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 transition-colors"
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
