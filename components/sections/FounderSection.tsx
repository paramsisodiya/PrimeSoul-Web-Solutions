'use client'

import { useState, useRef, MouseEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { AGENCY } from '@/lib/data'

export default function FounderSection() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <section className="py-20 sm:py-32 relative overflow-hidden bg-white">
      {/* Decorative large text background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 pointer-events-none opacity-[0.02] select-none z-0">
        <span className="text-[20vw] font-black tracking-tighter leading-none whitespace-nowrap">CRAFT</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text first on desktop */}
          <AnimatedSection direction="left" className="order-2 lg:order-1">
            <SectionLabel>About the Founder</SectionLabel>
            <h2
              className="text-[2rem] sm:text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-[-0.03em] mb-6 sm:mb-8"
              style={{ color: '#0E0E2C' }}
            >
              Not an Agency.
              <br />
              <span className="text-gradient-purple font-display italic relative inline-block mt-2">
                A Craftsman.
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-primary opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-ink-secondary leading-relaxed mb-8 sm:mb-10">
              <p>
                Every project that leaves PrimeSoul has been personally handled by <strong className="text-ink font-semibold">{AGENCY.founder.name}</strong>. No outsourcing. No juniors. The person you talk to is the person who builds your product.
              </p>
              <p>
                Based in Rajgarh MP, working with clients across India and globally — bringing senior-level engineering and award-winning design craft to every engagement, regardless of scale.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                { icon: '⌘', text: 'Full-stack Engineering' },
                { icon: '✧', text: 'Pixel-perfect UI/UX' },
                { icon: '⚡', text: 'Performance Obsessive' },
                { icon: '★', text: 'Strategic Thinking' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 p-3 rounded-xl bg-surface-subtle/50 border border-surface-border transition-all hover:bg-surface-subtle hover:border-brand-primary/20 hover:shadow-sm">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white shadow-sm text-brand-primary text-sm font-black">
                    {item.icon}
                  </span>
                  <span className="text-sm font-semibold text-ink">{item.text}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(123,47,242,0.4)]"
              style={{ background: 'linear-gradient(135deg, #7B2FF2 0%, #A855F7 100%)' }}
            >
              Read Full Story
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </AnimatedSection>

          {/* Image with interactive spotlight effect */}
          <AnimatedSection direction="right" className="order-1 lg:order-2">
            <div className="relative max-w-md mx-auto lg:ml-auto perspective-1000">
              <div
                ref={cardRef}
                className="relative rounded-3xl overflow-hidden aspect-[4/5] transition-all duration-500 ease-out group cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  boxShadow: isHovered 
                    ? '0 32px 80px -16px rgba(123,47,242,0.3)' 
                    : '0 24px 60px -16px rgba(123,47,242,0.15)',
                  border: '1px solid rgba(232,229,245,0.8)',
                  transform: isHovered 
                    ? `rotateX(${(mousePos.y - 200) / 25}deg) rotateY(${-(mousePos.x - 200) / 25}deg)` 
                    : 'rotateX(0) rotateY(0)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Spotlight gradient */}
                <div
                  className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15), transparent 40%)`,
                  }}
                />

                <Image
                  src="/images/founder.jpg"
                  alt={`${AGENCY.founder.name} — Founder of PrimeSoul`}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Advanced overlay gradients */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0E0E2C]/80 via-[#0E0E2C]/20 to-transparent opacity-80" />
                <div className="absolute inset-0 z-10 bg-gradient-to-tr from-brand-primary/40 via-transparent to-brand-accent/20 mix-blend-overlay opacity-60" />

                {/* Content inside card */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-30 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/80 text-sm font-medium mb-1 uppercase tracking-widest">{AGENCY.founder.role}</p>
                      <p className="text-white text-3xl font-bold">{AGENCY.founder.name}</p>
                    </div>
                    
                    {/* Status beacon */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-[#0E0E2C]"></span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-green-400 tracking-wider">Avail</span>
                    </div>
                  </div>
                  
                  {/* Hover reveal line */}
                  <div className="h-px w-full bg-white/20 mt-6 mb-4 overflow-hidden">
                    <div 
                      className="h-full bg-white transition-transform duration-1000 ease-out" 
                      style={{ transform: isHovered ? 'translateX(0)' : 'translateX(-100%)' }}
                    />
                  </div>
                  
                  <div className="flex gap-4 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
                    <a href="https://www.instagram.com/primesoul.tech/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-accent transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="https://wa.me/918770404559" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-accent transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
