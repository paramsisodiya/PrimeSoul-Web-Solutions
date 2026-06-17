'use client'

import { useState, useRef, useCallback } from 'react'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  height?: number
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  height = 400,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(2, Math.min(98, (x / rect.width) * 100))
    setPosition(percent)
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    updatePosition(e.clientX)
  }, [updatePosition])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    updatePosition(e.clientX)
  }, [isDragging, updatePosition])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true)
    updatePosition(e.touches[0].clientX)
  }, [updatePosition])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return
    updatePosition(e.touches[0].clientX)
  }, [isDragging, updatePosition])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl select-none cursor-col-resize group"
      style={{ height }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* After image (full width, behind) */}
      <div className="absolute inset-0" style={{ backgroundImage: `url(${afterImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${beforeImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
        }}
      />

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 z-10 transition-none"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        {/* Vertical line */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-white/80 left-1/2 -translate-x-1/2" style={{ boxShadow: '0 0 8px rgba(0,0,0,0.3)' }} />

        {/* Handle circle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-200"
          style={{
            background: 'linear-gradient(135deg, #7B2FF2, #E879F9)',
            boxShadow: '0 4px 16px rgba(123,47,242,0.4)',
            transform: `translate(-50%, -50%) scale(${isDragging ? 1.15 : 1})`,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M5 9L3 9M15 9L13 9M5 9L7 7M5 9L7 11M13 9L11 7M13 9L11 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-semibold text-white" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
        {beforeLabel}
      </div>
      <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-semibold text-white" style={{ background: 'rgba(123,47,242,0.7)', backdropFilter: 'blur(8px)' }}>
        {afterLabel}
      </div>
    </div>
  )
}
