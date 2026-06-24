'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function PageViewTracker() {
  const pathname = usePathname()
  const lastPath = useRef('')

  useEffect(() => {
    // Don't track admin pages
    if (!pathname || pathname.startsWith('/admin')) return
    // Don't double-track same path
    if (pathname === lastPath.current) return
    lastPath.current = pathname

    const logPageView = async () => {
      try {
        await addDoc(collection(db, 'page_views'), {
          path: pathname,
          timestamp: serverTimestamp(),
          referrer: typeof document !== 'undefined' ? document.referrer || '' : '',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 150) : '',
        })
      } catch {
        // Silently fail — don't disrupt UX
      }
    }

    // Small delay to avoid blocking initial render
    const timer = setTimeout(logPageView, 1000)
    return () => clearTimeout(timer)
  }, [pathname])

  return null
}
