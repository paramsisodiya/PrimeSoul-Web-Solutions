'use client'

import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { sendWebhookNotification } from '@/lib/webhooks'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import BookingWidget from '@/components/shared/BookingWidget'

const services = [
  'Website Design & Development',
  'E-Commerce Development',
  'Landing Page Design',
  'UI/UX Design',
  'SEO Optimization',
  'Website Redesign',
  'Web Application',
  'Other',
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: services[0], message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      // Save lead to Firebase Firestore
      await addDoc(collection(db, 'leads'), {
        ...form,
        status: 'new',
        notes: '',
        createdAt: serverTimestamp(),
      })

      // Send email via EmailJS
      const emailjsPayload = {
        service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        template_params: {
          name: form.name,
          email: form.email,
          phone: form.phone || 'Not provided',
          service: form.service,
          message: form.message,
        },
      }

      const emailRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailjsPayload),
      })

      if (!emailRes.ok) throw new Error('Email failed')

      // Send auto-reply confirmation to client (fire-and-forget)
      try {
        const autoReplyTemplateId = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID
        if (autoReplyTemplateId) {
          await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
              template_id: autoReplyTemplateId,
              user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
              template_params: {
                to_name: form.name,
                to_email: form.email,
                service: form.service,
              },
            }),
          })
        }
      } catch {
        // Auto-reply failure should not block main submission
      }

      // Send webhook notifications (Slack/Discord) — fire-and-forget
      sendWebhookNotification(form).catch(() => {})

      setStatus('success')
      setForm({ name: '', email: '', phone: '', service: services[0], message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-[#FAFAFE]">

      {/* Hero */}
      <section className="bg-[#0E0E2C] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7B2FF2] opacity-10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#E879F9] opacity-10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <AnimatedSection>
            <div className="flex justify-center mb-4">
              <SectionLabel text="GET IN TOUCH" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Let&apos;s Build Something{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B2FF2] to-[#E879F9]">
                Extraordinary
              </span>
            </h1>
            <p className="text-[#7A7A9E] text-lg max-w-2xl mx-auto">
              Have a project in mind? Tell us about it. We respond within 24 hours.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Info */}
            <AnimatedSection direction="left" className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#0E0E2C] mb-2">Contact Information</h2>
                <p className="text-[#7A7A9E] text-sm">Based in Rajgarh, MP — working with clients across India and globally.</p>
              </div>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'Email', value: 'paramsisodiya061@gmail.com', href: 'mailto:paramsisodiya061@gmail.com' },
                  { icon: Phone, label: 'WhatsApp', value: 'Available on request', href: 'https://wa.me/91' },
                  { icon: MapPin, label: 'Location', value: 'Rajgarh, Madhya Pradesh, India', href: null },
                ].map(item => {
                  const Icon = item.icon
                  const content = (
                    <div className="flex items-start gap-4 p-4 bg-white border border-[#E8E5F5] rounded-2xl hover:border-[#7B2FF2]/30 hover:shadow-md transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7B2FF2]/10 to-[#E879F9]/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-[#7B2FF2]" />
                      </div>
                      <div>
                        <p className="text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider">{item.label}</p>
                        <p className="text-[#0E0E2C] text-sm font-medium mt-0.5 group-hover:text-[#7B2FF2] transition-colors">{item.value}</p>
                      </div>
                    </div>
                  )
                  return item.href
                    ? <a key={item.label} href={item.href} target="_blank">{content}</a>
                    : <div key={item.label}>{content}</div>
                })}
              </div>
              <div className="p-5 bg-gradient-to-br from-[#7B2FF2]/5 to-[#E879F9]/5 border border-[#7B2FF2]/20 rounded-2xl">
                <p className="text-[#7B2FF2] font-semibold text-sm mb-1">⚡ Fast Response</p>
                <p className="text-[#7A7A9E] text-sm">We typically respond within 2-4 hours during business hours.</p>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection direction="right" className="lg:col-span-3">
              <div className="bg-white border border-[#E8E5F5] rounded-3xl p-8 shadow-xl shadow-[#7B2FF2]/5">
                {status === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green-500" />
                    </div>
                    <h3 className="text-[#0E0E2C] text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-[#7A7A9E] text-sm mb-6">Thank you for reaching out! We&apos;ll get back to you within 24 hours.</p>
                    <button onClick={() => setStatus('idle')} className="bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-all">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="text-[#0E0E2C] text-xl font-bold mb-6">Tell Us About Your Project</h3>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Your Name *</label>
                        <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Param Sisodiya" className="w-full border border-[#E8E5F5] rounded-xl px-4 py-3 text-[#0E0E2C] text-sm placeholder-[#C0BBDC] focus:outline-none focus:border-[#7B2FF2] focus:ring-1 focus:ring-[#7B2FF2] transition-all" />
                      </div>
                      <div>
                        <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Email Address *</label>
                        <input required type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" className="w-full border border-[#E8E5F5] rounded-xl px-4 py-3 text-[#0E0E2C] text-sm placeholder-[#C0BBDC] focus:outline-none focus:border-[#7B2FF2] focus:ring-1 focus:ring-[#7B2FF2] transition-all" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Phone Number</label>
                        <input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+91 XXXXX XXXXX" className="w-full border border-[#E8E5F5] rounded-xl px-4 py-3 text-[#0E0E2C] text-sm placeholder-[#C0BBDC] focus:outline-none focus:border-[#7B2FF2] focus:ring-1 focus:ring-[#7B2FF2] transition-all" />
                      </div>
                      <div>
                        <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Service Required *</label>
                        <select required value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))} className="w-full border border-[#E8E5F5] rounded-xl px-4 py-3 text-[#0E0E2C] text-sm focus:outline-none focus:border-[#7B2FF2] focus:ring-1 focus:ring-[#7B2FF2] transition-all">
                          {services.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Project Details *</label>
                      <textarea required value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Tell us about your project, goals, timeline, and budget..." rows={5} className="w-full border border-[#E8E5F5] rounded-xl px-4 py-3 text-[#0E0E2C] text-sm placeholder-[#C0BBDC] focus:outline-none focus:border-[#7B2FF2] focus:ring-1 focus:ring-[#7B2FF2] transition-all resize-none" />
                    </div>
                    {status === 'error' && (
                      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
                        <p className="text-red-600 text-sm">Something went wrong. Please try again or contact us via WhatsApp.</p>
                      </div>
                    )}
                    <button type="submit" disabled={status === 'sending'} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white font-semibold py-4 rounded-xl hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[#7B2FF2]/30 text-sm">
                      {status === 'sending' ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                      ) : (
                        <><Send size={16} />Send Message<ArrowRight size={16} /></>
                      )}
                    </button>
                    <p className="text-center text-[#7A7A9E] text-xs">By submitting, you agree to our privacy policy. We never spam.</p>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <SectionLabel>Book a Call</SectionLabel>
              <h2 className="text-3xl font-bold text-[#0E0E2C] mb-4">
                Prefer a Live Conversation?
              </h2>
              <p className="text-[#7A7A9E] mb-6">
                Skip the form and jump straight to a free strategy session. We&apos;ll discuss your goals, timeline, and budget — and give you actionable advice, even if you don&apos;t hire us.
              </p>
              <div className="space-y-3">
                {['No sales pressure — just honest advice', 'Get a roadmap for your project', 'Learn about pricing and timelines'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#7B2FF2]/10 flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="#7B2FF2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-sm text-[#4A4A6A]">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <BookingWidget />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  )
}
