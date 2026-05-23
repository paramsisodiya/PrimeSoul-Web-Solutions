'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

// Import all sections
import HeroSection from '@/components/sections/HeroSection'
import MarqueeSection from '@/components/sections/MarqueeSection'
import VideoSection from '@/components/sections/VideoSection'
import ClientLogos from '@/components/sections/ClientLogos'
import TrustSection from '@/components/sections/TrustSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import ProcessSection from '@/components/sections/ProcessSection'
import FounderSection from '@/components/sections/FounderSection'
import PricingSection from '@/components/sections/PricingSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'

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
  portfolio: PortfolioSection,
  process: ProcessSection,
  founder: FounderSection,
  pricing: PricingSection,
  testimonials: TestimonialsSection,
  faq: FAQSection,
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
  { id: 'portfolio', label: 'Portfolio', enabled: true },
  { id: 'process', label: 'Our Process', enabled: true },
  { id: 'founder', label: 'Founder Section', enabled: true },
  { id: 'pricing', label: 'Pricing', enabled: true },
  { id: 'testimonials', label: 'Testimonials', enabled: true },
  { id: 'faq', label: 'FAQ Section', enabled: true },
  { id: 'cta', label: 'CTA Section', enabled: true },
]

export default function DynamicHomeSections() {
  const [sections, setSections] = useState<SectionConfig[]>(DEFAULT_ORDER)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'sections'))
        if (snap.exists()) {
          const data = snap.data()
          if (data.order && Array.isArray(data.order)) {
            setSections(data.order)
          }
        }
      } catch (err) {
        console.error('Error fetching section config:', err)
      } finally {
        setLoaded(true)
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
          return <Component key={s.id} />
        })}
    </>
  )
}
