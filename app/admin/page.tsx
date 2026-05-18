'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { collection, getDocs, query, orderBy, limit, where, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Mail, FileText, Briefcase, Star, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react'

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
    { label: 'Total Leads', value: stats.totalLeads, icon: Mail, color: '#7B2FF2', bg: 'from-[#7B2FF2]/20 to-[#7B2FF2]/5' },
    { label: 'New Leads', value: stats.newLeads, icon: TrendingUp, color: '#10B981', bg: 'from-green-500/20 to-green-500/5' },
    { label: 'Blog Posts', value: stats.totalBlogs, icon: FileText, color: '#E879F9', bg: 'from-pink-500/20 to-pink-500/5' },
    { label: 'Projects', value: stats.totalProjects, icon: Briefcase, color: '#2EC4C4', bg: 'from-cyan-500/20 to-cyan-500/5' },
    { label: 'Testimonials', value: stats.totalTestimonials, icon: Star, color: '#F59E0B', bg: 'from-yellow-500/20 to-yellow-500/5' },
  ]

  const statusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-400'
      case 'in_progress': return 'bg-yellow-500/20 text-yellow-400'
      case 'closed': return 'bg-green-500/20 text-green-400'
      default: return 'bg-[#7B2FF2]/20 text-[#7B2FF2]'
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
      <div>
        <h1 className="text-white text-2xl font-bold">Dashboard</h1>
        <p className="text-[#4A4A6A] text-sm mt-1">Welcome back, Param! Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className={`bg-gradient-to-br ${card.bg} border border-white/10 rounded-2xl p-5`}>
              <div className="flex items-center justify-between mb-3">
                <Icon size={20} style={{ color: card.color }} />
              </div>
              <p className="text-white text-2xl font-bold">{card.value}</p>
              <p className="text-[#7A7A9E] text-xs mt-1">{card.label}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Leads */}
      <div className="bg-[#161640] border border-white/5 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="text-white font-semibold">Recent Leads</h2>
          <Link href="/admin/leads" className="text-[#7B2FF2] text-sm hover:underline">View all →</Link>
        </div>
        <div className="divide-y divide-white/5">
          {recentLeads.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <Mail size={24} className="text-[#4A4A6A] mx-auto mb-2" />
              <p className="text-[#4A4A6A] text-sm">No leads yet. Share your website!</p>
            </div>
          ) : (
            recentLeads.map((lead) => (
              <div key={lead.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/2">
                <div>
                  <p className="text-white text-sm font-medium">{lead.name}</p>
                  <p className="text-[#4A4A6A] text-xs">{lead.email} · {lead.service}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor(lead.status)}`}>
                  {lead.status === 'new' ? 'New' : lead.status === 'in_progress' ? 'In Progress' : 'Closed'}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'New Blog Post', href: '/admin/blogs/new', icon: FileText, color: '#E879F9' },
          { label: 'Add Project', href: '/admin/portfolio', icon: Briefcase, color: '#2EC4C4' },
          { label: 'View Leads', href: '/admin/leads', icon: Mail, color: '#7B2FF2' },
          { label: 'Site Settings', href: '/admin/settings', icon: Star, color: '#F59E0B' },
        ].map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.label}
              href={action.href}
              className="bg-[#161640] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all group"
            >
              <Icon size={20} style={{ color: action.color }} className="mb-3" />
              <p className="text-white text-sm font-medium group-hover:text-[#7B2FF2] transition-colors">{action.label}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
