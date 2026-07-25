'use client'

import Link from 'next/link'
import Logo from '@/components/shared/Logo'
import { Mail, Phone, MapPin, ArrowUp, Instagram, Linkedin, Github, Send } from 'lucide-react'

const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Agency' },
  { href: '/why-primesoul', label: 'Why Choose Us' },
  { href: '/services', label: 'All Services' },
  { href: '/portfolio', label: 'Case Studies' },
  { href: '/clients', label: 'Our Clients' },
  { href: '/careers', label: 'Careers' },
  { href: '/audit', label: 'Free Audit' },
  { href: '/blog', label: 'Latest Insights' },
  { href: '/contact', label: 'Contact Us' },
]

const SERVICES_LINKS = [
  { href: '/services/web-design-development', label: 'Web Design & Development' },
  { href: '/services/ui-ux-design', label: 'UI/UX Interface Design' },
  { href: '/services/full-stack-applications', label: 'Full-Stack Web Apps' },
  { href: '/services/ai-business-automation', label: 'AI & Workflow Automation' },
  { href: '/services/seo-performance-optimization', label: 'SEO & Performance' },
  { href: '/services/e-commerce-solutions', label: 'E-Commerce Solutions' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden bg-[#080B1E] text-white">
      {/* Top Gradient Border */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #1D4ED8 30%, #00C9A7 70%, transparent 100%)',
        }}
      />

      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1D4ED8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00C9A7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8 sm:pb-12">
        {/* Top CTA Banner Box */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#0F172A] border border-white/10 p-8 sm:p-10 md:p-12 mb-16 shadow-2xl">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-[#1D4ED8]/30 to-[#00C9A7]/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold uppercase tracking-widest text-[#00C9A7] mb-4">
                <span>✦ Start Your Transformation</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight mb-3">
                Ready to build a web application that scales your business?
              </h3>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                Partner with PrimeSoul Web Solutions. We turn complex ideas into high-converting, high-performance digital products.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 text-center"
                style={{
                  background: 'linear-gradient(135deg, #1D4ED8 0%, #00C9A7 100%)',
                  boxShadow: '0 10px 30px -5px rgba(29,78,216,0.4)'
                }}
              >
                Get Free Strategy Call
              </Link>
              <Link
                href="/audit"
                className="inline-flex items-center justify-center px-7 py-4 rounded-2xl text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all duration-300 text-center"
              >
                Claim Free Website Audit
              </Link>
            </div>
          </div>
        </div>

        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 mb-16">
          {/* Column 1: Brand & Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Logo variant="dark" iconSize={40} />
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              PrimeSoul Web Solutions is a premier digital agency engineering high-performance websites, custom web applications, and automated growth systems for scaling brands globally.
            </p>

            {/* Direct Contact Details */}
            <div className="space-y-3 pt-2">
              <a
                href="mailto:primesoulwebsolutions@gmail.com"
                className="flex items-center gap-3 text-sm text-white/70 hover:text-[#00C9A7] transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#00C9A7]/50 group-hover:bg-[#00C9A7]/10 transition-all">
                  <Mail size={15} className="text-[#00C9A7]" />
                </div>
                <span>primesoulwebsolutions@gmail.com</span>
              </a>

              <a
                href="https://wa.me/918770404559"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/70 hover:text-[#00C9A7] transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#00C9A7]/50 group-hover:bg-[#00C9A7]/10 transition-all">
                  <Phone size={15} className="text-[#00C9A7]" />
                </div>
                <span>+91 8770 404 559</span>
              </a>

              <div className="flex items-center gap-3 text-sm text-white/60">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                  <MapPin size={15} className="text-[#1D4ED8]" />
                </div>
                <span>Rajgarh, Madhya Pradesh, India</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/primesoul.tech/?utm_source=ig_web_button_share_sheet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#1D4ED8] hover:border-[#1D4ED8] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/918770404559"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#00C9A7] hover:border-[#00C9A7] transition-all duration-300"
                aria-label="WhatsApp"
              >
                <Phone size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/primesoulwebsolutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com/paramsisodiya/PrimeSoul-Web-Solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest font-heading border-l-2 border-[#1D4ED8] pl-3">
              Navigation
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 pt-1">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#00C9A7] text-sm transition-colors duration-200 inline-flex items-center gap-1.5 hover:translate-x-1 transition-transform"
                  >
                    <span className="text-xs text-white/30">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest font-heading border-l-2 border-[#00C9A7] pl-3">
              Our Expertise
            </h4>
            <ul className="space-y-2.5 pt-1">
              {SERVICES_LINKS.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200 flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/15 transition-all group"
                  >
                    <span>{service.label}</span>
                    <span className="text-white/30 group-hover:text-[#00C9A7] transition-colors">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal Line */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} PrimeSoul Web Solutions. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span>Rajgarh, Madhya Pradesh</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1D4ED8] border border-white/15 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
