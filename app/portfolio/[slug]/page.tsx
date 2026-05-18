import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'

interface Project {
  id: string
  title: string
  slug: string
  image: string
  imageAlt?: string
  category?: string
  client?: string
  year?: string
  description: string
  tech?: string[]
  tags?: string[]
  metrics?: Array<{ label: string; value: string }>
  liveUrl?: string
  color?: string
  problem?: string
  solution?: string
  result?: string
}

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function normalizeProject(d: any): Project {
  const raw = typeof d.data === 'function' ? d.data() : d
  const id = d.id || raw.id || ''
  return {
    id,
    title: raw.title || 'Untitled',
    slug: raw.slug || slugify(raw.title || 'project'),
    image: raw.image || '',
    imageAlt: raw.imageAlt || raw.title || 'Project image',
    category: raw.category || 'Website',
    client: raw.client || '',
    year: raw.year || '',
    description: raw.description || '',
    tech: raw.tech || raw.tags || [],
    metrics: raw.metrics || [],
    liveUrl: raw.liveUrl || '#',
    color: raw.color || '#1E3AE0',
    problem: raw.problem || '',
    solution: raw.solution || '',
    result: raw.result || '',
  }
}

async function getPortfolioData(): Promise<Project[]> {
  try {
    const snap = await getDocs(query(collection(db, 'portfolio'), orderBy('createdAt', 'desc')))
    return snap.docs.map(d => normalizeProject(d))
  } catch {
    return []
  }
}

