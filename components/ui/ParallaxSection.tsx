'use client'

import { useEffect, useRef, useState } from 'react'

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  className?: string
  style?: React.CSSProperties
}

export default function ParallaxSection({
  children,
  speed = 0.3,
  className = '',
  style = {},
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    // Skip parallax on mobile for performance
    if (typeof window === 'undefined' || window.innerWidth < 768) return

    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      if (rect.bottom < 0 || rect.top > windowHeight) return
      const centerOffset = (rect.top - windowHeight / 2) * speed
      requestAnimationFrame(() => setOffset(centerOffset))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `translateY(${offset}px)`,
        willChange: 'transform',
        transition: 'transform 0.1s linear',
      }}
    >
      {children}
    </div>
  )
}
