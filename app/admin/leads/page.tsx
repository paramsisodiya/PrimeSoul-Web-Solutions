'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, doc, updateDoc, deleteDoc, orderBy, query, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Mail, Phone, MessageSquare, Trash2, ExternalLink, LayoutGrid, List, GripVertical } from 'lucide-react'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  service: string
  message: string
  status: 'new' | 'contacted' | 'proposal' | 'negotiation' | 'won' | 'lost'
  notes: string
  createdAt: Timestamp
}

const PIPELINE_STAGES = [
  { key: 'new', label: 'New', color: '#3B82F6', bg: 'from-blue-500/20 to-blue-500/5' },
  { key: 'contacted', label: 'Contacted', color: '#F59E0B', bg: 'from-yellow-500/20 to-yellow-500/5' },
  { key: 'proposal', label: 'Proposal Sent', color: '#A855F7', bg: 'from-purple-500/20 to-purple-500/5' },
  { key: 'negotiation', label: 'Negotiating', color: '#F97316', bg: 'from-orange-500/20 to-orange-500/5' },
  { key: 'won', label: 'Won ✓', color: '#10B981', bg: 'from-green-500/20 to-green-500/5' },
  { key: 'lost', label: 'Lost', color: '#EF4444', bg: 'from-red-500/20 to-red-500/5' },
]

