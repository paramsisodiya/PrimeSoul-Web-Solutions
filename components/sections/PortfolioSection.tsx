'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import CaseStudyModal, { CaseStudyProject } from '@/components/ui/CaseStudyModal'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { ArrowUpRight, Eye } from 'lucide-react'

const FALLBACK_PROJECTS: CaseStudyProject[] = [
  {
    id: 'primeoms',
    title: 'PrimeOMS — Restaurant Management SaaS',
    slug: 'primeoms',
    image: '/images/primeoms-hero-mockup.jpg',
    category: 'Flagship Product · SaaS',
    client: 'Built by PrimeSoul',
    year: '2026',
    problem: 'Restaurants suffer from manual handwritten order taking, slow billing bottlenecks, and heavy aggregator commission fees.',
    solution: 'Engineered a unified restaurant operating system with printable QR table standees, real-time kitchen tracking, direct UPI billing, and customer loyalty CRM.',
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'QR Engine', 'Direct UPI'],
    metrics: [
      { label: 'Type', value: 'SaaS' },
      { label: 'Order Flow', value: 'Instant' },
      { label: 'Pricing', value: 'From ₹799' },
    ],
  },
  {
    id: '1',
    title: 'Madhya Pradesh Darpan',
    slug: 'madhya-pradesh-darpan',
    image: '/images/responsive-devices-mockup.png',
    category: 'Web Application',
    client: 'Ankita Trivedi',
    year: '2026',
    problem: 'Required a fast, scalable cultural and educational web app to deliver state-wide digital content.',
    solution: 'Built with Next.js 14, Firebase Firestore, and Tailwind CSS. Achieved 100/100 Google PageSpeed score.',
    tech: ['Next.js 14', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    metrics: [
      { label: 'Page Speed', value: '100/100' },
      { label: 'Active Users', value: '5,000+' },
      { label: 'Uptime', value: '99.9%' },
    ],
  },
  {
    id: '2',
    title: 'Sankalp Shikhar Academy',
    slug: 'sankalp-shikhar-academy',
    image: '/images/project-school.png',
    category: 'Institutional Portal',
    client: 'Swadeep Singh Tomar',
    year: '2026',
    problem: 'Needed a centralized school management portal with online admissions and student notices.',
    solution: 'Designed an accessible educational dashboard with online enquiry forms and parent noticeboards.',
    tech: ['Next.js', 'React', 'Node.js', 'Tailwind CSS'],
    metrics: [
      { label: 'Enquiries', value: '+240%' },
      { label: 'Load Time', value: '0.8s' },
      { label: 'Admissions', value: 'Online' },
    ],
  },
  {
    id: '4',
    title: 'A&S Solar Solutions',
    slug: 'solar-solutions',
    image: '/images/project-solar.png',
    category: 'Clean Energy Platform',
    client: 'A&S Group',
    year: '2026',
    problem: 'Low lead conversion on their previous website due to a lack of interactive solar ROI calculators.',
    solution: 'Built a custom high-converting web portal with automated lead capture and instant WhatsApp quotes.',
    tech: ['Next.js 14', 'TypeScript', 'Firebase', 'WhatsApp API'],
    metrics: [
      { label: 'Leads Generated', value: '350+' },
      { label: 'Conversion', value: '+310%' },
      { label: 'Quote Speed', value: 'Instant' },
    ],
  },
]

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function PortfolioSection() {
  const [projects, setProjects] = useState<CaseStudyProject[]>(FALLBACK_PROJECTS)
  const [selectedProject, setSelectedProject] = useState<CaseStudyProject | null>(null)

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
              problem: raw.problem,
              solution: raw.solution,
              tech: raw.tech || ['Next.js 14', 'TypeScript', 'Tailwind CSS'],
              metrics: raw.metrics || [
                { label: 'Speed', value: '100/100' },
                { label: 'Growth', value: '+200%' },
                { label: 'Uptime', value: '99.9%' },
              ],
            } as CaseStudyProject
          })
          setProjects(list.slice(0, 4))
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
              Click any project card to open the interactive case study breakdown.
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
              <div
                onClick={() => setSelectedProject(project)}
                className="group block relative rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white/60 transition-all duration-400 cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_25px_60px_-15px_rgba(123,47,242,0.2)] hover:border-[#7B2FF2]/30"
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

                  {/* Interactive Case Study Trigger Pill */}
                  <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md flex items-center gap-1.5 text-xs font-bold text-[#0E0E2C] group-hover:bg-[#7B2FF2] group-hover:text-white transition-all duration-300 shadow-md group-hover:scale-105">
                    <Eye size={14} />
                    <span>Quick Preview</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 flex items-center justify-between gap-4 bg-white/90">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#0E0E2C] group-hover:text-[#7B2FF2] transition-colors leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-muted font-medium mt-1">
                      {[project.client, project.year].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #1E3AE0 0%, #7B2FF2 50%, #2EC4C4 100%)',
              boxShadow: '0 10px 30px -5px rgba(123,47,242,0.3)',
            }}
          >
            Explore Complete Portfolio (8+ Projects) →
          </Link>
        </div>
      </div>

      {/* Interactive Case Study Lightbox Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
