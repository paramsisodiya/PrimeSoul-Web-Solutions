'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, doc, updateDoc, deleteDoc, orderBy, query, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Mail, Phone, MessageSquare, Trash2, ExternalLink, Filter } from 'lucide-react'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  service: string
  message: string
  status: 'new' | 'in_progress' | 'closed'
  notes: string
  createdAt: Timestamp
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<Lead | null>(null)
  const [notes, setNotes] = useState('')

  const fetchLeads = async () => {
    const snap = await getDocs(query(collection(db, 'leads'), orderBy('createdAt', 'desc')))
    setLeads(snap.docs.map(d => ({ id: d.id, ...d.data() } as Lead)))
    setLoading(false)
  }

  useEffect(() => { fetchLeads() }, [])

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, 'leads', id), { status })
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: status as Lead['status'] } : l))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: status as Lead['status'] } : null)
  }

  const saveNotes = async (id: string) => {
    await updateDoc(doc(db, 'leads', id), { notes })
    setLeads(prev => prev.map(l => l.id === id ? { ...l, notes } : l))
    alert('Notes saved!')
  }

  const deleteLead = async (id: string) => {
    if (!confirm('Delete this lead?')) return
    await deleteDoc(doc(db, 'leads', id))
    setLeads(prev => prev.filter(l => l.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter)

  const statusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'in_progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'closed': return 'bg-green-500/20 text-green-400 border-green-500/30'
      default: return 'bg-white/10 text-white border-white/20'
    }
  }

  const formatDate = (ts: Timestamp) => {
    if (!ts) return '—'
    return ts.toDate().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
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
          <h1 className="text-white text-2xl font-bold">Leads</h1>
          <p className="text-[#4A4A6A] text-sm mt-1">{leads.length} total inquiries</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'new', 'in_progress', 'closed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === f ? 'bg-[#7B2FF2] text-white' : 'bg-[#161640] text-[#7A7A9E] hover:text-white border border-white/5'
            }`}
          >
            {f === 'all' ? 'All' : f === 'in_progress' ? 'In Progress' : f.charAt(0).toUpperCase() + f.slice(1)}
            <span className="ml-2 text-xs opacity-70">
              {f === 'all' ? leads.length : leads.filter(l => l.status === f).length}
            </span>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Leads list */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-[#161640] border border-white/5 rounded-2xl p-8 text-center">
              <Mail size={24} className="text-[#4A4A6A] mx-auto mb-2" />
              <p className="text-[#4A4A6A] text-sm">No leads found</p>
            </div>
          ) : filtered.map(lead => (
            <div
              key={lead.id}
              onClick={() => { setSelected(lead); setNotes(lead.notes || '') }}
              className={`bg-[#161640] border rounded-2xl p-5 cursor-pointer transition-all hover:border-[#7B2FF2]/50 ${
                selected?.id === lead.id ? 'border-[#7B2FF2]' : 'border-white/5'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-white font-semibold">{lead.name}</p>
                  <p className="text-[#4A4A6A] text-xs">{formatDate(lead.createdAt)}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full border font-medium ${statusColor(lead.status)}`}>
                  {lead.status === 'in_progress' ? 'In Progress' : lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </span>
              </div>
              <div className="flex gap-4 text-xs text-[#7A7A9E]">
                <span className="flex items-center gap-1"><Mail size={12} />{lead.email}</span>
                <span className="flex items-center gap-1"><Phone size={12} />{lead.phone || '—'}</span>
              </div>
              <p className="text-[#7B2FF2] text-xs mt-2 font-medium">{lead.service}</p>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {selected ? (
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-6 space-y-5 h-fit sticky top-24">
            <div className="flex items-start justify-between">
              <h3 className="text-white font-bold text-lg">{selected.name}</h3>
              <button onClick={() => deleteLead(selected.id)} className="text-[#4A4A6A] hover:text-red-400 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[#0E0E2C] rounded-xl">
                <Mail size={14} className="text-[#7B2FF2]" />
                <div>
                  <p className="text-[#4A4A6A] text-xs">Email</p>
                  <p className="text-white text-sm">{selected.email}</p>
                </div>
                <a href={`mailto:${selected.email}`} className="ml-auto text-[#7B2FF2]"><ExternalLink size={14} /></a>
              </div>
              {selected.phone && (
                <div className="flex items-center gap-3 p-3 bg-[#0E0E2C] rounded-xl">
                  <Phone size={14} className="text-[#7B2FF2]" />
                  <div>
                    <p className="text-[#4A4A6A] text-xs">Phone</p>
                    <p className="text-white text-sm">{selected.phone}</p>
                  </div>
                  <a href={`https://wa.me/91${selected.phone}`} target="_blank" className="ml-auto text-green-400"><ExternalLink size={14} /></a>
                </div>
              )}
              <div className="p-3 bg-[#0E0E2C] rounded-xl">
                <p className="text-[#4A4A6A] text-xs mb-1">Service Required</p>
                <p className="text-[#7B2FF2] text-sm font-medium">{selected.service}</p>
              </div>
              <div className="p-3 bg-[#0E0E2C] rounded-xl">
                <p className="text-[#4A4A6A] text-xs mb-1 flex items-center gap-1"><MessageSquare size={12} /> Message</p>
                <p className="text-white text-sm">{selected.message}</p>
              </div>
            </div>

            {/* Status */}
            <div>
              <p className="text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Update Status</p>
              <div className="flex gap-2 flex-wrap">
                {['new', 'in_progress', 'closed'].map(s => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected.id, s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selected.status === s ? 'bg-[#7B2FF2] text-white' : 'bg-white/5 text-[#7A7A9E] hover:text-white'
                    }`}
                  >
                    {s === 'in_progress' ? 'In Progress' : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <p className="text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Notes</p>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Add private notes about this lead..."
                rows={3}
                className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] resize-none"
              />
              <button
                onClick={() => saveNotes(selected.id)}
                className="mt-2 w-full bg-[#7B2FF2]/20 border border-[#7B2FF2]/30 text-[#7B2FF2] text-sm font-medium py-2 rounded-xl hover:bg-[#7B2FF2] hover:text-white transition-all"
              >
                Save Notes
              </button>
            </div>

            {/* Quick Reply */}
            <a
              href={`mailto:${selected.email}?subject=Re: Your Inquiry at PrimeSoul&body=Hi ${selected.name},%0D%0A%0D%0AThank you for reaching out to PrimeSoul Web Solutions!%0D%0A%0D%0A`}
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white text-sm font-semibold py-3 rounded-xl hover:opacity-90 transition-all"
            >
              <Mail size={16} />
              Reply via Email
            </a>
          </div>
        ) : (
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-8 text-center h-fit">
            <Mail size={32} className="text-[#4A4A6A] mx-auto mb-3" />
            <p className="text-[#7A7A9E] text-sm">Select a lead to view details</p>
          </div>
        )}
      </div>
    </div>
  )
}
