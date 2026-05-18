import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8F9FE' }}>
      <div className="text-center max-w-md mx-auto px-6">
        <div
          className="text-8xl font-bold mb-6"
          style={{
            fontFamily: 'Playfair Display, serif',
            background: 'linear-gradient(135deg, #1E3AE0 0%, #2EC4C4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </div>
        <h1 className="text-2xl font-bold text-ink mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
          Page Not Found
        </h1>
        <p className="text-ink-secondary mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-7 py-3.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #1E3AE0 0%, #2B47D9 100%)', boxShadow: '0 8px 24px -8px rgba(30,58,224,0.40)' }}
          >
            Back to Home
          </Link>
          <Link
            href="/portfolio"
            className="px-7 py-3.5 rounded-xl text-sm font-semibold text-ink border border-surface-border bg-white hover:bg-surface-subtle transition-colors"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </div>
  )
}
