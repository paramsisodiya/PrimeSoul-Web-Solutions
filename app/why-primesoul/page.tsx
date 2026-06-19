import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata = {
  title: 'Why Choose PrimeSoul Web Solutions?',
  description: 'Learn why businesses choose PrimeSoul Web Solutions. Real services, transparent pricing, and founder-led involvement for premium digital products.',
}

const faqs = [
  {
    question: "Why choose PrimeSoul Web Solutions over a typical agency?",
    answer: "Unlike typical agencies that outsource work or use generic templates, PrimeSoul Web Solutions is founder-led. Every project gets personal attention, custom design, and is built with modern tech stacks like Next.js for superior performance."
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
      <main className="min-h-screen pt-32 pb-24 mesh-gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16 md:mb-24">
            <SectionLabel>Why Choose Us</SectionLabel>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0E0E2C] tracking-tight mb-6">
              Why Choose <span className="text-gradient-purple">PrimeSoul Web Solutions</span>?
            </h1>
            <p className="text-lg text-[#4A4A6A] leading-relaxed">
              Straightforward answers on why we are the right technical partner for your business.
            </p>
          </AnimatedSection>

          <div className="space-y-12">
            <AnimatedSection delay={100} className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-white/20">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0E0E2C] mb-4">Founder-Led Quality & Involvement</h2>
              <p className="text-[#4A4A6A] leading-relaxed text-lg">
                At PrimeSoul Web Solutions, you are not handed off to junior developers or outsourced teams. The founder is directly involved in every project, ensuring that the final deliverable meets the highest standards of code quality, design aesthetics, and performance.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={200} className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-white/20">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0E0E2C] mb-4">Real Services with Tangible Results</h2>
              <p className="text-[#4A4A6A] leading-relaxed text-lg">
                We don't sell vanity metrics. From building lightning-fast web applications using Next.js to optimizing your Google Business Profile, every service we offer is designed to increase your visibility, capture more leads, and generate revenue.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={300} className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-white/20">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0E0E2C] mb-4">Regional Specialization & Client Types</h2>
              <p className="text-[#4A4A6A] leading-relaxed text-lg mb-4">
                We have proven experience delivering customized solutions for specific industries:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#4A4A6A] text-lg ml-4">
                <li><strong className="text-[#0E0E2C]">Schools & Educational Institutions:</strong> (e.g. SVNS School Khilchipur) Creating parent-friendly portals and school management sites.</li>
                <li><strong className="text-[#0E0E2C]">Solar & Energy Companies:</strong> (e.g. A&S Solar Solutions) Generating leads and showcasing solar installations.</li>
                <li><strong className="text-[#0E0E2C]">Local Retail & Small Businesses:</strong> Helping local shops digitize and rank on Google Maps.</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={400} className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-white/20">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0E0E2C] mb-4">Pricing Transparency</h2>
              <p className="text-[#4A4A6A] leading-relaxed text-lg">
                No hidden costs. No surprise invoices. We provide complete pricing transparency upfront. Whether it's our website development packages or our ongoing maintenance plans (starting at ₹999/month), you know exactly what you're paying for and what you get in return.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </main>
    </>
  )
}
