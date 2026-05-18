'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Announcement {
  id: string
  text: string
  link?: string
  linkText?: string
  type?: 'info' | 'success' | 'warning' | 'promo'
  active?: boolean
  createdAt?: { toMillis?: () => number }
}

const TYPE_STYLES: Record<NonNullable<Announcement['type']>, string> = {
  promo: 'from-[#7B2FF2] to-[#A855F7]',
  success: 'from-[#059669] to-[#10B981]',
  info: 'from-[#2563EB] to-[#2EC4C4]',
  warning: 'from-[#D97706] to-[#F59E0B]',
}

export default function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'announcements'), where('active', '==', true)))
        const active = snap.docs
          .map(d => ({ id: d.id, ...d.data() } as Announcement))
          .sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0))[0]

        setAnnouncement(active || null)
        document.documentElement.style.setProperty('--announcement-height', active ? '44px' : '0px')
      } catch (err) {
        console.error('Error fetching announcement:', err)
        setAnnouncement(null)
        document.documentElement.style.setProperty('--announcement-height', '0px')
      }
    }

    fetchAnnouncement()
    return () => document.documentElement.style.setProperty('--announcement-height', '0px')
  }, [])

  if (!announcement) return null

  const content = (
    <>
      <span className="truncate">{announcement.text}</span>
      {announcement.linkText && (
        <span className="hidden sm:inline-flex font-bold underline underline-offset-4">
          {announcement.linkText}
        </span>
      )}
    </>
  )

  const className = `fixed top-0 left-0 right-0 z-[70] min-h-[44px] px-4 sm:px-6 py-2.5 bg-gradient-to-r ${TYPE_STYLES[announcement.type || 'promo']} text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-3 text-center shadow-lg shadow-purple-500/20`

  if (announcement.link) {
    const isExternal = announcement.link.startsWith('http')
    return isExternal ? (
      <a href={announcement.link} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    ) : (
      <Link href={announcement.link} className={className}>
        {content}
      </Link>
    )
  }

  return <div className={className}>{content}</div>
}
