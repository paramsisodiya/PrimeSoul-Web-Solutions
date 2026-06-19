'use client'
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp, orderBy, query, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Image from 'next/image'
import { Plus, Pencil, Trash2, X, Save, Briefcase, ExternalLink } from 'lucide-react'

interface Project {
  id: string
  title: string
  slug: string
  client: string
  category: string
  year: string
  description: string
  problem: string
  solution: string
  result: string
  image: string
  imageAlt: string
  liveUrl: string
  tech: string[]
  tags: string[]
  metrics: Array<{ label: string; value: string }>
  color: string
  featured: boolean
  createdAt: Timestamp
}

const COLORS = [
  { label: 'Blue', value: '#1E3AE0' },
  { label: 'Cyan', value: '#2EC4C4' },
  { label: 'Sky', value: '#4DA6FF' },
  { label: 'Navy', value: '#2B47D9' },
  { label: 'Purple', value: '#7B2FF2' },
  { label: 'Pink', value: '#E879F9' },
  { label: 'Green', value: '#10B981' },
  { label: 'Orange', value: '#F59E0B' },
]

const CATEGORIES = ['Website', 'E-Commerce', 'Landing Page', 'Web App', 'Redesign', 'Portfolio Website', 'Institutional Website', 'Business Website']

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const emptyForm = {
  title: '',
  slug: '',
  client: '',
  category: 'Website',
  year: new Date().getFullYear().toString(),
  description: '',
  problem: '',
  solution: '',
  result: '',
  image: '',
  imageAlt: '',
  liveUrl: '',
  tech: '',
  color: '#1E3AE0',
  featured: false,
  metricsRaw: '',
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchProjects = async () => {
    const snap = await getDocs(query(collection(db, 'portfolio'), orderBy('createdAt', 'desc')))
    setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() } as Project)))
    setLoading(false)
  }

  useEffect(() => { fetchProjects() }, [])

  const openNew = () => { setForm(emptyForm); setEditing(null); setShowForm(true) }
  const openEdit = (p: Project) => {
    const techStr = (p.tech || p.tags || []).join(', ')
    const metricsStr = (p.metrics || []).map(m => `${m.label}: ${m.value}`).join('\n')
    setForm({
      title: p.title || '',
      slug: p.slug || '',
      client: p.client || '',
      category: p.category || 'Website',
      year: p.year || '',
      description: p.description || '',
      problem: p.problem || '',
      solution: p.solution || '',
      result: p.result || '',
      image: p.image || '',
      imageAlt: p.imageAlt || '',
      liveUrl: p.liveUrl || '',
      tech: techStr,
      color: p.color || '#1E3AE0',
      featured: p.featured || false,
      metricsRaw: metricsStr,
    })
    setEditing(p.id)
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.title) return alert('Title is required!')
    setSaving(true)

    const slug = form.slug || slugify(form.title)
    const tech = form.tech.split(',').map(t => t.trim()).filter(Boolean)
    const tags = tech // keep both for backward compat
    const metrics = form.metricsRaw
      .split('\n')
      .map(line => {
        const parts = line.split(':')
        if (parts.length < 2) return null
        return { label: parts[0].trim(), value: parts.slice(1).join(':').trim() }
      })
      .filter(Boolean) as Array<{ label: string; value: string }>

    const data = {
      title: form.title,
      slug,
      client: form.client,
      category: form.category,
      year: form.year,
      description: form.description,
      problem: form.problem,
      solution: form.solution,
      result: form.result,
      image: form.image,
      imageAlt: form.imageAlt || form.title,
      liveUrl: form.liveUrl || '#',
      tech,
      tags,
      metrics,
      color: form.color,
      featured: form.featured,
    }

    try {
      if (editing) {
        await updateDoc(doc(db, 'portfolio', editing), { ...data, updatedAt: serverTimestamp() })
      } else {
        await addDoc(collection(db, 'portfolio'), { ...data, createdAt: serverTimestamp() })
      }
      setShowForm(false)
      fetchProjects()
    } finally {
      setSaving(false)
    }
  }

  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return
    await deleteDoc(doc(db, 'portfolio', id))
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-[#7B2FF2] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">Portfolio</h1>
          <p className="text-[#4A4A6A] text-sm mt-1">{projects.length} projects</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-[#161640] border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg">{editing ? 'Edit Project' : 'Add New Project'}</h3>
              <button onClick={() => setShowForm(false)} className="text-[#7A7A9E] hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Project Title *</label>
                  <input
                    value={form.title}
                    onChange={e => {
                      const title = e.target.value
                      setForm(prev => ({
                        ...prev,
                        title,
                        slug: prev.slug || slugify(title),
                        imageAlt: prev.imageAlt || title,
                      }))
                    }}
                    placeholder="e.g. Rathod Jewellers Website"
                    className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">URL Slug</label>
                  <input
                    value={form.slug}
                    onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="auto-generated-from-title"
                    className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Client Name</label>
                  <input
                    value={form.client}
                    onChange={e => setForm(prev => ({ ...prev, client: e.target.value }))}
                    placeholder="e.g. Rathod Jewellers"
                    className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Category</label>
                  <select value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))} className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#7B2FF2]">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Year</label>
                  <input
                    value={form.year}
                    onChange={e => setForm(prev => ({ ...prev, year: e.target.value }))}
                    placeholder="2024"
                    className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all"
                  />
                </div>
              </div>

              {/* URLs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Live URL</label>
                  <input value={form.liveUrl} onChange={e => setForm(prev => ({ ...prev, liveUrl: e.target.value }))} placeholder="https://..." className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all" />
                </div>
                <div>
                  <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Image URL</label>
                  <input value={form.image} onChange={e => setForm(prev => ({ ...prev, image: e.target.value }))} placeholder="https://i.ibb.co/..." className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Image Alt Text</label>
                <input value={form.imageAlt} onChange={e => setForm(prev => ({ ...prev, imageAlt: e.target.value }))} placeholder="Screenshot of the website" className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all" />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Short Description</label>
                <textarea value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} placeholder="Brief project description..." rows={2} className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] resize-none" />
              </div>

              {/* Case Study Fields */}
              <div className="border-t border-white/5 pt-4">
                <p className="text-[#7B2FF2] text-xs font-semibold uppercase tracking-wider mb-4">📝 Case Study (Optional)</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Problem</label>
                    <textarea value={form.problem} onChange={e => setForm(prev => ({ ...prev, problem: e.target.value }))} placeholder="What challenge did the client face?" rows={3} className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] resize-none" />
                  </div>
                  <div>
                    <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Solution</label>
                    <textarea value={form.solution} onChange={e => setForm(prev => ({ ...prev, solution: e.target.value }))} placeholder="How did you solve it?" rows={3} className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] resize-none" />
                  </div>
                  <div>
                    <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Result</label>
                    <textarea value={form.result} onChange={e => setForm(prev => ({ ...prev, result: e.target.value }))} placeholder="What was the outcome?" rows={3} className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] resize-none" />
                  </div>
                </div>
              </div>

              {/* Tech & Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Tech Stack (comma separated)</label>
                  <input value={form.tech} onChange={e => setForm(prev => ({ ...prev, tech: e.target.value }))} placeholder="Next.js, React, Tailwind CSS" className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2]" />
                </div>
                <div>
                  <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Metrics (one per line)</label>
                  <textarea
                    value={form.metricsRaw}
                    onChange={e => setForm(prev => ({ ...prev, metricsRaw: e.target.value }))}
                    placeholder={`Pages Built: 8+\nLoad Time: <1.5s\nMobile Score: 97`}
                    rows={3}
                    className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] resize-none font-mono"
                  />
                  <p className="text-[#4A4A6A] text-xs mt-1">Format: Label: Value</p>
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Accent Color</label>
                <div className="flex gap-2 flex-wrap">
                  {COLORS.map(c => (
                    <button
                      key={c.value}
                      onClick={() => setForm(prev => ({ ...prev, color: c.value }))}
                      className={`w-8 h-8 rounded-lg border-2 transition-all ${form.color === c.value ? 'border-white scale-110' : 'border-transparent opacity-70 hover:opacity-100'}`}
                      style={{ background: c.value }}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => setForm(prev => ({ ...prev, featured: e.target.checked }))} className="w-4 h-4 accent-[#7B2FF2]" />
                <span className="text-white text-sm">Featured Project (show on homepage)</span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-3 bg-white/5 border border-white/10 text-white text-sm rounded-xl hover:border-white/20">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-3 bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white text-sm font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-12 text-center">
          <Briefcase size={40} className="text-[#4A4A6A] mx-auto mb-4" />
          <p className="text-white font-semibold mb-2">No projects yet</p>
          <button onClick={openNew} className="bg-[#7B2FF2] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 mt-2">Add First Project</button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map(p => (
            <div key={p.id} className="bg-[#161640] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all group">
              {p.image ? (
                <div className="relative w-full h-40">
                  <Image src={p.image} alt={p.imageAlt || p.title} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-full h-40 bg-[#7B2FF2]/10 flex items-center justify-center">
                  <Briefcase size={32} className="text-[#7B2FF2]" />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-semibold">{p.title}</h3>
                  <div className="flex gap-1">
                    {p.featured && <span className="text-xs bg-[#7B2FF2]/20 text-[#7B2FF2] px-2 py-0.5 rounded-full">Featured</span>}
                    {p.color && <span className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: p.color }} />}
                  </div>
                </div>
                <p className="text-[#4A4A6A] text-xs mb-1">{[p.client, p.category, p.year].filter(Boolean).join(' · ')}</p>
                {((p.tech && p.tech.length > 0) || (p.tags && p.tags.length > 0)) && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {(p.tech || p.tags || []).slice(0, 3).map((t: string) => (
                      <span key={t} className="text-xs bg-white/5 text-[#7A7A9E] px-2 py-0.5 rounded">{t}</span>
                    ))}
                    {(p.tech || p.tags || []).length > 3 && <span className="text-xs text-[#4A4A6A]">+{(p.tech || p.tags || []).length - 3}</span>}
                  </div>
                )}
                <div className="flex gap-2">
                  <button onClick={() => openEdit(p)} className="flex-1 py-2 bg-white/5 border border-white/10 text-white text-xs rounded-lg hover:border-[#7B2FF2]/50 transition-all flex items-center justify-center gap-1">
                    <Pencil size={12} /> Edit
                  </button>
                  {p.liveUrl && p.liveUrl !== '#' && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 border border-white/10 text-[#7A7A9E] rounded-lg hover:text-[#7B2FF2] hover:border-[#7B2FF2]/30 transition-all">
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button onClick={() => deleteProject(p.id)} className="p-2 bg-white/5 border border-white/10 text-[#7A7A9E] rounded-lg hover:text-red-400 hover:border-red-400/30 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
