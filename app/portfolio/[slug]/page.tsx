'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import AnimatedSection from '@/components/ui/AnimatedSection'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import MagneticButton from '@/components/ui/MagneticButton'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider'

interface Metric { label: string; value: string }
interface Project {
  id: string; title: string; slug: string; client?: string; category?: string; year?: string
  description?: string; problem?: string; solution?: string; result?: string
  image?: string; imageAlt?: string; liveUrl?: string; tech?: string[]; tags?: string[]
  metrics?: Metric[]; color?: string
  beforeImage?: string; afterImage?: string
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function normalizeProject(d: any): Project {
  const raw = typeof d.data === 'function' ? d.data() : d
  return {
    id: d.id || raw.id || '', title: raw.title || 'Untitled Project',
    slug: raw.slug || slugify(raw.title || 'project'), client: raw.client || '',
    category: raw.category || 'Website', year: raw.year || '',
    description: raw.description || '', problem: raw.problem || '',
    solution: raw.solution || '', result: raw.result || '',
    image: raw.image || '', imageAlt: raw.imageAlt || raw.title || 'Project image',
    liveUrl: raw.liveUrl || '#', tech: raw.tech || raw.tags || [],
    tags: raw.tags || raw.tech || [], metrics: raw.metrics || [],
    color: raw.color || '#7B2FF2',
    beforeImage: raw.beforeImage || '', afterImage: raw.afterImage || '',
  }
}

export default function CaseStudyPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [project, setProject] = useState<Project | null>(null)
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [status, setStatus] = useState<'loading' | 'found' | 'not-found'>('loading')

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return
      setStatus('loading')
      try {
        const snap = await getDocs(query(collection(db, 'portfolio'), orderBy('createdAt', 'desc')))
        const projects = snap.docs.map((doc) => normalizeProject(doc))
        setAllProjects(projects)
        
        // Smart matching: exact match first, then fallback to normalized partial match
        const normalizeForCompare = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')
        let found = projects.find((item) => item.slug.toLowerCase() === slug.toLowerCase())
        
        if (!found) {
          found = projects.find(item => {
            const itemNorm = normalizeForCompare(item.slug)
            const slugNorm = normalizeForCompare(slug)
            return itemNorm.includes(slugNorm) || slugNorm.includes(itemNorm)
          })
        }

        if (found) { setProject(found); setStatus('found') }
        else { setProject(null); setStatus('not-found') }
      } catch (error) {
        console.error('Portfolio fetch failed', error)
        setProject(null); setStatus('not-found')
      }
    }
    fetchProject()
  }, [slug])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFE]">
        <div className="h-12 w-12 rounded-full border-4 border-[#7B2FF2] border-t-transparent animate-spin" />
      </div>
    )
  }

  if (status === 'not-found' || !project) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFE] px-6 py-24 text-center">
        <h1 className="text-6xl font-bold text-[#0E0E2C] mb-4">404</h1>
        <p className="text-2xl font-semibold text-[#0E0E2C] mb-3">Project Not Found</p>
        <p className="text-[#7A7A9E] max-w-xl mb-8">The requested portfolio case study could not be located.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/portfolio" className="rounded-full bg-[#7B2FF2] px-6 py-3 text-white font-semibold">View Portfolio</Link>
          <Link href="/" className="rounded-full border border-[#E8EAF8] px-6 py-3 text-[#0E0E2C] font-semibold">Back Home</Link>
        </div>
      </main>
    )
  }

  const techArray = project.tech || []
  const metricsArray = project.metrics || []
  const projectColor = project.color || '#7B2FF2'

  // Find next project
  const currentIdx = allProjects.findIndex(p => p.slug === slug)
  const nextProject = allProjects[(currentIdx + 1) % allProjects.length]

  const sections = [
    { key: 'problem', label: 'The Problem', title: 'What the client faced', content: project.problem, icon: '🔍' },
    { key: 'solution', label: 'Our Solution', title: 'How we solved it', content: project.solution, icon: '⚡' },
    { key: 'result', label: 'The Result', title: 'What changed', content: project.result, icon: '🎯' },
  ].filter(s => s.content)

  return (
    <main className="bg-[#FAFAFE]">
      {/* Hero */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          background: `radial-gradient(ellipse 60% 50% at 20% 60%, ${projectColor}15 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 20%, ${projectColor}10 0%, transparent 60%)`
        }} />
        <div className="relative mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-[#7A7A9E] hover:text-[#0E0E2C] transition-colors mb-8">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Back to Portfolio
            </Link>
          </AnimatedSection>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
            <AnimatedSection>
              <div className="inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold mb-6" style={{ borderColor: `${projectColor}33`, color: projectColor, background: `${projectColor}08` }}>
                <span className="w-2 h-2 rounded-full" style={{ background: projectColor }} />
                {project.category}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0E0E2C] mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {project.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#4B5275] mb-8">{project.description || 'A premium project case study from PrimeSoul.'}</p>

              <div className="flex flex-wrap gap-4">
                {project.liveUrl && project.liveUrl !== '#' && (
                  <MagneticButton strength={0.2} radius={120}>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                      style={{ background: `linear-gradient(135deg, ${projectColor}, ${projectColor}cc)`, boxShadow: `0 8px 24px -8px ${projectColor}60` }}>
                      View Live Site <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 10L10 4M10 4H5M10 4V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  </MagneticButton>
                )}
                <MagneticButton strength={0.15} radius={100}>
                  <Link href="/contact" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#0E0E2C] transition hover:bg-slate-50">
                    Start a Project
                  </Link>
                </MagneticButton>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <div className="space-y-5">
                {/* Info cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: 'Client', value: project.client },
                    { label: 'Year', value: project.year },
                    { label: 'Category', value: project.category },
                  ].filter(item => item.value).map((item) => (
                    <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 tilt-card">
                      <p className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-2" style={{ color: projectColor }}>{item.label}</p>
                      <p className="text-base font-semibold text-[#0E0E2C]">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Metrics */}
                {metricsArray.length > 0 && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 tilt-card">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: projectColor }}>Key Metrics</p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {metricsArray.map((metric) => (
                        <div key={metric.label} className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                          <p className="text-2xl font-bold text-[#0E0E2C]">{metric.value}</p>
                          <p className="mt-1 text-sm text-[#6B7280]">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech */}
                {techArray.length > 0 && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 tilt-card">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: projectColor }}>Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {techArray.map((tech) => (
                        <span key={tech} className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-[#334155] font-medium">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Full-width image */}
      {project.image && (
        <section className="bg-white py-12">
          <AnimatedSection className="mx-auto max-w-6xl px-6">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100" style={{ minHeight: 420 }}>
              <Image src={project.image} alt={project.imageAlt || project.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          </AnimatedSection>
        </section>
      )}

      {/* Before/After Slider */}
      {project.beforeImage && (
        <section className="bg-[#FAFAFE] py-12">
          <AnimatedSection className="mx-auto max-w-5xl px-6">
            <p className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-4 text-center" style={{ color: projectColor }}>Before & After</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink text-center mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>See the Transformation</h2>
            <BeforeAfterSlider
              beforeImage={project.beforeImage}
              afterImage={project.afterImage || project.image || ''}
              beforeLabel="Before"
              afterLabel="After — PrimeSoul"
              height={460}
            />
          </AnimatedSection>
        </section>
      )}


      {/* Problem → Solution → Result */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 space-y-8">
          {sections.map((s, i) => (
            <AnimatedSection key={s.key} delay={i * 100}>
              <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 transition-all hover:shadow-lg hover:-translate-y-0.5" style={{ borderLeft: `4px solid ${projectColor}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{s.icon}</span>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-semibold" style={{ color: projectColor }}>{s.label}</p>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0E0E2C] mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>{s.title}</h2>
                <p className="text-base leading-8 text-[#475569]">{s.content}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Next Project Navigation */}
      {nextProject && nextProject.slug !== slug && (
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-6">
            <AnimatedSection>
              <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#AEAEC8] mb-4">Next Project</p>
              <Link href={`/portfolio/${nextProject.slug}`} className="group flex items-center justify-between gap-8 py-4 transition-colors">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-[#0E0E2C] group-hover:text-[#7B2FF2] transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {nextProject.title}
                  </h3>
                  <p className="text-[#7A7A9E] mt-2">{nextProject.category} · {nextProject.year}</p>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:border-[#7B2FF2] group-hover:bg-[#7B2FF2] transition-all flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[#7A7A9E] group-hover:text-white transition-colors">
                    <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}
    </main>
  )
}
