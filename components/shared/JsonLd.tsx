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
          url: 'https://primesoul.tech/favicon.png',
        },
        description: 'PrimeSoul builds premium websites, web applications, and digital experiences for businesses that understand the value of quality.',
        foundingDate: '2024',
        founder: {
          '@type': 'Person',
          name: 'Param Sisodiya',
          jobTitle: 'Founder & Lead Developer',
          url: 'https://primesoul.tech/about',
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
          email: 'paramsisodiya061@gmail.com',
          availableLanguage: ['English', 'Hindi'],
        },
        sameAs: [
          'https://www.instagram.com/primesoul.tech/',
          'https://wa.me/918770404559',
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
        '@type': 'ProfessionalService',
        '@id': 'https://primesoul.tech/#service',
        name: 'PrimeSoul Digital Agency',
        image: 'https://primesoul.tech/favicon.png',
        url: 'https://primesoul.tech',
        telephone: '+91-8770404559',
        priceRange: '₹₹',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Rajgarh',
          addressRegion: 'Madhya Pradesh',
          addressCountry: 'IN',
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
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Design & Development' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UI/UX Design' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Full-Stack Applications' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO & Performance Optimization' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Identity Design' } },
          ],
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
