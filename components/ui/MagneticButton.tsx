'use client'

import { useRef, useState, useCallback, useEffect } from 'react'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  as?: 'button' | 'a' | 'div'
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
  strength?: number
  radius?: number
}

export default function MagneticButton({
  children,
  className = '',
  style = {},
  as = 'div',
  href,
  target,
  rel,
  onClick,
  strength = 0.3,
  radius = 200,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const distance = Math.sqrt(distX * distX + distY * distY)

      if (distance < radius) {
        const factor = (1 - distance / radius) * strength
        cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => {
          setTransform({ x: distX * factor, y: distY * factor })
        })
      } else {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => {
          setTransform({ x: 0, y: 0 })
        })
      }
    },
    [strength, radius]
  )

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    setTransform({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const parent = el.closest('section') || document
    parent.addEventListener('mousemove', handleMouseMove as EventListener)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove as EventListener)
      el.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [handleMouseMove, handleMouseLeave])

  const Tag = as as any

  const mergedStyle = {
    ...style,
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    transition: transform.x === 0 && transform.y === 0
      ? 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)'
      : 'transform 0.15s cubic-bezier(0.33, 1, 0.68, 1)',
    willChange: 'transform',
  }

  return (
    <Tag
      ref={ref}
      className={className}
      style={mergedStyle}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
    >
      {children}
    </Tag>
  )
}
