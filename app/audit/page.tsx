'use client'

import { useState } from 'react'
import Image from 'next/image'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'

export default function AuditPage() {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !website) return
    setStatus('submitting')
    try {
      await addDoc(collection(db, 'audit-leads'), {
        email,
        website,
        source: 'audit-landing-page',
        createdAt: serverTimestamp()
      })
      setStatus('success')
      setEmail('')
      setWebsite('')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen pt-28 pb-24 mesh-gradient-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedSection>
            <SectionLabel>Free Website Audit</SectionLabel>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-[#0E0E2C]">
              Is your website <span className="text-gradient-purple">costing you</span> clients?
            </h1>
            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-8">
              Get a comprehensive analysis of your website&apos;s performance, SEO, mobile-friendliness, and security. We&apos;ll show you exactly what&apos;s working and what needs fixing to boost your conversions.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                'Performance & Page Speed (Core Web Vitals)',
                'Technical SEO & Google Indexing Check',
                'Mobile Responsiveness & UI/UX Audit',
                'Security Basics & Conversion Bottlenecks'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#0E0E2C] font-semibold text-sm sm:text-base">
                  <div className="w-6 h-6 rounded-full bg-[#1E3AE0]/10 flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1E3AE0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection delay={100} className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-surface-border relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-[#1E3AE0]/10 to-[#2EC4C4]/10 rounded-full blur-3xl -z-10" />
            
            <h3 className="text-2xl font-bold mb-2 text-[#0E0E2C]">Claim Your Free Audit</h3>
            <p className="text-ink-secondary mb-8 text-sm">Enter your details below. We&apos;ll analyze your site and send a detailed report within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">Website URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://yourcompany.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-surface-border bg-[#FAFAFE] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3AE0]/30 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-surface-border bg-[#FAFAFE] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3AE0]/30 transition-all text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 rounded-xl text-white font-bold text-sm shadow-lg hover:scale-[1.02] transition-transform duration-200"
                style={{ background: 'linear-gradient(135deg, #1E3AE0 0%, #2EC4C4 100%)' }}
              >
                {status === 'submitting' ? 'Analyzing Website...' : 'Get Free Website Audit Report →'}
              </button>

              {status === 'success' && (
                <p className="text-sm font-semibold text-emerald-600 text-center mt-3">
                  ✓ Audit request received! Check your email inbox within 24 hours.
                </p>
              )}
            </form>
          </AnimatedSection>
        </div>

        {/* Visual Benchmark Dashboard Feature Card */}
        <AnimatedSection delay={200}>
          <div className="relative rounded-3xl overflow-hidden bg-[#080B1E] border border-white/10 p-8 sm:p-12 text-white shadow-2xl">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6 space-y-4">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#2EC4C4] border border-white/10">
                  ✦ Real Benchmark Auditing
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  We Audit 4 Essential Growth Pillars
                </h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                  Our comprehensive audit analyzes Core Web Vitals, speed bottlenecks, mobile layout bugs, schema structured data, and security SSL configurations.
                </p>
              </div>

              <div className="md:col-span-6">
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-white/15 shadow-xl group">
                  <Image
                    src="/images/audit-dashboard.png"
                    alt="PrimeSoul website speed and audit performance dashboard"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B1E]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Performance Score</span>
                    <span className="text-xs font-extrabold text-[#00C9A7]">100/100 Core Web Vitals</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  )
}
