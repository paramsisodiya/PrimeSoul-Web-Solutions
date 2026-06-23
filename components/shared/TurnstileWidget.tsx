'use client'

import { useEffect, useRef, useCallback } from 'react'

interface TurnstileWidgetProps {
  onToken: (token: string) => void
  onExpire?: () => void
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
    onTurnstileLoad?: () => void
  }
}

export default function TurnstileWidget({ onToken, onExpire }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const scriptLoadedRef = useRef(false)

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || !siteKey) return
    if (widgetIdRef.current) return // Already rendered

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token: string) => onToken(token),
      'expired-callback': () => onExpire?.(),
      theme: 'auto',
      size: 'flexible',
    })
  }, [siteKey, onToken, onExpire])

  useEffect(() => {
    if (!siteKey) return

    // If turnstile is already loaded, render immediately
    if (window.turnstile) {
      renderWidget()
      return
    }

    // Load the script if not already loading
    if (!scriptLoadedRef.current) {
      scriptLoadedRef.current = true
      window.onTurnstileLoad = () => renderWidget()

      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad'
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {
          // Widget may already be removed
        }
        widgetIdRef.current = null
      }
    }
  }, [siteKey, renderWidget])

  if (!siteKey) return null

  return <div ref={containerRef} className="mt-2" />
}
