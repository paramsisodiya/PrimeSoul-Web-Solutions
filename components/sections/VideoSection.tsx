'use client'

import { useEffect, useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0E0E2C] py-16 md:py-24 overflow-hidden"
    >
      {/* Background glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7B2FF2] opacity-10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E879F9] opacity-8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label + heading */}
        <div className="text-center mb-10 md:mb-14">
          <div className="flex justify-center mb-4">
            <SectionLabel>QUICK EXPLAIN</SectionLabel>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            See PrimeSoul{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B2FF2] to-[#E879F9]">
              In Action
            </span>
          </h2>
          <p className="mt-4 text-[#7A7A9E] text-base md:text-lg max-w-xl mx-auto">
            A quick look at who we are, what we do, and why businesses choose us.
          </p>
        </div>

        {/* Video container */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(123,47,242,0.25)]">

          {/* Purple top line accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7B2FF2] via-[#E879F9] to-[#2EC4C4] z-10" />

          <video
            ref={videoRef}
            className="w-full h-auto block"
            muted
            loop
            playsInline
            preload="metadata"
            poster=""
          >
            <source src="/videos/primesoul-intro.mp4" type="video/mp4" />
          </video>

          {/* Subtle vignette overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0E0E2C]/30 via-transparent to-transparent" />
        </div>

        {/* Bottom tag line */}
        <p className="text-center mt-6 text-[#7A7A9E] text-sm tracking-widest uppercase">
          Experience the PrimeSoul difference in just 60 seconds
        </p>

      </div>
    </section>
  )
}
