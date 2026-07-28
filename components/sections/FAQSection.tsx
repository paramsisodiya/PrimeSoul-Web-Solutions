'use client'

import { useState, useEffect } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Search, HelpCircle } from 'lucide-react'
import WebsiteSpeedChecker from '@/components/ui/WebsiteSpeedChecker'

interface FAQ {
  id: string
  question: string
  answer: string
  order?: number
  visible?: boolean
  category?: string
}

const FALLBACK_FAQS: FAQ[] = [
  {
    id: '1',
    question: 'How fast can PrimeSoul deliver my website or web app?',
    answer: 'Most custom websites and business web applications are delivered live within 1 to 2 weeks! Complex SaaS platforms or multi-tenant portals typically take 3 to 4 weeks.',
  },
  {
    id: '2',
    question: 'What technologies do you use to build websites?',
    answer: 'We build with Next.js 14, React, TypeScript, Tailwind CSS, and Firebase/Supabase. This guarantees 100/100 Core Web Vitals speed, top Google SEO indexing, and enterprise security.',
  },
  {
    id: '3',
    question: 'Do you provide ongoing support after project launch?',
    answer: 'Yes! Every project includes dedicated post-launch support, security monitoring, performance maintenance, and content updates.',
  },
  {
    id: '4',
    question: 'How much does a custom website cost with PrimeSoul?',
    answer: 'Our pricing is 100% transparent with zero hidden costs. Starter business websites start from ₹14,999, with tailored quotes based on your exact feature requirements.',
  },
  {
    id: '5',
    question: 'Can you redesign my existing slow or outdated website?',
    answer: 'Absolutely! We specialize in migrating slow WordPress or legacy sites to modern Next.js 14 platforms, boosting speed from 30/100 to 100/100 and driving more lead conversions.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [faqs, setFaqs] = useState<FAQ[]>(FALLBACK_FAQS)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'faqs'), where('visible', '==', true)))
        if (!snap.empty) {
          const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as FAQ))
          setFaqs(data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)))
        }
      } catch (err) {
        console.error('Error fetching FAQs:', err)
      }
    }
    fetchFaqs()
  }, [])

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: '#FAFAFE' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-10 sm:mb-12">
          <SectionLabel>Common Questions</SectionLabel>
          <h2 className="text-[1.6rem] sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em] mb-4 text-ink">
            Frequently Asked <span className="text-gradient-purple font-display italic">Questions</span>
          </h2>
          <p className="text-base text-ink-secondary max-w-lg mx-auto mb-8">
            Instant answers to help you start your digital transformation with PrimeSoul.
          </p>

          {/* Website Speed & Health Audit Lead Magnet Tool */}
          <WebsiteSpeedChecker />

          {/* Instant Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. pricing, timeline, speed)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-md text-xs sm:text-sm text-[#0E0E2C] focus:outline-none focus:border-[#7B2FF2] transition-all font-medium"
            />
          </div>
        </AnimatedSection>

        {/* FAQ Cards Accordion */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <AnimatedSection key={faq.id || i} delay={i * 40}>
                  <div
                    className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'bg-white/90 backdrop-blur-xl border border-[#7B2FF2]/20 shadow-lg'
                        : 'bg-white/70 backdrop-blur-md border border-white/60 hover:bg-white/90'
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left group"
                    >
                      <span
                        className={`text-sm sm:text-base font-bold pr-4 transition-colors ${
                          isOpen ? 'text-[#7B2FF2]' : 'text-[#0E0E2C]'
                        }`}
                      >
                        {faq.question}
                      </span>
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isOpen ? 'bg-[#7B2FF2] text-white rotate-45' : 'bg-[#7B2FF2]/10 text-[#7B2FF2]'
                        }`}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M7 3v8M3 7h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                    </button>

                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{
                        maxHeight: isOpen ? '300px' : '0px',
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-ink-secondary leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })
          ) : (
            <div className="text-center py-10 text-ink-muted text-sm flex flex-col items-center gap-2">
              <HelpCircle size={32} className="text-[#7B2FF2]/40" />
              <p>No questions matched &quot;{searchQuery}&quot;.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-[#7B2FF2] underline mt-1"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  )
}
