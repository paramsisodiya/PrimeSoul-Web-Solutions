'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface ThemeSettings {
  primaryColor: string
  primaryDark: string
  primaryLight: string
  accentColor: string
  cyanColor: string
  headingFont: string
  bodyFont: string
}

const DEFAULTS: ThemeSettings = {
  primaryColor: '#7B2FF2',
  primaryDark: '#5A1DB8',
  primaryLight: '#A855F7',
  accentColor: '#E879F9',
  cyanColor: '#2EC4C4',
  headingFont: 'Poppins',
  bodyFont: 'DM Sans',
}

/* Google Fonts that might be selected in the admin customizer */
const GOOGLE_FONT_MAP: Record<string, string> = {
  'Poppins': 'Poppins:wght@300;400;500;600;700;800;900',
  'Inter': 'Inter:wght@300;400;500;600;700;800;900',
  'DM Sans': 'DM+Sans:wght@300;400;500;600;700',
  'Outfit': 'Outfit:wght@300;400;500;600;700;800',
  'Space Grotesk': 'Space+Grotesk:wght@300;400;500;600;700',
  'Plus Jakarta Sans': 'Plus+Jakarta+Sans:wght@300;400;500;600;700;800',
  'Playfair Display': 'Playfair+Display:wght@400;500;600;700;800',
  'DM Mono': 'DM+Mono:wght@400;500',
}

/**
 * Helper to darken a hex color by a given amount (0-100)
 */
function adjustBrightness(hex: string, amount: number): string {
  hex = hex.replace('#', '')
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
  const r = Math.max(0, Math.min(255, parseInt(hex.substring(0, 2), 16) + amount))
  const g = Math.max(0, Math.min(255, parseInt(hex.substring(2, 4), 16) + amount))
  const b = Math.max(0, Math.min(255, parseInt(hex.substring(4, 6), 16) + amount))
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

/**
 * Convert hex to rgb values string "r, g, b"
 */
function hexToRgb(hex: string): string {
  hex = hex.replace('#', '')
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `${r}, ${g}, ${b}`
}

export default function ThemeProvider() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const applyTheme = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'theme'))
        if (!snap.exists()) {
          setLoaded(true)
          return
        }

        const data = snap.data() as Partial<ThemeSettings>
        const theme: ThemeSettings = { ...DEFAULTS, ...data }

        const root = document.documentElement

        // Colors
        root.style.setProperty('--brand-primary', theme.primaryColor)
        root.style.setProperty('--brand-primary-dark', theme.primaryDark || adjustBrightness(theme.primaryColor, -40))
        root.style.setProperty('--brand-primary-light', theme.primaryLight || adjustBrightness(theme.primaryColor, 40))
        root.style.setProperty('--brand-accent', theme.accentColor)
        root.style.setProperty('--brand-cyan', theme.cyanColor)

        // RGB versions for rgba() usage
        root.style.setProperty('--brand-primary-rgb', hexToRgb(theme.primaryColor))
        root.style.setProperty('--brand-accent-rgb', hexToRgb(theme.accentColor))

        // Fonts
        if (theme.headingFont !== DEFAULTS.headingFont || theme.bodyFont !== DEFAULTS.bodyFont) {
          const fontsToLoad = new Set<string>()
          if (theme.headingFont && GOOGLE_FONT_MAP[theme.headingFont]) {
            fontsToLoad.add(GOOGLE_FONT_MAP[theme.headingFont])
          }
          if (theme.bodyFont && GOOGLE_FONT_MAP[theme.bodyFont]) {
            fontsToLoad.add(GOOGLE_FONT_MAP[theme.bodyFont])
          }

          if (fontsToLoad.size > 0) {
            const families = Array.from(fontsToLoad).map(f => `family=${f}`).join('&')
            const linkId = 'theme-fonts'
            let link = document.getElementById(linkId) as HTMLLinkElement | null
            if (!link) {
              link = document.createElement('link')
              link.id = linkId
              link.rel = 'stylesheet'
              document.head.appendChild(link)
            }
            link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`
          }
        }

        root.style.setProperty('--font-heading', `'${theme.headingFont}', sans-serif`)
        root.style.setProperty('--font-body', `'${theme.bodyFont}', sans-serif`)
      } catch (err) {
        // Silently fail — defaults remain from CSS
        console.warn('ThemeProvider: Could not load theme, using defaults.', err)
      } finally {
        setLoaded(true)
      }
    }

    applyTheme()
  }, [])

  // Don't render anything — this is a side-effect-only component
  return null
}
