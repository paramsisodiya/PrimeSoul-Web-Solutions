'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Logo from '@/components/shared/Logo'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SERVICE_PAGES } from '@/lib/service-pages'
import {
  Monitor, Smartphone, Globe, PenTool, LayoutTemplate, Palette, LineChart,
  Search, Share2, ImageIcon, Wrench, Megaphone, MapPin, Code, Zap, Edit, BarChart, Bot, Mail
} from 'lucide-react'

const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case 'monitor': return <Monitor size={18} strokeWidth={1.8} />;
    case 'smartphone': return <Smartphone size={18} strokeWidth={1.8} />;
    case 'globe': return <Globe size={18} strokeWidth={1.8} />;
    case 'pen-tool': return <PenTool size={18} strokeWidth={1.8} />;
    case 'layout': return <LayoutTemplate size={18} strokeWidth={1.8} />;
    case 'palette': return <Palette size={18} strokeWidth={1.8} />;
    case 'trending-up': return <LineChart size={18} strokeWidth={1.8} />;
    case 'search': return <Search size={18} strokeWidth={1.8} />;
    case 'share-2': return <Share2 size={18} strokeWidth={1.8} />;
    case 'image': return <ImageIcon size={18} strokeWidth={1.8} />;
    case 'wrench': return <Wrench size={18} strokeWidth={1.8} />;
    case 'megaphone': return <Megaphone size={18} strokeWidth={1.8} />;
    case 'map-pin': return <MapPin size={18} strokeWidth={1.8} />;
    case 'code': return <Code size={18} strokeWidth={1.8} />;
    case 'zap': return <Zap size={18} strokeWidth={1.8} />;
    case 'edit': return <Edit size={18} strokeWidth={1.8} />;
    case 'bar-chart': return <BarChart size={18} strokeWidth={1.8} />;
    case 'bot': return <Bot size={18} strokeWidth={1.8} />;
    case 'mail': return <Mail size={18} strokeWidth={1.8} />;
    default: return <Monitor size={18} strokeWidth={1.8} />;
  }
}

