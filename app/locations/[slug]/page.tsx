import { Metadata } from 'next'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import MagneticButton from '@/components/ui/MagneticButton'

const LOCATIONS = [
  { slug: 'rajgarh', name: 'Rajgarh, MP', title: 'Top Web Design Agency in Rajgarh, MP' },
  { slug: 'bhopal', name: 'Bhopal', title: 'Professional Web Development in Bhopal' },
  { slug: 'indore', name: 'Indore', title: 'Premium UI/UX Design & Web Solutions in Indore' },
  { slug: 'ujjain', name: 'Ujjain', title: 'Website Design & Digital Solutions in Ujjain' },
  { slug: 'biaora', name: 'Biaora', title: 'Best Web Design Company in Biaora' }
]

export function generateStaticParams() {
  return LOCATIONS.map(l => ({ slug: l.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const loc = LOCATIONS.find(l => l.slug === params.slug) || { name: params.slug, title: `Web Design in ${params.slug}` }
  return {
    title: `${loc.title} | PrimeSoul Web Solutions`,
    description: `Looking for professional web design and development in ${loc.name}? PrimeSoul Web Solutions builds high-converting, modern websites tailored for local businesses.`,
    openGraph: {
      title: `${loc.title} | PrimeSoul Web Solutions`,
      description: `Premium website development services for businesses in ${loc.name}.`,
    }
  }
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const loc = LOCATIONS.find(l => l.slug === params.slug)
  if (!loc) return <div className="min-h-screen flex items-center justify-center">Location not found.</div>

  return (
    <main className="bg-[#FAFAFE]">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-[#0E0E2C]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7B2FF2]/20 to-transparent opacity-50" />
        <AnimatedSection className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#7B2FF2]/30 bg-[#7B2FF2]/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#E879F9] animate-pulse" />
            <span className="text-xs font-semibold text-[#E879F9]">Local Web Solutions</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {loc.title}
          </h1>
          <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
            We help businesses in {loc.name} establish a dominant online presence with blazing fast, modern, and SEO-optimized websites.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton strength={0.2} radius={100}>
              <Link href={`/contact?service=Web Design in ${loc.name}`} className="bg-gradient-to-r from-[#7B2FF2] to-[#E879F9] text-white px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity">
                Start Your Project Today
              </Link>
            </MagneticButton>
          </div>
        </AnimatedSection>
      </section>

      {/* Why Choose Us locally */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0E0E2C] mb-4">Why Businesses in {loc.name} Choose Us</h2>
          <p className="text-[#4A4A6A] max-w-2xl mx-auto">We combine local understanding with global design standards to deliver websites that actually drive growth.</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: '🚀', title: 'Lightning Fast', desc: 'We build on Next.js, ensuring your local customers get instant loading speeds even on mobile networks.' },
            { icon: '🔍', title: 'Local SEO Ready', desc: `Your website comes optimized to rank higher for searches in the ${loc.name} area right out of the box.` },
            { icon: '🤝', title: 'Dedicated Support', desc: 'No outsourcing. You work directly with the founder for transparent, accountable communication.' }
          ].map((feature, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="bg-white border border-slate-100 p-8 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all">
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-bold text-[#0E0E2C] mb-3">{feature.title}</h3>
                <p className="text-[#4A4A6A]">{feature.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-24 bg-[#7B2FF2] px-6 text-center">
        <AnimatedSection className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to upgrade your business in {loc.name}?</h2>
          <p className="text-white/80 mb-10">Get a premium website that converts visitors into loyal customers.</p>
          <Link href="/contact" className="inline-block bg-white text-[#7B2FF2] px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-colors">
            Get a Free Consultation
          </Link>
        </AnimatedSection>
      </section>
    </main>
  )
}
