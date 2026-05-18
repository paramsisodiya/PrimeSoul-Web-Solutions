'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { BarChart2, ExternalLink, TrendingUp, Users, Eye, Clock } from 'lucide-react'

export default function AnalyticsPage() {
  const [gaId, setGaId] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      const snap = await getDoc(doc(db, 'settings', 'site'))
      if (snap.exists()) setGaId(snap.data().googleAnalyticsId || '')
      setLoading(false)
    }
    fetchSettings()
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

      {!gaId ? (
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-8">
          <div className="max-w-lg mx-auto text-center">
            <BarChart2 size={48} className="text-[#7B2FF2] mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">Connect Google Analytics</h3>
            <p className="text-[#7A7A9E] text-sm mb-6">Add your Google Analytics ID in Settings to see detailed traffic reports, user behavior, and more.</p>

            <div className="bg-[#0E0E2C] border border-white/10 rounded-2xl p-5 text-left mb-6">
              <p className="text-white text-sm font-semibold mb-3">How to get your Analytics ID:</p>
              <ol className="space-y-2 text-[#7A7A9E] text-sm">
                <li className="flex gap-2"><span className="text-[#7B2FF2] font-bold">1.</span> Go to <a href="https://analytics.google.com" target="_blank" className="text-[#7B2FF2] underline">analytics.google.com</a></li>
                <li className="flex gap-2"><span className="text-[#7B2FF2] font-bold">2.</span> Create account → Add Property → primesoul.tech</li>
                <li className="flex gap-2"><span className="text-[#7B2FF2] font-bold">3.</span> Go to Admin → Data Streams → Your site</li>
                <li className="flex gap-2"><span className="text-[#7B2FF2] font-bold">4.</span> Copy the Measurement ID (starts with G-)</li>
                <li className="flex gap-2"><span className="text-[#7B2FF2] font-bold">5.</span> Paste it in Settings → Google Analytics ID</li>
              </ol>
            </div>

            <a href="/admin/settings" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-all">
              Go to Settings →
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Quick stats cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Users', icon: Users, desc: 'View in GA →', color: '#7B2FF2' },
              { label: 'Page Views', icon: Eye, desc: 'View in GA →', color: '#E879F9' },
              { label: 'Avg Session', icon: Clock, desc: 'View in GA →', color: '#2EC4C4' },
              { label: 'Top Pages', icon: TrendingUp, desc: 'View in GA →', color: '#F59E0B' },
            ].map(stat => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="bg-[#161640] border border-white/5 rounded-2xl p-5">
                  <Icon size={20} style={{ color: stat.color }} className="mb-3" />
                  <p className="text-white font-semibold text-sm">{stat.label}</p>
                  <a href="https://analytics.google.com" target="_blank" className="text-[#4A4A6A] text-xs hover:text-[#7B2FF2] transition-colors">{stat.desc}</a>
                </div>
              )
            })}
          </div>

          {/* GA Embed */}
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Analytics Dashboard</h3>
              <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">GA ID: {gaId}</span>
            </div>
            <div className="bg-[#0E0E2C] rounded-2xl p-6 text-center border border-white/5">
              <BarChart2 size={32} className="text-[#7B2FF2] mx-auto mb-3" />
              <p className="text-white text-sm font-medium mb-2">Full Analytics Available</p>
              <p className="text-[#7A7A9E] text-sm mb-4">Your GA ID <span className="text-[#7B2FF2]">{gaId}</span> is configured. View complete data in Google Analytics.</p>
              <a
                href={`https://analytics.google.com/analytics/web/#/report-home/`}
                target="_blank"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-all"
              >
                <ExternalLink size={16} />
                Open Full Dashboard
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
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
        </div>
      )}
    </div>
  )
}
