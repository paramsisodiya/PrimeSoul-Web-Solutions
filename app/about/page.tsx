import type { Metadata } from 'next'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'About | PrimeSoul Web Solutions',
  description:
    'PrimeSoul Web Solutions is a leading web development company in Rajgarh, Madhya Pradesh, helping businesses with website development, admin panels, UI/UX design and digital solutions across India.',
}

const VALUES = [
  {
    title: 'Quality Over Volume',
    description: 'We take on fewer projects to give each one the attention it deserves. Every pixel, every line of code.',
    accent: '#1E3AE0',
  },
  {
    title: 'Radical Transparency',
    description: 'Clear timelines, honest pricing, no vague deliverables. You know exactly what you\'re getting.',
    accent: '#2EC4C4',
  },
  {
    title: 'Results, Not Aesthetics',
    description: 'Beautiful websites that don\'t convert are decorative. We design for both.',
    accent: '#4DA6FF',
  },
  {
    title: 'Long-Term Thinking',
    description: 'We build with scalability in mind. Your site should grow with your business, not limit it.',
    accent: '#2B47D9',
  },
]

const SKILLS = [
  { label: 'Frontend Development', level: 92 },
  { label: 'UI/UX Design', level: 87 },
  { label: 'Backend Development', level: 80 },
  { label: 'Database Design', level: 78 },
  { label: 'Brand Identity', level: 85 },
  { label: 'SEO & Performance', level: 88 },
]

const STATS = [
  { value: '3+', label: 'Years of Experience' },
  { value: '35+', label: 'Projects Delivered' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '8–10', label: 'Team Members' },
]

