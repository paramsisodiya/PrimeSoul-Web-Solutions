'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Metric {
  label: string
  value: string
}

interface Project {
  id: string
  title: string
  slug: string
  client?: string
  category?: string
  year?: string
  description?: string
  problem?: string
  solution?: string
  result?: string
  image?: string
  imageAlt?: string
  liveUrl?: string
  tech?: string[]
  tags?: string[]
  metrics?: Metric[]
  color?: string
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function normalizeProject(d: any): Project {
  const raw = typeof d.data === 'function' ? d.data() : d
  return {
    id: d.id || raw.id || '',
    title: raw.title || 'Untitled Project',
    slug: raw.slug || slugify(raw.title || 'project'),
    client: raw.client || '',
    category: raw.category || 'Website',
    year: raw.year || '',
    description: raw.description || '',
    problem: raw.problem || '',
    solution: raw.solution || '',
    result: raw.result || '',
    image: raw.image || '',
    imageAlt: raw.imageAlt || raw.title || 'Project image',
    liveUrl: raw.liveUrl || '#',
    tech: raw.tech || raw.tags || [],
    tags: raw.tags || raw.tech || [],
    metrics: raw.metrics || [],
    color: raw.color || '#1E3AE0',
  }
}

export default function CaseStudyPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [project, setProject] = useState<Project | null>(null)
  const [status, setStatus] = useState<'loading' | 'found' | 'not-found'>('loading')

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return
      setStatus('loading')

      try {
        const snap = await getDocs(query(collection(db, 'portfolio'), orderBy('createdAt', 'desc')))
        const projects = snap.docs.map((doc) => normalizeProject(doc))
        const found = projects.find((item) => item.slug === slug)
        if (found) {
          setProject(found)
          setStatus('found')
        } else {
          setProject(null)
          setStatus('not-found')
        }
      } catch (error) {
        console.error('Portfolio fetch failed', error)
        setProject(null)
        setStatus('not-found')
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
        <p className="text-[#7A7A9E] max-w-xl mb-8">
          The requested portfolio case study could not be located.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/portfolio" className="rounded-full bg-[#7B2FF2] px-6 py-3 text-white font-semibold">View Portfolio</Link>
          <Link href="/" className="rounded-full border border-[#E8EAF8] px-6 py-3 text-[#0E0E2C] font-semibold">Back Home</Link>
        </div>
      </main>
    )
  }

  const techArray = project.tech || []
  const metricsArray = project.metrics || []
  const projectColor = project.color || '#1E3AE0'

  return (
    <main className="bg-[#F8F9FE]">
      <section className="pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold" style={{ borderColor: `${projectColor}33`, color: projectColor }}>
                <span>{project.category}</span>
              </div>
              <h1 className="mt-6 text-5xl font-bold tracking-tight text-[#0E0E2C]">{project.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4B5275]">{project.description || 'A premium project case study from PrimeSoul.'}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Client', value: project.client },
                  { label: 'Year', value: project.year },
                  { label: 'Category', value: project.category },
                ].filter(item => item.value).map((item) => (
                  <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#7B2FF2] mb-2">{item.label}</p>
                    <p className="text-base font-semibold text-[#0E0E2C]">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#1E3AE0] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1636b1]"
                  >
                    View Live Site
                  </a>
                )}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#0E0E2C] transition hover:bg-slate-50"
                >
                  Start a Project
                </Link>
              </div>
            </div>

            <div className="space-y-5">
              {metricsArray.length > 0 && (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#7B2FF2] mb-4">Key Metrics</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {metricsArray.map((metric) => (
                      <div key={metric.label} className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                        <p className="text-2xl font-bold text-[#0E0E2C]">{metric.value}</p>
                        <p className="mt-2 text-sm text-[#6B7280]">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {techArray.length > 0 && (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#7B2FF2] mb-4">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {techArray.map((tech) => (
                      <span key={tech} className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-[#334155]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {project.image && (
        <section className="bg-white py-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100" style={{ minHeight: 420 }}>
              <Image src={project.image} alt={project.imageAlt || project.title} fill className="object-cover" />
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 space-y-16">
          {project.problem && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-[#7B2FF2] mb-4">The Problem</p>
              <h2 className="text-3xl font-bold text-[#0E0E2C] mb-4">What the client faced</h2>
              <p className="text-base leading-8 text-[#475569]">{project.problem}</p>
            </div>
          )}

          {project.solution && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-[#7B2FF2] mb-4">The Solution</p>
              <h2 className="text-3xl font-bold text-[#0E0E2C] mb-4">How we solved it</h2>
              <p className="text-base leading-8 text-[#475569]">{project.solution}</p>
            </div>
          )}

          {project.result && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-[#7B2FF2] mb-4">The Result</p>
              <h2 className="text-3xl font-bold text-[#0E0E2C] mb-4">What changed</h2>
              <p className="text-base leading-8 text-[#475569]">{project.result}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
