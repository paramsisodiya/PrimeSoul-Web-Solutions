'use client'

import { useState, useEffect } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface FAQ {
  id: string
  question: string
  answer: string
  order?: number
  visible?: boolean
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [faqs, setFaqs] = useState<FAQ[]>([])

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'faqs'), where('visible', '==', true)))
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as FAQ))
        setFaqs(data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)))
      } catch (err) {
        console.error('Error fetching FAQs:', err)
        setFaqs([])
      }
    }
    fetchFaqs()
  }, [])

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: '#FAFAFE' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <SectionLabel>Common Questions</SectionLabel>
          <h2
            className="text-[1.6rem] sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em] mb-4"
            style={{ color: '#0E0E2C' }}
          >
            Frequently Asked{' '}
            <span className="text-gradient-purple font-display italic">Questions</span>
          </h2>
          <p className="text-base text-ink-secondary max-w-lg mx-auto">
            Everything you need to know before starting your project with PrimeSoul.
          </p>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <AnimatedSection key={faq.id} delay={i * 50}>
                <div
                  className="rounded-2xl transition-all duration-300 overflow-hidden"
                  style={{
                    background: isOpen ? '#FFFFFF' : 'transparent',
                    border: `1px solid ${isOpen ? 'rgba(123,47,242,0.12)' : '#E8E5F5'}`,
                    boxShadow: isOpen ? '0 8px 32px -8px rgba(123,47,242,0.08)' : 'none',
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left group"
                  >
                    <span
                      className="text-sm sm:text-base font-semibold pr-4 transition-colors"
                      style={{
                        color: isOpen ? '#7B2FF2' : '#0E0E2C',
                      }}
                    >
                      {faq.question}
                    </span>
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: isOpen ? 'linear-gradient(135deg, #7B2FF2, #A855F7)' : 'rgba(123,47,242,0.06)',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 3v8M3 7h8" stroke={isOpen ? '#fff' : '#7B2FF2'} strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-400 ease-in-out"
                    style={{
                      maxHeight: isOpen ? '300px' : '0px',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-ink-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>

      {/* FAQ Schema for Google */}
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
