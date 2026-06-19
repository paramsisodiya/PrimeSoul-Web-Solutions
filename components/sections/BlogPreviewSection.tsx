'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage?: string
  category?: string
  readingTime?: string
  publishedAt?: { toDate?: () => Date }
  author?: string
  published?: boolean
}

export default function BlogPreviewSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const snap = await getDocs(
          query(
            collection(db, 'blogs'),
            orderBy('createdAt', 'desc')
          )
        )
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() } as BlogPost))
        const publishedPosts = items.filter(post => post.published === true || (post as any).status === 'published')
        setPosts(publishedPosts.slice(0, 3))
      } catch (err) {
        console.error('Error fetching blog posts:', err)
        setPosts([])
      }
    }
    fetchPosts()
  }, [])

  // Don't render section if no posts
  if (posts.length === 0) return null

  return (
    <section className="py-20 sm:py-28 mesh-gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="flex items-end justify-between mb-12">
          <div>
            <SectionLabel>From the Blog</SectionLabel>
            <h2
              className="text-[1.6rem] sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em]"
              style={{ color: '#0E0E2C' }}
            >
              Latest{' '}
              <span className="text-gradient-purple font-display italic">Insights</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:gap-3 transition-all"
          >
            View all posts
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <AnimatedSection key={post.id} delay={i * 80}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <article className="rounded-3xl overflow-hidden bg-white border border-surface-border transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 card-glow-hover h-full flex flex-col">
                  {/* Image */}
                  {post.coverImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                      {post.category && (
                        <span
                          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
                          style={{ background: 'rgba(123,47,242,0.8)', backdropFilter: 'blur(8px)' }}
                        >
                          {post.category}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3 text-xs text-ink-muted">
                      {post.publishedAt?.toDate && (
                        <time>
                          {post.publishedAt.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </time>
                      )}
                      {post.readingTime && (
                        <>
                          <span>•</span>
                          <span>{post.readingTime} read</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-ink mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-ink-muted leading-relaxed line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-primary group-hover:gap-3 transition-all">
                      Read more
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* Mobile view all link */}
        <AnimatedSection className="mt-8 text-center sm:hidden">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary">
            View all posts →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
