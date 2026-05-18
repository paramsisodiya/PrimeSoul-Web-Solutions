'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp, orderBy, query } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Plus, Pencil, Trash2, X, Save, DollarSign, Check } from 'lucide-react'

interface PricingPlan {
  id: string
  name: string
  price: string
  period: string
  description: string
  features: string[]
  highlighted: boolean
  badge: string
  ctaText: string
  order: number
  visible: boolean
}

const emptyForm = {
  name: '',
  price: '',
  period: '/project',
  description: '',
  features: '',
  highlighted: false,
  badge: '',
  ctaText: 'Get Started',
  order: 0,
  visible: true,
}

export default function PricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchPlans = async () => {
    const snap = await getDocs(query(collection(db, 'pricing'), orderBy('order', 'asc')))
    setPlans(snap.docs.map(d => ({ id: d.id, ...d.data() } as PricingPlan)))
    setLoading(false)
  }

  useEffect(() => { fetchPlans() }, [])

  const openNew = () => {
    setForm({ ...emptyForm, order: plans.length + 1 })
    setEditing(null)
    setShowForm(true)
  }

  const openEdit = (p: PricingPlan) => {
    setForm({
      name: p.name,
      price: p.price,
      period: p.period,
      description: p.description,
      features: p.features?.join('\n') || '',
      highlighted: p.highlighted,
      badge: p.badge || '',
      ctaText: p.ctaText || 'Get Started',
      order: p.order,
      visible: p.visible,
    })
    setEditing(p.id)
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.price) return alert('Plan name and price are required!')
    setSaving(true)
    const data = {
      ...form,
      features: form.features.split('\n').map(f => f.trim()).filter(Boolean),
    }
    try {
      if (editing) {
        await updateDoc(doc(db, 'pricing', editing), { ...data, updatedAt: serverTimestamp() })
      } else {
        await addDoc(collection(db, 'pricing'), { ...data, createdAt: serverTimestamp() })
      }
      setShowForm(false)
      fetchPlans()
    } finally { setSaving(false) }
  }

  const toggleHighlight = async (id: string, highlighted: boolean) => {
    await updateDoc(doc(db, 'pricing', id), { highlighted: !highlighted })
    setPlans(prev => prev.map(p => p.id === id ? { ...p, highlighted: !highlighted } : p))
  }

  const toggleVisible = async (id: string, visible: boolean) => {
    await updateDoc(doc(db, 'pricing', id), { visible: !visible })
    setPlans(prev => prev.map(p => p.id === id ? { ...p, visible: !visible } : p))
  }

  const deletePlan = async (id: string) => {
    if (!confirm('Delete this pricing plan?')) return
    await deleteDoc(doc(db, 'pricing', id))
    setPlans(prev => prev.filter(p => p.id !== id))
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
          <h1 className="text-white text-2xl font-bold">Pricing Plans</h1>
          <p className="text-[#4A4A6A] text-sm mt-1">{plans.length} plans configured</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all">
          <Plus size={16} /> Add Plan
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-[#161640] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg">{editing ? 'Edit Plan' : 'Add New Plan'}</h3>
              <button onClick={() => setShowForm(false)} className="text-[#7A7A9E] hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Plan Name *</label>
                  <input value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} placeholder="e.g. Starter" className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all" />
                </div>
                <div>
                  <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Price *</label>
                  <input value={form.price} onChange={e => setForm(prev => ({ ...prev, price: e.target.value }))} placeholder="e.g. ₹15,000" className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Period</label>
                  <input value={form.period} onChange={e => setForm(prev => ({ ...prev, period: e.target.value }))} placeholder="/project or /month" className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all" />
                </div>
                <div>
                  <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Badge Label</label>
                  <input value={form.badge} onChange={e => setForm(prev => ({ ...prev, badge: e.target.value }))} placeholder="e.g. Most Popular" className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Description</label>
                <input value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} placeholder="Short description of this plan" className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all" />
              </div>
              <div>
                <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Features (one per line)</label>
                <textarea
                  value={form.features}
                  onChange={e => setForm(prev => ({ ...prev, features: e.target.value }))}
                  placeholder={`5 Pages Website\nResponsive Design\nContact Form\nSEO Optimized\n1 Year Support`}
                  rows={8}
                  className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] resize-none transition-all font-mono"
                />
                <p className="text-[#4A4A6A] text-xs mt-1">Each line = one feature bullet point</p>
              </div>
              <div>
                <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">CTA Button Text</label>
                <input value={form.ctaText} onChange={e => setForm(prev => ({ ...prev, ctaText: e.target.value }))} placeholder="Get Started" className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all" />
              </div>
              <div>
                <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Display Order</label>
                <input type="number" value={form.order} onChange={e => setForm(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))} className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#7B2FF2] transition-all" />
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.highlighted} onChange={e => setForm(prev => ({ ...prev, highlighted: e.target.checked }))} className="w-4 h-4 accent-[#7B2FF2]" />
                  <span className="text-white text-sm">Highlight this plan (purple gradient card)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.visible} onChange={e => setForm(prev => ({ ...prev, visible: e.target.checked }))} className="w-4 h-4 accent-[#7B2FF2]" />
                  <span className="text-white text-sm">Show on website</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-3 bg-white/5 border border-white/10 text-white text-sm rounded-xl hover:border-white/20 transition-all">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-3 bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white text-sm font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
                Save Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {plans.length === 0 ? (
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-12 text-center">
          <DollarSign size={40} className="text-[#4A4A6A] mx-auto mb-4" />
          <p className="text-white font-semibold mb-2">No pricing plans yet</p>
          <p className="text-[#4A4A6A] text-sm mb-6">Add your service packages and pricing</p>
          <button onClick={openNew} className="bg-[#7B2FF2] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-all">Add First Plan</button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {plans.map(plan => (
            <div key={plan.id} className={`rounded-2xl p-5 border transition-all ${plan.highlighted ? 'bg-gradient-to-br from-[#7B2FF2]/20 to-[#E879F9]/10 border-[#7B2FF2]/40' : 'bg-[#161640] border-white/5'} ${!plan.visible ? 'opacity-50' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-white font-bold text-lg">{plan.name}</p>
                  {plan.badge && <span className="text-xs bg-[#7B2FF2]/20 text-[#7B2FF2] px-2 py-0.5 rounded-full">{plan.badge}</span>}
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-xl">{plan.price}</p>
                  <p className="text-[#4A4A6A] text-xs">{plan.period}</p>
                </div>
              </div>
              <p className="text-[#7A7A9E] text-xs mb-3">{plan.description}</p>
              <ul className="space-y-1.5 mb-4">
                {plan.features?.slice(0, 4).map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-[#7A7A9E] text-xs">
                    <Check size={12} className="text-green-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
                {plan.features?.length > 4 && <li className="text-[#4A4A6A] text-xs">+{plan.features.length - 4} more features</li>}
              </ul>
              <div className="flex gap-2">
                <button onClick={() => toggleHighlight(plan.id, plan.highlighted)} className={`flex-1 py-1.5 text-xs rounded-lg border transition-all ${plan.highlighted ? 'bg-[#7B2FF2]/20 border-[#7B2FF2]/30 text-[#7B2FF2]' : 'bg-white/5 border-white/10 text-[#7A7A9E] hover:text-white'}`}>
                  {plan.highlighted ? '★ Featured' : 'Set Featured'}
                </button>
                <button onClick={() => toggleVisible(plan.id, plan.visible)} className={`py-1.5 px-3 text-xs rounded-lg border transition-all ${plan.visible ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-white/5 border-white/10 text-[#7A7A9E]'}`}>
                  {plan.visible ? 'On' : 'Off'}
                </button>
                <button onClick={() => openEdit(plan)} className="p-2 bg-white/5 border border-white/10 text-[#7A7A9E] rounded-lg hover:text-[#7B2FF2] hover:border-[#7B2FF2]/30 transition-all">
                  <Pencil size={14} />
                </button>
                <button onClick={() => deletePlan(plan.id)} className="p-2 bg-white/5 border border-white/10 text-[#7A7A9E] rounded-lg hover:text-red-400 hover:border-red-400/30 transition-all">
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
