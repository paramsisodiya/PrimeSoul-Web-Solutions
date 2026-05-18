'use client'
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc, orderBy, query, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Plus, Pencil, Trash2, Eye, EyeOff, FileText } from 'lucide-react'

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  status: 'published' | 'draft'
  thumbnail: string
  createdAt: Timestamp
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBlogs = async () => {
    const snap = await getDocs(query(collection(db, 'blogs'), orderBy('createdAt', 'desc')))
    setBlogs(snap.docs.map(d => ({ id: d.id, ...d.data() } as Blog)))
    setLoading(false)
  }

  useEffect(() => { fetchBlogs() }, [])

  const deleteBlog = async (id: string) => {
    if (!confirm('Delete this blog post?')) return
    await deleteDoc(doc(db, 'blogs', id))
    setBlogs(prev => prev.filter(b => b.id !== id))
  }

  const formatDate = (ts: Timestamp) => {
    if (!ts) return '—'
    return ts.toDate().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-[#7B2FF2] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">Blog Posts</h1>
          <p className="text-[#4A4A6A] text-sm mt-1">{blogs.length} posts total</p>
        </div>
        <a
          href="/admin/blogs/new"
          className="flex items-center gap-2 bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all"
        >
          <Plus size={16} />
          New Post
        </a>
      </div>

      {blogs.length === 0 ? (
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-12 text-center">
          <FileText size={40} className="text-[#4A4A6A] mx-auto mb-4" />
          <p className="text-white font-semibold mb-2">No blog posts yet</p>
          <p className="text-[#4A4A6A] text-sm mb-6">Write your first post to attract more visitors</p>
          <a href="/admin/blogs/new" className="bg-[#7B2FF2] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-all">
            Write First Post
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {blogs.map(blog => (
            <div key={blog.id} className="bg-[#161640] border border-white/5 rounded-2xl p-5 flex items-center gap-5 hover:border-white/10 transition-all">
              {blog.thumbnail ? (
                <img src={blog.thumbnail} alt={blog.title} className="w-16 h-16 object-cover rounded-xl flex-shrink-0" />
              ) : (
                <div className="w-16 h-16 bg-[#7B2FF2]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-[#7B2FF2]" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <p className="text-white font-semibold truncate">{blog.title}</p>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium flex-shrink-0 ${blog.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                    {blog.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-[#7A7A9E] text-sm truncate">{blog.excerpt}</p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-[#7B2FF2] text-xs">{blog.category}</span>
                  <span className="text-[#4A4A6A] text-xs">{formatDate(blog.createdAt)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {blog.status === 'published' && (
                  <a href={`/blog/${blog.slug}`} target="_blank" className="p-2 text-[#7A7A9E] hover:text-white transition-colors">
                    <Eye size={16} />
                  </a>
                )}
                <a href={`/admin/blogs/${blog.id}`} className="p-2 text-[#7A7A9E] hover:text-[#7B2FF2] transition-colors">
                  <Pencil size={16} />
                </a>
                <button onClick={() => deleteBlog(blog.id)} className="p-2 text-[#7A7A9E] hover:text-red-400 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
