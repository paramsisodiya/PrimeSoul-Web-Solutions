'use client'

import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

// Import all sections
import HeroSection from '@/components/sections/HeroSection'
import MarqueeSection from '@/components/sections/MarqueeSection'
import PrimeOMSShowcase from '@/components/sections/PrimeOMSShowcase'
import ProductStudioSection from '@/components/sections/ProductStudioSection'
import VideoSection from '@/components/sections/VideoSection'
import ClientLogos from '@/components/sections/ClientLogos'
import TrustSection from '@/components/sections/TrustSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import HowWeWorkSection from '@/components/sections/HowWeWorkSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import ProcessSection from '@/components/sections/ProcessSection'
import ComparisonSection from '@/components/sections/ComparisonSection'

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
  primeoms: PrimeOMSShowcase,
  productStudio: ProductStudioSection,
  video: VideoSection,
  clientLogos: ClientLogos,
  trust: TrustSection,
  about: AboutSection,
  services: ServicesSection,
  howWeWork: HowWeWorkSection,
  portfolio: PortfolioSection,
  process: ProcessSection,
  comparison: ComparisonSection,

  pricing: PricingSection,
  testimonials: TestimonialsSection,
  faq: FAQSection,
  blog: BlogPreviewSection,
  cta: CTASection,
}

const DEFAULT_ORDER: SectionConfig[] = [
  { id: 'hero', label: 'Hero Section', enabled: true },
  { id: 'marquee', label: 'Marquee Strip', enabled: true },
  { id: 'primeoms', label: 'PrimeOMS Showcase', enabled: true },
  { id: 'trust', label: 'Trust Section', enabled: true },
  { id: 'services', label: 'Services', enabled: true },
  { id: 'productStudio', label: 'Product Studio Evolution', enabled: true },
  { id: 'portfolio', label: 'Portfolio', enabled: true },
  { id: 'howWeWork', label: 'How We Work', enabled: true },
  { id: 'about', label: 'About Section', enabled: true },
  { id: 'video', label: 'Video Section', enabled: true },
  { id: 'clientLogos', label: 'Client Logos', enabled: true },
  { id: 'process', label: 'Our Process', enabled: true },
  { id: 'comparison', label: 'PrimeSoul Advantage', enabled: true },

  { id: 'pricing', label: 'Pricing', enabled: true },
  { id: 'testimonials', label: 'Testimonials', enabled: true },
  { id: 'faq', label: 'FAQ Section', enabled: true },
  { id: 'blog', label: 'Blog Preview', enabled: true },
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
