import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SERVICE_PAGES, getServiceBySlug, getAllServiceSlugs } from '@/lib/service-pages'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)
  if (!service) return { title: 'Service Not Found' }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://primesoul.tech/services/${service.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
    },
    alternates: {
      canonical: `https://primesoul.tech/services/${service.slug}`,
    },
  }
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug)
  if (!service) notFound()

  const otherServices = SERVICE_PAGES.filter(s => s.id !== service.id)

  return (
    <main className="bg-[#FAFAFE]">
      {/* Schema.org Service markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.title,
            description: service.metaDescription,
            provider: {
              '@type': 'Organization',
              name: 'PrimeSoul',
              url: 'https://primesoul.tech',
            },
            url: `https://primesoul.tech/services/${service.slug}`,
            areaServed: { '@type': 'Country', name: 'India' },
          }),
        }}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: '#FAFAFE' }}>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 20% 80%, ${service.accent}10 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 80% 20%, ${service.accent}08 0%, transparent 60%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(${service.accent} 1px, transparent 1px), linear-gradient(90deg, ${service.accent} 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors mb-8">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              All Services
            </Link>
          </AnimatedSection>
          <AnimatedSection className="max-w-3xl">
            <div className="pill-badge pill-badge--purple mb-6">
              <span className="dot" style={{ background: service.accent }} />
              {service.shortTitle}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-[-0.03em] mb-5 text-ink">
              {service.heroTagline.split(' ').map((word, i) => (
                <span key={i}>
                  {i === service.heroTagline.split(' ').length - 1 ? (
                    <span className="font-display italic" style={{ background: `linear-gradient(135deg, ${service.accent}, ${service.accent}cc)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      {word}
                    </span>
                  ) : (
                    word + ' '
                  )}
                </span>
              ))}
            </h1>
            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8">
              {service.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="btn-tap inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-px"
                style={{ background: `linear-gradient(135deg, ${service.accent}, ${service.accent}dd)`, boxShadow: `0 8px 32px -8px ${service.accent}60` }}
              >
                Get a Free Quote
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 10L10 4M10 4H5M10 4V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <a
                href="https://wa.me/918770404559"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tap inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-ink border border-surface-border bg-white hover:bg-surface-subtle transition-all"
              >
                Chat on WhatsApp
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <SectionLabel>The Problem</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-[-0.03em] mb-4 text-ink">
                {service.problem.title}
              </h2>
              <p className="text-base text-ink-secondary leading-relaxed">
                {service.problem.description}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <div className="space-y-3">
                {service.problem.painPoints.map((point, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-red-50/50 border border-red-100/50"
                    style={{ animation: `reveal-up 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 80}ms both` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 3l6 6M9 3l-6 6" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span className="text-sm text-ink-secondary leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 mesh-gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <SectionLabel>Our Solution</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-[-0.03em] mb-4 text-ink">
                {service.solution.title}
              </h2>
              <p className="text-base text-ink-secondary leading-relaxed">
                {service.solution.description}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <div className="space-y-3">
                {service.solution.approach.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-surface-border card-glow-hover"
                    style={{ animation: `reveal-up 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 80}ms both` }}
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${service.accent}15` }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke={service.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-sm text-ink-secondary leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-14">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-[-0.03em] text-ink">
              Everything You{' '}
              <span className="font-display italic text-gradient-purple">Need</span>
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, i) => (
              <AnimatedSection key={feature.title} delay={i * 60}>
                <article className="card-3d">
                  <div className="card-3d-inner card-glow-hover rounded-3xl p-7 bg-white border border-surface-border transition-all h-full">
                    <div
                      className="card-3d-icon w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                      style={{ background: `${service.accent}10`, color: service.accent }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 12l3 3 5-5" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-ink mb-2">{feature.title}</h3>
                    <p className="text-sm text-ink-muted leading-relaxed">{feature.description}</p>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 noise-overlay" style={{ background: 'linear-gradient(135deg, #0E0E2C 0%, #1a1a4e 50%, #0E0E2C 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-[-0.03em]">
              Why Choose <span className="font-display italic" style={{ background: `linear-gradient(135deg, ${service.accent}, ${service.accent}cc)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>PrimeSoul</span>
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {service.benefits.map((benefit, i) => (
              <AnimatedSection key={benefit} delay={i * 60}>
                <div className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                    <circle cx="8" cy="8" r="8" fill={`${service.accent}30`} />
                    <path d="M5 8l2.5 2.5L11 6" stroke={service.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm text-white/70 font-medium">{benefit}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 mesh-gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-14">
            <SectionLabel>Our Process</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-ink">
              How It <span className="font-display italic text-gradient-purple">Works</span>
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, i) => (
              <AnimatedSection key={step.step} delay={i * 100}>
                <div className="process-step-3d text-center">
                  <div
                    className="step-number w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-extrabold mx-auto mb-5 transition-all duration-500"
                    style={{
                      background: `${service.accent}10`,
                      border: `1px solid ${service.accent}20`,
                      color: service.accent,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {step.step}
                  </div>
                  <h3 className="text-base font-semibold text-ink mb-2">{step.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint mb-6">Technologies We Use</p>
            <div className="flex flex-wrap justify-center gap-3">
              {service.techStack.map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-full border border-surface-border bg-surface-base text-sm text-ink-secondary font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 mesh-gradient-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-12">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-ink">
              Common <span className="font-display italic text-gradient-purple">Questions</span>
            </h2>
          </AnimatedSection>
          <div className="space-y-3">
            {service.faq.map((item, i) => (
              <AnimatedSection key={i} delay={i * 50}>
                <details className="group rounded-2xl bg-white border border-surface-border overflow-hidden transition-all hover:shadow-sm">
                  <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer text-left">
                    <span className="text-sm sm:text-base font-semibold text-ink pr-4">{item.question}</span>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-open:rotate-45" style={{ background: `${service.accent}10` }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 3v8M3 7h8" stroke={service.accent} strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </summary>
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                    <p className="text-sm text-ink-secondary leading-relaxed">{item.answer}</p>
                  </div>
                </details>
              </AnimatedSection>
            ))}
          </div>

          {/* FAQ Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: service.faq.map(f => ({
                  '@type': 'Question',
                  name: f.question,
                  acceptedAnswer: { '@type': 'Answer', text: f.answer },
                })),
              }),
            }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="rounded-3xl p-8 sm:p-12 md:p-16 text-center noise-overlay relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0E0E2C 0%, #1a1a4e 50%, #0E0E2C 100%)' }}>
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 30% 70%, ${service.accent}60 0%, transparent 40%), radial-gradient(circle at 70% 30%, rgba(232,121,249,0.3) 0%, transparent 40%)` }} />
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-[-0.03em]">
                  {service.cta.title}
                </h2>
                <p className="text-white/50 text-base sm:text-lg mb-8 max-w-lg mx-auto">
                  {service.cta.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contact" className="btn-tap inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-px" style={{ background: `linear-gradient(135deg, ${service.accent}, ${service.accent}dd)`, boxShadow: `0 8px 32px -8px ${service.accent}60` }}>
                    Get Started Today
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 10L10 4M10 4H5M10 4V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                  <a href="https://wa.me/918770404559" target="_blank" rel="noopener noreferrer" className="btn-tap inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white border border-white/15 hover:bg-white/5 transition-all">
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 bg-[#FAFAFE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="mb-10">
            <h2 className="text-2xl font-extrabold text-ink tracking-[-0.03em]">Explore Other Services</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherServices.map((s, i) => (
              <AnimatedSection key={s.id} delay={i * 60}>
                <Link href={`/services/${s.slug}`} className="block p-5 rounded-2xl bg-white border border-surface-border hover:shadow-card hover:-translate-y-0.5 transition-all card-glow-hover">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${s.accent}10`, color: s.accent }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>
                  </div>
                  <h3 className="text-base font-semibold text-ink mb-1">{s.title}</h3>
                  <p className="text-sm text-ink-muted line-clamp-2">{s.heroDescription.slice(0, 100)}...</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
