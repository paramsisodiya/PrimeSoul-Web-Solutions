'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc, collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { BarChart2, ExternalLink, TrendingUp, Users, Eye, Clock, FileText } from 'lucide-react'

interface PageViewData {
  path: string
  count: number
}

export default function AnalyticsPage() {
  const [gaId, setGaId] = useState('')
  const [loading, setLoading] = useState(true)
  const [totalViews7d, setTotalViews7d] = useState(0)
  const [totalViews30d, setTotalViews30d] = useState(0)
  const [topPages, setTopPages] = useState<PageViewData[]>([])
  const [totalLeads, setTotalLeads] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch GA ID
        const settingsSnap = await getDoc(doc(db, 'settings', 'site'))
        if (settingsSnap.exists()) setGaId(settingsSnap.data().googleAnalyticsId || '')

        // Fetch page views
        const viewsSnap = await getDocs(collection(db, 'page_views'))
        const allViews = viewsSnap.docs.map(d => d.data())

        const now = Date.now()
        const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000
        const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000

        let count7d = 0
        let count30d = 0
        const pageCounts: Record<string, number> = {}

        for (const view of allViews) {
          const ts = view.timestamp?.toDate?.()?.getTime() || 0
          if (ts > sevenDaysAgo) count7d++
          if (ts > thirtyDaysAgo) count30d++

          const path = view.path || '/'
          pageCounts[path] = (pageCounts[path] || 0) + 1
        }

        setTotalViews7d(count7d)
        setTotalViews30d(count30d)

        const sorted = Object.entries(pageCounts)
          .map(([path, count]) => ({ path, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)
        setTopPages(sorted)

        // Fetch leads count
        const leadsSnap = await getDocs(collection(db, 'leads'))
        setTotalLeads(leadsSnap.size)
      } catch (err) {
        console.error('Error fetching analytics:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-[#7B2FF2] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">Analytics</h1>
          <p className="text-[#4A4A6A] text-sm mt-1">Track your website performance</p>
        </div>
        <a
          href="https://analytics.google.com"
          target="_blank"
          className="flex items-center gap-2 bg-[#161640] border border-white/10 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:border-white/20 transition-all"
        >
          <ExternalLink size={16} />
          Open Google Analytics
        </a>
      </div>

      {/* Real stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-5">
          <Eye size={20} className="text-[#7B2FF2] mb-3" />
          <p className="text-3xl font-bold text-white">{totalViews7d}</p>
          <p className="text-[#4A4A6A] text-xs mt-1">Page Views (7 days)</p>
        </div>
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-5">
          <BarChart2 size={20} className="text-[#E879F9] mb-3" />
          <p className="text-3xl font-bold text-white">{totalViews30d}</p>
          <p className="text-[#4A4A6A] text-xs mt-1">Page Views (30 days)</p>
        </div>
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-5">
          <Users size={20} className="text-[#2EC4C4] mb-3" />
          <p className="text-3xl font-bold text-white">{totalLeads}</p>
          <p className="text-[#4A4A6A] text-xs mt-1">Total Leads</p>
        </div>
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-5">
          <TrendingUp size={20} className="text-[#F59E0B] mb-3" />
          <p className="text-3xl font-bold text-white">{topPages.length}</p>
          <p className="text-[#4A4A6A] text-xs mt-1">Active Pages</p>
        </div>
      </div>

      {/* Top pages */}
      <div className="bg-[#161640] border border-white/5 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Top Pages</h3>
        {topPages.length === 0 ? (
          <p className="text-[#4A4A6A] text-sm">No page views recorded yet. Views will appear here once visitors start browsing your site.</p>
        ) : (
          <div className="space-y-3">
            {topPages.map((page, i) => (
              <div key={page.path} className="flex items-center justify-between p-3 bg-[#0E0E2C] rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#7B2FF2] w-6">#{i + 1}</span>
                  <span className="text-white text-sm font-medium">{page.path}</span>
                </div>
                <span className="text-[#7A7A9E] text-sm font-semibold">{page.count} views</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GA Quick links */}
      {gaId && (
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Google Analytics</h3>
            <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">GA ID: {gaId}</span>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { label: 'Realtime Report', desc: 'See live visitors right now', url: 'https://analytics.google.com/analytics/web/#/realtime/' },
              { label: 'Traffic Sources', desc: 'Where visitors are coming from', url: 'https://analytics.google.com/analytics/web/#/report/trafficsources-overview/' },
              { label: 'Top Pages', desc: 'Most visited pages on your site', url: 'https://analytics.google.com/analytics/web/#/report/content-pages/' },
              { label: 'User Demographics', desc: 'Age, location, device info', url: 'https://analytics.google.com/analytics/web/#/report/visitors-demographics-overview/' },
            ].map(link => (
              <a key={link.label} href={link.url} target="_blank" className="flex items-center justify-between p-4 bg-[#0E0E2C] rounded-xl border border-white/5 hover:border-[#7B2FF2]/30 transition-all group">
                <div>
                  <p className="text-white text-sm font-medium group-hover:text-[#7B2FF2] transition-colors">{link.label}</p>
                  <p className="text-[#4A4A6A] text-xs">{link.desc}</p>
                </div>
                <ExternalLink size={14} className="text-[#4A4A6A] group-hover:text-[#7B2FF2] transition-colors" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
