'use client'

import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  className?: string
  iconSize?: number
  variant?: 'light' | 'dark'
}

export default function Logo({ className = '', iconSize = 36, variant = 'light' }: LogoProps) {
  const isDark = variant === 'dark'

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Logo Icon Mark */}
      <div
        className="relative flex-shrink-0"
        style={{ width: iconSize, height: iconSize }}
      >
        <Image
          src={isDark ? '/images/logo-dark.png' : '/images/logo.png'}
          alt="PrimeSoul Web Solutions"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Text Brand */}
      <div className="flex flex-col justify-center leading-none">
        {/* PRIMESOUL */}
        <div className="flex items-center text-[20px] sm:text-[22px] font-extrabold tracking-[-0.01em] font-heading uppercase">
          {/* Custom P with dot notch accent */}
          <span className="relative inline-flex items-center" style={{ color: isDark ? '#FFFFFF' : '#0B0F28' }}>
            <span
              className="absolute -left-1.5 top-[5px] w-[3px] h-[3px] rounded-full"
              style={{ background: '#1D4ED8' }}
            />
            P
          </span>
          <span style={{ color: isDark ? '#FFFFFF' : '#0B0F28' }}>RIME</span>
          <span style={{ color: '#1D4ED8' }}>SOUL</span>
        </div>

        {/* WEB SOLUTIONS */}
        <span
          className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.28em] mt-[3px] font-heading"
          style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#0B0F28' }}
        >
          WEB SOLUTIONS
        </span>
      </div>
    </Link>
  )
}
