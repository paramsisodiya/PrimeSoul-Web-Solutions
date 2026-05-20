'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, addDoc, query, orderBy, limit, serverTimestamp, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Activity, Mail, FileText, Briefcase, Star, Settings, Palette, Clock, Filter } from 'lucide-react'

interface ActivityItem {
  id: string
  action: string
  entity: string
  entityType: 'lead' | 'blog' | 'portfolio' | 'testimonial' | 'settings' | 'theme' | 'faq' | 'pricing'
  user: string
  timestamp: Timestamp
}

const typeIcon = (type: string) => {
  switch (type) {
    case 'lead': return <Mail size={14} className="text-blue-400" />
    case 'blog': return <FileText size={14} className="text-pink-400" />
    case 'portfolio': return <Briefcase size={14} className="text-cyan-400" />
    case 'testimonial': return <Star size={14} className="text-yellow-400" />
    case 'settings': return <Settings size={14} className="text-gray-400" />
    case 'theme': return <Palette size={14} className="text-purple-400" />
    default: return <Activity size={14} className="text-[#7B2FF2]" />
  }
}

const typeColor = (type: string) => {
  switch (type) {
    case 'lead': return '#3B82F6'
    case 'blog': return '#EC4899'
    case 'portfolio': return '#06B6D4'
    case 'testimonial': return '#F59E0B'
    case 'settings': return '#6B7280'
    case 'theme': return '#A855F7'
    default: return '#7B2FF2'
  }
}

export default function ActivityLogPage() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'activity_log'), orderBy('timestamp', 'desc'), limit(100)))
        setActivities(snap.docs.map(d => ({ id: d.id, ...d.data() } as ActivityItem)))
      } catch {
        // Collection may not exist yet — that's fine
        setActivities([])
      }
      setLoading(false)
    }
    fetchActivities()
  }, [])

  const formatTime = (ts: Timestamp) => {
    if (!ts?.toDate) return '—'
    const date = ts.toDate()
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diff < 60) return 'Just now'
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const types = ['all', 'lead', 'blog', 'portfolio', 'testimonial', 'settings', 'theme']
  const filtered = filterType === 'all' ? activities : activities.filter(a => a.entityType === filterType)

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-[#7B2FF2] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white text-2xl font-bold">Activity Log</h1>
        <p className="text-[#4A4A6A] text-sm mt-1">Track all changes made across the admin panel</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filterType === t ? 'bg-[#7B2FF2] text-white' : 'bg-[#161640] text-[#7A7A9E] hover:text-white border border-white/5'
            }`}
          >
            {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Activity Timeline */}
      <div className="bg-[#161640] border border-white/5 rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <Activity size={28} className="text-[#4A4A6A] mx-auto mb-3" />
            <p className="text-[#7A7A9E] text-sm">No activity recorded yet</p>
            <p className="text-[#4A4A6A] text-xs mt-1">Actions like updating leads, publishing blogs, and editing settings will appear here</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filtered.map((item, i) => (
              <div key={item.id} className="flex items-start gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                <div className="mt-1 w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${typeColor(item.entityType)}15` }}>
                  {typeIcon(item.entityType)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm">
                    <span className="font-medium">{item.user || 'Admin'}</span>
                    {' '}<span className="text-[#7A7A9E]">{item.action}</span>
                    {' '}<span className="font-medium" style={{ color: typeColor(item.entityType) }}>{item.entity}</span>
                  </p>
                  <p className="text-[#4A4A6A] text-xs mt-0.5 flex items-center gap-1">
                    <Clock size={10} /> {formatTime(item.timestamp)}
                  </p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium flex-shrink-0" style={{ background: `${typeColor(item.entityType)}15`, color: typeColor(item.entityType) }}>
                  {item.entityType}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
