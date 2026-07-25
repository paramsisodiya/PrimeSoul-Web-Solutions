'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: number
  text: string
  sender: 'bot' | 'user'
  options?: string[]
}

interface QAItem {
  id: string
  triggers: string[]
  reply: string
  options?: string[]
}

const BOT_NAME = 'PrimeSoul AI'

const STOP_WORDS = new Set([
  'kya', 'hai', 'mera', 'mujhe', 'please', 'batao', 'the', 'is', 'what', 'how', 'do', 'you',
  'a', 'an', 'of', 'in', 'to', 'for', 'with', 'on', 'at', 'by', 'from', 'and', 'or', 'ka',
  'ki', 'ke', 'ko', 'par', 'se', 'mein', 'me', 'hum', 'aap', 'aur', 'tell', 'about', 'can',
  'give', 'i', 'want', 'need', 'bata', 'de', 'bhai', 'sir', 'are', 'your', 'my', 'we',
  'hoge', 'hoga', 'ho', 'tha', 'thi', 'the', 'kar', 'karo', 'karein', 'karta'
])

const QA_DATABASE: QAItem[] = [
  // PRICING & BUDGET
  {
    id: 'pricing',
    triggers: [
      'price kya hai', 'pricing', 'kitna paisa lagega', 'cost kya hai', 'fees', 'charges',
      'rate', 'budget', 'price', 'cost', 'paisa', 'kitne paise', 'paise', 'ratecard',
      'package', 'packages', 'kitna lagega', 'kitne me banega'
    ],
    reply: 'Hamare packages ₹5,000 se shuru hote hain. Website design: ₹5K-25K, Full-stack web app: ₹25K-1L+, Meta Ads setup: ₹3K-10K/month, Social Media Management: ₹5K-15K/month, Graphic Design: ₹500/design se. Exact quote ke liye contact karein — har project alag hota hai!',
    options: ['🛠️ Services', '📞 Contact', '📁 Portfolio']
  },
  {
    id: 'payment_mode',
    triggers: [
      'payment kaise kare', 'payment mode', 'upi', 'advance', 'payment', 'pay',
      'bank transfer', 'cash', 'gpay', 'phonepe', 'paytm'
    ],
    reply: 'Hum UPI, bank transfer, aur cash accept karte hain. Zyaadatar projects mein 50% advance aur 50% delivery par lete hain.',
    options: ['💰 Pricing', '📞 Contact']
  },
  {
    id: 'emi',
    triggers: [
      'emi', 'installment', 'kist', 'kisht', 'part payment', 'installment option', 'monthly payment'
    ],
    reply: 'Bade projects (₹25K+) par hum flexible payment plan offer kar sakte hain. Baat karte hain — WhatsApp karein: 8770404559',
    options: ['📞 Contact', '💰 Pricing']
  },

  // SERVICES
  {
    id: 'services',
    triggers: [
      'kya kya karte ho', 'services kya hai', 'kya offer karte ho', 'what services',
      'services', 'service', 'kya kaam karte ho', 'kaam', 'all services'
    ],
    reply: 'Hum ye services offer karte hain:\n✅ Website Design & Development\n✅ Full-Stack Web Applications\n✅ Meta Ads (Facebook/Instagram)\n✅ Google Business Profile Setup\n✅ Social Media Management\n✅ Graphic Design\n✅ SEO & Performance\n✅ Brand Identity\n\nKaunsi service chahiye?',
    options: ['💰 Pricing', '⏱️ Timeline', '📁 Portfolio', '📞 Contact']
  },
  {
    id: 'website_dev',
    triggers: [
      'website banate ho', 'website design', 'web development', 'website', 'web design',
      'site banwana', 'landing page', 'ecommerce website', 'online store', 'web app'
    ],
    reply: 'Haan! Hum professional websites banate hain — business websites, school/college websites, portfolio, e-commerce, aur full-stack web apps. Starting ₹5,000 se. Details ke liye contact karein!',
    options: ['💰 Pricing', '📁 Portfolio', '📞 Contact']
  },
  {
    id: 'meta_ads',
    triggers: [
      'meta ads', 'facebook ads', 'instagram ads', 'digital marketing', 'ads chalana',
      'ads', 'ad campaign', 'fb ads', 'insta ads', 'marketing'
    ],
    reply: 'Haan! Hum Facebook aur Instagram par ad campaigns setup aur manage karte hain. Lead generation, brand awareness, product promotion — sab karte hain. Starting ₹3,000/month. Baat karein?',
    options: ['💰 Pricing', '📞 Contact']
  },
  {
    id: 'google_business',
    triggers: [
      'google business', 'gbp', 'google map', 'google pe dikhna', 'google maps',
      'gmb', 'local business listing', 'map listing', 'google search'
    ],
    reply: 'Hum aapka Google Business Profile setup aur optimize karte hain taaki aap Google Maps aur local search mein top par aao. One-time setup ₹1,500-3,000.',
    options: ['💰 Pricing', '📞 Contact']
  },
  {
    id: 'social_media',
    triggers: [
      'social media', 'instagram manage', 'facebook page', 'content posting', 'smm',
      'social media management', 'page manage', 'reels', 'insta page'
    ],
    reply: 'Hum aapke Facebook aur Instagram ko professionally manage karte hain — regular posts, festival creatives, event posts, reels ideas. Starting ₹5,000/month.',
    options: ['💰 Pricing', '📞 Contact']
  },
  {
    id: 'graphic_design',
    triggers: [
      'graphic design', 'logo', 'banner', 'poster', 'creative', 'graphics',
      'designing', 'brochure', 'visiting card', 'flyer'
    ],
    reply: 'Hum banners, posters, social media creatives, logos, aur branding design karte hain. Per design ₹500 se shuru. Bulk orders par discount milta hai!',
    options: ['💰 Pricing', '📁 Portfolio', '📞 Contact']
  },
  {
    id: 'seo',
    triggers: [
      'seo', 'google ranking', 'search engine', 'website rank', 'google search ranking',
      'seo package', 'rank website'
    ],
    reply: 'Hum SEO karke aapki website ko Google par rank karate hain — on-page SEO, local SEO, performance optimization. Package ₹3,000/month se shuru.',
    options: ['💰 Pricing', '📞 Contact']
  },
  {
    id: 'mobile_app',
    triggers: [
      'app banana', 'mobile app', 'android app', 'ios app', 'apk', 'play store app', 'app development'
    ],
    reply: 'Hum abhi web applications banate hain jo mobile par bhi perfectly kaam karti hain (PWA). Native Android/iOS app development abhi available nahi hai. Web app se kaam chalega?',
    options: ['🛠️ Services', '📞 Contact']
  },

  // TIMELINE
  {
    id: 'timeline',
    triggers: [
      'kitne din lagenge', 'time kitna lagega', 'kab ready hoga', 'deadline', 'timeline',
      'time', 'duration', 'kitna time', 'delivery time', 'kitne din'
    ],
    reply: 'Timeline project ke size par depend karti hai:\n• Simple website: 3-7 din\n• Business website: 1-2 hafta\n• Full-stack web app: 3-6 hafta\n• Graphic design: 1-3 din\n\nRush delivery bhi possible hai!',
    options: ['💰 Pricing', '📞 Contact']
  },

  // PROCESS
  {
    id: 'process',
    triggers: [
      'kaise kaam karte ho', 'process kya hai', 'kaise shuru kare', 'steps', 'workflow',
      'procedure', 'how it works'
    ],
    reply: 'Hamara process:\n1️⃣ Free consultation call\n2️⃣ Requirement samjhna\n3️⃣ Proposal & quote\n4️⃣ Design approval\n5️⃣ Development\n6️⃣ Testing\n7️⃣ Launch!\n\nSimple aur transparent.',
    options: ['⏱️ Timeline', '📞 Contact']
  },
  {
    id: 'free_consultation',
    triggers: [
      'free consultation', 'call karna', 'baat karni hai', 'meeting', 'consultation',
      'strategy call', 'book call', 'schedule call'
    ],
    reply: 'Bilkul! Free strategy call book karein: calendly.com/paramsisodiya061/30min — Ya WhatsApp karein: 8770404559',
    options: ['📞 Contact', '💬 Open WhatsApp']
  },

  // PORTFOLIO & TRUST
  {
    id: 'portfolio',
    triggers: [
      'portfolio', 'kaam dekha hai', 'previous work', 'example', 'past projects',
      'sample', 'demo', 'work show'
    ],
    reply: 'Hamare kuch projects:\n🏫 SVNS School Khilchipur\n☀️ A&S Solar Solutions\n📰 MP Darpan E-News Portal\n🎓 Sankalp Shikhar Academy\n\nPoora portfolio dekhein: primesoul.tech/portfolio',
    options: ['🌐 Open Portfolio Page', '💰 Pricing', '📞 Contact']
  },
  {
    id: 'client_reviews',
    triggers: [
      'client', 'customers', 'kitne clients', 'reviews', 'testimonials', 'ratings',
      'feedback', 'satisfied clients'
    ],
    reply: 'Humne 35+ businesses ke saath kaam kiya hai — schools, solar companies, local businesses, startups. 100% client satisfaction! Testimonials dekhein: primesoul.tech/#testimonials',
    options: ['📁 Portfolio', '📞 Contact']
  },
  {
    id: 'trust',
    triggers: [
      'trusted', 'genuine', 'fraud to nahi', 'real company', 'trust', 'legit', 'safe',
      'is it real', 'fake to nahi'
    ],
    reply: "Bilkul genuine hain! Hum Rajgarh, MP mein based hain. 3+ saal ka experience, 35+ projects, real clients. Google par 'PrimeSoul Web Solutions' search karein ya call karein: 8770404559",
    options: ['📞 Contact', '📁 Portfolio']
  },

  // CONTACT & LOCATION
  {
    id: 'contact',
    triggers: [
      'contact', 'number', 'phone', 'call', 'reach', 'mobile number', 'phone number',
      'contact number', 'sampark'
    ],
    reply: 'Hum se sampark karein:\n📞 WhatsApp: 8770404559\n📧 Email: paramsisodiya061@gmail.com\n📍 Rajgarh, Madhya Pradesh\n🌐 primesoul.tech/contact',
    options: ['💬 Open WhatsApp', 'Go to Contact Page']
  },
  {
    id: 'whatsapp',
    triggers: [
      'whatsapp', 'message', 'wa me', 'whatsapp chat', 'whatsapp message'
    ],
    reply: 'WhatsApp par message karein: wa.me/918770404559 — Hum 2-4 ghante mein reply karte hain!',
    options: ['💬 Open WhatsApp', '📞 Contact']
  },
  {
    id: 'location',
    triggers: [
      'location', 'address', 'office', 'kahan ho', 'city', 'where located',
      'office address', 'rajgarh', 'mp'
    ],
    reply: 'Hum Rajgarh, Madhya Pradesh mein based hain. Clients ko hum India bhar mein serve karte hain — sab kaam online hota hai!',
    options: ['📞 Contact']
  },
  {
    id: 'email',
    triggers: [
      'email', 'mail', 'gmail', 'email address'
    ],
    reply: 'Email karein: paramsisodiya061@gmail.com — Ya WhatsApp zyada fast hai: 8770404559',
    options: ['💬 Open WhatsApp', '📞 Contact']
  },

  // ABOUT COMPANY
  {
    id: 'about_company',
    triggers: [
      'kaun ho', 'about', 'company', 'primesoul kya hai', 'about us', 'who are you',
      'primesoul', 'about company'
    ],
    reply: 'PrimeSoul Web Solutions ek digital agency hai based in Rajgarh, MP. Hum websites, apps, aur digital marketing services provide karte hain. 3+ saal ka experience, 35+ projects delivered, dedicated team of professionals!',
    options: ['🛠️ Services', '📁 Portfolio', '📞 Contact']
  },
  {
    id: 'founder',
    triggers: [
      'founder', 'owner', 'ceo', 'team', 'param', 'shyam', 'who owns', 'founder name'
    ],
    reply: 'PrimeSoul ki founding Param Sisodiya ne ki thi. Hamare CEO hain Shyam Sisodiya. Hamare paas 8-10 professionals ki dedicated team hai!',
    options: ['📞 Contact', '📁 Portfolio']
  },
  {
    id: 'experience',
    triggers: [
      'experience', 'kitne saal', 'purani company', 'how many years', 'how long'
    ],
    reply: 'Hum 3+ saal se kaam kar rahe hain aur 35+ projects successfully deliver kar chuke hain!',
    options: ['📁 Portfolio', '📞 Contact']
  },

  // SUPPORT & MAINTENANCE
  {
    id: 'support',
    triggers: [
      'support', 'maintenance', 'baad mein help', 'update', 'after sales',
      'maintenance plan', 'website support'
    ],
    reply: 'Haan! Hum website delivery ke baad bhi support dete hain. Monthly maintenance plans ₹299-999/month mein available hain jisme hosting check, updates, aur minor changes include hain.',
    options: ['💰 Pricing', '📞 Contact']
  },
  {
    id: 'hosting',
    triggers: [
      'hosting', 'domain', 'server', 'domain name', 'web hosting'
    ],
    reply: 'Hum domain registration aur hosting setup mein bhi help karte hain. Iske alawa aapki existing hosting manage karne ka bhi option hai.',
    options: ['🛠️ Services', '📞 Contact']
  },
  {
    id: 'warranty',
    triggers: [
      'warranty', 'guarantee', 'agar kuch toot gaya', 'bug fix', 'free support',
      '30 days support'
    ],
    reply: 'Hamare saare projects mein delivery ke baad 30 days ki free support included hai. Koi bhi bug ya issue free fix hoga!',
    options: ['📞 Contact']
  },

  // GREETINGS & CLOSINGS
  {
    id: 'greetings',
    triggers: [
      'hi', 'hello', 'hey', 'namaste', 'helo', 'hie', 'gm', 'good morning', 'good evening', 'hnji'
    ],
    reply: 'Hello! 👋 Main PrimeSoul ka assistant hoon. Aapki kaise madad kar sakta hoon? Website, digital marketing, ya koi aur service ke baare mein jaanna chahte hain?',
    options: ['💰 Pricing', '🛠️ Services', '⏱️ Timeline', '📁 Portfolio', '📞 Contact']
  },
  {
    id: 'thanks',
    triggers: [
      'thanks', 'thank you', 'shukriya', 'dhanyawad', 'thank u', 'thx'
    ],
    reply: 'Aapka swagat hai! 😊 Koi aur sawaal ho toh zaroor poochhen. Ya seedha baat karein: wa.me/918770404559',
    options: ['📞 Contact', '💰 Pricing']
  },
  {
    id: 'bye',
    triggers: [
      'bye', 'ok', 'theek hai', 'band karo', 'goodbye', 'tc', 'ok thanks', 'alvida'
    ],
    reply: 'Shukriya PrimeSoul choose karne ke liye! Kisi bhi kaam ke liye hum hamesha available hain. 🙏',
    options: ['📞 Contact']
  }
]

