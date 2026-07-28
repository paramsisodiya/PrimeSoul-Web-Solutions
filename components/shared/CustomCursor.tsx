'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const glowRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // Only on non-touch devices
    if (typeof window === 'undefined') return
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    let rafId: number

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
      rafId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', move, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Subtle glow that follows the cursor tip — normal cursor stays visible */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: '18px',
          height: '18px',
          marginLeft: '-2px',
          marginTop: '-2px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,47,242,0.35) 0%, rgba(123,47,242,0.08) 50%, transparent 70%)',
          filter: 'blur(1px)',
          willChange: 'transform',
        }}
      />
    </>
  )
}
