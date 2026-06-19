'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, doc, deleteDoc, orderBy, query, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Briefcase, Trash2, ExternalLink, Link as LinkIcon, MessageSquare } from 'lucide-react'

interface JobApplication {
  id: string
  name: string
  role: string
  portfolio: string
  message: string
  createdAt: Timestamp
}

export default function JobApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)

  const fetchApplications = async () => {
    const snap = await getDocs(query(collection(db, 'job_applications'), orderBy('createdAt', 'desc')))
    setApplications(snap.docs.map(d => ({ id: d.id, ...d.data() } as JobApplication)))
    setLoading(false)
  }

  useEffect(() => { fetchApplications() }, [])

  const deleteApplication = async (id: string) => {
    if (!confirm('Delete this application?')) return
    await deleteDoc(doc(db, 'job_applications', id))
    setApplications(prev => prev.filter(a => a.id !== id))
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
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-white text-2xl font-bold">Job Applications</h1>
          <p className="text-[#4A4A6A] text-sm mt-1">{applications.length} total applications</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {applications.length === 0 ? (
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-8 text-center col-span-full">
            <Briefcase size={24} className="text-[#4A4A6A] mx-auto mb-2" />
            <p className="text-[#4A4A6A] text-sm">No applications found</p>
          </div>
        ) : applications.map(app => (
          <div
            key={app.id}
            className="bg-[#161640] border border-white/5 rounded-2xl p-6 relative group transition-all hover:border-[#7B2FF2]/50"
          >
            <button
              onClick={() => deleteApplication(app.id)}
              className="absolute top-4 right-4 text-[#4A4A6A] opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all"
            >
              <Trash2 size={16} />
            </button>
            <div className="mb-4">
              <h3 className="text-white font-bold text-lg mb-1">{app.name}</h3>
              <p className="text-[#7B2FF2] text-sm font-medium">{app.role}</p>
              <p className="text-[#4A4A6A] text-xs mt-1">{formatDate(app.createdAt)}</p>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 p-3 bg-[#0E0E2C]/50 rounded-xl border border-white/5">
                <LinkIcon size={14} className="text-[#4A4A6A]" />
                <a href={app.portfolio} target="_blank" rel="noopener noreferrer" className="text-[#7B2FF2] text-sm truncate hover:underline flex-1">
                  {app.portfolio}
                </a>
                <ExternalLink size={14} className="text-[#4A4A6A]" />
              </div>
              <div className="p-3 bg-[#0E0E2C]/50 rounded-xl border border-white/5">
                <p className="text-[#4A4A6A] text-xs mb-1 flex items-center gap-1"><MessageSquare size={12} /> Message</p>
                <p className="text-white text-sm whitespace-pre-wrap">{app.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
