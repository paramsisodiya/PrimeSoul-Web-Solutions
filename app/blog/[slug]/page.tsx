'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, query, where, limit } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  thumbnail: string
  createdAt: any
}

function formatDate(ts: any) {
  if (!ts) return ''
  try { return ts.toDate().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) }
  catch { return '' }
}

function readingTime(content: string) {
  if (!content) return '3 min read'
  return `${Math.ceil(content.split(' ').length / 200)} min read`
}

function renderContent(content: string): string {
  if (!content) return ''
  return content.split('\n\n').map(block => {
    if (block.startsWith('# ')) return `<h1 class="text-3xl font-bold text-[#0E0E2C] mt-10 mb-4">${block.slice(2)}</h1>`
    if (block.startsWith('## ')) return `<h2 class="text-2xl font-bold text-[#0E0E2C] mt-8 mb-3">${block.slice(3)}</h2>`
    if (block.startsWith('### ')) return `<h3 class="text-xl font-bold text-[#0E0E2C] mt-6 mb-3">${block.slice(4)}</h3>`
    if (block.startsWith('> ')) return `<blockquote class="border-l-4 border-[#7B2FF2] pl-5 py-2 my-6 bg-[#7B2FF2]/5 rounded-r-xl"><p class="text-[#7A7A9E] italic">${block.slice(2)}</p></blockquote>`
    return `<p class="text-[#4A4A6A] text-base leading-relaxed mb-4">${block.replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#0E0E2C] font-semibold">$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>')}</p>`
  }).join('\n')
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    const fetchBlog = async () => {
      try {
        const snap = await getDocs(
          query(collection(db, 'blogs'), where('slug', '==', slug), where('status', '==', 'published'), limit(1))
        )
        if (snap.empty) { setNotFound(true); return }
        setBlog({ id: snap.docs[0].id, ...snap.docs[0].data() } as Blog)
      } catch (err) {
        console.error(err)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [slug])

  if (loading) return (
    <div className="min-h-screen bg-[#FAFAFE] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#7B2FF2] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (notFound || !blog) return (
    <div className="min-h-screen bg-[#FAFAFE] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-[#0E0E2C] mb-4">Blog Post Not Found</h1>
      <Link href="/blog" className="text-[#7B2FF2] hover:underline">← Back to Blog</Link>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#FAFAFE]">
      <section className="bg-[#0E0E2C] pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7B2FF2] opacity-10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#7A7A9E] hover:text-[#7B2FF2] transition-colors text-sm mb-8">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-bold text-[#7B2FF2] bg-[#7B2FF2]/20 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Tag size={11} /> {blog.category}
            </span>
            <span className="text-[#4A4A6A] text-xs flex items-center gap-1.5"><Calendar size={12} /> {formatDate(blog.createdAt)}</span>
            <span className="text-[#4A4A6A] text-xs flex items-center gap-1.5"><Clock size={12} /> {readingTime(blog.content)}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">{blog.title}</h1>
          <p className="text-[#7A7A9E] text-lg leading-relaxed max-w-3xl">{blog.excerpt}</p>
        </div>
      </section>

      {blog.thumbnail && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-12">
          <img src={blog.thumbnail} alt={blog.title} className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-2xl shadow-2xl" />
        </div>
      )}

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div dangerouslySetInnerHTML={{ __html: renderContent(blog.content) }} />
      </article>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white border border-[#E8E5F5] rounded-2xl p-6 flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7B2FF2] to-[#E879F9] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">P</div>
          <div>
            <p className="text-[#0E0E2C] font-bold text-lg">Param Sisodiya</p>
            <p className="text-[#7B2FF2] text-sm font-medium mb-2">Founder, PrimeSoul Web Solutions</p>
            <p className="text-[#7A7A9E] text-sm leading-relaxed">Web designer and developer passionate about building premium digital experiences for Indian businesses.</p>
          </div>
        </div>
      </div>

      <section className="py-16 bg-[#0E0E2C]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Build Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B2FF2] to-[#E879F9]">Dream Website?</span>
          </h2>
          <p className="text-[#7A7A9E] text-base mb-8">Let's turn your vision into a premium digital experience.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/30">
            Start a Project <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  )
}