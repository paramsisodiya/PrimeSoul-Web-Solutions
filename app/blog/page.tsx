'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, FileText } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  thumbnail: string
  content: string
  createdAt: any
}

function formatDate(ts: any) {
  if (!ts) return ''
  try { return ts.toDate().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) }
  catch { return '' }
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'blogs'), orderBy('createdAt', 'desc')))
        const all = snap.docs.map(d => ({ id: d.id, ...d.data() } as Blog))
        setBlogs(all.filter(b => (b as any).status === 'published'))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  return (
    <main className="min-h-screen bg-[#FAFAFE]">
      <section className="bg-[#0E0E2C] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7B2FF2] opacity-10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <SectionLabel text="INSIGHTS & GUIDES" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            The PrimeSoul{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B2FF2] to-[#E879F9]">Blog</span>
          </h1>
          <p className="text-[#7A7A9E] text-lg max-w-2xl mx-auto">
            Web design tips, development guides, SEO strategies — written for Indian businesses.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-2 border-[#7B2FF2] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 bg-[#7B2FF2]/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FileText size={36} className="text-[#7B2FF2]" />
              </div>
              <h2 className="text-2xl font-bold text-[#0E0E2C] mb-3">Blog Coming Soon</h2>
              <p className="text-[#7A7A9E] text-base max-w-md mx-auto mb-8">
                We're working on insightful articles. Check back soon!
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-all text-sm">
                Work With Us <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <>
              <AnimatedSection className="mb-16">
                <Link href={`/blog/${blogs[0].slug}`} className="group block">
                  <div className="grid lg:grid-cols-2 gap-0 bg-white border border-[#E8E5F5] rounded-3xl overflow-hidden shadow-lg hover:shadow-xl hover:border-[#7B2FF2]/20 transition-all duration-300">
                    <div className="relative overflow-hidden h-64 lg:h-auto">
                      {blogs[0].thumbnail ? (
                        <img src={blogs[0].thumbnail} alt={blogs[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#7B2FF2]/20 to-[#E879F9]/20 flex items-center justify-center">
                          <FileText size={48} className="text-[#7B2FF2]" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#7B2FF2] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Featured</span>
                      </div>
                    </div>
                    <div className="p-8 lg:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-semibold text-[#7B2FF2] bg-[#7B2FF2]/10 px-3 py-1 rounded-full">{blogs[0].category}</span>
                        <span className="text-[#7A7A9E] text-xs flex items-center gap-1"><Calendar size={12} />{formatDate(blogs[0].createdAt)}</span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-[#0E0E2C] leading-tight mb-4 group-hover:text-[#7B2FF2] transition-colors">{blogs[0].title}</h2>
                      <p className="text-[#7A7A9E] text-base leading-relaxed mb-6 line-clamp-3">{blogs[0].excerpt}</p>
                      <div className="flex items-center gap-2 text-[#7B2FF2] font-semibold text-sm group-hover:gap-4 transition-all">Read Article <ArrowRight size={16} /></div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
              {blogs.length > 1 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {blogs.slice(1).map((blog, i) => (
                    <AnimatedSection key={blog.id} delay={i * 0.1}>
                      <Link href={`/blog/${blog.slug}`} className="group block h-full">
                        <article className="h-full bg-white border border-[#E8E5F5] rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#7B2FF2]/20 transition-all duration-300 flex flex-col">
                          <div className="relative overflow-hidden h-48">
                            {blog.thumbnail ? (
                              <img src={blog.thumbnail} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-[#7B2FF2]/10 to-[#E879F9]/10 flex items-center justify-center">
                                <FileText size={36} className="text-[#7B2FF2]" />
                              </div>
                            )}
                            <div className="absolute top-3 left-3">
                              <span className="bg-white/90 text-[#7B2FF2] text-xs font-bold px-2.5 py-1 rounded-full">{blog.category}</span>
                            </div>
                          </div>
                          <div className="p-6 flex flex-col flex-1">
                            <span className="text-[#7A7A9E] text-xs flex items-center gap-1 mb-3"><Calendar size={11} />{formatDate(blog.createdAt)}</span>
                            <h3 className="text-[#0E0E2C] font-bold text-lg leading-tight mb-3 group-hover:text-[#7B2FF2] transition-colors line-clamp-2">{blog.title}</h3>
                            <p className="text-[#7A7A9E] text-sm leading-relaxed line-clamp-3 flex-1">{blog.excerpt}</p>
                            <div className="flex items-center gap-2 text-[#7B2FF2] font-semibold text-sm mt-4">Read More <ArrowRight size={14} /></div>
                          </div>
                        </article>
                      </Link>
                    </AnimatedSection>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="py-16 bg-[#0E0E2C]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Want a Website That Actually{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B2FF2] to-[#E879F9]">Converts?</span>
          </h2>
          <p className="text-[#7A7A9E] text-base mb-8">Let's build something extraordinary together.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/30">
            Start a Project <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  )
}