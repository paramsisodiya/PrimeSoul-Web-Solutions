import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#7B2FF2',
          'primary-dark': '#5A1DB8',
          'primary-light': '#A855F7',
          violet: '#8B5CF6',
          cyan: '#2EC4C4',
          accent: '#E879F9',
          light: '#F0EEFF',
          mist: '#F5F3FF',
        },
        accent: {
          gold: '#F59E0B',
          'gold-light': '#FCD34D',
          teal: '#14B8A6',
          'teal-light': '#5EEAD4',
        },
        surface: {
          base: '#FAFAFE',
          card: '#FFFFFF',
          subtle: '#F0EEFF',
          border: '#E8E5F5',
          dark: '#0E0E2C',
          'dark-card': '#161640',
          'dark-elevated': '#1a1a4e',
        },
        ink: {
          DEFAULT: '#0E0E2C',
          secondary: '#4A4A6A',
          muted: '#7A7A9E',
          faint: '#AEAEC8',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #7B2FF2 0%, #E879F9 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(123,47,242,0.08) 0%, rgba(232,121,249,0.08) 100%)',
        'hero-mesh': 'radial-gradient(ellipse at 20% 50%, rgba(123,47,242,0.10) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.08) 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, rgba(232,121,249,0.06) 0%, transparent 50%)',
        'card-glow': 'linear-gradient(135deg, rgba(123,47,242,0.04) 0%, rgba(139,92,246,0.04) 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0E0E2C 0%, #161640 100%)',
        'dark-gradient-rich': 'linear-gradient(135deg, #0E0E2C 0%, #1a1a4e 50%, #0E0E2C 100%)',
      },
      boxShadow: {
        'card': '0 2px 24px -4px rgba(123,47,242,0.08), 0 1px 4px rgba(123,47,242,0.04)',
        'card-hover': '0 12px 48px -8px rgba(123,47,242,0.18), 0 2px 8px rgba(123,47,242,0.08)',
        'brand': '0 8px 32px -8px rgba(123,47,242,0.40)',
        'brand-lg': '0 20px 56px -12px rgba(123,47,242,0.35)',
        'glow-purple': '0 0 40px rgba(123,47,242,0.25)',
        'glow-accent': '0 0 40px rgba(232,121,249,0.20)',
        'glow-gold': '0 0 40px rgba(245,158,11,0.20)',
        'dark-card': '0 4px 32px rgba(0,0,0,0.3)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-rotate': 'float-rotate 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'marquee': 'marquee-scroll 25s linear infinite',
        'float-orb': 'float-orb 20s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'float-rotate': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'marquee-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'float-orb': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(30px, -40px) scale(1.05)' },
          '50%': { transform: 'translate(-20px, 20px) scale(0.95)' },
          '75%': { transform: 'translate(40px, 30px) scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
