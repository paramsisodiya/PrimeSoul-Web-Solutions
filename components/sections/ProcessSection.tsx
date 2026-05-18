import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { PROCESS_STEPS } from '@/lib/data'

export default function ProcessSection() {
  return (
    <section className="py-20 sm:py-28" style={{ background: '#FAFAFE' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="mb-10 sm:mb-16 text-center">
          <SectionLabel>How We Work</SectionLabel>
          <h2
            className="text-[1.6rem] sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em] mb-3 sm:mb-4 max-w-2xl mx-auto"
            style={{ fontFamily: "'Poppins', sans-serif", color: '#0E0E2C' }}
          >
            A Process Designed for{' '}
            <span className="text-gradient-purple">Clarity</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary max-w-lg mx-auto">
            No black boxes. No surprises. You know exactly what&apos;s happening at every stage.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(123,47,242,0.15) 20%, rgba(139,92,246,0.15) 80%, transparent)' }}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <AnimatedSection key={step.step} delay={i * 100}>
                <div className="relative text-center">
                  {/* Step number */}
                  <div className="relative inline-flex flex-col items-center mb-6">
                    <div
                      className="w-14 sm:w-20 h-14 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-extrabold mb-0"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        background: i % 2 === 0
                          ? 'linear-gradient(135deg, rgba(123,47,242,0.10) 0%, rgba(123,47,242,0.04) 100%)'
                          : 'linear-gradient(135deg, rgba(139,92,246,0.10) 0%, rgba(232,121,249,0.04) 100%)',
                        border: `1px solid ${i % 2 === 0 ? 'rgba(123,47,242,0.12)' : 'rgba(139,92,246,0.12)'}`,
                        color: '#7B2FF2',
                      }}
                    >
                      {step.step}
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-ink mb-2 sm:mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>{step.title}</h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
