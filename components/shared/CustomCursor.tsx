'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  
  const mouse = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  
  const [hoverState, setHoverState] = useState<'none' | 'pointer' | 'image'>('none')
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768
    setIsTouch(touch)
    if (touch) return

    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }

      // Check hover element
      const target = e.target as HTMLElement | null
      if (target) {
        const isImage = target.tagName === 'IMG' || target.closest('img') || target.closest('[data-cursor-image]')
        const isClickable = target.closest('a, button, input, [role="button"], .cursor-pointer, [data-cursor="View"]')
        
        if (isImage) {
          setHoverState('image')
        } else if (isClickable) {
          setHoverState('pointer')
        } else {
          setHoverState('none')
        }
      }
    }

    const animateRing = () => {
      // Lerp ring movement
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.18
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.18

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`
      }
      rafId = requestAnimationFrame(animateRing)
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafId = requestAnimationFrame(animateRing)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (isTouch) return null

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* 6px Small Dot - Instant */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -ml-1 -mt-1 w-2.5 h-2.5 rounded-full bg-white transition-opacity duration-200 pointer-events-none"
        style={{
          opacity: hoverState !== 'none' ? 0 : 1,
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />

      {/* 32px Trailing Ring - Smooth Lerp */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 rounded-full pointer-events-none flex items-center justify-center transition-all duration-300 ease-out border"
        style={{
          width: hoverState === 'image' ? '64px' : hoverState === 'pointer' ? '52px' : '32px',
          height: hoverState === 'image' ? '64px' : hoverState === 'pointer' ? '52px' : '32px',
          marginLeft: hoverState === 'image' ? '-32px' : hoverState === 'pointer' ? '-26px' : '-16px',
          marginTop: hoverState === 'image' ? '-32px' : hoverState === 'pointer' ? '-26px' : '-16px',
          borderColor: hoverState !== 'none' ? 'rgba(123, 47, 242, 0.8)' : 'rgba(255, 255, 255, 0.4)',
          backgroundColor: hoverState === 'pointer' ? 'rgba(123, 47, 242, 0.15)' : hoverState === 'image' ? 'rgba(14, 14, 44, 0.75)' : 'transparent',
          backdropFilter: hoverState === 'image' ? 'blur(4px)' : 'none',
          willChange: 'transform',
        }}
      >
        {hoverState === 'image' && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-white animate-fadeIn">
            View
          </span>
        )}
      </div>
    </div>
  )
}
