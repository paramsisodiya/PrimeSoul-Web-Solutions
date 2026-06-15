'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px]">
      <div
        className="h-full scroll-progress-bar transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
      {/* Glow tip at the end */}
      {progress > 0 && (
        <div
          className="absolute top-0 h-full w-4 transition-[left] duration-100 ease-out"
          style={{
            left: `calc(${progress}% - 8px)`,
            background: 'radial-gradient(circle, rgba(123,47,242,0.6), transparent)',
            filter: 'blur(2px)',
          }}
        />
      )}
    </div>
  )
}
