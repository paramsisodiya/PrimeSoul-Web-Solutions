'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { ArrowUpRight } from 'lucide-react'

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
}

const FALLBACK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Madhya Pradesh Darpan',
    slug: 'madhya-pradesh-darpan',
    image: '/images/project-portfolio.png',
    category: 'Web Application',
    client: 'Ankita Trivedi',
    year: '2026',
    featured: true,
  },
  {
    id: '2',
    title: 'Sankalp Shikhar Academy',
    slug: 'sankalp-shikhar-academy',
    image: '/images/project-school.png',
    category: 'Institutional Website',
    client: 'Swadeep Singh Tomar',
    year: '2026',
    featured: true,
  },
  {
    id: '3',
    title: 'Maa Saraswati Academy',
    slug: 'maa-saraswati-academy',
    image: '/images/team-working.png',
    category: 'Institutional Portal',
    client: 'MAA Foundation',
    year: '2026',
    featured: true,
  },
  {
    id: '4',
    title: 'A&S Solar Solutions',
    slug: 'solar-solutions',
    image: '/images/project-solar.png',
    category: 'Clean Energy Platform',
    client: 'A&S Group',
    year: '2026',
    featured: true,
  },
]

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'portfolio'), orderBy('createdAt', 'desc')))
        if (!snap.empty) {
          const list = snap.docs.map(d => {
            const raw = d.data()
            return {
              id: d.id,
              title: raw.title || 'Untitled Project',
              slug: raw.slug || slugify(raw.title || 'project'),
              image: raw.image || '/images/project-portfolio.png',
              imageAlt: raw.imageAlt || raw.title,
              category: raw.category || 'Web Application',
              client: raw.client || 'Client Project',
              year: raw.year || '2026',
              featured: raw.featured || false,
            } as Project
          })
          setProjects(list.slice(0, 4)) // Limit to top 4 projects for a clean, compact section
        }
      } catch (err) {
        console.error('Error fetching portfolio:', err)
      }
    }
    fetchProjects()
  }, [])

  return (
    <section className="py-16 sm:py-24 bg-[#FAFAFE] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Row */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div className="max-w-xl">
            <SectionLabel>Featured Work</SectionLabel>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em] text-[#0E0E2C]">
              Work That Speaks <span className="text-gradient-purple font-display italic">for Itself</span>
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary mt-2">
              A curated selection of web applications and digital platforms built for impact.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-primary-dark transition-all group"
          >
            <span>View All Case Studies</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </AnimatedSection>

        {/* Compact 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, i) => (
            <AnimatedSection key={project.slug || project.id} delay={i * 100}>
              <Link
                href={`/portfolio/${project.slug}`}
                className="group block relative rounded-3xl overflow-hidden bg-white border border-surface-border transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-15px_rgba(123,47,242,0.15)] hover:border-brand-primary/30"
              >
                {/* Image & Overlay */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-surface-subtle">
                  <Image
                    src={project.image}
                    alt={project.imageAlt || project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E2C]/70 via-[#0E0E2C]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-[#0E0E2C] shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Arrow Floating Button */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#0E0E2C] group-hover:bg-[#1D4ED8] group-hover:text-white transition-all duration-300 shadow-md group-hover:scale-110">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 flex items-center justify-between gap-4 bg-white">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#0E0E2C] group-hover:text-brand-primary transition-colors leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-muted font-medium mt-1">
                      {[project.client, project.year].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #1E3AE0 0%, #2EC4C4 100%)',
              boxShadow: '0 10px 30px -5px rgba(30,58,224,0.3)',
            }}
          >
            Explore Complete Portfolio (8+ Projects) →
          </Link>
        </div>
      </div>
    </section>
  )
}
