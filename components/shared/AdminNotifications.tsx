'use client'

import { useEffect, useState, useRef } from 'react'
import { collection, onSnapshot, query, orderBy, limit, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Bell, Mail, FileText, Star, X } from 'lucide-react'

interface Notification {
  id: string
  type: 'lead' | 'blog' | 'testimonial'
  title: string
  description: string
  time: Date
  read: boolean
}

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [open, setOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const seenIdsRef = useRef<Set<string>>(new Set())
  const initialLoadRef = useRef(true)

  useEffect(() => {
    // Listen to new leads in real-time
    const unsubLeads = onSnapshot(
      query(collection(db, 'leads'), orderBy('createdAt', 'desc'), limit(10)),
      (snap) => {
        const newNotifs: Notification[] = []
        snap.docs.forEach(doc => {
          const data = doc.data()
          if (!initialLoadRef.current && !seenIdsRef.current.has(doc.id)) {
            newNotifs.push({
              id: `lead-${doc.id}`,
              type: 'lead',
              title: `New Lead: ${data.name || 'Unknown'}`,
              description: `${data.service || 'General inquiry'} — ${data.email || ''}`,
              time: data.createdAt?.toDate?.() || new Date(),
              read: false,
            })
          }
          seenIdsRef.current.add(doc.id)
        })
        if (newNotifs.length > 0) {
          setNotifications(prev => [...newNotifs, ...prev].slice(0, 20))
          setUnreadCount(prev => prev + newNotifs.length)
        }
        initialLoadRef.current = false
      }
    )

    return () => { unsubLeads() }
  }, [])

  // Close panel on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  const icon = (type: string) => {
    switch (type) {
      case 'lead': return <Mail size={14} className="text-blue-400" />
      case 'blog': return <FileText size={14} className="text-pink-400" />
      case 'testimonial': return <Star size={14} className="text-yellow-400" />
      default: return <Bell size={14} className="text-[#7B2FF2]" />
    }
  }

  const timeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <div ref={panelRef} className="relative">
      <button
        onClick={() => { setOpen(!open); if (!open) markAllRead() }}
        className="relative p-2 rounded-xl text-[#7A7A9E] hover:text-white hover:bg-white/5 transition-all"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#7B2FF2] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-80 bg-[#0E0E2C] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-slide-in-right" style={{ animation: 'scale-in 0.2s ease forwards' }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <h3 className="text-white text-sm font-semibold">Notifications</h3>
            {notifications.length > 0 && (
              <button onClick={markAllRead} className="text-[#7B2FF2] text-xs hover:underline">Mark all read</button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Bell size={20} className="text-[#4A4A6A] mx-auto mb-2" />
                <p className="text-[#4A4A6A] text-xs">No notifications yet</p>
                <p className="text-[#4A4A6A] text-xs mt-1">New leads will appear here in real-time</p>
              </div>
            ) : (
              notifications.map(n => (
                <div key={n.id} className={`px-4 py-3 border-b border-white/5 hover:bg-white/3 transition-colors ${!n.read ? 'bg-[#7B2FF2]/5' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      {icon(n.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium truncate">{n.title}</p>
                      <p className="text-[#4A4A6A] text-xs truncate">{n.description}</p>
                      <p className="text-[#4A4A6A] text-[10px] mt-1">{timeAgo(n.time)}</p>
                    </div>
                    {!n.read && <div className="w-2 h-2 rounded-full bg-[#7B2FF2] mt-1.5 flex-shrink-0" />}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
