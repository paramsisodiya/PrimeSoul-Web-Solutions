import type { Metadata } from 'next'
import PrimeOMSHero from '@/components/primeoms/PrimeOMSHero'
import PrimeOMSPainPoints from '@/components/primeoms/PrimeOMSPainPoints'
import PrimeOMSFeatureTabs from '@/components/primeoms/PrimeOMSFeatureTabs'
import PrimeOMSFeatureGrid from '@/components/primeoms/PrimeOMSFeatureGrid'
import PrimeOMSWorkflow from '@/components/primeoms/PrimeOMSWorkflow'
import PrimeOMSWhyUs from '@/components/primeoms/PrimeOMSWhyUs'
import PrimeOMSPricing from '@/components/primeoms/PrimeOMSPricing'
import PrimeOMSBuiltByPrimeSoul from '@/components/primeoms/PrimeOMSBuiltByPrimeSoul'
import PrimeOMSFAQ from '@/components/primeoms/PrimeOMSFAQ'
import PrimeOMSCTA from '@/components/primeoms/PrimeOMSCTA'
import { PRIMEOMS_FAQS } from '@/lib/data'

export const metadata: Metadata = {
  title: 'PrimeOMS — Restaurant Management Software | PrimeSoul Web Solutions',
  description: 'PrimeOMS is an all-in-one restaurant management platform for QR ordering, digital menus, billing, customer engagement and everyday restaurant operations.',
  keywords: [
    'restaurant management software',
    'QR ordering system',
    'digital restaurant menu',
    'restaurant billing software',
    'restaurant CRM',
    'restaurant loyalty software',
    'restaurant management system India',
    'PrimeOMS',
    'PrimeSoul Web Solutions',
  ],
  alternates: {
    canonical: 'https://primesoul.tech/primeoms',
  },
  openGraph: {
    title: 'PrimeOMS — Restaurant Management Software | PrimeSoul Web Solutions',
    description: 'PrimeOMS brings restaurant operations into one powerful platform — QR ordering, live kitchen tracking, direct UPI billing, and customer loyalty rewards.',
    url: 'https://primesoul.tech/primeoms',
    siteName: 'PrimeSoul Web Solutions',
    images: [
      {
        url: 'https://primesoul.tech/images/primeoms-hero-mockup.jpg',
        width: 1200,
        height: 630,
        alt: 'PrimeOMS Restaurant Operations Platform by PrimeSoul',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PrimeOMS — Restaurant Management Software | PrimeSoul Web Solutions',
    description: 'All-in-one restaurant operations platform for QR ordering, digital menus, billing, customer engagement and kitchen management.',
    images: ['https://primesoul.tech/images/primeoms-hero-mockup.jpg'],
  },
}

export default function PrimeOMSPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://primesoul.tech/primeoms#software',
        name: 'PrimeOMS',
        operatingSystem: 'Web, iOS, Android',
        applicationCategory: 'BusinessApplication',
        description: 'PrimeOMS is an all-in-one restaurant management platform for QR ordering, digital menus, billing, customer engagement and everyday restaurant operations.',
        url: 'https://primesoul.tech/primeoms',
        sameAs: ['https://primeoms.vercel.app/'],
        image: 'https://primesoul.tech/images/primeoms-hero-mockup.jpg',
        creator: {
          '@type': 'Organization',
          '@id': 'https://primesoul.tech/#organization',
          name: 'PrimeSoul Web Solutions',
          url: 'https://primesoul.tech',
        },
        offers: [
          {
            '@type': 'Offer',
            name: 'Basic Plan',
            price: '799',
            priceCurrency: 'INR',
            priceValidUntil: '2027-12-31',
            availability: 'https://schema.org/InStock',
            url: 'https://primesoul.tech/primeoms#pricing',
          },
          {
            '@type': 'Offer',
            name: 'Pro Plan',
            price: '1499',
            priceCurrency: 'INR',
            priceValidUntil: '2027-12-31',
            availability: 'https://schema.org/InStock',
            url: 'https://primesoul.tech/primeoms#pricing',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://primesoul.tech/primeoms#faq',
        mainEntity: PRIMEOMS_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://primesoul.tech',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Products',
            item: 'https://primesoul.tech/primeoms',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'PrimeOMS',
            item: 'https://primesoul.tech/primeoms',
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-white">
        <PrimeOMSHero />
        <PrimeOMSPainPoints />
        <PrimeOMSFeatureTabs />
        <PrimeOMSFeatureGrid />
        <PrimeOMSWorkflow />
        <PrimeOMSWhyUs />
        <PrimeOMSPricing />
        <PrimeOMSBuiltByPrimeSoul />
        <PrimeOMSFAQ />
        <PrimeOMSCTA />
      </main>
    </>
  )
}
