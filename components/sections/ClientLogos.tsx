'use client'

import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'

const CLIENT_ITEMS = [
  {
    name: 'A&S Solar Solutions',
    category: 'Clean Energy · Web Platform',
    image: '/images/project-solar.png',
    badge: 'Solar Tech',
  },
  {
    name: 'SVNS Educational School',
    category: 'EdTech & Student Portal',
    image: '/images/project-school.png',
    badge: 'Education',
  },
  {
    name: 'Param Web Solutions',
    category: 'Creative Portfolio',
    image: '/images/project-portfolio.png',
    badge: 'Portfolio',
  },
  {
    name: 'PrimeOMS Restaurant OS',
    category: 'Restaurant SaaS & KDS',
    image: '/images/primeoms-dashboard.jpg',
    badge: 'Flagship SaaS',
  },
  {
    name: 'Urban Goods E-Commerce',
    category: 'Retail & Mobile Shopping',
    image: '/images/mobile-app-showcase.png',
    badge: 'E-Commerce',
  },
  {
    name: 'PrimeOMS Live Pipeline',
    category: 'Kitchen Order Management',
    image: '/images/primeoms-orders.jpg',
    badge: 'Operations',
  },
]

export default function ClientLogos() {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...CLIENT_ITEMS, ...CLIENT_ITEMS, ...CLIENT_ITEMS]

  return (
    <section
      className="relative overflow-hidden py-12 sm:py-16 select-none"
      style={{ background: '#070A1B' }}
    >
      {/* Top Ambient Glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-[#1D4ED8]/10 blur-[100px] pointer-events-none" />

      {/* Top Accent Divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(29, 78, 216, 0.4) 50%, transparent 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10 text-center">
        <AnimatedSection>
          {/* Header Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-3 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#00C9A7] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00C9A7]">
              Trusted By Growing Businesses
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Powering Digital Growth Across Industries
          </h3>
        </AnimatedSection>
      </div>

      {/* Peak Infinite Marquee Banner with Edge Fade Mask */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex items-center gap-4 sm:gap-6 w-max animate-marquee-left hover:[animation-play-state:paused] py-2">
          {marqueeItems.map((client, index) => {
            return (
              <div
                key={`${client.name}-${index}`}
                className="group relative flex items-center gap-3.5 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#00C9A7]/50 transition-all duration-300 min-w-[270px] sm:min-w-[310px] shadow-lg hover:shadow-[0_10px_30px_-10px_rgba(0,201,167,0.25)] hover:-translate-y-1 cursor-pointer"
              >
                {/* Real Project Image Thumbnail */}
                <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/15 bg-black/40 shadow-inner transition-transform duration-300 group-hover:scale-105 group-hover:border-[#00C9A7]/60">
                  <Image
                    src={client.image}
                    alt={client.name}
                    fill
                    className="object-cover object-top"
                    sizes="48px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Text Info */}
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-sm font-bold text-white group-hover:text-[#00C9A7] transition-colors leading-tight truncate">
                    {client.name}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-semibold text-white/50 group-hover:text-white/80 transition-colors truncate">
                      {client.category}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/10 text-[#00C9A7] font-mono font-medium flex-shrink-0">
                      {client.badge}
                    </span>
                  </div>
                </div>

                {/* Corner Glow Accent on Hover */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#00C9A7]/20 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom Accent Divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 201, 167, 0.3) 50%, transparent 100%)',
        }}
      />

      {/* Inline styles for keyframe marquee animation if missing in CSS */}
      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee-left {
          animation: marquee-left 28s linear infinite;
        }
      `}</style>
    </section>
  )
}
