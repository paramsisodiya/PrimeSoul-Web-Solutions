import { MetadataRoute } from 'next'
import { getAllServiceSlugs } from '@/lib/service-pages'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const revalidate = 86400 // Revalidate daily

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://primesoul.tech'

  const servicePages = getAllServiceSlugs().map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  let blogUrls: MetadataRoute.Sitemap = []
  try {
    const blogsSnap = await getDocs(query(collection(db, 'blogs'), where('status', '==', 'published')))
    blogUrls = blogsSnap.docs.map(doc => {
      const data = doc.data()
      return {
        url: `${baseUrl}/blog/${data.slug}`,
        lastModified: data.updatedAt ? data.updatedAt.toDate() : (data.createdAt ? data.createdAt.toDate() : new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }
    })
  } catch (err) {
    console.error('Error fetching blogs for sitemap', err)
  }

  let portfolioUrls: MetadataRoute.Sitemap = []
  try {
    const portfolioSnap = await getDocs(collection(db, 'portfolio'))
    portfolioUrls = portfolioSnap.docs.map(doc => {
      const data = doc.data()
      return {
        url: `${baseUrl}/portfolio/${data.slug}`,
        lastModified: data.updatedAt ? data.updatedAt.toDate() : (data.createdAt ? data.createdAt.toDate() : new Date()),
        changeFrequency: 'yearly' as const,
        priority: 0.8,
      }
    })
  } catch (err) {
    console.error('Error fetching portfolio for sitemap', err)
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
