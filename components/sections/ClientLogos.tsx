'use client'

const CLIENTS = [
  { name: 'A&S Solar Solutions', category: 'Clean Energy' },
  { name: 'SVNS School Khilchipur', category: 'Education' },
  { name: 'MP Darpan', category: 'Digital Media' },
  { name: 'Sankalp Shikhar Academy', category: 'Education' },
  { name: 'Maa Saraswati Academy', category: 'Education' },
  { name: 'PrimeSoul Portfolio', category: 'Web App' },
]

export default function ClientLogos() {
  // Duplicate 3x for smooth, seamless loop
  const row1 = [...CLIENTS, ...CLIENTS, ...CLIENTS]
  const row2 = [...CLIENTS.slice(3), ...CLIENTS.slice(0, 3), ...CLIENTS, ...CLIENTS]

  return (
    <section
      className="relative overflow-hidden py-10 sm:py-12 select-none"
      style={{ background: '#070A1B' }}
    >
      {/* Centered Small Label */}
      <div className="text-center mb-6 px-4">
        <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A7A9E]">
          TRUSTED BY BUSINESSES ACROSS INDIA
        </p>
      </div>

      {/* Marquee Container (Pauses animation on hover) */}
      <div className="marquee-container relative w-full overflow-hidden space-y-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        
        {/* Top Row: Scrolls Left */}
        <div className="flex items-center gap-8 sm:gap-12 w-max marquee-left py-1">
          {row1.map((client, index) => (
            <div key={`row1-${client.name}-${index}`} className="flex items-center gap-8 sm:gap-12 flex-shrink-0">
              <div className="flex flex-col text-left">
                <span className="text-sm sm:text-base font-bold text-white leading-tight">
                  {client.name}
                </span>
                <span className="text-xs text-[#7A7A9E] mt-0.5 font-medium">
                  {client.category}
                </span>
              </div>
              <span className="text-[#7A7A9E]/40 text-sm font-normal">·</span>
            </div>
          ))}
        </div>

        {/* Bottom Row: Scrolls Right */}
        <div className="flex items-center gap-8 sm:gap-12 w-max marquee-right py-1">
          {row2.map((client, index) => (
            <div key={`row2-${client.name}-${index}`} className="flex items-center gap-8 sm:gap-12 flex-shrink-0">
              <div className="flex flex-col text-left">
                <span className="text-sm sm:text-base font-bold text-white leading-tight">
                  {client.name}
                </span>
                <span className="text-xs text-[#7A7A9E] mt-0.5 font-medium">
                  {client.category}
                </span>
              </div>
              <span className="text-[#7A7A9E]/40 text-sm font-normal">·</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
