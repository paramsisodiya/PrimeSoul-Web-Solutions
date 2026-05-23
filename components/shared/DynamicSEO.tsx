'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface PageSEO {
  title: string
  description: string
  keywords: string
}

const PAGE_MAP: Record<string, string> = {
  '/': 'home',
  '/about': 'about',
  '/services': 'services',
  '/portfolio': 'portfolio',
  '/contact': 'contact',
  '/blog': 'blog',
}

export default function DynamicSEO() {
  const pathname = usePathname()

  useEffect(() => {
    const pageKey = PAGE_MAP[pathname || '/']
    if (!pageKey) return

    const applySEO = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'seo'))
        if (!snap.exists()) return

        const seoData = snap.data()
        const pageSeo = seoData[pageKey] as PageSEO | undefined
        if (!pageSeo) return

        // Update title
        if (pageSeo.title) {
          document.title = pageSeo.title
        }

        // Update meta description
        if (pageSeo.description) {
          let metaDesc = document.querySelector('meta[name="description"]')
          if (!metaDesc) {
            metaDesc = document.createElement('meta')
            metaDesc.setAttribute('name', 'description')
            document.head.appendChild(metaDesc)
          }
          metaDesc.setAttribute('content', pageSeo.description)
        }

        // Update meta keywords
        if (pageSeo.keywords) {
          let metaKeys = document.querySelector('meta[name="keywords"]')
          if (!metaKeys) {
            metaKeys = document.createElement('meta')
            metaKeys.setAttribute('name', 'keywords')
            document.head.appendChild(metaKeys)
          }
          metaKeys.setAttribute('content', pageSeo.keywords)
        }
      } catch (err) {
        // Silently fail — fallback to hardcoded metadata
      }
    }

    applySEO()
  }, [pathname])

  return null
}
