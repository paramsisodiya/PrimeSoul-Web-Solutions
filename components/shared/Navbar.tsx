'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SERVICE_PAGES } from '@/lib/service-pages'
import {
  Monitor, Smartphone, Globe, PenTool, LayoutTemplate, Palette, LineChart,
  Search, Share2, ImageIcon, Wrench, Megaphone, MapPin, Code, Zap, Edit, BarChart, Bot, Mail
} from 'lucide-react'

const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case 'monitor': return <Monitor size={20} strokeWidth={1.5} />;
    case 'smartphone': return <Smartphone size={20} strokeWidth={1.5} />;
    case 'globe': return <Globe size={20} strokeWidth={1.5} />;
    case 'pen-tool': return <PenTool size={20} strokeWidth={1.5} />;
    case 'layout': return <LayoutTemplate size={20} strokeWidth={1.5} />;
    case 'palette': return <Palette size={20} strokeWidth={1.5} />;
    case 'trending-up': return <LineChart size={20} strokeWidth={1.5} />;
    case 'search': return <Search size={20} strokeWidth={1.5} />;
    case 'share-2': return <Share2 size={20} strokeWidth={1.5} />;
    case 'image': return <ImageIcon size={20} strokeWidth={1.5} />;
    case 'wrench': return <Wrench size={20} strokeWidth={1.5} />;
    case 'megaphone': return <Megaphone size={20} strokeWidth={1.5} />;
    case 'map-pin': return <MapPin size={20} strokeWidth={1.5} />;
    case 'code': return <Code size={20} strokeWidth={1.5} />;
    case 'zap': return <Zap size={20} strokeWidth={1.5} />;
    case 'edit': return <Edit size={20} strokeWidth={1.5} />;
    case 'bar-chart': return <BarChart size={20} strokeWidth={1.5} />;
    case 'bot': return <Bot size={20} strokeWidth={1.5} />;
    case 'mail': return <Mail size={20} strokeWidth={1.5} />;
    default: return <Monitor size={20} strokeWidth={1.5} />;
  }
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/why-primesoul', label: 'Why Us' },
  { href: '/services', label: 'Services', hasDropdown: true },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/clients', label: 'Clients' },
  { href: '/careers', label: 'Careers' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setServicesOpen(false)
    setMobileServicesOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close desktop dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
              <Image src="/images/logo.png" alt="PrimeSoul" fill className="object-contain" priority />
            </div>
            <span className="text-[22px] font-extrabold tracking-[-0.02em] leading-none" style={{ color: '#000000ff', fontFamily: "'Playfair Display, serif" }}>
              PrimeSoul
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              link.hasDropdown ? (
                <div key={link.href} ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className={cn(
                      'nav-link-underline text-sm font-medium transition-colors duration-200 flex items-center gap-1',
                      pathname?.startsWith('/services')
                        ? 'text-brand-primary active'
                        : 'text-ink-secondary hover:text-ink'
                    )}
                  >
                    {link.label}
                    <svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none"
                      className={cn('transition-transform duration-200', servicesOpen && 'rotate-180')}
                    >
                      <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {/* Desktop Dropdown - Mega Menu */}
                  <div
                    className={cn(
                      'absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[680px] rounded-[1.5rem] bg-white border border-surface-border shadow-card-hover transition-all duration-300 overflow-hidden',
                      servicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                    )}
                  >
                    <div className="flex">
                      {/* Left side: Links Grid */}
                      <div className="w-[65%] p-4 grid grid-cols-2 gap-x-2 gap-y-1 bg-white">
                        {SERVICE_PAGES.map((service) => (
                          <Link
                            key={service.id}
                            href={`/services/${service.slug}`}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-subtle transition-colors group"
                            onClick={() => setServicesOpen(false)}
                          >
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors bg-white shadow-sm border border-surface-border group-hover:border-brand-primary/30"
                              style={{ color: service.accent }}
                            >
                              {getServiceIcon(service.icon)}
                            </div>
                            <div className="pt-0.5">
                              <p className="text-sm font-bold text-ink group-hover:text-brand-primary transition-colors leading-tight mb-1">{service.shortTitle}</p>
                              <p className="text-[11px] text-ink-muted line-clamp-2 leading-snug">{service.heroTagline}</p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Right side: Highlight Panel */}
                      <div className="w-[35%] bg-surface-subtle border-l border-surface-border p-6 flex flex-col justify-between">
                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-4">Why PrimeSoul?</h4>
                          <p className="text-sm text-ink-secondary leading-relaxed mb-6">
                            We don&apos;t just build websites. We craft digital experiences that drive growth, engagement, and actual revenue for your business.
                          </p>
                        </div>

                        <div className="space-y-3">
                          <Link href="/services" onClick={() => setServicesOpen(false)} className="flex items-center justify-between p-3 bg-white rounded-xl border border-surface-border hover:border-brand-primary hover:shadow-sm transition-all group">
                            <span className="text-sm font-semibold text-ink group-hover:text-brand-primary transition-colors">All Services</span>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-brand-primary group-hover:translate-x-1 transition-transform"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </Link>
                          <Link href="/contact" onClick={() => setServicesOpen(false)} className="flex items-center justify-between p-3 rounded-xl transition-all group shadow-brand-sm hover:shadow-brand transition-shadow" style={{ background: 'linear-gradient(135deg, #7B2FF2 0%, #A855F7 100%)' }}>
                            <span className="text-sm font-semibold text-white">Start a Project</span>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white group-hover:translate-x-1 transition-transform"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
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
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/918770404559?text=Hi%20PrimeSoul%2C%20I'm%20interested%20in%20your%20services"
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
                <path d="M4 10L10 4M10 4H5M10 4V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Mobile hamburger — 3-line */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg text-ink"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={cn('block h-0.5 bg-current rounded-full transition-all duration-300 origin-center', menuOpen && 'rotate-45 translate-y-[9px]')} />
              <span className={cn('block h-0.5 bg-current rounded-full transition-all duration-300', menuOpen && 'opacity-0 scale-x-0')} />
              <span className={cn('block h-0.5 bg-current rounded-full transition-all duration-300 origin-center', menuOpen && '-rotate-45 -translate-y-[9px]')} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu — Services, Portfolio, Contact with Services dropdown */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-all duration-500',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: menuOpen ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0)',
            backdropFilter: menuOpen ? 'blur(24px)' : 'blur(0px)',
          }}
          onClick={() => setMenuOpen(false)}
        />

        {/* Decorative gradient orb */}
        <div
          className="absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full pointer-events-none transition-all duration-700"
          style={{
            background: 'radial-gradient(circle, rgba(123,47,242,0.06), transparent 70%)',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'scale(1)' : 'scale(0.5)',
          }}
        />

        <div className={cn(
          'relative flex flex-col justify-center h-full px-8 transition-all duration-500',
          menuOpen ? 'translate-y-0' : 'translate-y-8'
        )}>
          {/* Logo */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl">
                <Image src="/images/logo.png" alt="PrimeSoul" fill className="object-contain" />
              </div>
              <span className="text-2xl font-extrabold tracking-[-0.02em] leading-none" style={{ color: '#2AA7A7', fontFamily: "'Poppins', sans-serif" }}>
                PrimeSoul
              </span>
            </div>
          </div>

          {/* Mobile Nav — Services (with sub), Portfolio, Contact */}
          <nav className="flex flex-col gap-2">
            {/* Services with expandable sub-menu */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className={cn(
                  'w-full text-left text-3xl font-semibold transition-colors flex items-center justify-between',
                  pathname?.startsWith('/services') ? 'text-brand-primary' : 'text-ink-secondary hover:text-ink',
                  menuOpen && 'menu-link-animated'
                )}
                style={{ animationDelay: menuOpen ? '100ms' : '0ms' }}
              >
                <span className="inline-flex items-center gap-4">
                  <span className="text-sm font-mono text-ink-faint">01</span>
                  Services
                </span>
                <svg
                  width="20" height="20" viewBox="0 0 20 20" fill="none"
                  className={cn('transition-transform duration-300', mobileServicesOpen && 'rotate-180')}
                >
                  <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Sub-menu */}
              <div
                className="overflow-hidden transition-all duration-400 ease-in-out"
                style={{
                  maxHeight: mobileServicesOpen ? '400px' : '0px',
                  opacity: mobileServicesOpen ? 1 : 0,
                }}
              >
                <div className="pl-12 pt-3 pb-2 flex flex-col gap-2">
                  {SERVICE_PAGES.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="flex items-center gap-3 py-2.5 text-base text-ink-secondary hover:text-brand-primary transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: service.accent }} />
                      {service.shortTitle}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    className="flex items-center gap-2 py-2.5 text-sm font-semibold text-brand-primary"
                  >
                    View All Services →
                  </Link>
                </div>
              </div>
            </div>

            {/* Portfolio */}
            <Link
              href="/portfolio"
              className={cn(
                'text-3xl font-semibold transition-colors py-2',
                pathname === '/portfolio' ? 'text-brand-primary' : 'text-ink-secondary hover:text-ink',
                menuOpen && 'menu-link-animated'
              )}
              style={{ animationDelay: menuOpen ? '180ms' : '0ms' }}
            >
              <span className="inline-flex items-center gap-4">
                <span className="text-sm font-mono text-ink-faint">02</span>
                Portfolio
              </span>
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className={cn(
                'text-3xl font-semibold transition-colors py-2',
                pathname === '/contact' ? 'text-brand-primary' : 'text-ink-secondary hover:text-ink',
                menuOpen && 'menu-link-animated'
              )}
              style={{ animationDelay: menuOpen ? '260ms' : '0ms' }}
            >
              <span className="inline-flex items-center gap-4">
                <span className="text-sm font-mono text-ink-faint">03</span>
                Contact
              </span>
            </Link>

            {/* Careers */}
            <Link
              href="/careers"
              className={cn(
                'text-3xl font-semibold transition-colors py-2',
                pathname === '/careers' ? 'text-brand-primary' : 'text-ink-secondary hover:text-ink',
                menuOpen && 'menu-link-animated'
              )}
              style={{ animationDelay: menuOpen ? '300ms' : '0ms' }}
            >
              <span className="inline-flex items-center gap-4">
                <span className="text-sm font-mono text-ink-faint">04</span>
                Careers
              </span>
            </Link>

            {/* Free Audit */}
            <Link
              href="/audit"
              className={cn(
                'text-3xl font-semibold transition-colors py-2',
                pathname === '/audit' ? 'text-brand-primary' : 'text-ink-secondary hover:text-ink',
                menuOpen && 'menu-link-animated'
              )}
              style={{ animationDelay: menuOpen ? '340ms' : '0ms' }}
            >
              <span className="inline-flex items-center gap-4">
                <span className="text-sm font-mono text-ink-faint">05</span>
                Free Audit
              </span>
            </Link>
          </nav>

          {/* Bottom actions */}
          <div
            className="mt-12 flex flex-col gap-4"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1) 0.4s',
            }}
          >
            <a
              href="https://wa.me/918770404559"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base font-medium text-ink-secondary"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="btn-tap w-full text-center py-4 rounded-full text-base font-semibold text-white shadow-brand"
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
