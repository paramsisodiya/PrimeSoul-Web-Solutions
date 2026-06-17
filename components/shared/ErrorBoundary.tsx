'use client'

import React from 'react'
import Link from 'next/link'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md mx-auto">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{
                background: 'linear-gradient(135deg, rgba(239,68,68,0.1), rgba(239,68,68,0.05))',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h2 className="text-xl font-extrabold text-ink mb-2 tracking-[-0.02em]">
              Something went wrong
            </h2>
            <p className="text-sm text-ink-secondary mb-6 leading-relaxed">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: undefined })
                  window.location.reload()
                }}
                className="btn-tap px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-px"
                style={{
                  background: 'linear-gradient(135deg, #7B2FF2 0%, #A855F7 100%)',
                  boxShadow: '0 8px 24px -8px rgba(123,47,242,0.40)',
                }}
              >
                Refresh Page
              </button>
              <Link
                href="/"
                className="px-6 py-3 rounded-full text-sm font-semibold text-ink border border-surface-border bg-white hover:bg-surface-subtle transition-all"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
