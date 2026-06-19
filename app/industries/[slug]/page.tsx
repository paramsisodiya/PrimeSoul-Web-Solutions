import { notFound } from 'next/navigation'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'

const INDUSTRIES = {
  'schools-educational-institutions': {
    title: 'Schools & Educational Institutions',
    description: 'We help schools, colleges, and coaching centers build modern, accessible digital experiences that attract students and keep parents informed.',
    benefits: [
      'Easy-to-update notice boards and event calendars',
      'Secure admission forms and fee payment portals',
      'Mobile-responsive design for parents on-the-go',
      'Fast loading speeds even on slow connections'
    ],
    caseStudy: {
      name: 'SVNS School Khilchipur',
      link: '/portfolio/svns-school',
      description: 'See how we completely revamped the digital presence for SVNS School.'
    }
  },
  'solar-energy-companies': {
    title: 'Solar & Energy Companies',
    description: 'Establish authority in the renewable energy sector with a professional website that generates qualified leads and showcases your installations.',
    benefits: [
      'High-converting lead capture forms for free quotes',
      'Portfolio galleries showcasing your past installations',
      'SEO optimization for local "solar near me" searches',
      'Trust-building elements and savings calculators'
    ],
    caseStudy: {
      name: 'A&S Solar Solutions',
      link: '/portfolio/as-solar',
      description: 'Discover how A&S Solar Solutions increased their lead generation.'
    }
  },
  'local-retail-small-businesses': {
    title: 'Local Retail & Small Businesses',
    description: 'Stop losing customers to your competitors. We build localized, search-optimized websites that turn neighborhood searches into foot traffic.',
    benefits: [
      'Local SEO setup to dominate Google Maps rankings',
      'Mobile-first design for local "near me" searches',
      'Integration with Google Business Profile',
      'Clear calls-to-action (Call Now, Get Directions)'
    ],
    caseStudy: null
  }
}

export function generateStaticParams() {
  return Object.keys(INDUSTRIES).map((slug) => ({
    slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const industry = INDUSTRIES[params.slug as keyof typeof INDUSTRIES]
  if (!industry) return { title: 'Not Found' }
  return {
    title: `Web Design for ${industry.title} | PrimeSoul Web Solutions`,
    description: industry.description,
  }
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = INDUSTRIES[params.slug as keyof typeof INDUSTRIES]
  
  if (!industry) {
    notFound()
  }

  return (
    <main className="min-h-screen pt-32 pb-24 mesh-gradient-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16 md:mb-24">
          <SectionLabel>Industry Solutions</SectionLabel>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0E0E2C] tracking-tight mb-6">
            Digital Growth for <br className="hidden md:block" />
            <span className="text-gradient-purple">{industry.title}</span>
          </h1>
          <p className="text-lg text-[#4A4A6A] leading-relaxed max-w-2xl mx-auto">
            {industry.description}
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <AnimatedSection delay={100} className="bg-white rounded-3xl p-8 shadow-xl border border-white/20">
            <h3 className="text-2xl font-bold text-[#0E0E2C] mb-6">How We Help Your Industry</h3>
            <ul className="space-y-4">
              {industry.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#7B2FF2]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7B2FF2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-[#0E0E2C] font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-10">
              <Link
                href="/contact"
                className="w-full inline-flex justify-center py-4 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-px"
                style={{
                  background: 'linear-gradient(135deg, #7B2FF2 0%, #A855F7 100%)',
                  boxShadow: '0 12px 32px -12px rgba(123,47,242,0.5)'
                }}
              >
                Discuss Your Project
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            {industry.caseStudy ? (
              <div className="bg-[#0E0E2C] rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7B2FF2]/20 to-[#E879F9]/20 opacity-50" />
                <div className="relative z-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7B2FF2] mb-4 block">Featured Success Story</span>
                  <h3 className="text-2xl font-bold text-white mb-4">{industry.caseStudy.name}</h3>
                  <p className="text-white/80 mb-8 leading-relaxed">
                    {industry.caseStudy.description}
                  </p>
                  <Link
                    href={industry.caseStudy.link}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#0E0E2C] text-sm font-semibold transition-transform hover:scale-105"
                  >
                    Read Case Study
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-[#F8F8FC] rounded-3xl p-8 border border-[#E5E5F0] text-center h-full flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7B2FF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#0E0E2C] mb-2">Be Our Next Success Story</h3>
                <p className="text-[#4A4A6A] mb-6">Partner with us to build a digital presence that dominates your local market.</p>
              </div>
            )}
          </AnimatedSection>
        </div>
      </div>
    </main>
  )
}
