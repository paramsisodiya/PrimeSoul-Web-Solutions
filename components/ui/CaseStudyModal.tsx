'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react'

export interface CaseStudyProject {
  id: string
  title: string
  slug: string
  image: string
  imageAlt?: string
  category?: string
  client?: string
  year?: string
  description?: string
  problem?: string
  solution?: string
  result?: string
  tech?: string[]
  metrics?: Array<{ label: string; value: string }>
  liveUrl?: string
}

export default function CaseStudyModal({
  project,
  onClose,
}: {
  project: CaseStudyProject | null
  onClose: () => void
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (project) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Glassmorphic Backdrop */}
      <div
        className="fixed inset-0 bg-[#0E0E2C]/80 backdrop-blur-2xl transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.3)] overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto animate-fade-in">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-surface-border flex items-center justify-between bg-white/80 sticky top-0 z-20 backdrop-blur-md">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#7B2FF2] bg-[#7B2FF2]/10 px-3 py-1 rounded-full">
              {project.category || 'Case Study'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0E0E2C] mt-2 leading-tight">
              {project.title}
            </h2>
            <p className="text-xs text-ink-muted mt-1 font-medium">
              {[project.client, project.year].filter(Boolean).join(' · ')}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-surface-subtle hover:bg-surface-border flex items-center justify-center text-[#0E0E2C] transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 custom-scrollbar">
          {/* Project Screenshot Visual */}
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-surface-border shadow-md group">
            <Image
              src={project.image || '/images/responsive-devices-mockup.png'}
              alt={project.imageAlt || project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E2C]/60 via-transparent to-transparent opacity-60" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="text-xs font-bold text-white bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                Live Interactive Demo
              </span>
              <ShieldCheck className="text-[#00C9A7]" size={22} />
            </div>
          </div>

          {/* Key Metrics Row */}
          {Array.isArray(project.metrics) && project.metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-surface-subtle/50 border border-surface-border text-center">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#1E3AE0]">{m.value}</div>
                  <div className="text-xs font-semibold text-ink-muted mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Problem & Solution Breakdown */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-surface-border space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#0E0E2C] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                The Challenge
              </h4>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {project.problem || 'Need for a modern, high-speed digital platform to capture online leads and scale business operations.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-surface-border space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#0E0E2C] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00C9A7]" />
                The Solution
              </h4>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {project.solution || 'Engineered a full-stack Next.js web application with 100/100 Core Web Vitals speed, automated workflows, and custom CMS.'}
              </p>
            </div>
          </div>

          {/* Tech Stack Badges */}
          {Array.isArray(project.tech) && project.tech.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#7B2FF2]/10 text-[#7B2FF2] border border-[#7B2FF2]/15"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer CTAs */}
        <div className="p-6 sm:p-8 border-t border-surface-border bg-white/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 sticky bottom-0 z-20">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold text-ink-secondary hover:text-[#0E0E2C] bg-surface-subtle transition-colors"
          >
            Close Case Study
          </button>

          <div className="flex flex-wrap items-center gap-3">
            {project.slug === 'primeoms' ? (
              <>
                <a
                  href="https://primeoms.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white shadow-md hover:scale-105 transition-transform"
                  style={{ background: 'linear-gradient(135deg, #FF5A1F 0%, #FF8A4C 100%)' }}
                >
                  <span>Launch Live App ↗</span>
                  <ExternalLink size={15} />
                </a>

                <Link
                  href="/primeoms"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-[#0E0E2C] bg-surface-subtle hover:bg-white border border-surface-border transition-transform hover:scale-105"
                >
                  <span>Product Overview</span>
                </Link>
              </>
            ) : (
              <Link
                href="/contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white shadow-md hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(135deg, #1E3AE0 0%, #2EC4C4 100%)' }}
              >
                <span>Build Similar Project</span>
                <CheckCircle2 size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
