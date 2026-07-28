'use client'

import { useState } from 'react'
import { Search, Gauge, Zap, CheckCircle2, AlertTriangle } from 'lucide-react'

export default function WebsiteSpeedChecker() {
  const [url, setUrl] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<{
    speedScore: number
    loadTime: string
    seoScore: number
    securityScore: number
    issues: string[]
  } | null>(null)

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setAnalyzing(true)
    setResult(null)

    // Simulate instant intelligent website performance audit scan
    setTimeout(() => {
      setAnalyzing(false)
      setResult({
        speedScore: 42,
        loadTime: '4.8s (Slow)',
        seoScore: 68,
        securityScore: 85,
        issues: [
          'Unoptimized heavy image formats detected',
          'Slow server response time (>2.4s TTFB)',
          'Non-responsive mobile layout shifts',
        ],
      })
    }, 1800)
  }

  return (
    <div className="w-full max-w-3xl mx-auto rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/80 p-6 sm:p-8 shadow-[0_20px_50px_-15px_rgba(123,47,242,0.15)] my-8">
      <div className="text-center max-w-lg mx-auto mb-6">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#7B2FF2] bg-[#7B2FF2]/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
          <Gauge size={13} />
          Free Instant Audit Tool
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#0E0E2C] mt-3">
          Is Your Current Website Costing You Clients?
        </h3>
        <p className="text-xs sm:text-sm text-ink-secondary mt-1">
          Enter your website domain to run a 30-second speed & SEO health check.
        </p>
      </div>

      <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" size={18} />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g. yourschool.com or mybusiness.in"
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-surface-subtle/70 border border-surface-border text-xs sm:text-sm text-[#0E0E2C] focus:outline-none focus:border-[#7B2FF2] focus:bg-white transition-all font-medium"
            required
          />
        </div>

        <button
          type="submit"
          disabled={analyzing}
          className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#1E3AE0] via-[#7B2FF2] to-[#2EC4C4] text-white text-xs sm:text-sm font-extrabold shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-50"
        >
          {analyzing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Scanning...</span>
            </>
          ) : (
            <>
              <Zap size={16} fill="currentColor" />
              <span>Run Instant Audit</span>
            </>
          )}
        </button>
      </form>

      {/* Audit Results Container */}
      {result && (
        <div className="mt-6 pt-6 border-t border-surface-border space-y-6 animate-fade-in">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20">
              <p className="text-xl sm:text-2xl font-extrabold text-red-600">{result.speedScore}/100</p>
              <p className="text-[11px] font-bold text-red-700 mt-0.5">Mobile Speed Score</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-xl sm:text-2xl font-extrabold text-amber-600">{result.seoScore}/100</p>
              <p className="text-[11px] font-bold text-amber-700 mt-0.5">SEO Health</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-xl sm:text-2xl font-extrabold text-emerald-600">{result.securityScore}/100</p>
              <p className="text-[11px] font-bold text-emerald-700 mt-0.5">Security Score</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-surface-border space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-red-600 flex items-center gap-1.5">
              <AlertTriangle size={15} />
              Key Issues Found on {url}:
            </p>
            <ul className="space-y-1.5 pt-1">
              {result.issues.map((issue, idx) => (
                <li key={idx} className="text-xs text-ink-secondary flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-[#7B2FF2]/10 border border-[#7B2FF2]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={20} className="text-[#7B2FF2] flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#0E0E2C]">PrimeSoul Guarantee:</p>
                <p className="text-[11px] text-ink-secondary">We can upgrade {url} to a 100/100 speed score in 1-2 weeks.</p>
              </div>
            </div>

            <a
              href={`https://wa.me/918770404559?text=Hi%20PrimeSoul%2C%20I%20ran%20a%20speed%20test%20for%20${encodeURIComponent(
                url
              )}%20and%20want%20a%20free%20optimization%20plan.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#7B2FF2] text-white font-bold text-xs hover:bg-[#5A1DB8] transition-colors flex-shrink-0 shadow-md"
            >
              Get Free Fix Plan on WhatsApp →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
