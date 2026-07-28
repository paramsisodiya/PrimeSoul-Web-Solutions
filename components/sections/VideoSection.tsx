'use client'

import { useState } from 'react'
import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import { Play, X } from 'lucide-react'

export default function VideoSection() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="relative w-full bg-[#0A0A1E] py-20 md:py-28 overflow-hidden text-white">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7B2FF2]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2EC4C4]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14 max-w-2xl mx-auto">
          <div className="flex justify-center mb-4">
            <SectionLabel dark>Showreel</SectionLabel>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
            See Our Work <span className="text-gradient-purple italic font-display">In Action</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg">
            A quick look at some of the projects we&apos;ve built for our clients.
          </p>
        </div>

        {/* 16:9 Thumbnail Container with Play Button Overlay */}
        <div
          className="group relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.5)] cursor-pointer"
          onClick={() => setModalOpen(true)}
          data-cursor="Play"
        >
          {/* Unsplash Showreel Cover Image */}
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"
            alt="See Our Work In Action - PrimeSoul Showreel"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />

          {/* Center Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white text-[#7B2FF2] shadow-2xl transition-transform duration-300 group-hover:scale-110">
              <div className="absolute inset-0 rounded-full bg-white/30 animate-ping pointer-events-none" />
              <Play size={36} fill="#7B2FF2" className="ml-1" />
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono font-bold tracking-widest text-white/80 uppercase">
            <span>PrimeSoul Web Solutions</span>
            <span>01:00 Showreel</span>
          </div>
        </div>

        <p className="text-center mt-6 text-white/40 text-xs tracking-widest uppercase font-mono">
          Experience the PrimeSoul difference in just 60 seconds
        </p>
      </div>

      {/* Video Modal Lightbox */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-fadeIn">
          <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/20">
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Embedded YouTube Player */}
            {/* TODO: Replace with real showreel URL */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="PrimeSoul Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  )
}
