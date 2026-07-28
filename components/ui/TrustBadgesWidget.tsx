'use client'

import { useState, useEffect } from 'react'
import { Star, CheckCircle, ShieldCheck, X } from 'lucide-react'

const LIVE_NOTIFICATIONS = [
  { text: 'New website inquiry from Bhopal', time: '2 mins ago', badge: 'Verified Lead' },
  { text: 'SVNS School Khilchipur portal updated', time: '15 mins ago', badge: 'Live Update' },
  { text: 'A&S Solar Solutions website launched', time: '1 hour ago', badge: 'New Project' },
  { text: 'New lead audit requested from Indore', time: '3 hours ago', badge: 'Free Audit' },
]

export default function TrustBadgesWidget() {
  const [currentNotifIndex, setCurrentNotifIndex] = useState(0)
  const [showToast, setShowToast] = useState(true)

  // Rotate notifications every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotifIndex((prev) => (prev + 1) % LIVE_NOTIFICATIONS.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const notif = LIVE_NOTIFICATIONS[currentNotifIndex]

  return (
    <>
      {/* Google 4.9 Star Rating Glass Badge */}
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg select-none">
        <div className="flex items-center gap-1">
          <span className="text-sm font-extrabold text-[#0E0E2C]">4.9</span>
          <div className="flex items-center text-[#F59E0B]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
        </div>

        <div className="h-4 w-px bg-surface-border" />

        <div className="flex items-center gap-1.5 text-xs font-bold text-ink-secondary">
          <ShieldCheck size={15} className="text-[#00C9A7]" />
          <span>Google Verified • 35+ Clients</span>
        </div>
      </div>

      {/* Floating Live Client Activity Toast Notification (Bottom Left) */}
      {showToast && (
        <div className="fixed bottom-6 left-6 z-40 max-w-sm w-full animate-fade-in pointer-events-auto">
          <div className="relative rounded-2xl p-4 bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.18)] flex items-start gap-3.5 group">
            {/* Pulsing Indicator */}
            <div className="relative flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E3AE0] to-[#2EC4C4] flex items-center justify-center text-white shadow-md">
              <CheckCircle size={18} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#00C9A7] rounded-full ring-2 ring-white animate-ping" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7B2FF2] bg-[#7B2FF2]/10 px-2 py-0.5 rounded-full">
                  {notif.badge}
                </span>
                <span className="text-[10px] text-ink-muted">{notif.time}</span>
              </div>
              <p className="text-xs font-bold text-[#0E0E2C] leading-snug truncate">
                {notif.text}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowToast(false)}
              className="text-ink-muted hover:text-[#0E0E2C] p-1 transition-colors rounded-lg"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
