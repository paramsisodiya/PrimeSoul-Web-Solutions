'use client'

import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

import HeroSection from '@/components/sections/HeroSection'
import MarqueeSection from '@/components/sections/MarqueeSection'
import VideoSection from '@/components/sections/VideoSection'
import ClientLogos from '@/components/sections/ClientLogos'
import TrustSection from '@/components/sections/TrustSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import HowWeWorkSection from '@/components/sections/HowWeWorkSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import ProcessSection from '@/components/sections/ProcessSection'
import PricingSection from '@/components/sections/PricingSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'
import BlogPreviewSection from '@/components/sections/BlogPreviewSection'

interface SectionConfig {
  id: string
  label: string
  enabled: boolean
}

const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  hero: HeroSection,
  marquee: MarqueeSection,
  video: VideoSection,
  clientLogos: ClientLogos,
  trust: TrustSection,
  about: AboutSection,
  services: ServicesSection,
  howWeWork: HowWeWorkSection,
  portfolio: PortfolioSection,
  process: ProcessSection,
  pricing: PricingSection,
  testimonials: TestimonialsSection,
  faq: FAQSection,
  blog: BlogPreviewSection,
  cta: CTASection,
}

const DEFAULT_ORDER: SectionConfig[] = [
  { id: 'hero', label: 'Hero Section', enabled: true },
  { id: 'marquee', label: 'Marquee Strip', enabled: true },
  { id: 'video', label: 'Video Section', enabled: true },
  { id: 'clientLogos', label: 'Client Logos', enabled: true },
  { id: 'trust', label: 'Trust Section', enabled: true },
  { id: 'about', label: 'About Section', enabled: true },
  { id: 'services', label: 'Services', enabled: true },
  { id: 'howWeWork', label: 'How We Work', enabled: true },
  { id: 'portfolio', label: 'Portfolio', enabled: true },
  { id: 'process', label: 'Our Process', enabled: true },
  { id: 'pricing', label: 'Pricing', enabled: true },
  { id: 'testimonials', label: 'Testimonials', enabled: true },
  { id: 'faq', label: 'FAQ Section', enabled: true },
  { id: 'blog', label: 'Blog Preview', enabled: true },
  { id: 'cta', label: 'CTA Section', enabled: true },
]

const DIVIDER_AFTER = ['hero', 'services', 'portfolio', 'testimonials']

export default function DynamicHomeSections() {
  const [sections, setSections] = useState<SectionConfig[]>(DEFAULT_ORDER)

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'sections'))
        if (snap.exists()) {
          const data = snap.data()
          if (data.order && Array.isArray(data.order)) {
            // Ensure howWeWork is included if missing in remote config
            const remoteSections: SectionConfig[] = data.order
            if (!remoteSections.some(s => s.id === 'howWeWork')) {
              const servicesIdx = remoteSections.findIndex(s => s.id === 'services')
              if (servicesIdx !== -1) {
                remoteSections.splice(servicesIdx + 1, 0, { id: 'howWeWork', label: 'How We Work', enabled: true })
              }
            }
            setSections(remoteSections)
          }
        }
      } catch (err) {
        console.error('Error fetching section config:', err)
      }
    }
    fetchSections()
  }, [])

  return (
    <>
      {sections
        .filter(s => s.enabled)
        .map(s => {
          const Component = SECTION_COMPONENTS[s.id]
          if (!Component) return null
          const showDivider = DIVIDER_AFTER.includes(s.id)
          return (
            <div key={s.id}>
              <Component />
              {showDivider && <div className="section-divider" />}
            </div>
          )
        })}
    </>
  )
}
