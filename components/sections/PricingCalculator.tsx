'use client'

import { useState } from 'react'
import Link from 'next/link'

const FEATURES = [
  { id: 'pages', label: 'Number of Pages', type: 'slider', min: 1, max: 20, default: 5, pricePerUnit: 500 },
  { id: 'cms', label: 'Admin Panel / CMS', type: 'toggle', price: 3000 },
  { id: 'ecommerce', label: 'E-Commerce / Payments', type: 'toggle', price: 4000 },
  { id: 'seo', label: 'SEO & Performance Optimization', type: 'toggle', price: 1500 },
  { id: 'animations', label: 'Custom Animations & Interactions', type: 'toggle', price: 2000 },
  { id: 'database', label: 'Database Integration', type: 'toggle', price: 2000 },
  { id: 'responsive', label: 'Mobile-First Responsive Design', type: 'toggle', price: 0, default: true },
  { id: 'support', label: '3-Month Priority Support', type: 'toggle', price: 2000 },
]

const BASE_PRICE = 2999

export default function PricingCalculator() {
  const [pages, setPages] = useState(5)
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    responsive: true,
  })

  const calculatePrice = () => {
    let total = BASE_PRICE + (pages - 1) * 500
    FEATURES.forEach(f => {
      if (f.type === 'toggle' && toggles[f.id] && f.price) {
        total += f.price
      }
    })
    return total
  }

  const price = calculatePrice()

  return (
    <div className="bg-white border border-[#E8E5F5] rounded-3xl overflow-hidden" style={{ boxShadow: '0 8px 40px -12px rgba(123,47,242,0.12)' }}>
      <div className="p-8 border-b border-[#E8E5F5]">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7B2FF2] to-[#E879F9] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1v14M4.5 4h7M5 12h6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <h3 className="text-xl font-bold text-[#0E0E2C]">
            Project Estimator
          </h3>
        </div>
        <p className="text-[#7A7A9E] text-sm">Configure your project requirements to get an instant estimate</p>
      </div>

      <div className="p-8 space-y-6">
        {/* Page Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-[#0E0E2C]">Number of Pages</label>
            <span className="text-sm font-bold text-[#7B2FF2] bg-[#7B2FF2]/10 px-3 py-1 rounded-full">{pages} pages</span>
          </div>
          <input
            type="range"
            min={1}
            max={20}
            value={pages}
            onChange={e => setPages(parseInt(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #7B2FF2 0%, #7B2FF2 ${(pages - 1) / 19 * 100}%, #E8E5F5 ${(pages - 1) / 19 * 100}%, #E8E5F5 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-[#AEAEC8] mt-1">
            <span>1 page</span>
            <span>20 pages</span>
          </div>
        </div>

        {/* Feature toggles */}
        <div className="space-y-3">
          {FEATURES.filter(f => f.type === 'toggle').map(feature => (
            <div
              key={feature.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                toggles[feature.id]
                  ? 'bg-[#7B2FF2]/5 border-[#7B2FF2]/20'
                  : 'bg-white border-[#E8E5F5] hover:border-[#7B2FF2]/20'
              }`}
              onClick={() => setToggles(prev => ({ ...prev, [feature.id]: !prev[feature.id] }))}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-5 rounded-full relative transition-colors ${toggles[feature.id] ? 'bg-[#7B2FF2]' : 'bg-[#E8E5F5]'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${toggles[feature.id] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-sm font-medium text-[#0E0E2C]">{feature.label}</span>
              </div>
              <span className="text-xs font-medium text-[#7A7A9E]">
                {feature.price === 0 ? 'Included' : feature.price ? `+₹${feature.price.toLocaleString()}` : ''}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Result */}
      <div className="p-8 bg-gradient-to-br from-[#0E0E2C] to-[#1a1a4a] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(123,47,242,0.4) 0%, transparent 60%)' }} />
        <div className="relative">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Estimated Price</p>
          <div className="flex items-baseline justify-center gap-1 mb-4">
            <span className="text-4xl font-bold text-white">₹{price.toLocaleString()}</span>
            <span className="text-white/40 text-sm">onwards</span>
          </div>
          <Link
            href={`/contact?budget=${price}&pages=${pages}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-px"
            style={{ background: 'linear-gradient(135deg, #7B2FF2 0%, #A855F7 100%)', boxShadow: '0 8px 24px -8px rgba(123,47,242,0.5)' }}
          >
            Get Exact Quote →
          </Link>
          <p className="text-white/30 text-xs mt-3">Final price depends on complexity & requirements</p>
        </div>
      </div>
    </div>
  )
}
