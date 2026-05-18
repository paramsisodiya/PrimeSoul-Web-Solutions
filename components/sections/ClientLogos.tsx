'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'

const CLIENTS = [
  { name: 'A&S Solar Solutions', initials: 'A&S', icon: 'solar' },
  { name: 'SVNS School Khilchipur', initials: 'SV', icon: 'edu' },
  { name: 'Param Portfolio', initials: 'PP', icon: 'portfolio' },
  { name: 'E-Commerce Platform', initials: 'EC', icon: 'ecom' },
]

// Premium SVG icons for each client category
function ClientIcon({ type, size = 22 }: { type: string; size?: number }) {
  const strokeColor = 'rgba(255,255,255,0.55)'
  const strokeWidth = 1.4

  switch (type) {
    case 'solar':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      )
    case 'edu':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
        </svg>
      )
    case 'portfolio':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      )
    case 'ecom':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
      )
    default:
      return null
  }
}

export default function ClientLogos() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: '#0E0E2C',
        paddingTop: '20px',
        paddingBottom: '24px',
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(123,47,242,0.3) 50%, transparent 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="flex flex-col items-center">
            <p
              className="text-center text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] mb-4 sm:mb-5"
              style={{
                color: 'rgba(255,255,255,0.25)',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Trusted by growing businesses
            </p>

            <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-14">
              {CLIENTS.map((client, i) => (
                <div
                  key={client.name}
                  className="group relative flex flex-col items-center"
                >
                  {/* Outlined circle with icon */}
                  <div
                    className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-full flex items-center justify-center transition-all duration-500 group-hover:border-purple-500/40 group-hover:shadow-[0_0_20px_rgba(123,47,242,0.15)]"
                    style={{
                      border: '1.5px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <ClientIcon type={client.icon} size={22} />
                  </div>

                  {/* Tooltip on hover */}
                  <div
                    className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 pointer-events-none"
                    style={{
                      fontSize: '9px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      color: 'rgba(255,255,255,0.35)',
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {client.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(123,47,242,0.2) 50%, transparent 100%)',
        }}
      />
    </section>
  )
}
