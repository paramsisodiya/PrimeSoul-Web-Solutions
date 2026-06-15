'use client'

import { useState, useEffect } from 'react'

export default function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  // Show tooltip on first visit after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true)
      const hide = setTimeout(() => setShowTooltip(false), 4000)
      return () => clearTimeout(hide)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const isTooltipVisible = hovered || showTooltip

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Tooltip */}
      <div
        className="absolute bottom-20 right-0 text-white text-xs px-4 py-2.5 rounded-xl whitespace-nowrap transition-all duration-300 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #7B2FF2, #A855F7)',
          boxShadow: '0 8px 24px rgba(123,47,242,0.3)',
          opacity: isTooltipVisible ? 1 : 0,
          transform: isTooltipVisible ? 'translateY(0) translateX(-8px)' : 'translateY(8px) translateX(-8px)',
          visibility: isTooltipVisible ? 'visible' : 'hidden',
        }}
      >
        💬 Chat with us!
        <div
          className="absolute w-2 h-2 bottom-[-4px] right-5 transform rotate-45"
          style={{ background: '#A855F7' }}
        />
      </div>

      {/* Pulsing Ring Effect — multiple rings */}
      {!hovered && (
        <>
          <div
            className="absolute inset-0"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              border: '2px solid rgba(123, 47, 242, 0.3)',
              animation: 'wa-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              border: '1px solid rgba(123, 47, 242, 0.15)',
              animation: 'wa-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.5s',
            }}
          />
        </>
      )}

      {/* Main Button */}
      <a
        href="https://wa.me/918770404559?text=Hi%20PrimeSoul%2C%20I%27m%20interested%20in%20working%20with%20you."
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative w-16 h-16 flex items-center justify-center transition-all duration-300 cursor-pointer btn-tap"
        style={{
          animation: hovered ? 'none' : 'wa-float 3s ease-in-out infinite',
        }}
        aria-label="Message us on WhatsApp"
      >
        {/* Gradient Circle Background */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #7B2FF2 0%, #E879F9 100%)',
            boxShadow: hovered
              ? '0 12px 40px rgba(123, 47, 242, 0.5), 0 0 25px rgba(232, 121, 249, 0.4)'
              : '0 6px 24px rgba(123, 47, 242, 0.35)',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
          }}
        />

        {/* Inner glow */}
        <div
          className="absolute inset-1 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15), transparent)',
          }}
        />

        {/* WhatsApp Icon */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="white"
          className="relative z-10 transition-transform duration-300"
          style={{
            transform: hovered ? 'scale(1.15) rotate(-5deg)' : 'scale(1) rotate(0deg)',
          }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

      <style>{`
        @keyframes wa-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes wa-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
