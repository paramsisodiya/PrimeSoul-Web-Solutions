import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'

const CLIENTS = [
  {
    name: 'A&S Solar Solutions',
    description: 'A leading solar energy provider. We designed and developed a custom corporate website to showcase their projects, improve lead generation, and establish industry authority.',
    industry: 'Solar & Energy',
    link: '/portfolio/as-solar',
    icon: 'solar'
  },
  {
    name: 'SVNS School Khilchipur',
    description: 'An educational institution needing a modern digital presence. We built a fast, accessible website with clear navigation for parents and prospective students.',
    industry: 'Education',
    link: '/portfolio/svns-school',
    icon: 'edu'
  },
  {
    name: 'Param Portfolio',
    description: 'A personal branding portfolio for a creative professional, featuring smooth animations, a modern dark mode design, and a dedicated project showcase.',
    industry: 'Personal Branding',
    link: '/portfolio/param-portfolio',
    icon: 'portfolio'
  },
  {
    name: 'E-Commerce Platform',
    description: 'A fully functional custom e-commerce solution with product management, secure checkout, and an optimized mobile shopping experience.',
    industry: 'Retail & E-Commerce',
    link: '/portfolio',
    icon: 'ecom'
  },
]

export const metadata = {
  title: 'Our Clients | PrimeSoul Web Solutions',
  description: 'See the businesses and institutions that trust PrimeSoul Web Solutions for their web design and development needs.',
}

export default function ClientsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 mesh-gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16 md:mb-24">
          <SectionLabel>Our Clients</SectionLabel>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0E0E2C] tracking-tight mb-6">
            Trusted by <span className="text-gradient-purple">Growing Brands</span>
          </h1>
          <p className="text-lg text-[#4A4A6A] leading-relaxed max-w-2xl mx-auto">
            We partner with ambitious businesses across various industries to build digital experiences that drive real results.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {CLIENTS.map((client, index) => (
            <AnimatedSection key={client.name} delay={index * 100}>
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-white/20 h-full flex flex-col group transition-all hover:shadow-2xl hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7B2FF2]/10 to-[#E879F9]/10 flex items-center justify-center text-[#7B2FF2] group-hover:scale-110 transition-transform">
                    {/* Reuse simple SVG icons logic */}
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {client.icon === 'solar' && (
                        <>
                          <circle cx="12" cy="12" r="4" />
                          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                        </>
                      )}
                      {client.icon === 'edu' && (
                        <>
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                          <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
                        </>
                      )}
                      {client.icon === 'portfolio' && (
                        <>
                          <rect x="2" y="3" width="20" height="14" rx="2" />
                          <path d="M8 21h8M12 17v4" />
                        </>
                      )}
                      {client.icon === 'ecom' && (
                        <>
                          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                          <line x1="3" y1="6" x2="21" y2="6" />
                          <path d="M16 10a4 4 0 01-8 0" />
                        </>
                      )}
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0E0E2C]">{client.name}</h3>
                    <p className="text-sm font-semibold text-[#7B2FF2]">{client.industry}</p>
                  </div>
                </div>
                
                <p className="text-[#4A4A6A] leading-relaxed flex-1 mb-8">
                  {client.description}
                </p>

                <Link
                  href={client.link}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E0E2C] group-hover:text-[#7B2FF2] transition-colors"
                >
                  View Case Study
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={400} className="mt-20 text-center">
          <div className="bg-[#0E0E2C] rounded-3xl p-10 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#7B2FF2]/20 to-[#E879F9]/20 opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to join our growing list of clients?</h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can help your business grow with a custom-built digital solution.
              </p>
              <Link
                href="/contact"
                className="inline-flex px-8 py-4 rounded-xl text-sm font-semibold text-[#0E0E2C] bg-white transition-all hover:scale-105"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  )
}
