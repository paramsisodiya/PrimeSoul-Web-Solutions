import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { AGENCY } from '@/lib/data'

export const metadata: Metadata = {
  title: 'About',
  description: 'The story behind PrimeSoul — a digital agency built on craft, honesty, and measurable results.',
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
              style={{ fontFamily: 'Playfair Display, serif', color: '#0D1340' }}
            >
              Built by Someone Who{' '}
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
              PrimeSoul isn&apos;t a team of dozens or a corporation with layers. It&apos;s a focused studio led by a developer who is personally invested in every project&apos;s success.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Founder section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <AnimatedSection direction="left">
              <div className="relative">
                <div
                  className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0"
                  style={{
                    boxShadow: '0 24px 80px -16px rgba(30,58,224,0.20)',
                    border: '1px solid rgba(226,232,248,0.8)',
                  }}
                >
                  <Image
                    src="/images/founder.jpg"
                    alt="Param Sisodiya — Founder of PrimeSoul"
                    fill
                    className="object-cover object-top"
                  />
                  {/* Gradient overlay at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-32"
                    style={{ background: 'linear-gradient(to top, rgba(30,58,224,0.15), transparent)' }}
                  />
                </div>

                {/* Floating card */}
                <div
                  className="absolute -bottom-4 -right-4 lg:right-12 rounded-2xl p-4 bg-white"
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
              </div>
            </AnimatedSection>

            {/* Content */}
            <AnimatedSection direction="right">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-3">Founder</p>
              <h2
                className="text-4xl font-bold text-ink mb-2"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {AGENCY.founder.name}
              </h2>
              <p className="text-brand-navy font-medium mb-6">{AGENCY.founder.role}</p>

              <div className="flex flex-col gap-5 mb-8">
                <p className="text-ink-secondary leading-relaxed">
                  I started building websites as a way to solve real problems for people around me. The school in Khilchipur needed a digital presence. A local solar company had no way to reach customers online. A portfolio needed to convert visitors into clients.
                </p>
                <p className="text-ink-secondary leading-relaxed">
                  PrimeSoul grew from that work — from the belief that every business, regardless of size or location, deserves a professional digital presence that actually performs.
                </p>
                <p className="text-ink-secondary leading-relaxed">
                  I obsess over the details that most people won&apos;t notice but will definitely feel: load speeds, interaction quality, the way a headline makes someone lean forward. That&apos;s the standard every project gets.
                </p>
              </div>

              {/* Contact info */}
              <div className="flex flex-col gap-3 mb-8">
                <a href="mailto:paramsisodiya061@gmail.com" className="flex items-center gap-3 text-sm text-ink-secondary hover:text-ink transition-colors">
                  <EmailIcon />
                  {AGENCY.founder.email}
                </a>
                <a href="tel:8770404559" className="flex items-center gap-3 text-sm text-ink-secondary hover:text-ink transition-colors">
                  <PhoneIcon />
                  +91 {AGENCY.founder.phone}
                </a>
                <span className="flex items-center gap-3 text-sm text-ink-muted">
                  <LocationIcon />
                  {AGENCY.founder.location}
                </span>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #1E3AE0 0%, #2B47D9 100%)', boxShadow: '0 8px 24px -8px rgba(30,58,224,0.4)' }}
                >
                  Work With Me
                </Link>
                <a
                  href="https://paramsisodiya.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl text-sm font-semibold text-ink border border-surface-border bg-white hover:bg-surface-subtle transition-colors"
                >
                  View Portfolio
                </a>
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
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                What I Do Well
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
                style={{ fontFamily: 'Playfair Display, serif' }}
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
              style={{ fontFamily: 'Playfair Display, serif' }}
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
      <rect x="1" y="3" width="14" height="10" rx="2"/><path d="M1 5l7 4 7-4"/>
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <path d="M3 1h3l1.5 4L5.5 6.5a10 10 0 004 4L11 8.5l4 1.5V13a2 2 0 01-2 2C5.4 15 1 10.6 1 5a2 2 0 012-4z"/>
    </svg>
  )
}
function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <path d="M8 1.5A4.5 4.5 0 013.5 6C3.5 9.5 8 14.5 8 14.5S12.5 9.5 12.5 6A4.5 4.5 0 018 1.5z"/><circle cx="8" cy="6" r="1.5"/>
    </svg>
  )
}