const ACTION_LINKS: Record<string, string> = {
  'go to contact page': '/contact',
  'go to contact form': '/contact',
  'contact form': '/contact',
  'primesoul.tech/contact': '/contact',
  'open portfolio page': '/portfolio',
  'view portfolio': '/portfolio',
  'open portfolio': '/portfolio',
  'primesoul.tech/portfolio': '/portfolio',
  'open whatsapp': 'https://wa.me/918770404559?text=Hi%20PrimeSoul%2C%20I%20need%20help%20with%20a%20project!',
  '💬 open whatsapp': 'https://wa.me/918770404559?text=Hi%20PrimeSoul%2C%20I%20need%20help%20with%20a%20project!',
  'wa.me/918770404559': 'https://wa.me/918770404559?text=Hi%20PrimeSoul%2C%20I%20need%20help%20with%20a%20project!',
}

function cleanText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractKeywords(text: string): string[] {
  const words = cleanText(text).split(' ').filter(w => w.length > 0)
  const filtered = words.filter(w => !STOP_WORDS.has(w))
  return filtered.length > 0 ? filtered : words
}

function findBestMatch(userInput: string): QAItem | null {
  const cleanedUser = cleanText(userInput)
  const userKeywords = extractKeywords(userInput)
  if (userKeywords.length === 0) return null

  let bestMatch: QAItem | null = null
  let maxScore = 0

  for (const item of QA_DATABASE) {
    for (const trigger of item.triggers) {
      const cleanedTrigger = cleanText(trigger)

      // Exact phrase match
      if (cleanedUser === cleanedTrigger) {
        return item
      }

      let score = 0

      // Substring match
      if (cleanedUser.length > 2 && cleanedTrigger.length > 2) {
        if (cleanedUser.includes(cleanedTrigger) || cleanedTrigger.includes(cleanedUser)) {
          score = 0.9
        }
      }

      // Keyword overlap match
      const triggerKeywords = extractKeywords(trigger)
      let overlapCount = 0

      for (const uKw of userKeywords) {
        const isMatched = triggerKeywords.some(tKw =>
          tKw === uKw || (tKw.length > 3 && uKw.length > 3 && (tKw.includes(uKw) || uKw.includes(tKw)))
        )
        if (isMatched) {
          overlapCount++
        }
      }

      const keywordScore = overlapCount / userKeywords.length
      score = Math.max(score, keywordScore)

      if (score > maxScore) {
        maxScore = score
        bestMatch = item
      }
    }
  }

  // 30% similarity threshold
  if (maxScore >= 0.30) {
    return bestMatch
  }

  return null
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) return
  }, [])

  const scrollToBottom = () => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  const addBotMessage = (text: string, options?: string[]) => {
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), text, sender: 'bot', options }])
      setIsTyping(false)
      scrollToBottom()
    }, 600 + Math.random() * 400)
  }

  const handleOpen = () => {
    setIsOpen(true)
    if (messages.length === 0) {
      addBotMessage(
        "Hello! 👋 Main PrimeSoul ka assistant hoon. Aapki kaise madad kar sakta hoon? Aap neeche diye gaye options tap kar sakte hain ya apna sawaal type kar sakte hain:",
        ['💰 Pricing', '🛠️ Services', '⏱️ Timeline', '📁 Portfolio', '📞 Contact']
      )
    }
    setTimeout(() => inputRef.current?.focus(), 300)
  }

  const handleUserMessage = (text: string) => {
    if (!text.trim()) return
    const userText = text.trim()
    setMessages(prev => [...prev, { id: Date.now(), text: userText, sender: 'user' }])
    setInputText('')
    scrollToBottom()

    // Check for action links
    const lowerInput = userText.toLowerCase()
    let actionTarget: string | null = null
    for (const [key, link] of Object.entries(ACTION_LINKS)) {
      if (lowerInput.includes(key)) {
        actionTarget = link
        break
      }
    }

    if (actionTarget) {
      setTimeout(() => {
        if (actionTarget!.startsWith('http')) {
          window.open(actionTarget!, '_blank')
        } else {
          window.location.href = actionTarget!
        }
      }, 500)
    }

    // Find matching response
    const match = findBestMatch(userText)

    if (match) {
      addBotMessage(match.reply, match.options)
    } else {
      addBotMessage(
        "Maine aapka sawaal samjha nahi. Aap seedha WhatsApp par baat kar sakte hain: wa.me/918770404559 — ya contact form fill karein: primesoul.tech/contact",
        ['💬 Open WhatsApp', 'Go to Contact Page', '💰 Pricing', '🛠️ Services']
      )
    }
  }

  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) return null

  return (
    <>
      {/* Chat bubble */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-28 right-8 z-40 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all hover:scale-110 hover:-translate-y-1 animate-glow-pulse"
          style={{ background: 'linear-gradient(135deg, #7B2FF2 0%, #A855F7 100%)', boxShadow: '0 8px 32px -4px rgba(123,47,242,0.5)' }}
          aria-label="Open chat"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] rounded-3xl overflow-hidden shadow-2xl" style={{ boxShadow: '0 24px 80px -12px rgba(123,47,242,0.3), 0 8px 24px rgba(0,0,0,0.1)', animation: 'scale-in 0.3s cubic-bezier(0.22,1,0.36,1) forwards' }}>
          {/* Header */}
          <div className="px-5 py-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #7B2FF2 0%, #A855F7 100%)' }}>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-semibold">{BOT_NAME}</p>
              <p className="text-white/60 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Online now
              </p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors text-lg">✕</button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-[#FAFAFE]" style={{ scrollbarWidth: 'thin' }}>
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.sender === 'user' ? '' : ''}`}>
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-[#7B2FF2] text-white rounded-br-md'
                        : 'bg-white text-[#0E0E2C] border border-[#E8E5F5] rounded-bl-md shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.options && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {msg.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => handleUserMessage(opt)}
                          className="px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-[#7B2FF2]/20 text-[#7B2FF2] hover:bg-[#7B2FF2] hover:text-white transition-all"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white border border-[#E8E5F5] shadow-sm">
                  <div className="flex gap-1"><span className="w-2 h-2 rounded-full bg-[#7B2FF2]/40 animate-bounce" style={{ animationDelay: '0s' }} /><span className="w-2 h-2 rounded-full bg-[#7B2FF2]/40 animate-bounce" style={{ animationDelay: '0.15s' }} /><span className="w-2 h-2 rounded-full bg-[#7B2FF2]/40 animate-bounce" style={{ animationDelay: '0.3s' }} /></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 bg-white border-t border-[#E8E5F5] flex items-center gap-2">
            <input
              ref={inputRef}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleUserMessage(inputText)}
              placeholder="Type a message..."
              className="flex-1 bg-[#F4F4F8] rounded-full px-4 py-2.5 text-sm text-[#0E0E2C] placeholder-[#AEAEC8] focus:outline-none focus:ring-2 focus:ring-[#7B2FF2]/20"
            />
            <button
              onClick={() => handleUserMessage(inputText)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #7B2FF2, #A855F7)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

