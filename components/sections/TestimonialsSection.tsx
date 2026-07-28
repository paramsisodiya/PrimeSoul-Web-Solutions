'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Star, ShieldCheck, Quote } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  message?: string
  content?: string
  rating?: number
  photo?: string
  resultMetric?: string
  resultLabel?: string
}

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Swadeep Singh Tomar',
    role: 'Director',
    company: 'Sankalp Shikhar Academy',
    message: 'PrimeSoul delivered our school portal in just 10 days! Parents love the mobile online admissions system and student noticeboards.',
    rating: 5,
    resultMetric: '+240%',
    resultLabel: 'Online Admissions',
  },
  {
    id: '2',
    name: 'Ankita Trivedi',
    role: 'Founder',
    company: 'Madhya Pradesh Darpan',
    message: 'The website speed is unbelievable — 100/100 Google PageSpeed! Our monthly active users jumped to over 5,000 within weeks.',
    rating: 5,
    resultMetric: '100/100',
    resultLabel: 'Google Speed Score',
  },
  {
    id: '3',
    name: 'A&S Group Management',
    role: 'Operations Lead',
    company: 'A&S Solar Solutions',
    message: 'Not just a pretty site — a real business tool. The WhatsApp lead capture integration quadrupled our daily customer inquiries.',
    rating: 5,
    resultMetric: '+310%',
    resultLabel: 'Lead Conversions',
  },
]

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'testimonials'), where('visible', '==', true)))
        if (!snap.empty) {
          const items = snap.docs.map(d => ({ id: d.id, ...d.data() } as Testimonial))
          setTestimonials(items)
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err)
      }
    }
    fetchTestimonials()
  }, [])

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#0E0E2C] text-white">
      {/* Mesh Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] blur-[150px] pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(123,47,242,0.5) 0%, rgba(46,196,196,0.3) 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
        <AnimatedSection className="mb-14 sm:mb-18 text-center max-w-3xl mx-auto">
          <SectionLabel dark>Client Stories & Results</SectionLabel>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Real Impact for <span className="text-gradient-purple italic font-display">Real Businesses</span>
          </h2>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            Read how PrimeSoul helps institutions and businesses transform their digital presence.
          </p>
        </AnimatedSection>

        {/* 3 Column Glassmorphic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <AnimatedSection key={t.id || idx} delay={idx * 100}>
              <div className="group relative rounded-3xl p-7 bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col justify-between h-full transition-all duration-300 hover:bg-white/10 hover:border-[#7B2FF2]/40 hover:-translate-y-1.5">
                <div>
                  {/* Top Header Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-[#F59E0B] gap-1">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                    <Quote size={24} className="text-[#7B2FF2]/40 group-hover:text-[#7B2FF2] transition-colors" />
                  </div>

                  {/* Result Metric Pill */}
                  {t.resultMetric && (
                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C9A7]/15 border border-[#00C9A7]/30 text-[#00C9A7]">
                      <ShieldCheck size={14} />
                      <span className="text-xs font-bold">{t.resultMetric} {t.resultLabel}</span>
                    </div>
                  )}

                  {/* Testimonial Quote */}
                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-medium mb-8">
                    &ldquo;{t.message || t.content}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-white/10">
                  {t.photo ? (
                    <Image src={t.photo} alt={t.name} width={42} height={42} className="rounded-full object-cover ring-2 ring-[#7B2FF2]/40" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E3AE0] to-[#7B2FF2] flex items-center justify-center text-xs font-extrabold text-white shadow-md">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-extrabold text-white leading-tight">{t.name}</h4>
                    <p className="text-[11px] text-white/60 font-medium">
                      {[t.role, t.company].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
