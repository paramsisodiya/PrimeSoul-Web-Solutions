'use client'

import { useEffect, useRef, useState } from 'react'

export function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px 100px 0px' }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}
