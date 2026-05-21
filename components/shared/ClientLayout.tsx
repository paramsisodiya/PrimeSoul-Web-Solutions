'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import CustomCursor from '@/components/shared/CustomCursor'
import ScrollProgress from '@/components/shared/ScrollProgress'
import BackToTop from '@/components/shared/BackToTop'
import WhatsAppFloat from '@/components/shared/WhatsAppFloat'
import AnnouncementBar from '@/components/shared/AnnouncementBar'
import ThemeProvider from '@/components/shared/ThemeProvider'
import SocialProofToast from '@/components/shared/SocialProofToast'
import ExitIntentPopup from '@/components/shared/ExitIntentPopup'
import PageTransition from '@/components/shared/PageTransition'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <ThemeProvider />
      <CustomCursor />
      <ScrollProgress />
      <AnnouncementBar />
      <Navbar />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Footer />
      <BackToTop />
      <WhatsAppFloat />
      <SocialProofToast />
      <ExitIntentPopup />
    </>
  )
}

