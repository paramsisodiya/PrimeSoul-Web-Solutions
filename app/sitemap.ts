import { MetadataRoute } from 'next'
import { getAllServiceSlugs } from '@/lib/service-pages'

export const revalidate = 86400 // Revalidate daily

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://primesoul.tech'
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID

  const servicePages = getAllServiceSlugs().map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  let blogUrls: MetadataRoute.Sitemap = []
  let portfolioUrls: MetadataRoute.Sitemap = []

  if (projectId) {
    // Fetch Blogs via REST API to avoid hanging on Vercel build
    try {
      const blogsRes = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/blogs`, { next: { revalidate: 86400 } })
      if (blogsRes.ok) {
        const blogsData = await blogsRes.json()
        if (blogsData.documents) {
          blogsData.documents.forEach((doc: any) => {
            const fields = doc.fields
            if (fields?.status?.stringValue === 'published' && fields?.slug?.stringValue) {
              const updatedAt = fields.updatedAt?.timestampValue || fields.createdAt?.timestampValue || new Date().toISOString()
              blogUrls.push({
                url: `${baseUrl}/blog/${fields.slug.stringValue}`,
                lastModified: new Date(updatedAt),
                changeFrequency: 'monthly' as const,
                priority: 0.7,
              })
            }
          })
        }
      }
    } catch (err) {
      console.error('Error fetching blogs for sitemap', err)
    }

    // Fetch Portfolio via REST API
    try {
      const portfolioRes = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/portfolio`, { next: { revalidate: 86400 } })
      if (portfolioRes.ok) {
        const portfolioData = await portfolioRes.json()
        if (portfolioData.documents) {
          portfolioData.documents.forEach((doc: any) => {
            const fields = doc.fields
            if (fields?.slug?.stringValue) {
              const updatedAt = fields.updatedAt?.timestampValue || fields.createdAt?.timestampValue || new Date().toISOString()
              portfolioUrls.push({
                url: `${baseUrl}/portfolio/${fields.slug.stringValue}`,
                lastModified: new Date(updatedAt),
                changeFrequency: 'yearly' as const,
                priority: 0.8,
              })
            }
          })
        }
      }
    } catch (err) {
      console.error('Error fetching portfolio for sitemap', err)
    }
  }

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...servicePages,
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...portfolioUrls,
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...blogUrls,
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
