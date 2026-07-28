'use client'

import { Star, ShieldCheck } from 'lucide-react'

export default function TrustBadgesWidget() {
  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-md select-none hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-1.5">
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
  )
}
