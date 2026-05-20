'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { collection, getDocs, query, orderBy, limit, where, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Mail, FileText, Briefcase, Star, TrendingUp, Clock, ArrowUpRight, ArrowDownRight, Activity, LayoutGrid, Zap } from 'lucide-react'

interface Stats {
  totalLeads: number
  newLeads: number
  totalBlogs: number
  totalProjects: number
  totalTestimonials: number
}

interface Lead {
  id: string
  name: string
  email: string
  service: string
  status: string
  createdAt: Timestamp
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ totalLeads: 0, newLeads: 0, totalBlogs: 0, totalProjects: 0, totalTestimonials: 0 })
  const [recentLeads, setRecentLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leadsSnap, blogsSnap, portfolioSnap, testimonialsSnap] = await Promise.all([
          getDocs(collection(db, 'leads')),
          getDocs(collection(db, 'blogs')),
          getDocs(collection(db, 'portfolio')),
          getDocs(collection(db, 'testimonials')),
        ])

        const newLeadsSnap = await getDocs(query(collection(db, 'leads'), where('status', '==', 'new')))
        const recentSnap = await getDocs(query(collection(db, 'leads'), orderBy('createdAt', 'desc'), limit(5)))

        setStats({
          totalLeads: leadsSnap.size,
          newLeads: newLeadsSnap.size,
          totalBlogs: blogsSnap.size,
          totalProjects: portfolioSnap.size,
          totalTestimonials: testimonialsSnap.size,
        })

        setRecentLeads(recentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead)))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const statCards = [
    { label: 'Total Leads', value: stats.totalLeads, icon: Mail, color: '#7B2FF2', bg: 'from-[#7B2FF2]/20 to-[#7B2FF2]/5', trend: '+12%', up: true },
    { label: 'New Leads', value: stats.newLeads, icon: TrendingUp, color: '#10B981', bg: 'from-green-500/20 to-green-500/5', trend: 'Active', up: true },
    { label: 'Blog Posts', value: stats.totalBlogs, icon: FileText, color: '#E879F9', bg: 'from-pink-500/20 to-pink-500/5', trend: 'Published', up: true },
    { label: 'Projects', value: stats.totalProjects, icon: Briefcase, color: '#2EC4C4', bg: 'from-cyan-500/20 to-cyan-500/5', trend: 'Live', up: true },
    { label: 'Testimonials', value: stats.totalTestimonials, icon: Star, color: '#F59E0B', bg: 'from-yellow-500/20 to-yellow-500/5', trend: 'Reviews', up: true },
  ]

  const statusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-400'
      case 'contacted': case 'in_progress': return 'bg-yellow-500/20 text-yellow-400'
      case 'won': case 'closed': return 'bg-green-500/20 text-green-400'
      case 'proposal': return 'bg-purple-500/20 text-purple-400'
      case 'lost': return 'bg-red-500/20 text-red-400'
      default: return 'bg-[#7B2FF2]/20 text-[#7B2FF2]'
    }
  }

  const statusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'New'
      case 'contacted': return 'Contacted'
      case 'in_progress': return 'In Progress'
      case 'proposal': return 'Proposal'
      case 'negotiation': return 'Negotiating'
      case 'won': return 'Won'
      case 'closed': return 'Closed'
      case 'lost': return 'Lost'
      default: return status
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#7B2FF2] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-white text-2xl font-bold">Dashboard</h1>
          <p className="text-[#4A4A6A] text-sm mt-1">Welcome back, Param! Here&apos;s your overview.</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 font-medium">System Online</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className={`bg-gradient-to-br ${card.bg} border border-white/10 rounded-2xl p-5 transition-all hover:border-white/20 hover:scale-[1.02]`}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${card.color}15` }}>
                  <Icon size={18} style={{ color: card.color }} />
                </div>
                <span className="flex items-center gap-0.5 text-[10px] font-medium text-green-400">
                  <ArrowUpRight size={10} /> {card.trend}
                </span>
              </div>
              <p className="text-white text-2xl font-bold">{card.value}</p>
              <p className="text-[#7A7A9E] text-xs mt-1">{card.label}</p>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-[#161640] border border-white/5 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-[#7B2FF2]" />
              <h2 className="text-white font-semibold">Recent Leads</h2>
            </div>
            <Link href="/admin/leads" className="text-[#7B2FF2] text-sm hover:underline">View Pipeline →</Link>
          </div>
          <div className="divide-y divide-white/5">
            {recentLeads.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <Mail size={24} className="text-[#4A4A6A] mx-auto mb-2" />
                <p className="text-[#4A4A6A] text-sm">No leads yet. Share your website!</p>
              </div>
            ) : (
              recentLeads.map((lead) => (
                <div key={lead.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B2FF2]/20 to-[#E879F9]/20 flex items-center justify-center text-white text-xs font-bold">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{lead.name}</p>
                      <p className="text-[#4A4A6A] text-xs">{lead.email} · {lead.service}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor(lead.status)}`}>
                    {statusLabel(lead.status)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold flex items-center gap-2"><Zap size={16} className="text-[#7B2FF2]" /> Quick Actions</h3>
          {[
            { label: 'New Blog Post', desc: 'Write & publish content', href: '/admin/blogs/new', icon: FileText, color: '#E879F9' },
            { label: 'Add Project', desc: 'Showcase your work', href: '/admin/portfolio', icon: Briefcase, color: '#2EC4C4' },
            { label: 'Lead Pipeline', desc: 'Manage inquiries', href: '/admin/leads', icon: LayoutGrid, color: '#7B2FF2' },
            { label: 'Activity Log', desc: 'View all changes', href: '/admin/activity', icon: Activity, color: '#F59E0B' },
          ].map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-4 bg-[#161640] border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${action.color}15` }}>
                  <Icon size={18} style={{ color: action.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium group-hover:text-[#7B2FF2] transition-colors">{action.label}</p>
                  <p className="text-[#4A4A6A] text-xs">{action.desc}</p>
                </div>
                <ArrowUpRight size={14} className="text-[#4A4A6A] group-hover:text-[#7B2FF2] transition-colors" />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
