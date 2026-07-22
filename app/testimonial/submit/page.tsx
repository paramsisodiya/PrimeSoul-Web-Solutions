'use client'

import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function TestimonialSubmitPage() {
  const [form, setForm] = useState({ name: '', company: '', rating: 5, testimonial: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.testimonial.trim().length < 20) {
      alert('Please write at least 20 characters for your testimonial.')
      return
    }
    setStatus('submitting')
    try {
      await addDoc(collection(db, 'testimonial_requests'), {
        name: form.name.trim(),
        company: form.company.trim(),
        rating: form.rating,
        testimonial: form.testimonial.trim(),
        submittedAt: serverTimestamp(),
        approved: false,
      })
      setStatus('success')
    } catch (err) {
      console.error('Testimonial submission failed:', err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <main className="min-h-screen bg-[#FAFAFE] pt-32 pb-20 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-green-500">
            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-[#0E0E2C] mb-4">Thank You!</h1>
        <p className="text-lg text-[#4A4A6A] max-w-md">
          Your testimonial has been submitted and will be reviewed by our team.
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FAFAFE] pt-32 pb-20 px-6">
      <AnimatedSection className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-[#0E0E2C] mb-4">
            Share Your Experience
          </h1>
          <p className="text-[#4A4A6A]">
            We&apos;d love to hear about your experience working with PrimeSoul Web Solutions.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-[#7B2FF2]/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Star Rating */}
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setForm(p => ({ ...p, rating: star }))}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill={star <= form.rating ? '#F59E0B' : 'none'} stroke={star <= form.rating ? '#F59E0B' : '#CBD5E1'} strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4A6A] mb-2">Your Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[#0E0E2C] text-sm focus:border-[#7B2FF2] focus:ring-1 focus:ring-[#7B2FF2] outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4A6A] mb-2">Company / Business <span className="text-[#AEAEC8]">(optional)</span></label>
                <input
                  value={form.company}
                  onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[#0E0E2C] text-sm focus:border-[#7B2FF2] focus:ring-1 focus:ring-[#7B2FF2] outline-none transition-all"
                  placeholder="ABC Corp"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4A6A] mb-2">Your Testimonial *</label>
              <textarea
                required
                rows={5}
                minLength={20}
                value={form.testimonial}
                onChange={e => setForm(p => ({ ...p, testimonial: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[#0E0E2C] text-sm focus:border-[#7B2FF2] focus:ring-1 focus:ring-[#7B2FF2] outline-none transition-all resize-none"
                placeholder="What was it like working with us? What results did you see? (min 20 characters)"
              />
              <p className="text-xs text-[#AEAEC8] mt-1">{form.testimonial.length}/20 characters minimum</p>
            </div>

            {status === 'error' && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-gradient-to-r from-[#7B2FF2] to-[#E879F9] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Testimonial'}
            </button>
          </form>
        </div>
      </AnimatedSection>
    </main>
  )
}
