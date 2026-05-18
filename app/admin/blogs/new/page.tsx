'use client'
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { collection, addDoc, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Save, ArrowLeft, Eye } from 'lucide-react'

const categories = ['Web Design', 'Development', 'SEO', 'Digital Marketing', 'Business Tips', 'Case Study']

export default function BlogEditor() {
  const router = useRouter()
  const params = useParams()
  const isEdit = params?.id && params.id !== 'new'

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: categories[0],
    thumbnail: '',
    metaTitle: '',
    metaDescription: '',
    status: 'draft' as 'draft' | 'published',
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isEdit) {
      getDoc(doc(db, 'blogs', params.id as string)).then(snap => {
        if (snap.exists()) setForm(snap.data() as typeof form)
      })
    }
  }, [isEdit, params.id])

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const handleTitleChange = (title: string) => {
    setForm(prev => ({ ...prev, title, slug: generateSlug(title) }))
  }

  const handleSave = async (status: 'draft' | 'published') => {
    if (!form.title || !form.content) return alert('Title and content are required!')
    setSaving(true)
    try {
      const data = {
        ...form,
        status,
        slug: form.slug || generateSlug(form.title),
        metaTitle: form.metaTitle || form.title,
        metaDescription: form.metaDescription || form.excerpt,
        updatedAt: serverTimestamp(),
      }
      if (isEdit) {
        await updateDoc(doc(db, 'blogs', params.id as string), data)
      } else {
        await addDoc(collection(db, 'blogs'), { ...data, createdAt: serverTimestamp() })
      }
      router.push('/admin/blogs')
    } catch (err) {
      alert('Error saving post. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 text-[#7A7A9E] hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-white text-2xl font-bold">{isEdit ? 'Edit Post' : 'New Blog Post'}</h1>
            <p className="text-[#4A4A6A] text-sm mt-1">Write and publish your content</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="px-5 py-2.5 bg-[#161640] border border-white/10 text-white text-sm font-medium rounded-xl hover:border-white/20 transition-all disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
          >
            {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
            Publish
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-6 space-y-5">

            <div>
              <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Post Title *</label>
              <input
                value={form.title}
                onChange={e => handleTitleChange(e.target.value)}
                placeholder="Enter an engaging title..."
                className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-lg placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all"
              />
            </div>

            <div>
              <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">URL Slug</label>
              <div className="flex items-center bg-[#0E0E2C] border border-white/10 rounded-xl overflow-hidden">
                <span className="px-4 text-[#4A4A6A] text-sm">/blog/</span>
                <input
                  value={form.slug}
                  onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))}
                  className="flex-1 bg-transparent py-3 pr-4 text-white text-sm focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Excerpt (Short Description)</label>
              <textarea
                value={form.excerpt}
                onChange={e => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Write a short summary (shown in blog listing)..."
                rows={2}
                className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Content *</label>
              <textarea
                value={form.content}
                onChange={e => setForm(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Write your full blog post here... (Markdown supported)"
                rows={20}
                className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all resize-y font-mono"
              />
              <p className="text-[#4A4A6A] text-xs mt-1">Markdown supported: **bold**, *italic*, ## Heading, [link](url)</p>
            </div>
          </div>

          {/* SEO Section */}
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-6 space-y-5">
            <h3 className="text-white font-semibold">SEO Settings</h3>
            <div>
              <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Meta Title</label>
              <input
                value={form.metaTitle}
                onChange={e => setForm(prev => ({ ...prev, metaTitle: e.target.value }))}
                placeholder="SEO title (defaults to post title)"
                className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all"
              />
            </div>
            <div>
              <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Meta Description</label>
              <textarea
                value={form.metaDescription}
                onChange={e => setForm(prev => ({ ...prev, metaDescription: e.target.value }))}
                placeholder="SEO description (defaults to excerpt)"
                rows={2}
                className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-6 space-y-5">
            <h3 className="text-white font-semibold">Post Settings</h3>

            <div>
              <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Category</label>
              <select
                value={form.category}
                onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#7B2FF2] transition-all"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Thumbnail URL</label>
              <input
                value={form.thumbnail}
                onChange={e => setForm(prev => ({ ...prev, thumbnail: e.target.value }))}
                placeholder="https://... (image URL)"
                className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all"
              />
              {form.thumbnail && (
                <img src={form.thumbnail} alt="Thumbnail" className="mt-3 w-full h-32 object-cover rounded-xl" />
              )}
              <p className="text-[#4A4A6A] text-xs mt-1">Upload to imgur.com or imgbb.com (free) and paste URL</p>
            </div>
          </div>

          <div className="bg-[#161640] border border-white/5 rounded-2xl p-6">
            <p className="text-[#7A7A9E] text-xs mb-3">Quick Actions</p>
            <div className="space-y-2">
              <button
                onClick={() => handleSave('draft')}
                className="w-full py-2.5 bg-white/5 border border-white/10 text-white text-sm rounded-xl hover:border-white/20 transition-all"
              >
                Save as Draft
              </button>
              <button
                onClick={() => handleSave('published')}
                className="w-full py-2.5 bg-[#7B2FF2] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all"
              >
                Publish Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
