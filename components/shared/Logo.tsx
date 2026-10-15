'use client'

import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  className?: string
  iconSize?: number
  variant?: 'light' | 'dark'
}

export default function Logo({ className = '', iconSize = 38, variant = 'light' }: LogoProps) {
  const isDark = variant === 'dark'

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Logo Icon Mark */}
      <div
        className="relative flex-shrink-0"
        style={{ width: iconSize, height: iconSize }}
      >
        <Image
          src="/images/logo-animation_1.gif"
          alt="PrimeSoul Web Solutions"
          fill
          className="object-contain"
          unoptimized
          priority
        />
      </div>

      {/* Text Brand */}
      <div className="flex flex-col justify-center leading-none">
        {/* PRIMESOUL */}
        <div className="flex items-center text-[21px] sm:text-[23px] font-black tracking-[-0.02em] font-heading uppercase">
          <span style={{ color: isDark ? '#FFFFFF' : '#0E0E2C' }}>PRIME</span>
          <span style={{ color: '#1D4ED8' }}>SOUL</span>
        </div>

        {/* WEB SOLUTIONS */}
        <span
          className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-[0.25em] mt-[3px] font-heading"
          style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#0E0E2C' }}
        >
          WEB SOLUTIONS
        </span>
      </div>
    </Link>
  )
}
