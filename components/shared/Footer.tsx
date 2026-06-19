import Link from 'next/link'
import Image from 'next/image'

const LINKS = {
  pages: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/why-primesoul', label: 'Why Us' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/clients', label: 'Clients' },
    { href: '/careers', label: 'Careers' },
    { href: '/audit', label: 'Free Audit' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ],
  services: [
    'Web Design & Development',
    'UI/UX Design',
    'Full-Stack Applications',
    'Brand Identity',
    'SEO & Performance',
  ],
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: '#0E0E2C' }}>
      {/* Gradient accent top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #7B2FF2 30%, #E879F9 70%, transparent 100%)' }}
      />

      {/* Subtle mesh */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, #7B2FF2 0%, transparent 50%), radial-gradient(circle at 80% 20%, #A855F7 0%, transparent 40%)'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-6 sm:pb-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/5">
                <Image src="/images/logo-dark.png" alt="PrimeSoul" fill className="object-contain" />
              </div>
              <span className="text-2xl font-extrabold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <span className="text-white">Prime</span>
                <span style={{ background: 'linear-gradient(135deg, #A855F7, #E879F9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Soul</span>
              </span>
            </Link>
            <p className="text-white/40 text-xs sm:text-sm leading-relaxed max-w-xs mb-6 sm:mb-8">
              A digital agency crafting premium web experiences for businesses that understand the value of quality.
            </p>

            {/* Contact info — Porto style */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3 text-sm">
                <a href="mailto:paramsisodiya061@gmail.com" className="flex items-center gap-2 text-white/40 hover:text-brand-accent transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  paramsisodiya061@gmail.com
                </a>
                <a href="tel:8770404559" className="flex items-center gap-2 text-white/40 hover:text-brand-accent transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  +91 8770 404 559
                </a>
                <span className="flex items-center gap-2 text-white/25">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  Rajgarh, Madhya Pradesh
                </span>
              </div>

              {/* Social pills */}
              <div className="flex gap-3 mt-4">
                <a href="https://www.instagram.com/primesoul.tech/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300" style={{ border: '1px solid rgba(255,255,255,0.06)' }} aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="https://wa.me/918770404559" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300" style={{ border: '1px solid rgba(255,255,255,0.06)' }} aria-label="WhatsApp">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                </a>
                <a href="#" className="p-2.5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300" style={{ border: '1px solid rgba(255,255,255,0.06)' }} aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="#" className="p-2.5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300" style={{ border: '1px solid rgba(255,255,255,0.06)' }} aria-label="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>

                </a>
              </div>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>Navigation</h4>
            <ul className="flex flex-col gap-3">
              {LINKS.pages.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-white text-sm transition-colors duration-200"
                  >

                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>Services</h4>
            <ul className="flex flex-col gap-3">
              {LINKS.services.map((service) => (
                <li key={service}>
                  <span className="text-white/40 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA bar */}
        <div
          className="rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 mb-8 sm:mb-12 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6"
          style={{
            background: 'linear-gradient(135deg, rgba(123,47,242,0.15) 0%, rgba(232,121,249,0.10) 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div>
            <p className="text-white text-base sm:text-xl font-bold mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Ready to build something exceptional?
            </p>
            <p className="text-white/40 text-sm">Let&apos;s start with a conversation.</p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-px"
            style={{
              background: 'linear-gradient(135deg, #7B2FF2 0%, #A855F7 100%)',
              color: 'white',
              boxShadow: '0 8px 32px -8px rgba(123,47,242,0.4)',
            }}
          >
            Start a Project
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} PrimeSoul. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-white/15 text-xs hover:text-white/40 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/15 text-xs hover:text-white/40 transition-colors">Terms</Link>
          </div>
          <p className="text-white/15 text-xs">
            Crafted by{' '}
            <span style={{ color: 'rgba(168,85,247,0.5)' }}>Param Sisodiya</span>
            {' '}— Rajgarh, MP
          </p>
        </div>
      </div>
    </footer>
  )
}
