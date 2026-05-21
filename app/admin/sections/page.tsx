'use client'

import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { GripVertical, Eye, EyeOff, Check, RotateCcw, Layout } from 'lucide-react'

interface Section {
  id: string
  label: string
  enabled: boolean
}

const DEFAULT_SECTIONS: Section[] = [
  { id: 'hero', label: 'Hero Section', enabled: true },
  { id: 'marquee', label: 'Marquee Strip', enabled: true },
  { id: 'video', label: 'Video Section', enabled: true },
  { id: 'clientLogos', label: 'Client Logos', enabled: true },
  { id: 'trust', label: 'Trust Section', enabled: true },
  { id: 'stats', label: 'Stats Counter', enabled: true },
  { id: 'about', label: 'About Section', enabled: true },
  { id: 'services', label: 'Services', enabled: true },
  { id: 'portfolio', label: 'Portfolio', enabled: true },
  { id: 'process', label: 'Our Process', enabled: true },
  { id: 'founder', label: 'Founder Section', enabled: true },
  { id: 'pricing', label: 'Pricing', enabled: true },
  { id: 'testimonials', label: 'Testimonials', enabled: true },
  { id: 'faq', label: 'FAQ Section', enabled: true },
  { id: 'cta', label: 'CTA Section', enabled: true },
]

export default function SectionManagerPage() {
  const [sections, setSections] = useState<Section[]>(DEFAULT_SECTIONS)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null)

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'sections'))
        if (snap.exists()) {
          const data = snap.data()
          if (data.order && Array.isArray(data.order)) {
            setSections(data.order)
          }
        }
      } catch (err) {
        console.error('Error fetching sections:', err)
      }
    }
    fetchSections()
  }, [])

  const toggleSection = (id: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s))
  }

  const moveSection = (fromIdx: number, toIdx: number) => {
    const newSections = [...sections]
    const [moved] = newSections.splice(fromIdx, 1)
    newSections.splice(toIdx, 0, moved)
    setSections(newSections)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await setDoc(doc(db, 'settings', 'sections'), { order: sections })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      console.error('Error saving sections:', err)
    } finally {
      setSaving(false)
    }
  }

  const resetToDefault = () => {
    setSections(DEFAULT_SECTIONS)
  }

  const enabledCount = sections.filter(s => s.enabled).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-white text-2xl font-bold">Section Manager</h1>
          <p className="text-[#4A4A6A] text-sm mt-1">Toggle and reorder homepage sections · {enabledCount}/{sections.length} active</p>
        </div>
        <div className="flex gap-2">
          <button onClick={resetToDefault} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[#161640] text-[#7A7A9E] hover:text-white border border-white/5 transition-all">
            <RotateCcw size={14} /> Reset
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white hover:opacity-90 transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : saved ? <><Check size={14} /> Saved!</> : 'Save Order'}
          </button>
        </div>
      </div>

      {/* Section list */}
      <div className="bg-[#161640] border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
        {sections.map((section, idx) => (
          <div
            key={section.id}
            draggable
            onDragStart={() => setDraggedIdx(idx)}
            onDragEnd={() => setDraggedIdx(null)}
            onDragOver={e => e.preventDefault()}
            onDrop={() => {
              if (draggedIdx !== null) moveSection(draggedIdx, idx)
              setDraggedIdx(null)
            }}
            className={`flex items-center gap-4 px-6 py-4 transition-all ${
              draggedIdx === idx ? 'opacity-50 bg-[#7B2FF2]/10' : 'hover:bg-white/[0.02]'
            } ${!section.enabled ? 'opacity-50' : ''}`}
          >
            <div className="cursor-grab active:cursor-grabbing text-[#4A4A6A] hover:text-white transition-colors">
              <GripVertical size={16} />
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#7B2FF2]/10 flex items-center justify-center text-[#7B2FF2] text-xs font-bold">
              {idx + 1}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${section.enabled ? 'text-white' : 'text-[#4A4A6A] line-through'}`}>
                {section.label}
              </p>
              <p className="text-[#4A4A6A] text-xs">{section.id}</p>
            </div>
            <button
              onClick={() => toggleSection(section.id)}
              className={`p-2 rounded-lg transition-all ${
                section.enabled
                  ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                  : 'bg-white/5 text-[#4A4A6A] hover:text-white'
              }`}
            >
              {section.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-[#0E0E2C] border border-white/5 rounded-2xl p-5">
        <p className="text-[#7A7A9E] text-xs">
          <strong className="text-[#7B2FF2]">How it works:</strong> Drag sections to reorder them on the homepage. Toggle the eye icon to show/hide sections. Changes require a page reload to take effect.
        </p>
      </div>
    </div>
  )
}
