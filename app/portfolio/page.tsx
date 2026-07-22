
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

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
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'portfolio'), orderBy('createdAt', 'desc')))
        const data = snap.docs.map(d => {
          const raw = d.data()
          return {
            id: d.id,
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
          } as Project
        })
        setProjects(data)
      } catch (err) {
        console.error('Error fetching portfolio:', err)
        setProjects([])
      }
    }
    fetchProjects()
  }, [])
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: '#F8F9FE' }}>
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 50% 60% at 20% 60%, rgba(30,58,224,0.07) 0%, transparent 60%), radial-gradient(ellipse 40% 50% at 80% 30%, rgba(46,196,196,0.06) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection className="max-w-2xl">
            <SectionLabel>Portfolio</SectionLabel>
            <h1
              className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-5"
              style={{ color: '#0D1340' }}
            >
              Projects That{' '}
              <span style={{
                background: 'linear-gradient(135deg, #1E3AE0 0%, #2EC4C4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Made a Difference
              </span>
            </h1>
            <p className="text-lg text-ink-secondary leading-relaxed">
              Every project here represents a real client, a real problem, and a solution built from scratch.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {projects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-ink-muted text-lg">No projects found yet. Check back soon!</p>
            </div>
          ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <AnimatedSection key={project.slug || project.id} delay={i * 80}>
                <div
                  className="group rounded-3xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1"
                  style={{
                    border: '1px solid #E2E8F8',
                    boxShadow: '0 2px 24px -4px rgba(30,58,224,0.06)',
                  }}
                >
                  <Link href={`/portfolio/${project.slug}`} className="block">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.imageAlt || project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                          <span className="text-4xl font-bold text-blue-200">{project.title?.charAt(0) || 'P'}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Category */}
                      <div className="absolute top-5 left-5 flex items-center gap-2">
                        {project.category && (
                          <span
                            className="px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm"
                            style={{ background: 'rgba(255,255,255,0.92)', color: project.color || '#1E3AE0' }}
                          >
                            {project.category}
                          </span>
                        )}
                        {project.liveUrl && project.liveUrl !== '#' && (
                          <span
                            className="px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm flex items-center gap-1.5"
                            style={{ background: 'rgba(46,196,196,0.15)', color: '#0D9B9B', backdropFilter: 'blur(8px)' }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                            Live
                          </span>
                        )}
                      </div>

                      {/* Hover overlay button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20">
                          View Case Study
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-7">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h2 className="text-xl font-semibold text-ink group-hover:text-brand-navy transition-colors">
                            {project.title}
                          </h2>
                          <p className="text-sm text-ink-muted mt-1">
                            {[project.client, project.year].filter(Boolean).join(' · ') || '\u00A0'}
                          </p>
                        </div>
                        <div
                          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-3"
                          style={{ background: `${project.color || '#1E3AE0'}12`, color: project.color || '#1E3AE0' }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>

                      {project.description && (
                        <p className="text-sm text-ink-muted leading-relaxed mb-5 line-clamp-2">
                          {project.description}
                        </p>
                      )}

                      {/* Tech tags */}
                      {Array.isArray(project.tech) && project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 rounded-full text-xs font-medium"
                              style={{ background: '#F4F7FF', color: '#3D4A7A', border: '1px solid #E2E8F8' }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Metrics */}
                      {Array.isArray(project.metrics) && project.metrics.length > 0 && (
                        <div className="flex gap-6 pt-5 border-t border-surface-border">
                          {project.metrics.map((m) => (
                            <div key={m.label}>
                              <div className="text-base font-bold text-ink">{m.value}</div>
                              <div className="text-xs text-ink-faint">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <div className="px-7 pb-5 -mt-1">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-brand-navy hover:text-brand-cyan transition-colors"
                      >
                        Live Site
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 8L8 2M4 2h4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: '#F8F9FE' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-ink mb-4">
              Your Project Could Be Next
            </h2>
            <p className="text-ink-secondary mb-8 max-w-md mx-auto">
              Every project on this page started with a conversation.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #1E3AE0 0%, #2B47D9 100%)', boxShadow: '0 8px 32px -8px rgba(30,58,224,0.45)' }}
            >
              Start a Project
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
