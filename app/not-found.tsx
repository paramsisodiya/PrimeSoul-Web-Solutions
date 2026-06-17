import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: '#FAFAFE' }}>
      {/* Mesh gradient */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 50% 50% at 30% 60%, rgba(123,47,242,0.06) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 70% 30%, rgba(232,121,249,0.04) 0%, transparent 60%)'
      }} />
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(123,47,242,1) 1px, transparent 1px), linear-gradient(90deg, rgba(123,47,242,1) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }} />

      <div className="text-center max-w-md mx-auto px-6 relative z-10">
        {/* Large 404 with gradient */}
        <div
          className="text-[120px] sm:text-[160px] font-extrabold leading-none mb-4 select-none"
          style={{
            background: 'linear-gradient(135deg, #7B2FF2 0%, #E879F9 50%, #F59E0B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 3s ease infinite',
          }}
        >
          404
        </div>

        {/* Animated underline */}
        <div className="w-24 h-1 mx-auto mb-6 rounded-full" style={{
          background: 'linear-gradient(90deg, #7B2FF2, #E879F9, #F59E0B)',
          backgroundSize: '200% 100%',
          animation: 'gradient-shift 2s ease infinite',
        }} />

        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink mb-3 tracking-[-0.02em]">
          Page Not Found
        </h1>
        <p className="text-base text-ink-secondary mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="btn-tap px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-px hover:shadow-brand-lg w-full sm:w-auto"
            style={{ background: 'linear-gradient(135deg, #7B2FF2 0%, #A855F7 100%)', boxShadow: '0 8px 24px -8px rgba(123,47,242,0.40)' }}
          >
            Back to Home
          </Link>
          <Link
            href="/services"
            className="btn-tap px-7 py-3.5 rounded-full text-sm font-semibold text-ink border border-surface-border bg-white hover:bg-surface-subtle transition-all w-full sm:w-auto"
          >
            Our Services
          </Link>
          <Link
            href="/contact"
            className="btn-tap px-7 py-3.5 rounded-full text-sm font-semibold text-ink border border-surface-border bg-white hover:bg-surface-subtle transition-all w-full sm:w-auto"
          >
            Contact Us
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12 text-sm text-ink-muted">
          <p className="mb-3 font-medium">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link href="/portfolio" className="text-brand-primary hover:underline">Portfolio</Link>
            <Link href="/services/web-design-development" className="text-brand-primary hover:underline">Web Development</Link>
            <Link href="/about" className="text-brand-primary hover:underline">About Us</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
