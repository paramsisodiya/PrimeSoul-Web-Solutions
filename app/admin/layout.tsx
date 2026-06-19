'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'
import AdminNotifications from '@/components/shared/AdminNotifications'
import {
  LayoutDashboard,
  Mail,
  FileText,
  Briefcase,
  Star,
  HelpCircle,
  DollarSign,
  Settings,
  Image,
  BarChart2,
  Megaphone,
  LogOut,
  Menu,
  X,
  Flame,

  Activity,
  Search,
  Receipt,
  LayoutList,
  Shuffle,
  Webhook,
  Target,
  Users,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads', icon: Mail },
  { href: '/admin/audit-leads', label: 'Audit Leads', icon: Target },
  { href: '/admin/job-applications', label: 'Careers', icon: Users },
  { href: '/admin/blogs', label: 'Blog', icon: FileText },
  { href: '/admin/portfolio', label: 'Portfolio', icon: Briefcase },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { href: '/admin/pricing', label: 'Pricing', icon: DollarSign },
  { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/admin/media', label: 'Media', icon: Image },
  { href: '/admin/invoices', label: 'Invoices', icon: Receipt },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/admin/seo', label: 'SEO Manager', icon: Search },
  { href: '/admin/ab-testing', label: 'A/B Testing', icon: Shuffle },
  { href: '/admin/webhooks', label: 'Webhooks', icon: Webhook },
  { href: '/admin/sections', label: 'Sections', icon: LayoutList },
  { href: '/admin/activity', label: 'Activity Log', icon: Activity },

  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!loading) {
      if (!user && pathname !== '/admin/login') {
        router.push('/admin/login')
      } else if (user && pathname === '/admin/login') {
        router.push('/admin')
      }
    }
  }, [user, loading, pathname, router])

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#0E0E2C] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#7B2FF2] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#0A0A1E] flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#0E0E2C] border-r border-white/5 z-30 flex flex-col transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7B2FF2] to-[#E879F9] flex items-center justify-center">
              <Flame size={18} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">PrimeSoul</p>
              <p className="text-[#4A4A6A] text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                    ? 'bg-[#7B2FF2] text-white shadow-lg shadow-purple-500/20'
                    : 'text-[#7A7A9E] hover:bg-white/5 hover:text-white'
                  }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B2FF2] to-[#E879F9] flex items-center justify-center text-white text-xs font-bold">P</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">PrimeSoul Admin</p>
              <p className="text-[#4A4A6A] text-xs truncate">{user?.email ?? 'admin@primesoul.tech'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#7A7A9E] hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 bg-[#0A0A1E]/80 backdrop-blur border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-[#7A7A9E] hover:text-white">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[#4A4A6A] text-sm">primesoul.tech</span>
            <span className="text-[#4A4A6A]">·</span>
            <Link href="/" className="text-[#7B2FF2] text-sm hover:underline">
              View Site →
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <AdminNotifications />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[#7A7A9E] text-xs">Live</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 pb-24 lg:pb-6">{children}</main>

        {/* Mobile Bottom Nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-[#0E0E2C]/95 backdrop-blur-xl border-t border-white/10">
          <div className="flex items-center justify-around py-2">
            {[
              { href: '/admin', icon: LayoutDashboard, label: 'Home' },
              { href: '/admin/leads', icon: Mail, label: 'Leads' },
              { href: '/admin/blogs', icon: FileText, label: 'Blog' },
              { href: '/admin/portfolio', icon: Briefcase, label: 'Work' },
              { href: '/admin/settings', icon: Settings, label: 'Settings' },
            ].map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                    isActive ? 'text-[#7B2FF2]' : 'text-[#7A7A9E]'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                  {isActive && <div className="w-4 h-0.5 rounded-full bg-[#7B2FF2]" />}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
