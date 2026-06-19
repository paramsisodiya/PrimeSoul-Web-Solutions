'use client'

import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'

export default function AuditPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('submitting')
    try {
      await addDoc(collection(db, 'audit-leads'), {
        email,
        source: 'audit-landing-page',
        createdAt: serverTimestamp()
      })
      setStatus('success')
      setEmail('')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen pt-32 pb-24 mesh-gradient-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <SectionLabel>Free Website Audit</SectionLabel>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0E0E2C] tracking-tight mb-6">
              Is your website <span className="text-gradient-purple">costing you</span> clients?
            </h1>
            <p className="text-lg text-[#4A4A6A] leading-relaxed mb-8">
              Get a comprehensive analysis of your website's performance, SEO, mobile-friendliness, and security. We'll show you exactly what's working and what needs fixing to boost your conversions.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                'Performance & Page Speed Analysis',
                'Technical SEO & Visibility Check',
                'Mobile Responsiveness Audit',
                'Security Basics & Best Practices'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#0E0E2C] font-medium">
                  <div className="w-6 h-6 rounded-full bg-[#7B2FF2]/10 flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7B2FF2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection delay={100} className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-white/20 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-[#7B2FF2]/10 to-[#E879F9]/10 rounded-full blur-3xl -z-10" />
            
            <h3 className="text-2xl font-bold text-[#0E0E2C] mb-2">Claim Your Free Audit</h3>
            <p className="text-[#4A4A6A] mb-8">Enter your email below. We'll analyze your site and send you a detailed report within 24 hours.</p>

            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-[#0E0E2C] mb-2">You're on the list!</h4>
                <p className="text-[#4A4A6A]">Keep an eye on your inbox. We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#0E0E2C] mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F8F8FC] border border-[#E5E5F0] rounded-xl px-4 py-3.5 text-[#0E0E2C] placeholder-[#A0A0B8] focus:outline-none focus:border-[#7B2FF2] focus:ring-1 focus:ring-[#7B2FF2] transition-all"
                    placeholder="you@company.com"
                  />
                </div>
                
                {status === 'error' && (
                  <p className="text-red-500 text-sm">There was an error. Please try again.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-px disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                  style={{
                    background: 'linear-gradient(135deg, #7B2FF2 0%, #A855F7 100%)',
                    boxShadow: '0 12px 32px -12px rgba(123,47,242,0.5)'
                  }}
                >
                  {status === 'submitting' ? 'Processing...' : 'Get My Free Audit'}
                </button>
                <p className="text-xs text-center text-[#A0A0B8] mt-4">100% Free. No commitment required.</p>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </main>
  )
}
