'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const stats = [
  { value: 4, suffix: '+', label: 'Clients Served', icon: '🤝', color: '#7B2FF2' },
  { value: 100, suffix: '%', label: 'Satisfaction Rate', icon: '⭐', color: '#F59E0B' },
  { value: 5, suffix: 'L+', label: 'Revenue Generated', prefix: '₹', icon: '📈', color: '#10B981' },
  { value: 24, suffix: 'hr', label: 'Avg. Response Time', icon: '⚡', color: '#3B82F6' },
]

export default function StatsSection() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: '#F8F9FE' }}>
      <div className="absolute inset-0 opacity-40" style={{
        background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(123,47,242,0.06) 0%, transparent 70%)'
      }} />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 80}>
              <div className="bg-white rounded-2xl border border-[#E8E5F5] p-6 text-center tilt-card transition-all hover:shadow-lg hover:-translate-y-1" style={{ boxShadow: '0 4px 24px -8px rgba(123,47,242,0.08)' }}>
                <span className="text-3xl mb-3 block">{stat.icon}</span>
                <div className="text-3xl sm:text-4xl font-bold text-[#0E0E2C] mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-[#7A7A9E] font-medium">{stat.label}</p>
                <div className="mt-3 mx-auto w-8 h-0.5 rounded-full" style={{ background: stat.color }} />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
