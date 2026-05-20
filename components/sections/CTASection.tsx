'use client'

import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import MagneticButton from '@/components/ui/MagneticButton'

export default function CTASection() {
  const marqueeItems = ['Design', 'Development', 'Strategy', 'Performance', 'Branding', 'SEO', 'UI/UX', 'Optimization']
  const repeated = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-8 sm:p-12 md:p-20 text-center"
            style={{ background: '#0E0E2C' }}
          >
            {/* Mesh pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 50%, rgba(123,47,242,0.4) 0%, transparent 40%),
                  radial-gradient(circle at 80% 20%, rgba(232,121,249,0.3) 0%, transparent 40%)
                `,
              }}
            />
            {/* Grid */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                backgroundSize: '48px 48px',
              }}
            />

            <div className="relative">
              <div className="pill-badge pill-badge--dark mb-8 mx-auto w-fit">
                <span className="dot" style={{ background: '#A855F7' }} />
                Currently Accepting Projects
              </div>

              <h2
                className="text-[1.5rem] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-5 leading-tight tracking-[-0.03em]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Let&apos;s Make Something
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #A855F7 0%, #E879F9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Great Together!
                </span>
              </h2>

              <p className="text-white/40 text-sm sm:text-lg mb-8 sm:mb-10 max-w-md mx-auto">
                A quick conversation is all it takes to understand if we&apos;re the right fit for your project.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton strength={0.25} radius={150}>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-px w-full sm:w-auto"
                    style={{
                      background: 'linear-gradient(135deg, #7B2FF2 0%, #A855F7 100%)',
                      color: 'white',
                      boxShadow: '0 8px 32px -8px rgba(123,47,242,0.5)',
                    }}
                  >
                    Let&apos;s Talk!
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                      <path d="M4 10L10 4M10 4H5M10 4V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </MagneticButton>
                <MagneticButton strength={0.2} radius={120}>
                  <a
                    href="https://wa.me/918770404559?text=Hi%20PrimeSoul%2C%20I'd%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm font-semibold text-white border border-white/15 hover:bg-white/5 transition-all duration-200 w-full sm:w-auto"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Bottom marquee strip */}
      <div className="mt-16">
        <div
          style={{ background: 'linear-gradient(135deg, #7B2FF2, #A855F7)' }}
        >
          <div className="marquee-strip py-3.5">
            <div className="marquee-strip__inner" style={{ animationDuration: '20s' }}>
              {repeated.map((item, i) => (
                <span key={i} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
