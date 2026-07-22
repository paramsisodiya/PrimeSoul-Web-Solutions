"use client";
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
  featured?: boolean
  tech?: string[]
  tags?: string[]
  metrics?: Array<{ label: string; value: string }>
  color?: string
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function PortfolioSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [allProjects, setAllProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'portfolio'), orderBy('createdAt', 'desc')))
        const projects = snap.docs.map(d => {
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
            featured: raw.featured || false,
            tech: raw.tech || raw.tags || [],
            metrics: raw.metrics || [],
            color: raw.color || '#1E3AE0',
          } as Project
        })
        setAllProjects(projects.length > 0 ? projects : [])
      } catch (err) {
        console.error('Error fetching projects:', err)
        setAllProjects([])
      }
    }
    fetchProjects()
  }, [])

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Watermark */}
      <div className="watermark-text text-[clamp(100px,14vw,220px)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        PORTFOLIO
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
          <div className="max-w-xl">
            <SectionLabel>Case Studies</SectionLabel>
            <h2
              className="text-[1.6rem] sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em] mb-3 sm:mb-4"
              style={{ color: '#0E0E2C' }}
            >
              Work That Speaks{' '}
              <span className="text-gradient-purple">for Itself</span>
            </h2>
            <p className="text-ink-secondary leading-relaxed">
              Empowering brands with innovative strategies to drive growth and success.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-ink-secondary hover:text-brand-primary transition-colors"
          >
            View all projects
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </AnimatedSection>

        {/* Porto-style numbered project list */}
        <AnimatedSection>
          <div className="divide-y divide-surface-border">
            {allProjects.map((project, i) => (
              <Link
                key={project.slug || project.id}
                href={`/portfolio/${project.slug}`}
                data-cursor="View"
                className="group flex items-center gap-4 sm:gap-8 py-5 sm:py-8 transition-colors hover:bg-brand-light/30 -mx-4 sm:-mx-6 px-4 sm:px-6 rounded-2xl"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Number */}
                <span
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold min-w-[50px] sm:min-w-[80px] transition-colors duration-300"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    color: hoveredIndex === i ? '#7B2FF2' : '#E8E5F5',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Project info */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-base sm:text-xl md:text-2xl font-bold text-ink group-hover:text-brand-primary transition-colors truncate"
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm text-ink-muted mt-1 hidden md:block">
                    {[project.client, project.year].filter(Boolean).join(' · ') || '\u00A0'}
                  </p>
                </div>

                {/* Category chip */}
                {project.category && (
                  <span
                    className="hidden md:inline-flex px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300"
                    style={{
                      background: hoveredIndex === i ? 'rgba(123,47,242,0.08)' : '#F0EEFF',
                      color: hoveredIndex === i ? '#7B2FF2' : '#7A7A9E',
                    }}
                  >
                    {project.category}
                  </span>
                )}

                {/* Arrow */}
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: hoveredIndex === i ? 'linear-gradient(135deg, #7B2FF2, #8B5CF6)' : 'rgba(123,47,242,0.06)',
                    color: hoveredIndex === i ? 'white' : '#7B2FF2',
                    transform: hoveredIndex === i ? 'translateX(0)' : 'translateX(-4px)',
                    opacity: hoveredIndex === i ? 1 : 0.5,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </AnimatedSection>

        {/* Featured project cards */}
        <div className="grid lg:grid-cols-3 gap-6 mt-16">
          {allProjects.filter(p => p.featured).slice(0, 3).map((project, i) => (
            <AnimatedSection key={project.slug || project.id} delay={i * 100}>
              <Link
                href={`/portfolio/${project.slug}`}
                className="group block rounded-3xl overflow-hidden bg-white transition-all duration-400 hover:-translate-y-1"
                style={{
                  border: '1px solid #E8E5F5',
                  boxShadow: '0 2px 24px -4px rgba(123,47,242,0.06)',
                }}
                onMouseEnter={(e) => {
                  ; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 56px -12px rgba(123,47,242,0.18)'
                    ; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(123,47,242,0.15)'
                }}
                onMouseLeave={(e) => {
                  ; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 24px -4px rgba(123,47,242,0.06)'
                    ; (e.currentTarget as HTMLElement).style.borderColor = '#E8E5F5'
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-48">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.imageAlt || project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
                      <span className="text-3xl font-bold text-purple-200">{project.title?.charAt(0) || 'P'}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {project.category && (
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm"
                        style={{ background: 'rgba(255,255,255,0.9)', color: '#7B2FF2' }}
                      >
                        {project.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-ink text-base group-hover:text-brand-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-ink-muted mt-1">
                    {[project.client, project.year].filter(Boolean).join(' · ') || '\u00A0'}
                  </p>
                  {Array.isArray(project.metrics) && project.metrics.length > 0 && (
                    <div className="flex gap-4 mt-4 pt-4 border-t border-surface-border">
                      {project.metrics.map((m) => (
                        <div key={m.label}>
                          <div className="text-sm font-bold text-ink">{m.value}</div>
                          <div className="text-xs text-ink-faint">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
