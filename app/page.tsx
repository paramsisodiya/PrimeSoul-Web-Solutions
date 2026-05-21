import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'PrimeSoul — Premium Digital Agency | Web Design & Development',
  description: 'PrimeSoul builds premium websites and web applications for businesses that refuse to settle for average. Top web development agency in India.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <VideoSection />
      <ClientLogos />
      <TrustSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <FounderSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
