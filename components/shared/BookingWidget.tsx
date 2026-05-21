'use client'

import { useState } from 'react'

interface BookingWidgetProps {
  calLink?: string
}

export default function BookingWidget({ calLink }: BookingWidgetProps) {
  const [showCalendar, setShowCalendar] = useState(false)

  // Default to a generic Calendly-style embed — replace with actual booking link
  const bookingUrl = calLink || 'https://calendly.com'

  return (
    <div className="rounded-3xl border border-[#E8E5F5] bg-white overflow-hidden" style={{ boxShadow: '0 8px 40px -12px rgba(123,47,242,0.10)' }}>
      <div className="p-8 text-center">
        <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7B2FF2 0%, #E879F9 100%)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#0E0E2C] mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Book a Free Strategy Call
        </h3>
        <p className="text-sm text-[#7A7A9E] mb-6">
          15-minute consultation to discuss your project and get expert advice — no strings attached.
        </p>

        {!showCalendar ? (
          <button
            onClick={() => setShowCalendar(true)}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-px"
            style={{
              background: 'linear-gradient(135deg, #7B2FF2 0%, #A855F7 100%)',
              boxShadow: '0 8px 24px -8px rgba(123,47,242,0.4)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Schedule a Call
          </button>
        ) : (
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden border border-[#E8E5F5]" style={{ minHeight: 350 }}>
              <iframe
                src={bookingUrl}
                width="100%"
                height="400"
                frameBorder="0"
                style={{ border: 'none', borderRadius: '16px' }}
                title="Schedule a call"
              />
            </div>
            <button
              onClick={() => setShowCalendar(false)}
              className="text-xs text-[#AEAEC8] hover:text-[#7A7A9E] transition-colors"
            >
              Close calendar
            </button>
          </div>
        )}

        <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-[#E8E5F5]">
          {[
            { icon: '🕐', text: '15 min' },
            { icon: '💰', text: 'Free' },
            { icon: '🎯', text: 'No obligation' },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-1.5">
              <span className="text-sm">{item.icon}</span>
              <span className="text-xs text-[#7A7A9E] font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
