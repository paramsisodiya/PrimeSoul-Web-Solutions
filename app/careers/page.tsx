'use client'

import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    portfolio: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      await addDoc(collection(db, 'job_applications'), {
        ...formData,
        createdAt: serverTimestamp()
      })
      setStatus('success')
      setFormData({ name: '', role: '', portfolio: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen pt-32 pb-24 mesh-gradient-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>Join Our Team</SectionLabel>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0E0E2C] tracking-tight mb-6">
            Careers at <span className="text-gradient-purple">PrimeSoul</span>
          </h1>
          <p className="text-lg text-[#4A4A6A] leading-relaxed max-w-2xl mx-auto">
            We are a small, passionate agency looking for freelancers and interns who care about modern web design and performance.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100} className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-white/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#7B2FF2]/5 to-[#E879F9]/5 rounded-full blur-3xl -z-10" />
          
          <div className="max-w-2xl mx-auto">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#0E0E2C] mb-4">Application Received!</h3>
                <p className="text-[#4A4A6A]">Thank you for your interest. We'll review your application and get back to you soon.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-[#7B2FF2] font-semibold hover:underline"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#0E0E2C] mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#F8F8FC] border border-[#E5E5F0] rounded-xl px-4 py-3.5 text-[#0E0E2C] placeholder-[#A0A0B8] focus:outline-none focus:border-[#7B2FF2] focus:ring-1 focus:ring-[#7B2FF2] transition-all"
                    placeholder="Jane Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-semibold text-[#0E0E2C] mb-2">Desired Role</label>
                  <input
                    type="text"
                    id="role"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-[#F8F8FC] border border-[#E5E5F0] rounded-xl px-4 py-3.5 text-[#0E0E2C] placeholder-[#A0A0B8] focus:outline-none focus:border-[#7B2FF2] focus:ring-1 focus:ring-[#7B2FF2] transition-all"
                    placeholder="e.g. Frontend Intern, Freelance UI Designer"
                  />
                </div>
                
                <div>
                  <label htmlFor="portfolio" className="block text-sm font-semibold text-[#0E0E2C] mb-2">Portfolio / LinkedIn Link</label>
                  <input
                    type="url"
                    id="portfolio"
                    required
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    className="w-full bg-[#F8F8FC] border border-[#E5E5F0] rounded-xl px-4 py-3.5 text-[#0E0E2C] placeholder-[#A0A0B8] focus:outline-none focus:border-[#7B2FF2] focus:ring-1 focus:ring-[#7B2FF2] transition-all"
                    placeholder="https://..."
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#0E0E2C] mb-2">Why do you want to join us?</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#F8F8FC] border border-[#E5E5F0] rounded-xl px-4 py-3.5 text-[#0E0E2C] placeholder-[#A0A0B8] focus:outline-none focus:border-[#7B2FF2] focus:ring-1 focus:ring-[#7B2FF2] transition-all resize-none"
                    placeholder="Tell us a bit about your experience..."
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm">There was an error submitting your application. Please try again.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-px disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #7B2FF2 0%, #A855F7 100%)',
                    boxShadow: '0 12px 32px -12px rgba(123,47,242,0.5)'
                  }}
                >
                  {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </AnimatedSection>
      </div>
    </main>
  )
}
