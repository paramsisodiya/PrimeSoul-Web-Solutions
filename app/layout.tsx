import type { Metadata } from 'next'
import { Poppins, DM_Sans, Playfair_Display, DM_Mono } from 'next/font/google'
import '@/styles/globals.css'
import ClientLayout from '@/components/shared/ClientLayout'
import JsonLd from '@/components/shared/JsonLd'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'PrimeSoul — Premium Digital Agency | Web Design & Development',
    template: '%s | PrimeSoul',
  },
  description: 'PrimeSoul builds premium websites and web applications for businesses that refuse to settle for average. Top web development agency in India.',
  keywords: ['web design', 'web development', 'digital agency', 'India', 'PrimeSoul'],
  authors: [{ name: 'PrimeSoul Web Solutions' }],
  creator: 'PrimeSoul Web Solutions',
  metadataBase: new URL('https://primesoul.tech'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://primesoul.tech',
    siteName: 'PrimeSoul Web Solutions',
    title: 'PrimeSoul — Premium Digital Agency',
    description: 'Premium websites and web applications for ambitious businesses.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PrimeSoul — Premium Digital Agency',
    description: 'Premium websites and web applications for ambitious businesses.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${dmSans.variable} ${playfair.variable} ${dmMono.variable} font-body antialiased`}>
        <JsonLd />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}