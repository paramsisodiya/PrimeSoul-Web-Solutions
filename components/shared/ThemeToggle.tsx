'use client'

import { useState, useEffect, useCallback } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = stored ? (stored as 'light' | 'dark') : (prefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  const toggle = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }, [theme])

  if (!mounted) return null

  return (
    <button
      onClick={toggle}
      className="fixed bottom-8 left-8 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 btn-tap group"
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #F59E0B, #FBBF24)'
          : 'linear-gradient(135deg, #1E1B4B, #312E81)',
        boxShadow: theme === 'dark'
          ? '0 6px 24px rgba(245,158,11,0.35)'
          : '0 6px 24px rgba(30,27,75,0.35)',
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        /* Moon icon */
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:rotate-[-20deg]">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      ) : (
        /* Sun icon */
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:rotate-45">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
    </button>
  )
}
