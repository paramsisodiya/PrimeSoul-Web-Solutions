'use client'
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp, orderBy, query, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Image from 'next/image'
import { Plus, Pencil, Trash2, X, Save, Star } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  company: string
  role: string
  message: string
  rating: number
  photo: string
  visible: boolean
  createdAt: Timestamp
}

const emptyForm = { name: '', company: '', role: '', message: '', rating: 5, photo: '', visible: true }

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetch = async () => {
    const snap = await getDocs(query(collection(db, 'testimonials'), orderBy('createdAt', 'desc')))
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as Testimonial)))
    setLoading(false)
  }

  useEffect(() => { fetch() }, [])

  const openNew = () => { setForm(emptyForm); setEditing(null); setShowForm(true) }
  const openEdit = (t: Testimonial) => { setForm({ name: t.name, company: t.company, role: t.role, message: t.message, rating: t.rating, photo: t.photo || '', visible: t.visible }); setEditing(t.id); setShowForm(true) }

  const handleSave = async () => {
    if (!form.name || !form.message) return alert('Name and message are required!')
    setSaving(true)
    try {
      if (editing) {
        await updateDoc(doc(db, 'testimonials', editing), { ...form, updatedAt: serverTimestamp() })
      } else {
        await addDoc(collection(db, 'testimonials'), { ...form, createdAt: serverTimestamp() })
      }
      setShowForm(false)
      fetch()
    } finally { setSaving(false) }
  }

  const toggleVisible = async (id: string, visible: boolean) => {
    await updateDoc(doc(db, 'testimonials', id), { visible: !visible })
    setItems(prev => prev.map(t => t.id === id ? { ...t, visible: !visible } : t))
  }

  const deleteItem = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    await deleteDoc(doc(db, 'testimonials', id))
    setItems(prev => prev.filter(t => t.id !== id))
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-[#7B2FF2] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">Testimonials</h1>
          <p className="text-[#4A4A6A] text-sm mt-1">{items.length} reviews</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-[#161640] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button onClick={() => setShowForm(false)} className="text-[#7A7A9E] hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              {[
                { key: 'name', label: 'Client Name *', placeholder: 'e.g. Rajesh Sharma' },
                { key: 'company', label: 'Company', placeholder: 'e.g. Sharma Enterprises' },
                { key: 'role', label: 'Role / Title', placeholder: 'e.g. CEO' },
                { key: 'photo', label: 'Photo URL', placeholder: 'https://... (optional)' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">{f.label}</label>
                  <input value={(form as any)[f.key]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} placeholder={f.placeholder} className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all" />
                </div>
              ))}
              <div>
                <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Review / Message *</label>
                <textarea value={form.message} onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))} placeholder="What did the client say?" rows={4} className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] resize-none" />
              </div>
              <div>
                <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Star Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} onClick={() => setForm(prev => ({ ...prev, rating: n }))} className={`p-2 rounded-lg transition-all ${form.rating >= n ? 'text-yellow-400' : 'text-[#4A4A6A]'}`}>
                      <Star size={20} fill={form.rating >= n ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.visible} onChange={e => setForm(prev => ({ ...prev, visible: e.target.checked }))} className="w-4 h-4 accent-[#7B2FF2]" />
                <span className="text-white text-sm">Show on website</span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-3 bg-white/5 border border-white/10 text-white text-sm rounded-xl">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-3 bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white text-sm font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-12 text-center">
          <Star size={40} className="text-[#4A4A6A] mx-auto mb-4" />
          <p className="text-white font-semibold mb-2">No testimonials yet</p>
          <button onClick={openNew} className="bg-[#7B2FF2] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 mt-2">Add First Testimonial</button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {items.map(t => (
            <div key={t.id} className={`bg-[#161640] border rounded-2xl p-5 transition-all ${t.visible ? 'border-white/5' : 'border-white/5 opacity-60'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {t.photo ? (
                    <Image src={t.photo} alt={t.name} width={40} height={40} className="rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7B2FF2] to-[#E879F9] flex items-center justify-center text-white font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-[#4A4A6A] text-xs">{t.role}{t.company ? `, ${t.company}` : ''}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(n => <Star key={n} size={12} className={t.rating >= n ? 'text-yellow-400' : 'text-[#4A4A6A]'} fill={t.rating >= n ? 'currentColor' : 'none'} />)}
                </div>
              </div>
              <p className="text-[#7A7A9E] text-sm leading-relaxed mb-4">&quot;{t.message}&quot;</p>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleVisible(t.id, t.visible)} className={`flex-1 py-2 text-xs rounded-lg border transition-all ${t.visible ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-white/5 border-white/10 text-[#7A7A9E]'}`}>
                  {t.visible ? '✓ Visible' : 'Hidden'}
                </button>
                <button onClick={() => openEdit(t)} className="p-2 bg-white/5 border border-white/10 text-[#7A7A9E] rounded-lg hover:text-[#7B2FF2] hover:border-[#7B2FF2]/30 transition-all">
                  <Pencil size={14} />
                </button>
                <button onClick={() => deleteItem(t.id)} className="p-2 bg-white/5 border border-white/10 text-[#7A7A9E] rounded-lg hover:text-red-400 hover:border-red-400/30 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
