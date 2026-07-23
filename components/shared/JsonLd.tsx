import { SERVICE_PAGES } from '@/lib/service-pages'

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://primesoul.tech/#organization',
        name: 'PrimeSoul',
        url: 'https://primesoul.tech',
        logo: {
          '@type': 'ImageObject',
          url: 'https://primesoul.tech/images/logo.png',
        },
        description: 'PrimeSoul builds premium websites, web applications, and digital experiences for businesses that understand the value of quality.',
        foundingDate: '2024',
        founder: {
          '@type': 'Person',
          '@id': 'https://primesoul.tech/#founder',
          name: 'Param Sisodiya',
          jobTitle: 'Founder & Lead Developer',
          url: 'https://primesoul.tech/about',
          image: 'https://primesoul.tech/images/founder.jpg',
          sameAs: [
            'https://github.com/paramsisodiya',
            'https://www.instagram.com/primesoul.tech/',
          ],
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Rajgarh',
          addressRegion: 'Madhya Pradesh',
          addressCountry: 'IN',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-8770404559',
          contactType: 'customer service',
          email: 'primesoulwebsolutions@gmail.com',
          availableLanguage: ['English', 'Hindi'],
        },
        sameAs: [
          'https://www.instagram.com/primesoul.tech/',
          'https://wa.me/918770404559',
          'https://github.com/paramsisodiya',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://primesoul.tech/#website',
        url: 'https://primesoul.tech',
        name: 'PrimeSoul',
        publisher: { '@id': 'https://primesoul.tech/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://primesoul.tech/?s={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://primesoul.tech/#localbusiness',
        name: 'PrimeSoul Web Solutions',
        image: 'https://primesoul.tech/images/logo.png',
        url: 'https://primesoul.tech',
        telephone: '+91-8770404559',
        email: 'primesoulwebsolutions@gmail.com',
        priceRange: '₹₹',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Rajgarh',
          addressRegion: 'Madhya Pradesh',
          postalCode: '465661',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 23.7861,
          longitude: 76.6131,
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '21:00',
        },
        areaServed: [
          { '@type': 'Country', name: 'India' },
          { '@type': 'State', name: 'Madhya Pradesh' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Web Development Services',
          itemListElement: SERVICE_PAGES.map(service => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.title,
              description: service.metaDescription,
              url: `https://primesoul.tech/services/${service.slug}`,
              provider: { '@id': 'https://primesoul.tech/#organization' },
            },
          })),
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.0',
          reviewCount: '3',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'Person',
        '@id': 'https://primesoul.tech/#founder',
        name: 'Param Sisodiya',
        jobTitle: 'Full-Stack Developer & Founder',
        description: 'A self-driven developer and designer from Rajgarh, Madhya Pradesh, building digital products that actually work.',
        url: 'https://primesoul.tech/about',
        worksFor: { '@id': 'https://primesoul.tech/#organization' },
        knowsAbout: ['Web Development', 'UI/UX Design', 'Next.js', 'TypeScript', 'MongoDB', 'React'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Rajgarh',
          addressRegion: 'Madhya Pradesh',
          addressCountry: 'IN',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
