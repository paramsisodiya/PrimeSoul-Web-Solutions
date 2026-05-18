'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp, orderBy, query, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Plus, Pencil, Trash2, X, Save, HelpCircle, GripVertical } from 'lucide-react'

interface FAQ {
  id: string
  question: string
  answer: string
  order: number
  visible: boolean
  createdAt: Timestamp
}

const emptyForm = { question: '', answer: '', order: 0, visible: true }

export default function FAQsPage() {
  const [items, setItems] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchFAQs = async () => {
    const snap = await getDocs(query(collection(db, 'faqs'), orderBy('order', 'asc')))
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as FAQ)))
    setLoading(false)
  }

  useEffect(() => { fetchFAQs() }, [])

  const openNew = () => {
    setForm({ ...emptyForm, order: items.length + 1 })
    setEditing(null)
    setShowForm(true)
  }

  const openEdit = (f: FAQ) => {
    setForm({ question: f.question, answer: f.answer, order: f.order, visible: f.visible })
    setEditing(f.id)
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.question || !form.answer) return alert('Question and answer are required!')
    setSaving(true)
    try {
      if (editing) {
        await updateDoc(doc(db, 'faqs', editing), { ...form, updatedAt: serverTimestamp() })
      } else {
        await addDoc(collection(db, 'faqs'), { ...form, createdAt: serverTimestamp() })
      }
      setShowForm(false)
      fetchFAQs()
    } finally { setSaving(false) }
  }

  const toggleVisible = async (id: string, visible: boolean) => {
    await updateDoc(doc(db, 'faqs', id), { visible: !visible })
    setItems(prev => prev.map(f => f.id === id ? { ...f, visible: !visible } : f))
  }

  const deleteItem = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return
    await deleteDoc(doc(db, 'faqs', id))
    setItems(prev => prev.filter(f => f.id !== id))
  }

  const moveUp = async (index: number) => {
    if (index === 0) return
    const newItems = [...items]
    const temp = newItems[index]
    newItems[index] = newItems[index - 1]
    newItems[index - 1] = temp
    setItems(newItems)
    await updateDoc(doc(db, 'faqs', newItems[index].id), { order: index + 1 })
    await updateDoc(doc(db, 'faqs', newItems[index - 1].id), { order: index })
  }

  const moveDown = async (index: number) => {
    if (index === items.length - 1) return
    const newItems = [...items]
    const temp = newItems[index]
    newItems[index] = newItems[index + 1]
    newItems[index + 1] = temp
    setItems(newItems)
    await updateDoc(doc(db, 'faqs', newItems[index].id), { order: index + 1 })
    await updateDoc(doc(db, 'faqs', newItems[index + 1].id), { order: index + 2 })
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
          <h1 className="text-white text-2xl font-bold">FAQs</h1>
          <p className="text-[#4A4A6A] text-sm mt-1">{items.length} questions — drag to reorder</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all">
          <Plus size={16} /> Add FAQ
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-[#161640] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg">{editing ? 'Edit FAQ' : 'Add New FAQ'}</h3>
              <button onClick={() => setShowForm(false)} className="text-[#7A7A9E] hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Question *</label>
                <input
                  value={form.question}
                  onChange={e => setForm(prev => ({ ...prev, question: e.target.value }))}
                  placeholder="e.g. How long does it take to build a website?"
                  className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all"
                />
              </div>
              <div>
                <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Answer *</label>
                <textarea
                  value={form.answer}
                  onChange={e => setForm(prev => ({ ...prev, answer: e.target.value }))}
                  placeholder="Write a detailed, helpful answer..."
                  rows={5}
                  className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] resize-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Display Order</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={e => setForm(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                  className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#7B2FF2] transition-all"
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.visible} onChange={e => setForm(prev => ({ ...prev, visible: e.target.checked }))} className="w-4 h-4 accent-[#7B2FF2]" />
                <span className="text-white text-sm">Show on website</span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-3 bg-white/5 border border-white/10 text-white text-sm rounded-xl hover:border-white/20 transition-all">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-3 bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white text-sm font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
                Save FAQ
              </button>
            </div>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-12 text-center">
          <HelpCircle size={40} className="text-[#4A4A6A] mx-auto mb-4" />
          <p className="text-white font-semibold mb-2">No FAQs yet</p>
          <p className="text-[#4A4A6A] text-sm mb-6">Add common questions to help your visitors</p>
          <button onClick={openNew} className="bg-[#7B2FF2] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-all">Add First FAQ</button>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((faq, index) => (
            <div key={faq.id} className={`bg-[#161640] border rounded-2xl p-5 transition-all ${faq.visible ? 'border-white/5' : 'border-white/5 opacity-60'}`}>
              <div className="flex items-start gap-4">
                <div className="flex flex-col gap-1 pt-1">
                  <button onClick={() => moveUp(index)} disabled={index === 0} className="text-[#4A4A6A] hover:text-white disabled:opacity-20 transition-colors text-xs">▲</button>
                  <button onClick={() => moveDown(index)} disabled={index === items.length - 1} className="text-[#4A4A6A] hover:text-white disabled:opacity-20 transition-colors text-xs">▼</button>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="text-white font-semibold text-sm">{faq.question}</p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${faq.visible ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-[#7A7A9E]'}`}>
                        {faq.visible ? 'Visible' : 'Hidden'}
                      </span>
                    </div>
                  </div>
                  <p className="text-[#7A7A9E] text-sm leading-relaxed line-clamp-2">{faq.answer}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 ml-10">
                <button onClick={() => toggleVisible(faq.id, faq.visible)} className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${faq.visible ? 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400' : 'bg-white/5 border-white/10 text-[#7A7A9E] hover:text-white'}`}>
                  {faq.visible ? 'Hide' : 'Show'}
                </button>
                <button onClick={() => openEdit(faq)} className="px-3 py-1.5 text-xs rounded-lg border bg-white/5 border-white/10 text-[#7A7A9E] hover:text-[#7B2FF2] hover:border-[#7B2FF2]/30 transition-all flex items-center gap-1">
                  <Pencil size={12} /> Edit
                </button>
                <button onClick={() => deleteItem(faq.id)} className="px-3 py-1.5 text-xs rounded-lg border bg-white/5 border-white/10 text-[#7A7A9E] hover:text-red-400 hover:border-red-400/30 transition-all flex items-center gap-1">
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
