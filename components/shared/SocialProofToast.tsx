'use client'

import { useState, useEffect, useCallback } from 'react'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Sparkles, X } from 'lucide-react'

const FALLBACK_ITEMS = [
  { emoji: '🔥', text: 'Param just completed a project for A&S Solar Solutions', time: '2 hours ago', tag: 'Completed' },
  { emoji: '⚡', text: 'New client onboarded this week — Website Design', time: '5 hours ago', tag: 'New Client' },
  { emoji: '🎉', text: 'SVNS School website reached 300+ students served', time: '1 day ago', tag: 'Milestone' },
  { emoji: '🚀', text: '3 new projects launched this quarter', time: '3 days ago', tag: 'Launched' },
  { emoji: '💼', text: 'PrimeSoul reached 4+ businesses served', time: '1 week ago', tag: 'Impact' },
]

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
  const weeks = Math.floor(days / 7)
  return `${weeks} week${weeks > 1 ? 's' : ''} ago`
}

interface ProofItem {
  emoji: string
  text: string
  time: string
  tag?: string
}

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dismissed, setDismissed] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [proofItems, setProofItems] = useState<ProofItem[]>(FALLBACK_ITEMS)

  // Fetch real activity log entries
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const snap = await getDocs(
          query(collection(db, 'activity_log'), orderBy('timestamp', 'desc'), limit(5))
        )
        if (snap.empty) return

        const items: ProofItem[] = snap.docs.map(d => {
          const data = d.data()
          const timestamp = data.timestamp?.toDate?.() || new Date()
          const emoji = data.emoji || '🔔'
          const text = data.message || data.text || 'New activity on PrimeSoul'
          return { emoji, text, time: timeAgo(timestamp), tag: 'Live' }
        })

        if (items.length > 0) setProofItems(items)
      } catch {
        // Keep fallback items on error
      }
    }
    fetchActivity()
  }, [])

  const hideToast = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => {
      setVisible(false)
      setIsExiting(false)
    }, 400)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) return
    if (dismissed) return

    const initialDelay = setTimeout(() => {
      setVisible(true)
      const autoHide = setTimeout(() => {
        hideToast()
      }, 6000)

      return () => clearTimeout(autoHide)
    }, 10000)

    return () => clearTimeout(initialDelay)
  }, [dismissed, hideToast])

  useEffect(() => {
    if (dismissed) return

    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) return

      setCurrentIndex(prev => (prev + 1) % proofItems.length)
      setVisible(true)
      setIsExiting(false)

      setTimeout(() => {
        hideToast()
      }, 6000)
    }, 30000)

    return () => clearInterval(interval)
  }, [dismissed, hideToast, proofItems.length])

  if (!visible || dismissed) return null

  const item = proofItems[currentIndex]

  return (
    /* PERMANENTLY HIDDEN ON MOBILE (hidden md:block) */
    <div
      className={`hidden md:block fixed bottom-6 left-6 z-50 max-w-sm ${
        isExiting ? 'animate-toast-exit' : 'animate-toast-enter'
      }`}
      style={{ pointerEvents: 'auto' }}
    >
      <div className="relative rounded-2xl p-4 bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_15px_45px_-10px_rgba(123,47,242,0.22)] overflow-hidden group">
        {/* Top Glow Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1E3AE0] via-[#7B2FF2] to-[#2EC4C4]" />

        <div className="flex items-start gap-3.5 pt-1">
          {/* Animated Icon Badge */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7B2FF2]/10 to-[#2EC4C4]/10 border border-[#7B2FF2]/20 flex items-center justify-center flex-shrink-0 text-xl shadow-sm">
            {item.emoji}
          </div>

          {/* Toast Text Content */}
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7B2FF2] bg-[#7B2FF2]/10 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles size={10} />
                {item.tag || 'Live Update'}
              </span>
              <span className="text-[10px] font-medium text-ink-muted">{item.time}</span>
            </div>

            <p className="text-xs font-bold text-[#0E0E2C] leading-snug">
              {item.text}
            </p>
          </div>

          {/* Dismiss Button */}
          <button
            onClick={() => {
              hideToast()
              setDismissed(true)
            }}
            className="text-ink-muted hover:text-[#0E0E2C] p-1 transition-colors rounded-lg hover:bg-surface-subtle"
            aria-label="Dismiss toast"
          >
            <X size={14} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-surface-subtle">
          <div className="h-full bg-gradient-to-r from-[#7B2FF2] to-[#2EC4C4] animate-toast-progress" />
        </div>
      </div>
    </div>
  )
}
