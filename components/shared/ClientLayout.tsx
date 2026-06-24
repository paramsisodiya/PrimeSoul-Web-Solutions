'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import CustomCursor from '@/components/shared/CustomCursor'
import ScrollProgress from '@/components/shared/ScrollProgress'
import BackToTop from '@/components/shared/BackToTop'
import WhatsAppFloat from '@/components/shared/WhatsAppFloat'
import AnnouncementBar from '@/components/shared/AnnouncementBar'

import SocialProofToast from '@/components/shared/SocialProofToast'
import ExitIntentPopup from '@/components/shared/ExitIntentPopup'
import PageTransition from '@/components/shared/PageTransition'
import ScrollToTop from '@/components/shared/ScrollToTop'
import ChatbotWidget from '@/components/shared/ChatbotWidget'
import DynamicSEO from '@/components/shared/DynamicSEO'
import LeadMagnetPopup from '@/components/shared/LeadMagnetPopup'
import ThemeToggle from '@/components/shared/ThemeToggle'
import ErrorBoundary from '@/components/shared/ErrorBoundary'
import PageViewTracker from '@/components/shared/PageViewTracker'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>

      <DynamicSEO />
      <CustomCursor />
      <ScrollProgress />
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />
      <PageTransition>
        <ErrorBoundary>
          <main>{children}</main>
        </ErrorBoundary>
      </PageTransition>
      <Footer />
      <BackToTop />
      <WhatsAppFloat />
      <SocialProofToast />
      <ExitIntentPopup />
      <LeadMagnetPopup />
      <ThemeToggle />
      <ChatbotWidget />
      <PageViewTracker />
    </>
  )
}


