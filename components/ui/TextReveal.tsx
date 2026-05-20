'use client'

import { useEffect, useRef, useState } from 'react'

interface TextRevealProps {
  children: string
  className?: string
  style?: React.CSSProperties
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  delay?: number
  stagger?: number
  type?: 'word' | 'character' | 'line'
}

export default function TextReveal({
  children,
  className = '',
  style = {},
  as: Tag = 'p',
  delay = 0,
  stagger = 0.04,
  type = 'word',
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const items = type === 'word'
    ? children.split(' ')
    : type === 'character'
    ? children.split('')
    : [children]

  return (
    <Tag
      ref={ref as any}
      className={`${className}`}
      style={{ ...style, overflow: 'hidden' }}
    >
      {items.map((item, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
            transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1)`,
            transitionDelay: `${delay + i * stagger}s`,
          }}
        >
          {item}
          {type === 'word' && i < items.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  )
}
