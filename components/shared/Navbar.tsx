'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-white/92 backdrop-blur-2xl border-b border-surface-border shadow-[0_2px_24px_-4px_rgba(123,47,242,0.06)] py-3'
            : 'bg-transparent py-5'
        )}
        style={{ top: 'var(--announcement-height, 0px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 overflow-hidden rounded-xl">
              <Image
                src="/images/logo.png"
                alt="PrimeSoul"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                className="text-[22px] font-extrabold tracking-[-0.02em] leading-none"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: '#0E0E2C' }}>Prime</span>
                <span style={{ background: 'linear-gradient(135deg, #7B2FF2 0%, #E879F9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Soul</span>
              </span>
              <span
                className="text-[8.5px] font-medium uppercase tracking-[0.3em] leading-none"
                style={{ fontFamily: "'DM Sans', sans-serif", color: '#AEAEC8', marginTop: '3px' }}
              >
                Web Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'nav-link-underline text-sm font-medium transition-colors duration-200',
                  pathname === link.href
                    ? 'text-brand-primary active'
                    : 'text-ink-secondary hover:text-ink'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`https://wa.me/918770404559?text=Hi%20PrimeSoul%2C%20I'm%20interested%20in%20your%20services`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-ink-secondary hover:text-ink transition-colors"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-px hover:shadow-brand-lg"
              style={{ background: 'linear-gradient(135deg, #7B2FF2 0%, #8B5CF6 100%)' }}
            >
              Let&apos;s Talk!
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <path d="M4 10L10 4M10 4H5M10 4V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg text-ink"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={cn('block h-0.5 bg-current rounded transition-all duration-300', menuOpen && 'rotate-45 translate-y-2')} />
              <span className={cn('block h-0.5 bg-current rounded transition-all duration-300', menuOpen && 'opacity-0')} />
              <span className={cn('block h-0.5 bg-current rounded transition-all duration-300', menuOpen && '-rotate-45 -translate-y-2')} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-all duration-500',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="absolute inset-0 bg-white/97 backdrop-blur-2xl" onClick={() => setMenuOpen(false)} />
        <div className={cn(
          'relative flex flex-col justify-center h-full px-8 transition-all duration-500',
          menuOpen ? 'translate-y-0' : 'translate-y-8'
        )}>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl">
                <Image src="/images/logo.png" alt="PrimeSoul" fill className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold tracking-[-0.02em] leading-none" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <span style={{ color: '#0E0E2C' }}>Prime</span>
                  <span style={{ background: 'linear-gradient(135deg, #7B2FF2 0%, #E879F9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Soul</span>
                </span>
                <span
                  className="text-[10px] font-medium uppercase tracking-[0.3em] leading-none"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: '#AEAEC8', marginTop: '4px' }}
                >
                  Web Solutions
                </span>
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-3xl font-semibold transition-colors',
                  pathname === link.href ? 'text-brand-primary' : 'text-ink-secondary hover:text-ink'
                )}
                style={{ fontFamily: "'Poppins', sans-serif", transitionDelay: `${i * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-12 flex flex-col gap-4">
            <a
              href={`https://wa.me/918770404559`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base font-medium text-ink-secondary"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="w-full text-center py-4 rounded-full text-base font-semibold text-white shadow-brand"
              style={{ background: 'linear-gradient(135deg, #7B2FF2 0%, #A855F7 100%)' }}
            >
              Let&apos;s Talk!
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}
