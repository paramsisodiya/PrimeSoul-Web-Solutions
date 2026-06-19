'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, doc, deleteDoc, orderBy, query, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Mail, Trash2, ExternalLink } from 'lucide-react'

interface AuditLead {
  id: string
  email: string
  source: string
  createdAt: Timestamp
}

export default function AuditLeadsPage() {
  const [leads, setLeads] = useState<AuditLead[]>([])
  const [loading, setLoading] = useState(true)

  const fetchLeads = async () => {
    const snap = await getDocs(query(collection(db, 'audit-leads'), orderBy('createdAt', 'desc')))
    setLeads(snap.docs.map(d => ({ id: d.id, ...d.data() } as AuditLead)))
    setLoading(false)
  }

  useEffect(() => { fetchLeads() }, [])

  const deleteLead = async (id: string) => {
    if (!confirm('Delete this audit lead?')) return
    await deleteDoc(doc(db, 'audit-leads', id))
    setLeads(prev => prev.filter(l => l.id !== id))
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
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-white text-2xl font-bold">Free Audit Leads</h1>
          <p className="text-[#4A4A6A] text-sm mt-1">{leads.length} total signups</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {leads.length === 0 ? (
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-8 text-center col-span-full">
            <Mail size={24} className="text-[#4A4A6A] mx-auto mb-2" />
            <p className="text-[#4A4A6A] text-sm">No audit leads found</p>
          </div>
        ) : leads.map(lead => (
          <div
            key={lead.id}
            className="bg-[#161640] border border-white/5 rounded-2xl p-5 transition-all hover:border-[#7B2FF2]/50 relative group"
          >
            <button
              onClick={() => deleteLead(lead.id)}
              className="absolute top-4 right-4 text-[#4A4A6A] opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all"
            >
              <Trash2 size={16} />
            </button>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-white font-semibold flex items-center gap-2">
                  <Mail size={16} className="text-[#7B2FF2]" />
                  {lead.email}
                </p>
                <p className="text-[#4A4A6A] text-xs mt-1">{formatDate(lead.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
              <span className="text-[#7B2FF2] text-xs font-medium bg-[#7B2FF2]/10 px-2 py-1 rounded-md">
                {lead.source || 'Popup'}
              </span>
              <a
                href={`mailto:${lead.email}?subject=Your Free Website Audit&body=Hi there,%0D%0A%0D%0AThank you for requesting a free website audit from PrimeSoul Web Solutions!`}
                className="text-xs text-white hover:text-[#7B2FF2] flex items-center gap-1 transition-colors"
              >
                Send Email <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