// Map old statuses to new ones
function normalizeStatus(status: string): Lead['status'] {
  if (status === 'in_progress') return 'contacted'
  if (status === 'closed') return 'won'
  if (PIPELINE_STAGES.some(s => s.key === status)) return status as Lead['status']
  return 'new'
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'kanban' | 'list'>('kanban')
  const [selected, setSelected] = useState<Lead | null>(null)
  const [notes, setNotes] = useState('')
  const [filter, setFilter] = useState('all')
  const [draggedId, setDraggedId] = useState<string | null>(null)

  const fetchLeads = async () => {
    const snap = await getDocs(query(collection(db, 'leads'), orderBy('createdAt', 'desc')))
    setLeads(snap.docs.map(d => {
      const data = d.data()
      return { id: d.id, ...data, status: normalizeStatus(data.status) } as Lead
    }))
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
  }

  const deleteLead = async (id: string) => {
    if (!confirm('Delete this lead?')) return
    await deleteDoc(doc(db, 'leads', id))
    setLeads(prev => prev.filter(l => l.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const formatDate = (ts: Timestamp) => {
    if (!ts) return '—'
    return ts.toDate().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  const statusColor = (status: string) => {
    const stage = PIPELINE_STAGES.find(s => s.key === status)
    return stage?.color || '#7B2FF2'
  }

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter)

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-[#7B2FF2] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-white text-2xl font-bold">Lead Pipeline</h1>
          <p className="text-[#4A4A6A] text-sm mt-1">{leads.length} total inquiries · {leads.filter(l => l.status === 'new').length} new</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setView('kanban')} className={`p-2.5 rounded-xl transition-all ${view === 'kanban' ? 'bg-[#7B2FF2] text-white' : 'bg-[#161640] text-[#7A7A9E] hover:text-white border border-white/5'}`}>
            <LayoutGrid size={16} />
          </button>
          <button onClick={() => setView('list')} className={`p-2.5 rounded-xl transition-all ${view === 'list' ? 'bg-[#7B2FF2] text-white' : 'bg-[#161640] text-[#7A7A9E] hover:text-white border border-white/5'}`}>
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Kanban View */}
      {view === 'kanban' ? (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6" style={{ scrollbarWidth: 'thin' }}>
          {PIPELINE_STAGES.map(stage => {
            const stageLeads = leads.filter(l => l.status === stage.key)
            return (
              <div
                key={stage.key}
                className="min-w-[280px] max-w-[280px] flex-shrink-0"
                onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('ring-2', 'ring-[#7B2FF2]/40', 'rounded-2xl') }}
                onDragLeave={e => { e.currentTarget.classList.remove('ring-2', 'ring-[#7B2FF2]/40', 'rounded-2xl') }}
                onDrop={e => {
                  e.preventDefault()
                  e.currentTarget.classList.remove('ring-2', 'ring-[#7B2FF2]/40', 'rounded-2xl')
                  if (draggedId) updateStatus(draggedId, stage.key)
                  setDraggedId(null)
                }}
              >
                {/* Column header */}
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: stage.color }} />
                  <span className="text-white text-sm font-semibold">{stage.label}</span>
                  <span className="text-[#4A4A6A] text-xs ml-auto bg-white/5 px-2 py-0.5 rounded-full">{stageLeads.length}</span>
                </div>

                {/* Column body */}
                <div className="space-y-2 min-h-[200px] bg-[#0E0E2C]/50 rounded-2xl p-2 border border-white/5">
                  {stageLeads.length === 0 ? (
                    <div className="flex items-center justify-center h-24 text-[#4A4A6A] text-xs">No leads</div>
                  ) : stageLeads.map(lead => (
                    <div
                      key={lead.id}
                      draggable
                      onDragStart={() => setDraggedId(lead.id)}
                      onDragEnd={() => setDraggedId(null)}
                      onClick={() => { setSelected(lead); setNotes(lead.notes || '') }}
                      className={`bg-[#161640] border rounded-xl p-4 cursor-grab active:cursor-grabbing transition-all hover:border-[#7B2FF2]/40 group ${
                        selected?.id === lead.id ? 'border-[#7B2FF2] ring-1 ring-[#7B2FF2]/20' : 'border-white/5'
                      } ${draggedId === lead.id ? 'opacity-50 scale-95' : ''}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-white text-sm font-medium truncate flex-1">{lead.name}</p>
                        <GripVertical size={14} className="text-[#4A4A6A] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-1" />
                      </div>
                      <p className="text-[#7B2FF2] text-xs font-medium mb-2">{lead.service}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#4A4A6A] text-xs">{formatDate(lead.createdAt)}</span>
                        <span className="text-[#4A4A6A] text-xs truncate max-w-[100px]">{lead.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* List View */
        <>
          <div className="flex gap-2 flex-wrap">
            {['all', ...PIPELINE_STAGES.map(s => s.key)].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === f ? 'bg-[#7B2FF2] text-white' : 'bg-[#161640] text-[#7A7A9E] hover:text-white border border-white/5'
                }`}
              >
                {f === 'all' ? 'All' : PIPELINE_STAGES.find(s => s.key === f)?.label || f}
                <span className="ml-2 text-xs opacity-70">
                  {f === 'all' ? leads.length : leads.filter(l => l.status === f).length}
                </span>
              </button>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
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
                    <span className="text-xs px-3 py-1 rounded-full border font-medium" style={{ borderColor: `${statusColor(lead.status)}40`, background: `${statusColor(lead.status)}20`, color: statusColor(lead.status) }}>
                      {PIPELINE_STAGES.find(s => s.key === lead.status)?.label || lead.status}
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
            {/* Detail panel rendered below */}
            {renderDetailPanel()}
          </div>
        </>
      )}

      {/* Detail panel for kanban view */}
      {view === 'kanban' && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-end" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative w-full max-w-md h-full bg-[#0E0E2C] border-l border-white/10 overflow-y-auto p-6 space-y-5 animate-slide-in-right" onClick={e => e.stopPropagation()}>
            {renderDetailContent()}
          </div>
        </div>
      )}
    </div>
  )

  function renderDetailPanel() {
    if (!selected) return (
      <div className="bg-[#161640] border border-white/5 rounded-2xl p-8 text-center h-fit">
        <Mail size={32} className="text-[#4A4A6A] mx-auto mb-3" />
        <p className="text-[#7A7A9E] text-sm">Select a lead to view details</p>
      </div>
    )
    return (
      <div className="bg-[#161640] border border-white/5 rounded-2xl p-6 space-y-5 h-fit sticky top-24">
        {renderDetailContent()}
      </div>
    )
  }

  function renderDetailContent() {
    if (!selected) return null
    return (
      <>
        <div className="flex items-start justify-between">
          <h3 className="text-white font-bold text-lg">{selected.name}</h3>
          <div className="flex items-center gap-2">
            <button onClick={() => deleteLead(selected.id)} className="text-[#4A4A6A] hover:text-red-400 transition-colors">
              <Trash2 size={16} />
            </button>
            {view === 'kanban' && (
              <button onClick={() => setSelected(null)} className="text-[#4A4A6A] hover:text-white transition-colors text-xl leading-none">&times;</button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-[#161640] rounded-xl border border-white/5">
            <Mail size={14} className="text-[#7B2FF2]" />
            <div>
              <p className="text-[#4A4A6A] text-xs">Email</p>
              <p className="text-white text-sm">{selected.email}</p>
            </div>
            <a href={`mailto:${selected.email}`} className="ml-auto text-[#7B2FF2]"><ExternalLink size={14} /></a>
          </div>
          {selected.phone && (
            <div className="flex items-center gap-3 p-3 bg-[#161640] rounded-xl border border-white/5">
              <Phone size={14} className="text-[#7B2FF2]" />
              <div>
                <p className="text-[#4A4A6A] text-xs">Phone</p>
                <p className="text-white text-sm">{selected.phone}</p>
              </div>
              <a href={`https://wa.me/91${selected.phone}`} target="_blank" className="ml-auto text-green-400"><ExternalLink size={14} /></a>
            </div>
          )}
          <div className="p-3 bg-[#161640] rounded-xl border border-white/5">
            <p className="text-[#4A4A6A] text-xs mb-1">Service Required</p>
            <p className="text-[#7B2FF2] text-sm font-medium">{selected.service}</p>
          </div>
          <div className="p-3 bg-[#161640] rounded-xl border border-white/5">
            <p className="text-[#4A4A6A] text-xs mb-1 flex items-center gap-1"><MessageSquare size={12} /> Message</p>
            <p className="text-white text-sm">{selected.message}</p>
          </div>
        </div>

        {/* Pipeline Status */}
        <div>
          <p className="text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Pipeline Stage</p>
          <div className="grid grid-cols-3 gap-1.5">
            {PIPELINE_STAGES.map(s => (
              <button
                key={s.key}
                onClick={() => updateStatus(selected.id, s.key)}
                className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selected.status === s.key
                    ? 'text-white'
                    : 'bg-white/5 text-[#7A7A9E] hover:text-white'
                }`}
                style={selected.status === s.key ? { background: s.color } : {}}
              >
                {s.label}
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
          <button onClick={() => saveNotes(selected.id)} className="mt-2 w-full bg-[#7B2FF2]/20 border border-[#7B2FF2]/30 text-[#7B2FF2] text-sm font-medium py-2 rounded-xl hover:bg-[#7B2FF2] hover:text-white transition-all">
            Save Notes
          </button>
        </div>

        {/* Quick Reply */}
        <a
          href={`mailto:${selected.email}?subject=Re: Your Inquiry at PrimeSoul&body=Hi ${selected.name},%0D%0A%0D%0AThank you for reaching out to PrimeSoul Web Solutions!%0D%0A%0D%0A`}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white text-sm font-semibold py-3 rounded-xl hover:opacity-90 transition-all"
        >
          <Mail size={16} /> Reply via Email
        </a>
      </>
    )
  }
}