const NAV_LINKS = [
  { href: '/services', label: 'Services', hasDropdown: 'services' },
  { href: '/primeoms', label: 'Products', hasDropdown: 'products' },
  { href: '/portfolio', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/why-primesoul', label: 'Why Us' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const pathname = usePathname()
  const servicesDropdownRef = useRef<HTMLDivElement>(null)
  const productsDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setServicesOpen(false)
    setProductsOpen(false)
    setMobileServicesOpen(false)
    setMobileProductsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const DARK_HERO_PATHS = ['/contact', '/blog', '/locations']
  const isDarkHeroPage = DARK_HERO_PATHS.some(path => pathname?.startsWith(path))
  const isDarkHeader = !scrolled && isDarkHeroPage

  return (
    <>
      {/* Floating Glassmorphic Header Container */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 pt-3"
        style={{ top: 'var(--announcement-height, 0px)' }}
      >
        <div
          className={cn(
            'max-w-7xl mx-auto px-5 sm:px-7 py-3 sm:py-3.5 rounded-full transition-all duration-500 flex items-center justify-between',
            scrolled
              ? 'bg-white/85 backdrop-blur-2xl border border-white/60 shadow-[0_12px_40px_-10px_rgba(123,47,242,0.18)]'
              : isDarkHeader
              ? 'bg-[#0E0E2C]/75 backdrop-blur-xl border border-white/10 shadow-2xl'
              : 'bg-white/70 backdrop-blur-xl border border-white/50 shadow-md'
          )}
        >
          {/* Brand Logo */}
          <Logo variant={isDarkHeader ? 'dark' : 'light'} />

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              if (link.hasDropdown === 'services') {
                return (
                  <div key={link.label} ref={servicesDropdownRef} className="relative">
                    <button
                      onClick={() => { setServicesOpen(!servicesOpen); setProductsOpen(false) }}
                      className={cn(
                        'text-sm font-semibold transition-colors duration-200 flex items-center gap-1.5 py-1',
                        pathname?.startsWith('/services')
                          ? 'text-[#7B2FF2]'
                          : isDarkHeader
                          ? 'text-white/80 hover:text-white'
                          : 'text-ink-secondary hover:text-[#7B2FF2]'
                      )}
                    >
                      <span>{link.label}</span>
                      <svg
                        width="12" height="12" viewBox="0 0 12 12" fill="none"
                        className={cn('transition-transform duration-300', servicesOpen && 'rotate-180')}
                      >
                        <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/* Desktop Mega Menu Dropdown */}
                    <div
                      className={cn(
                        'absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[680px] rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-300 overflow-hidden z-50',
                        servicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'
                      )}
                    >
                      <div className="flex">
                        {/* Left Grid */}
                        <div className="w-[65%] p-4 grid grid-cols-2 gap-2 bg-white/80">
                          {SERVICE_PAGES.map((service) => (
                            <Link
                              key={service.id}
                              href={`/services/${service.slug}`}
                              className="flex items-start gap-3 p-3 rounded-2xl hover:bg-[#7B2FF2]/5 transition-all group border border-transparent hover:border-[#7B2FF2]/10"
                              onClick={() => setServicesOpen(false)}
                            >
                              <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 bg-white shadow-sm border border-surface-border"
                                style={{ color: service.accent }}
                              >
                                {getServiceIcon(service.icon)}
                              </div>
                              <div className="pt-0.5">
                                <p className="text-xs font-bold text-[#0E0E2C] group-hover:text-[#7B2FF2] transition-colors leading-tight mb-0.5">{service.shortTitle}</p>
                                <p className="text-[10px] text-ink-muted line-clamp-2 leading-snug">{service.heroTagline}</p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Right Panel */}
                        <div className="w-[35%] bg-surface-subtle/70 border-l border-surface-border p-6 flex flex-col justify-between backdrop-blur-md">
                          <div>
                            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#7B2FF2] mb-3">Why PrimeSoul?</h4>
                            <p className="text-xs text-ink-secondary leading-relaxed mb-4">
                              Engineered for speed, high conversion rates, and business growth.
                            </p>
                          </div>

                          <div className="space-y-2.5">
                            <Link href="/services" onClick={() => setServicesOpen(false)} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-surface-border hover:border-[#7B2FF2]/30 transition-all text-xs font-bold text-[#0E0E2C] hover:text-[#7B2FF2]">
                              <span>All Services</span>
                              <span>→</span>
                            </Link>
                            <Link href="/contact" onClick={() => setServicesOpen(false)} className="flex items-center justify-between p-2.5 rounded-xl text-xs font-bold text-white shadow-md hover:scale-105 transition-all" style={{ background: 'linear-gradient(135deg, #1E3AE0 0%, #2EC4C4 100%)' }}>
                              <span>Start Project</span>
                              <span>→</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              if (link.hasDropdown === 'products') {
                return (
                  <div key={link.label} ref={productsDropdownRef} className="relative">
                    <button
                      onClick={() => { setProductsOpen(!productsOpen); setServicesOpen(false) }}
                      className={cn(
                        'text-sm font-semibold transition-colors duration-200 flex items-center gap-1.5 py-1',
                        pathname?.startsWith('/primeoms')
                          ? 'text-[#FF5A1F]'
                          : isDarkHeader
                          ? 'text-white/80 hover:text-white'
                          : 'text-ink-secondary hover:text-[#FF5A1F]'
                      )}
                    >
                      <span>Products</span>
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FF5A1F]/15 text-[#FF5A1F] leading-none">
                        New
                      </span>
                      <svg
                        width="12" height="12" viewBox="0 0 12 12" fill="none"
                        className={cn('transition-transform duration-300', productsOpen && 'rotate-180')}
                      >
                        <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/* Products Dropdown Showcase Card */}
                    <div
                      className={cn(
                        'absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[380px] rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_20px_60px_-15px_rgba(255,90,31,0.18)] transition-all duration-300 overflow-hidden z-50 p-5',
                        productsOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'
                      )}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF5A1F] bg-[#FF5A1F]/10 px-2.5 py-1 rounded-full">
                          Flagship SaaS Product
                        </span>
                        <span className="text-[10px] font-bold text-ink-muted">
                          by PrimeSoul
                        </span>
                      </div>

                      <Link
                        href="/primeoms"
                        onClick={() => setProductsOpen(false)}
                        className="group block p-4 rounded-2xl bg-gradient-to-br from-[#FFF7ED] to-white border border-[#FFEDD5] hover:border-[#FF5A1F]/40 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-start gap-3.5 mb-2.5">
                          <div className="w-10 h-10 rounded-xl bg-[#FF5A1F] text-white flex items-center justify-center font-black text-base shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
                            P
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-extrabold text-[#0E0E2C] group-hover:text-[#FF5A1F] transition-colors">
                                PrimeOMS
                              </h4>
                              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                Live
                              </span>
                            </div>
                            <p className="text-xs text-ink-secondary mt-0.5 font-medium">
                              Restaurant Operations, Simplified
                            </p>
                          </div>
                        </div>

                        <p className="text-[11px] text-ink-muted leading-relaxed mb-3">
                          QR Menu • Real-time Orders • Direct UPI Billing • Customer Loyalty & Rewards
                        </p>

                        <div className="flex items-center justify-between pt-2.5 border-t border-[#FFEDD5] text-xs font-bold text-[#FF5A1F]">
                          <span>Plans from ₹799/mo</span>
                          <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            Explore PrimeOMS →
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-semibold transition-colors duration-200 py-1',
                    pathname === link.href
                      ? 'text-[#7B2FF2]'
                      : isDarkHeader
                      ? 'text-white/80 hover:text-white'
                      : 'text-ink-secondary hover:text-[#7B2FF2]'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/918770404559?text=Hi%20PrimeSoul%2C%20I'm%20interested%20in%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors",
                isDarkHeader ? "text-white/80 hover:text-white" : "text-ink-secondary hover:text-[#7B2FF2]"
              )}
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_25px_rgba(123,47,242,0.35)]"
              style={{ background: 'linear-gradient(135deg, #1E3AE0 0%, #7B2FF2 50%, #2EC4C4 100%)' }}
            >
              <span>Let&apos;s Talk!</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <path d="M4 10L10 4M10 4H5M10 4V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-xl text-ink hover:bg-[#7B2FF2]/10 transition-colors"
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

      {/* Glassmorphic Mobile Overlay Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-all duration-500',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: menuOpen ? 'rgba(14, 14, 44, 0.88)' : 'rgba(14, 14, 44, 0)',
            backdropFilter: menuOpen ? 'blur(28px)' : 'blur(0px)',
          }}
          onClick={() => setMenuOpen(false)}
        />

        <div className={cn(
          'relative flex flex-col justify-center h-full px-8 text-white transition-all duration-500 overflow-y-auto py-20',
          menuOpen ? 'translate-y-0' : 'translate-y-8'
        )}>
          <div className="mb-8">
            <Logo variant="dark" />
          </div>

          <nav className="flex flex-col gap-3">
            {/* Mobile Services */}
            <div>
              <button
                onClick={() => { setMobileServicesOpen(!mobileServicesOpen); setMobileProductsOpen(false) }}
                className={cn(
                  'w-full text-left text-xl font-extrabold transition-colors flex items-center justify-between py-1',
                  pathname?.startsWith('/services') ? 'text-[#2EC4C4]' : 'text-white/80 hover:text-white'
                )}
              >
                <span className="inline-flex items-center gap-3">
                  <span className="text-xs font-mono text-[#2EC4C4]">01</span>
                  Services
                </span>
                <svg
                  width="18" height="18" viewBox="0 0 20 20" fill="none"
                  className={cn('transition-transform duration-300', mobileServicesOpen && 'rotate-180')}
                >
                  <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div
                className="overflow-hidden transition-all duration-400 ease-in-out"
                style={{
                  maxHeight: mobileServicesOpen ? '320px' : '0px',
                  opacity: mobileServicesOpen ? 1 : 0,
                }}
              >
                <div className="pl-8 pt-2 pb-2 flex flex-col gap-2 border-l border-white/10 ml-3">
                  {SERVICE_PAGES.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="text-xs text-white/70 hover:text-[#2EC4C4] transition-colors py-1"
                    >
                      {service.shortTitle}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Products (PrimeOMS) */}
            <div>
              <button
                onClick={() => { setMobileProductsOpen(!mobileProductsOpen); setMobileServicesOpen(false) }}
                className={cn(
                  'w-full text-left text-xl font-extrabold transition-colors flex items-center justify-between py-1',
                  pathname?.startsWith('/primeoms') ? 'text-[#FF5A1F]' : 'text-white/80 hover:text-white'
                )}
              >
                <span className="inline-flex items-center gap-3">
                  <span className="text-xs font-mono text-[#FF5A1F]">02</span>
                  <span>Products</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FF5A1F] text-white font-bold uppercase tracking-wider">
                    PrimeOMS
                  </span>
                </span>
                <svg
                  width="18" height="18" viewBox="0 0 20 20" fill="none"
                  className={cn('transition-transform duration-300', mobileProductsOpen && 'rotate-180')}
                >
                  <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div
                className="overflow-hidden transition-all duration-400 ease-in-out"
                style={{
                  maxHeight: mobileProductsOpen ? '200px' : '0px',
                  opacity: mobileProductsOpen ? 1 : 0,
                }}
              >
                <div className="pl-8 pt-3 pb-2 border-l border-white/10 ml-3">
                  <Link
                    href="/primeoms"
                    className="block p-3 rounded-xl bg-white/10 border border-white/15 hover:bg-white/15 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white text-sm">PrimeOMS SaaS</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FF5A1F] text-white font-bold">₹799/mo</span>
                    </div>
                    <p className="text-[11px] text-white/70">Restaurant QR ordering & operations platform</p>
                  </Link>
                </div>
              </div>
            </div>

            {[
              { href: '/portfolio', label: 'Work', num: '03' },
              { href: '/about', label: 'About', num: '04' },
              { href: '/why-primesoul', label: 'Why Us', num: '05' },
              { href: '/contact', label: 'Contact', num: '06' },
              { href: '/audit', label: 'Free Audit', num: '07' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-xl font-extrabold transition-colors py-1',
                  pathname === item.href ? 'text-[#2EC4C4]' : 'text-white/80 hover:text-white'
                )}
              >
                <span className="inline-flex items-center gap-3">
                  <span className="text-xs font-mono text-[#2EC4C4]">{item.num}</span>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/contact"
              className="w-full text-center py-3.5 rounded-full text-sm font-bold text-white shadow-xl hover:scale-105 transition-transform"
              style={{ background: 'linear-gradient(135deg, #1E3AE0 0%, #7B2FF2 50%, #2EC4C4 100%)' }}
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}
