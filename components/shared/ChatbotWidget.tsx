'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: number
  text: string
  sender: 'bot' | 'user'
  options?: string[]
}

const BOT_NAME = 'PrimeSoul AI'
const RESPONSES: Record<string, { reply: string; options?: string[] }> = {
  greeting: {
    reply: "Hi there! 👋 I'm the PrimeSoul assistant. How can I help you today?",
    options: ['I need a website', 'Show me pricing', 'What services do you offer?', 'Talk to a human'],
  },
  'i need a website': {
    reply: "Awesome! We'd love to help build your dream website. 🚀 What type of project are you looking for?",
    options: ['Business website', 'E-commerce store', 'Landing page', 'Web application', 'Not sure yet'],
  },
  'business website': {
    reply: "Great choice! Our business websites start from ₹2,999 and include responsive design, SEO optimization, and a custom admin panel. Typical delivery is 2-3 weeks. Want to get started?",
    options: ['Get a quote', 'See portfolio', 'Talk to a human'],
  },
  'e-commerce store': {
    reply: "We build powerful e-commerce solutions with payment integration, inventory management, and beautiful product pages. Starting from ₹6,999. Interested?",
    options: ['Get a quote', 'See portfolio', 'Talk to a human'],
  },
  'landing page': {
    reply: "Landing pages are our specialty! High-converting, fast-loading pages with animations. Starting from ₹1,999. Ready to start?",
    options: ['Get a quote', 'Talk to a human'],
  },
  'web application': {
    reply: "Web apps with dashboards, databases, and custom logic — we've got you covered! Let's discuss your requirements in detail.",
    options: ['Get a quote', 'Talk to a human'],
  },
  'not sure yet': {
    reply: "No worries! Tell me about your business and what you're trying to achieve, and I'll recommend the best approach. Or you can book a free strategy call with our founder.",
    options: ['Book a free call', 'Talk to a human', 'Show me pricing'],
  },
  'show me pricing': {
    reply: "Here's a quick overview:\n\n💼 Starter — ₹2,999 (5 pages, responsive)\n🚀 Professional — ₹7,999 (10 pages, CMS, SEO)\n👑 Premium — ₹14,999+ (Custom, E-commerce, App)\n\nAll plans include free hosting setup and 30 days of support!",
    options: ['Get a quote', 'I need a website', 'Talk to a human'],
  },
  'what services do you offer?': {
    reply: "We offer a full range of digital services:\n\n🎨 Website Design & Development\n🛒 E-Commerce Solutions\n📱 Responsive & Mobile-First Design\n🔍 SEO & Performance Optimization\n⚡ Custom Web Applications\n🎯 UI/UX Design\n\nWhat interests you most?",
    options: ['I need a website', 'Show me pricing', 'Talk to a human'],
  },
  'get a quote': {
    reply: "Perfect! I'll redirect you to our contact form where you can share your project details. We respond within 2-4 hours! 🎯",
    options: ['Go to contact form', 'Talk to a human', 'Ask something else'],
  },
  'see portfolio': {
    reply: "Check out our latest work — real projects for real clients! Each project was built with care and attention to detail. 💎",
    options: ['View portfolio', 'Get a quote', 'Talk to a human'],
  },
  'talk to a human': {
    reply: "Sure! You can reach Param directly:\n\n📱 WhatsApp: +91 8770404559\n📧 Email: contact@primesoul.tech\n\nOr I can redirect you to WhatsApp right now!",
    options: ['Open WhatsApp', 'Go to contact form', 'Ask something else'],
  },
  'book a free call': {
    reply: "Great idea! A 15-minute free strategy call with our founder — no obligations. Let me take you to the booking page!",
    options: ['Go to contact form', 'Talk to a human'],
  },
  'ask something else': {
    reply: "Of course! What would you like to know?",
    options: ['I need a website', 'Show me pricing', 'What services do you offer?', 'Talk to a human'],
  },
}

const ACTION_LINKS: Record<string, string> = {
  'go to contact form': '/contact',
  'view portfolio': '/portfolio',
  'open whatsapp': 'https://wa.me/918770404559?text=Hi%20PrimeSoul%2C%20I%20need%20help%20with%20a%20project!',
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
      const g = RESPONSES.greeting
      addBotMessage(g.reply, g.options)
    }
    setTimeout(() => inputRef.current?.focus(), 300)
  }

  const handleUserMessage = (text: string) => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user' }])
    setInputText('')
    scrollToBottom()

    // Check for action links
    const actionKey = text.toLowerCase()
    if (ACTION_LINKS[actionKey]) {
      setTimeout(() => {
        if (ACTION_LINKS[actionKey].startsWith('http')) {
          window.open(ACTION_LINKS[actionKey], '_blank')
        } else {
          window.location.href = ACTION_LINKS[actionKey]
        }
      }, 500)
      return
    }

    // Find matching response
    const key = text.toLowerCase()
    const response = RESPONSES[key]
    if (response) {
      addBotMessage(response.reply, response.options)
    } else {
      addBotMessage(
        "I'm not sure about that, but I'd love to help! You can reach our team directly for detailed answers. 😊",
        ['Talk to a human', 'Show me pricing', 'I need a website']
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
          className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all hover:scale-110 hover:-translate-y-1 animate-glow-pulse"
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
