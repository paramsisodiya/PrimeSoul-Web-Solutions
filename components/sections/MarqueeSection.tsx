'use client'

export default function MarqueeSection() {
  const items = [
    'Design', 'Development', 'Strategy', 'Performance', 'Branding', 'SEO', 'UI/UX', 'Optimization'
  ]

  // Duplicate for seamless loop
  const repeated = [...items, ...items, ...items, ...items]

  return (
    <section className="relative py-5 overflow-hidden" style={{ background: '#FAFAFE' }}>
      {/* Diagonal strip */}
      <div
        className="relative -mx-4"
        style={{
          transform: 'rotate(-2deg)',
          background: '#0E0E2C',
        }}
      >
        <div className="marquee-strip py-4">
          <div className="marquee-strip__inner">
            {repeated.map((item, i) => (
              <span key={i} style={{ color: i % 3 === 0 ? '#A855F7' : 'rgba(255,255,255,0.7)' }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Second strip going opposite direction */}
      <div
        className="relative -mx-4 -mt-1"
        style={{
          transform: 'rotate(2deg)',
          background: 'linear-gradient(135deg, #7B2FF2, #A855F7)',
        }}
      >
        <div className="marquee-strip py-3.5">
          <div className="marquee-strip__inner" style={{ animationDirection: 'reverse', animationDuration: '30s' }}>
            {repeated.map((item, i) => (
              <span key={i} style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
