'use client'

import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Globe, Search, FileText, Check, AlertTriangle } from 'lucide-react'

interface PageSEO {
  title: string
  description: string
  keywords: string
}

const PAGES = ['home', 'about', 'services', 'portfolio', 'contact', 'blog']

const DEFAULT_SEO: Record<string, PageSEO> = {
  home: { title: 'PrimeSoul — Premium Digital Agency | Web Design & Development', description: 'PrimeSoul builds premium websites and web applications for businesses that refuse to settle for average.', keywords: 'web design, web development, digital agency, India' },
  about: { title: 'About PrimeSoul — Our Story & Mission', description: 'Learn about PrimeSoul Web Solutions — a boutique digital agency building premium web experiences.', keywords: 'about primesoul, digital agency India, web design team' },
  services: { title: 'Services — Web Design, Development & SEO', description: 'Explore our services: custom web design, development, e-commerce, SEO, and more.', keywords: 'web design services, website development, SEO services' },
  portfolio: { title: 'Portfolio — Our Work & Case Studies', description: 'See our latest projects and case studies showcasing premium web design and development.', keywords: 'web design portfolio, case studies, website projects' },
  contact: { title: 'Contact Us — Get a Free Quote', description: 'Get in touch with PrimeSoul for a free consultation and project quote.', keywords: 'contact web designer, get quote, hire developer' },
  blog: { title: 'Blog — Web Design Tips & Industry Insights', description: 'Read our latest articles on web design, development, SEO, and digital marketing.', keywords: 'web design blog, development tips, SEO articles' },
}

export default function SEOManagerPage() {
  const [seoData, setSeoData] = useState<Record<string, PageSEO>>(DEFAULT_SEO)
  const [activePage, setActivePage] = useState('home')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const fetchSEO = async () => {
      try {
        const docRef = doc(db, 'settings', 'seo')
        const snap = await getDoc(docRef)
        if (snap.exists()) {
          setSeoData({ ...DEFAULT_SEO, ...snap.data() as Record<string, PageSEO> })
        }
      } catch (err) {
        console.error('Error fetching SEO data:', err)
      }
    }
    fetchSEO()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await setDoc(doc(db, 'settings', 'seo'), seoData)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      console.error('Error saving SEO:', err)
    } finally {
      setSaving(false)
    }
  }

  const current = seoData[activePage] || DEFAULT_SEO[activePage]

  const titleScore = current.title.length >= 30 && current.title.length <= 60 ? 'good' : current.title.length > 0 ? 'warning' : 'bad'
  const descScore = current.description.length >= 120 && current.description.length <= 160 ? 'good' : current.description.length > 0 ? 'warning' : 'bad'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white text-2xl font-bold">SEO Manager</h1>
        <p className="text-[#4A4A6A] text-sm mt-1">Optimize meta tags for each page to improve search rankings</p>
      </div>

      {/* Page tabs */}
      <div className="flex gap-2 flex-wrap">
        {PAGES.map(page => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
              activePage === page ? 'bg-[#7B2FF2] text-white' : 'bg-[#161640] text-[#7A7A9E] hover:text-white border border-white/5'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Editor */}
        <div className="lg:col-span-2 bg-[#161640] border border-white/5 rounded-2xl p-6 space-y-5">
          <h2 className="text-white font-semibold capitalize flex items-center gap-2">
            <Globe size={16} className="text-[#7B2FF2]" /> {activePage} Page
          </h2>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider">Title Tag</label>
              <span className={`text-xs font-medium ${titleScore === 'good' ? 'text-green-400' : titleScore === 'warning' ? 'text-yellow-400' : 'text-red-400'}`}>
                {current.title.length}/60
              </span>
            </div>
            <input
              value={current.title}
              onChange={e => setSeoData(prev => ({ ...prev, [activePage]: { ...current, title: e.target.value } }))}
              className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2]"
              placeholder="Page title (30-60 characters ideal)"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider">Meta Description</label>
              <span className={`text-xs font-medium ${descScore === 'good' ? 'text-green-400' : descScore === 'warning' ? 'text-yellow-400' : 'text-red-400'}`}>
                {current.description.length}/160
              </span>
            </div>
            <textarea
              value={current.description}
              onChange={e => setSeoData(prev => ({ ...prev, [activePage]: { ...current, description: e.target.value } }))}
              rows={3}
              className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] resize-none"
              placeholder="Meta description (120-160 characters ideal)"
            />
          </div>

          <div>
            <label className="text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider block mb-2">Keywords</label>
            <input
              value={current.keywords}
              onChange={e => setSeoData(prev => ({ ...prev, [activePage]: { ...current, keywords: e.target.value } }))}
              className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2]"
              placeholder="Comma-separated keywords"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white text-sm font-semibold py-3 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? 'Saving...' : saved ? <><Check size={16} /> Saved!</> : 'Save SEO Settings'}
          </button>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Search size={16} className="text-[#7B2FF2]" /> Google Preview
          </h3>
          <div className="bg-white rounded-2xl p-5 space-y-2">
            <p className="text-xs text-green-700 truncate">primesoul.tech › {activePage === 'home' ? '' : activePage}</p>
            <p className="text-[#1a0dab] text-base font-medium leading-snug line-clamp-2 hover:underline cursor-pointer">
              {current.title || 'Page Title'}
            </p>
            <p className="text-sm text-[#4d5156] line-clamp-3">{current.description || 'Add a meta description...'}</p>
          </div>

          {/* Score */}
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-5 space-y-3">
            <h4 className="text-white text-sm font-semibold">SEO Checklist</h4>
            {[
              { label: 'Title length (30-60 chars)', ok: titleScore === 'good' },
              { label: 'Description length (120-160 chars)', ok: descScore === 'good' },
              { label: 'Keywords provided', ok: current.keywords.length > 0 },
              { label: 'Title contains brand name', ok: current.title.toLowerCase().includes('primesoul') },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2">
                {item.ok ? (
                  <Check size={14} className="text-green-400" />
                ) : (
                  <AlertTriangle size={14} className="text-yellow-400" />
                )}
                <span className={`text-xs ${item.ok ? 'text-green-400' : 'text-yellow-400'}`}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