const LEADERSHIP = [
  {
    name: 'Param Sisodiya',
    role: 'Founder',
    description: 'Visionary behind PrimeSoul, driving the agency\u2019s direction, client relationships, and overall growth strategy.',
    isPrimary: true,
  },
  {
    name: 'Shyam Sisodiya',
    role: 'CEO',
    description: 'Leading day-to-day operations and ensuring every project is delivered with precision, quality, and on time.',
    isPrimary: false,
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: '#F8F9FE' }}>
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 50% 60% at 80% 40%, rgba(46,196,196,0.07) 0%, transparent 60%), radial-gradient(ellipse 40% 50% at 10% 60%, rgba(30,58,224,0.06) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection className="max-w-2xl mb-12">
            <SectionLabel>About PrimeSoul</SectionLabel>
            <h1
              className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-5"
              style={{ color: '#0D1340' }}
            >
              Built by a Team That{' '}
              <span style={{
                background: 'linear-gradient(135deg, #1E3AE0 0%, #2EC4C4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Cares Deeply
              </span>
            </h1>
            <p className="text-lg text-ink-secondary leading-relaxed">
              PrimeSoul Web Solutions is a focused agency with a dedicated team personally invested in every project&apos;s success. We combine strategy, design, and technology to deliver real business outcomes.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Intro + Leadership */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Content */}
            <AnimatedSection direction="left">
              <SectionLabel>Our Story</SectionLabel>
              <h2 className="text-4xl font-bold text-ink mb-6">
                Built to Deliver. Driven by Results.
              </h2>
              <div className="flex flex-col gap-5 mb-8">
                <p className="text-ink-secondary leading-relaxed">
                  PrimeSoul Web Solutions is a focused digital agency based in Rajgarh, Madhya Pradesh — helping businesses across India establish a powerful online presence. With 3 years of experience, 35+ successful projects, and a dedicated team of professionals, we combine strategy, design, and technology to deliver real business outcomes.
                </p>
                <p className="text-ink-secondary leading-relaxed">
                  PrimeSoul grew from a genuine belief that every business, regardless of size or location, deserves a professional digital presence that actually performs. We obsess over the details that most people won&apos;t notice but will definitely feel: load speeds, interaction quality, the way a headline makes someone lean forward.
                </p>
              </div>

              {/* Mission */}
              <div className="p-6 rounded-2xl bg-surface-subtle/50 border border-surface-border mb-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-primary mb-3">OUR MISSION</p>
                <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                  To empower every business — big or small — with a premium digital presence that drives real growth, builds trust, and creates lasting impact.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-2xl bg-white border border-surface-border transition-all duration-300 hover:border-brand-primary/20 hover:shadow-sm"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                  >
                    <p
                      className="text-2xl sm:text-3xl font-extrabold mb-1"
                      style={{
                        background: 'linear-gradient(135deg, #1E3AE0 0%, #2EC4C4 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs text-ink-muted font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Contact info */}
              <div className="flex flex-col gap-3 mb-8">
                <a href="mailto:primesoulwebsolutions@gmail.com" className="flex items-center gap-3 text-sm text-ink-secondary hover:text-ink transition-colors">
                  <EmailIcon />
                  primesoulwebsolutions@gmail.com
                </a>
                <a href="tel:8770404559" className="flex items-center gap-3 text-sm text-ink-secondary hover:text-ink transition-colors">
                  <PhoneIcon />
                  +91 8770404559
                </a>
                <span className="flex items-center gap-3 text-sm text-ink-muted">
                  <LocationIcon />
                  Rajgarh, Madhya Pradesh
                </span>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #1E3AE0 0%, #2B47D9 100%)', boxShadow: '0 8px 24px -8px rgba(30,58,224,0.4)' }}
                >
                  Work With Us
                </Link>
                <Link
                  href="/portfolio"
                  className="px-6 py-3 rounded-xl text-sm font-semibold text-ink border border-surface-border bg-white hover:bg-surface-subtle transition-colors"
                >
                  View Our Work
                </Link>
              </div>
            </AnimatedSection>

            {/* Leadership Cards */}
            <AnimatedSection direction="right">
              <SectionLabel>Leadership</SectionLabel>
              <h2 className="text-3xl font-bold text-ink mb-8">
                The Team Behind PrimeSoul
              </h2>
              <div className="flex flex-col gap-5">
                {LEADERSHIP.map((leader) => (
                  <div
                    key={leader.name}
                    className="relative p-6 sm:p-8 rounded-2xl bg-white transition-all duration-300 hover:shadow-lg"
                    style={{
                      border: leader.isPrimary ? '1px solid rgba(30,58,224,0.2)' : '1px solid #E2E8F8',
                      borderLeftWidth: leader.isPrimary ? '3px' : '1px',
                      borderLeftColor: leader.isPrimary ? '#1E3AE0' : '#E2E8F8',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                    }}
                  >
                    <h3
                      className="text-xl sm:text-2xl text-ink mb-1"
                      style={{ fontWeight: leader.isPrimary ? 800 : 700 }}
                    >
                      {leader.name}
                    </h3>
                    <span
                      className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4"
                      style={{
                        background: 'rgba(30,58,224,0.08)',
                        color: '#1E3AE0',
                      }}
                    >
                      {leader.role}
                    </span>
                    <p className="text-ink-secondary leading-relaxed">
                      {leader.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Floating availability card */}
              <div
                className="mt-6 rounded-2xl p-4 bg-white"
                style={{
                  boxShadow: '0 8px 40px -8px rgba(30,58,224,0.18)',
                  border: '1px solid #E2E8F8',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse-slow"
                    style={{ background: '#2EC4C4' }}
                  />
                  <div>
                    <p className="text-xs font-semibold text-ink">Available for Projects</p>
                    <p className="text-xs text-ink-muted">Rajgarh, MP · Remote Friendly</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24" style={{ background: '#F8F9FE' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <AnimatedSection>
              <SectionLabel>Skills & Expertise</SectionLabel>
              <h2
                className="text-3xl md:text-4xl font-bold text-ink mb-8"
              >
                What We Do Well
              </h2>
              <div className="flex flex-col gap-5">
                {SKILLS.map((skill, i) => (
                  <div key={skill.label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-ink-secondary">{skill.label}</span>
                      <span className="text-sm font-semibold text-brand-navy">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-surface-subtle overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${skill.level}%`,
                          background: 'linear-gradient(90deg, #1E3AE0, #2EC4C4)',
                          transitionDelay: `${i * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Values */}
            <AnimatedSection delay={100}>
              <SectionLabel>Our Values</SectionLabel>
              <h2
                className="text-3xl md:text-4xl font-bold text-ink mb-8"
              >
                How We Operate
              </h2>
              <div className="grid grid-cols-2 gap-5">
                {VALUES.map((value) => (
                  <div
                    key={value.title}
                    className="p-5 rounded-2xl bg-white"
                    style={{ border: '1px solid #E2E8F8' }}
                  >
                    <div
                      className="w-8 h-1 rounded-full mb-4"
                      style={{ background: value.accent }}
                    />
                    <h3 className="text-sm font-semibold text-ink mb-2">{value.title}</h3>
                    <p className="text-xs text-ink-muted leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2
              className="text-3xl md:text-4xl font-bold text-ink mb-5"
            >
              Ready to Start Something?
            </h2>
            <p className="text-ink-secondary mb-8 max-w-md mx-auto">
              Let&apos;s have a conversation about your project. No pressure, no pitch — just an honest discussion.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #1E3AE0 0%, #2B47D9 100%)', boxShadow: '0 8px 32px -8px rgba(30,58,224,0.45)' }}
            >
              Get in Touch
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <rect x="1" y="3" width="14" height="10" rx="2" /><path d="M1 5l7 4 7-4" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <path d="M3 1h3l1.5 4L5.5 6.5a10 10 0 004 4L11 8.5l4 1.5V13a2 2 0 01-2 2C5.4 15 1 10.6 1 5a2 2 0 012-4z" />
    </svg>
  )
}
function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <path d="M8 1.5A4.5 4.5 0 013.5 6C3.5 9.5 8 14.5 8 14.5S12.5 9.5 12.5 6A4.5 4.5 0 018 1.5z" /><circle cx="8" cy="6" r="1.5" />
    </svg>
  )
}