async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getPortfolioData()
  return projects.find(p => p.slug === slug) || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: project.title,
    description: project.description,
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug)
  if (!project) notFound()

  const projects = await getPortfolioData()
  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 2)

  const techArray = project.tech || []
  const metricsArray = project.metrics || []
  const projectColor = project.color || '#1E3AE0'

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-0 relative overflow-hidden" style={{ background: '#F8F9FE' }}>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 60% at 70% 40%, ${projectColor}09 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 70%, rgba(46,196,196,0.06) 0%, transparent 60%)`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <AnimatedSection className="mb-10">
            <nav className="flex items-center gap-2 text-sm text-ink-muted">
              <Link href="/" className="hover:text-ink transition-colors">Home</Link>
              <span>/</span>
              <Link href="/portfolio" className="hover:text-ink transition-colors">Portfolio</Link>
              <span>/</span>
              <span className="text-ink">{project.title}</span>
            </nav>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-end pb-16">
            <AnimatedSection>
              {project.category && (
                <div
                  className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: `${projectColor}10`, color: projectColor, border: `1px solid ${projectColor}20` }}
                >
                  {project.category}
                </div>
              )}
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-5"
                style={{ fontFamily: 'Playfair Display, serif', color: '#0D1340' }}
              >
                {project.title}
              </h1>
              <p className="text-lg text-ink-secondary leading-relaxed mb-8 max-w-lg">
                {project.description}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap gap-6 mb-8">
                {[
                  { label: 'Client', value: project.client },
                  { label: 'Year', value: project.year },
                  { label: 'Category', value: project.category },
                ].filter(m => m.value).map((m) => (
                  <div key={m.label}>
                    <p className="text-xs text-ink-faint uppercase tracking-widest mb-1">{m.label}</p>
                    <p className="text-sm font-semibold text-ink">{m.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px"
                    style={{
                      background: `linear-gradient(135deg, ${projectColor} 0%, #2EC4C4 100%)`,
                      boxShadow: `0 8px 24px -8px ${projectColor}60`,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 12L12 2M6 2h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    View Live Site
                  </a>
                )}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-ink border border-surface-border bg-white hover:bg-surface-subtle transition-colors"
                >
                  Start Similar Project
                </Link>
              </div>
            </AnimatedSection>

            {/* Metrics */}
            <AnimatedSection delay={150}>
              {metricsArray.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {metricsArray.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl p-5 text-center bg-white"
                      style={{ border: '1px solid #E2E8F8', boxShadow: '0 2px 16px -4px rgba(30,58,224,0.06)' }}
                    >
                      <div
                        className="text-2xl font-bold mb-1"
                        style={{
                          fontFamily: 'Playfair Display, serif',
                          background: `linear-gradient(135deg, ${projectColor} 0%, #2EC4C4 100%)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {m.value}
                      </div>
                      <div className="text-xs text-ink-muted font-medium">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech stack */}
              {techArray.length > 0 && (
                <div
                  className={`${metricsArray.length > 0 ? 'mt-4' : ''} rounded-2xl p-5 bg-white`}
                  style={{ border: '1px solid #E2E8F8' }}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {techArray.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-full text-xs font-medium"
                        style={{ background: '#F4F7FF', color: '#3D4A7A', border: '1px solid #E2E8F8' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Hero image */}
      {project.image && (
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection>
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  height: '480px',
                  boxShadow: '0 32px 80px -16px rgba(30,58,224,0.15)',
                  border: '1px solid #E2E8F8',
                }}
              >
                <Image
                  src={project.image}
                  alt={project.imageAlt || project.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Bottom fade */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-32"
                  style={{ background: 'linear-gradient(to top, white, transparent)' }}
                />
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Case study body */}
      {(project.problem || project.solution || project.result) && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto">

              {/* Problem */}
              {project.problem && (
                <AnimatedSection className="mb-16">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(239,68,68,0.08)' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="6.5" stroke="#EF4444" strokeWidth="1.2" />
                        <path d="M7 4v3.5M7 10h.01" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <SectionLabel>The Problem</SectionLabel>
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-ink mb-5"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    What Needed Solving
                  </h2>
                  <div
                    className="rounded-2xl p-6 md:p-8"
                    style={{ background: 'rgba(239,68,68,0.03)', border: '1px solid rgba(239,68,68,0.08)' }}
                  >
                    <p className="text-ink-secondary leading-relaxed text-base">{project.problem}</p>
                  </div>
                </AnimatedSection>
              )}

              {/* Solution */}
              {project.solution && (
                <AnimatedSection className="mb-16">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(30,58,224,0.08)' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="6.5" stroke="#1E3AE0" strokeWidth="1.2" />
                        <path d="M4 7l2 2 4-4" stroke="#1E3AE0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <SectionLabel>The Solution</SectionLabel>
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-ink mb-5"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    How We Approached It
                  </h2>
                  <div
                    className="rounded-2xl p-6 md:p-8"
                    style={{ background: 'rgba(30,58,224,0.03)', border: '1px solid rgba(30,58,224,0.08)' }}
                  >
                    <p className="text-ink-secondary leading-relaxed text-base">{project.solution}</p>
                  </div>
                </AnimatedSection>
              )}

              {/* Result */}
              {project.result && (
                <AnimatedSection className="mb-16">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(46,196,196,0.1)' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <polyline points="1 10 4 7 7 9 13 3" stroke="#2EC4C4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <SectionLabel>The Result</SectionLabel>
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-ink mb-5"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    What Changed
                  </h2>
                  <div
                    className="rounded-2xl p-6 md:p-8"
                    style={{ background: 'rgba(46,196,196,0.04)', border: '1px solid rgba(46,196,196,0.12)' }}
                  >
                    <p className="text-ink-secondary leading-relaxed text-base">{project.result}</p>
                  </div>
                </AnimatedSection>
              )}

              {/* CTA */}
              <AnimatedSection>
                <div
                  className="rounded-3xl p-8 md:p-10 text-center"
                  style={{
                    background: 'linear-gradient(135deg, #1E3AE0 0%, #2B47D9 100%)',
                    boxShadow: '0 16px 48px -12px rgba(30,58,224,0.40)',
                  }}
                >
                  <h3
                    className="text-2xl font-bold text-white mb-3"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Want similar results for your business?
                  </h3>
                  <p className="text-white/60 mb-6 text-sm">
                    Let&apos;s talk about what you need and how we can build it.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-brand-navy bg-white hover:bg-brand-light transition-colors"
                  >
                    Start a Project
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}

      {/* More projects */}
      {otherProjects.length > 0 && (
        <section className="py-20" style={{ background: '#F8F9FE' }}>
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection className="mb-10">
              <h2 className="text-2xl font-bold text-ink" style={{ fontFamily: 'Playfair Display, serif' }}>
                More Projects
              </h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-6">
              {otherProjects.map((p, i) => (
                <AnimatedSection key={p.slug || p.id} delay={i * 80}>
                  <Link
                    href={`/portfolio/${p.slug}`}
                    className="group block rounded-3xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1"
                    style={{ border: '1px solid #E2E8F8', boxShadow: '0 2px 24px -4px rgba(30,58,224,0.06)' }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      {p.image ? (
                        <Image src={p.image} alt={p.imageAlt || p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                          <span className="text-3xl font-bold text-blue-200">{p.title?.charAt(0) || 'P'}</span>
                        </div>
                      )}
                      {p.category && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90" style={{ color: p.color || '#1E3AE0' }}>
                            {p.category}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-ink group-hover:text-brand-navy transition-colors mb-1">{p.title}</h3>
                      <p className="text-xs text-ink-muted">
                        {[p.client, p.year].filter(Boolean).join(' · ') || '\u00A0'}
                      </p>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
