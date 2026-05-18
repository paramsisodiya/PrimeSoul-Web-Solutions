'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp, orderBy, query } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Plus, Pencil, Trash2, X, Save, Megaphone } from 'lucide-react'

interface Announcement {
  id: string
  text: string
  link: string
  linkText: string
  type: 'info' | 'success' | 'warning' | 'promo'
  active: boolean
  createdAt: any
}

type AnnouncementForm = Pick<Announcement, 'text' | 'link' | 'linkText' | 'type' | 'active'>

const emptyForm: AnnouncementForm = { text: '', link: '', linkText: '', type: 'promo', active: true }

export default function AnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchItems = async () => {
    const snap = await getDocs(query(collection(db, 'announcements'), orderBy('createdAt', 'desc')))
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as Announcement)))
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

  const openNew = () => { setForm(emptyForm); setEditing(null); setShowForm(true) }
  const openEdit = (a: Announcement) => {
    setForm({ text: a.text, link: a.link || '', linkText: a.linkText || '', type: a.type, active: a.active })
    setEditing(a.id)
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.text) return alert('Announcement text is required!')
    setSaving(true)
    try {
      if (editing) {
        await updateDoc(doc(db, 'announcements', editing), { ...form, updatedAt: serverTimestamp() })
      } else {
        await addDoc(collection(db, 'announcements'), { ...form, createdAt: serverTimestamp() })
      }
      setShowForm(false)
      fetchItems()
    } finally { setSaving(false) }
  }

  const toggleActive = async (id: string, active: boolean) => {
    await updateDoc(doc(db, 'announcements', id), { active: !active })
    setItems(prev => prev.map(a => a.id === id ? { ...a, active: !active } : a))
  }

  const deleteItem = async (id: string) => {
    if (!confirm('Delete this announcement?')) return
    await deleteDoc(doc(db, 'announcements', id))
    setItems(prev => prev.filter(a => a.id !== id))
  }

  const typeColors: Record<string, string> = {
    promo: 'bg-[#7B2FF2]/20 text-[#7B2FF2] border-[#7B2FF2]/30',
    success: 'bg-green-500/20 text-green-400 border-green-500/30',
    info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-[#7B2FF2] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">Announcements</h1>
          <p className="text-[#4A4A6A] text-sm mt-1">Top banner messages for your website visitors</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all">
          <Plus size={16} /> New Announcement
        </button>
      </div>

      {/* Info box */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
        <p className="text-blue-400 text-sm">💡 Only one announcement should be active at a time. It will appear as a banner bar at the top of your website.</p>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-[#161640] border border-white/10 rounded-2xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg">{editing ? 'Edit Announcement' : 'New Announcement'}</h3>
              <button onClick={() => setShowForm(false)} className="text-[#7A7A9E] hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Announcement Text *</label>
                <input
                  value={form.text}
                  onChange={e => setForm(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="e.g. 🎉 Limited offer: 20% off on all plans this month!"
                  className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">CTA Link</label>
                  <input
                    value={form.link}
                    onChange={e => setForm(prev => ({ ...prev, link: e.target.value }))}
                    placeholder="/contact or https://..."
                    className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">CTA Link Text</label>
                  <input
                    value={form.linkText}
                    onChange={e => setForm(prev => ({ ...prev, linkText: e.target.value }))}
                    placeholder="Claim Now →"
                    className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Type / Color</label>
                <div className="flex gap-2 flex-wrap">
                  {(['promo', 'success', 'info', 'warning'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setForm(prev => ({ ...prev, type: t }))}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border capitalize transition-all ${form.type === t ? typeColors[t] : 'bg-white/5 border-white/10 text-[#7A7A9E]'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={e => setForm(prev => ({ ...prev, active: e.target.checked }))} className="w-4 h-4 accent-[#7B2FF2]" />
                <span className="text-white text-sm">Show on website immediately</span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-3 bg-white/5 border border-white/10 text-white text-sm rounded-xl hover:border-white/20 transition-all">Cancel</button>
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
          <Megaphone size={40} className="text-[#4A4A6A] mx-auto mb-4" />
          <p className="text-white font-semibold mb-2">No announcements yet</p>
          <p className="text-[#4A4A6A] text-sm mb-6">Create banners for offers, events, or important news</p>
          <button onClick={openNew} className="bg-[#7B2FF2] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-all">Create Announcement</button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className={`bg-[#161640] border rounded-2xl p-5 transition-all ${item.active ? 'border-[#7B2FF2]/30' : 'border-white/5 opacity-60'}`}>
              {/* Preview */}
              <div className={`rounded-xl px-4 py-3 mb-4 border ${typeColors[item.type]}`}>
                <p className="text-sm font-medium">
                  {item.text}
                  {item.linkText && <span className="ml-2 underline cursor-pointer">{item.linkText}</span>}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full border capitalize ${typeColors[item.type]}`}>{item.type}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${item.active ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-[#7A7A9E]'}`}>
                    {item.active ? '● Live' : '○ Inactive'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleActive(item.id, item.active)} className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${item.active ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:opacity-90' : 'bg-green-500/10 border-green-500/30 text-green-400 hover:opacity-90'}`}>
                    {item.active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button onClick={() => openEdit(item)} className="p-2 bg-white/5 border border-white/10 text-[#7A7A9E] rounded-lg hover:text-[#7B2FF2] hover:border-[#7B2FF2]/30 transition-all">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => deleteItem(item.id)} className="p-2 bg-white/5 border border-white/10 text-[#7A7A9E] rounded-lg hover:text-red-400 hover:border-red-400/30 transition-all">
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
