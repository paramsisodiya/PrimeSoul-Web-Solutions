import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata = {
  title: 'Why Choose PrimeSoul Web Solutions?',
  description: 'Learn why businesses choose PrimeSoul Web Solutions. Real services, transparent pricing, and team-driven involvement for premium digital products.',
}

const faqs = [
  {
    question: "Why choose PrimeSoul Web Solutions over a typical agency?",
    answer: "Unlike typical agencies that outsource work or use generic templates, PrimeSoul Web Solutions is team-driven. Every project gets personal attention, custom design, and is built with modern tech stacks like Next.js for superior performance."
  },
  {
    question: "What types of clients does PrimeSoul Web Solutions work with?",
    answer: "We specialize in working with educational institutions (schools & coaching centers), solar & renewable energy companies, and local retail businesses looking to dominate their market through digital growth."
  },
  {
    question: "Is pricing transparent at PrimeSoul Web Solutions?",
    answer: "Yes. We believe in complete pricing transparency. Our service packages and maintenance plans are clearly outlined without hidden fees, so you always know what you're paying for."
  },
  {
    question: "Where is PrimeSoul Web Solutions located?",
    answer: "We are based in Rajgarh, Madhya Pradesh, India, but we serve clients both locally and globally, delivering high-quality web solutions regardless of location."
  }
]

export default function WhyChooseUsPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="min-h-screen pt-28 pb-24 mesh-gradient-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16 md:mb-20">
            <SectionLabel>Why Choose Us</SectionLabel>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-[#0E0E2C]">
              Why Choose <span className="text-gradient-purple">PrimeSoul Web Solutions</span>?
            </h1>
            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-2xl mx-auto">
              Straightforward answers on why we are the right technical partner for your business.
            </p>
          </AnimatedSection>

          {/* Authentic Team Visual Feature Banner */}
          <AnimatedSection className="mb-14">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-surface-border bg-white p-6 sm:p-8">
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E3AE0] bg-[#1E3AE0]/10 px-3 py-1 rounded-full">
                    ✦ In-House Dedicated Engineering
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0E0E2C]">
                    Team-Driven Quality & Involvement
                  </h2>
                  <p className="text-ink-secondary text-sm sm:text-base leading-relaxed">
                    You are never handed off to junior contractors or outsourced freelancers. Our core developers and designers collaborate directly with you on every detail.
                  </p>
                </div>

                <div className="md:col-span-6">
                  <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-surface-border shadow-md group">
                    <Image
                      src="/images/team-culture.png"
                      alt="PrimeSoul web development team culture and design strategy lounge"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E2C]/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-white/20">
                      <p className="text-xs font-bold text-[#0E0E2C]">Rajgarh Studio Team</p>
                      <p className="text-[10px] text-ink-muted">Web Design & Full-Stack Application Specialists</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="space-y-8">
            <AnimatedSection delay={100} className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-surface-border">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0E0E2C]">Real Services with Tangible Results</h2>
              <p className="text-ink-secondary leading-relaxed text-base sm:text-lg">
                We don&apos;t sell vanity metrics. From building lightning-fast web applications using Next.js to optimizing your Google Business Profile, every service we offer is designed to increase your visibility, capture more leads, and generate revenue.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={200} className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-surface-border">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0E0E2C]">Regional Specialization & Client Types</h2>
              <p className="text-ink-secondary leading-relaxed text-base sm:text-lg mb-4">
                We have proven experience delivering customized solutions for specific industries:
              </p>
              <ul className="list-disc list-inside space-y-2.5 text-ink-secondary text-base sm:text-lg ml-4">
                <li><strong className="text-[#0E0E2C]">Schools & Educational Institutions:</strong> (e.g. SVNS School Khilchipur) Parent-friendly portals & fee status dashboards.</li>
                <li><strong className="text-[#0E0E2C]">Solar & Energy Companies:</strong> (e.g. A&S Solar Solutions) Lead generation & commercial solar installation showcases.</li>
                <li><strong className="text-[#0E0E2C]">Local Retail & Small Businesses:</strong> Digitizing storefronts and ranking on Google Maps.</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={300} className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-surface-border">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0E0E2C]">Pricing Transparency</h2>
              <p className="text-ink-secondary leading-relaxed text-base sm:text-lg">
                No hidden costs. No surprise invoices. We provide complete pricing transparency upfront. Whether it&apos;s our website development packages or our ongoing maintenance plans, you always know what you&apos;re paying for and what you get in return.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </main>
    </>
  )
}
