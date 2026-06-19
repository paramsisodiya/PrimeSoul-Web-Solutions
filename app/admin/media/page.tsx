'use client'
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react'
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp, orderBy, query, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Image from 'next/image'
import { Plus, Trash2, Copy, Image as ImageIcon, ExternalLink, X, Check } from 'lucide-react'

interface MediaItem {
  id: string
  url: string
  name: string
  type: string
  createdAt: Timestamp
}

export default function MediaPage() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [newUrl, setNewUrl] = useState('')
  const [newName, setNewName] = useState('')
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [preview, setPreview] = useState<MediaItem | null>(null)

  const fetchItems = async () => {
    const snap = await getDocs(query(collection(db, 'media'), orderBy('createdAt', 'desc')))
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as MediaItem)))
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

  const handleAdd = async () => {
    if (!newUrl) return alert('Please enter an image URL!')
    if (!newUrl.startsWith('http')) return alert('Please enter a valid URL starting with http or https')
    setSaving(true)
    try {
      await addDoc(collection(db, 'media'), {
        url: newUrl,
        name: newName || newUrl.split('/').pop() || 'image',
        type: 'image',
        createdAt: serverTimestamp(),
      })
      setNewUrl('')
      setNewName('')
      setShowAdd(false)
      fetchItems()
    } finally { setSaving(false) }
  }

  const deleteItem = async (id: string) => {
    if (!confirm('Remove this image from library?')) return
    await deleteDoc(doc(db, 'media', id))
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(null), 2000)
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
          <h1 className="text-white text-2xl font-bold">Media Library</h1>
          <p className="text-[#4A4A6A] text-sm mt-1">{items.length} images stored</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all">
          <Plus size={16} /> Add Image URL
        </button>
      </div>

      {/* Upload guide */}
      <div className="bg-[#161640] border border-white/5 rounded-2xl p-5">
        <p className="text-white text-sm font-semibold mb-3">📤 How to upload images (Free)</p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: 'ImgBB', url: 'https://imgbb.com', desc: 'Free, no account needed, permanent links' },
            { name: 'Imgur', url: 'https://imgur.com', desc: 'Popular, reliable, great for blog images' },
            { name: 'Cloudinary', url: 'https://cloudinary.com', desc: '25GB free, auto-optimization, best quality' },
          ].map(s => (
            <a key={s.name} href={s.url} target="_blank" className="flex items-start gap-3 p-3 bg-[#0E0E2C] rounded-xl hover:border-[#7B2FF2]/30 border border-white/5 transition-all group">
              <ExternalLink size={16} className="text-[#7B2FF2] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-sm font-medium group-hover:text-[#7B2FF2] transition-colors">{s.name}</p>
                <p className="text-[#4A4A6A] text-xs">{s.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Add URL Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-[#161640] border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg">Add Image to Library</h3>
              <button onClick={() => setShowAdd(false)} className="text-[#7A7A9E] hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Image URL *</label>
                <input
                  value={newUrl}
                  onChange={e => setNewUrl(e.target.value)}
                  placeholder="https://i.ibb.co/... or https://imgur.com/..."
                  className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all"
                />
              </div>
              <div>
                <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Image Name (optional)</label>
                <input
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. hero-banner, client-logo"
                  className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all"
                />
              </div>
              {newUrl && newUrl.startsWith('http') && (
                <div className="relative rounded-xl overflow-hidden border border-white/10 w-full h-32">
                  <Image src={newUrl} alt="Preview" fill className="object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAdd(false)} className="flex-1 py-3 bg-white/5 border border-white/10 text-white text-sm rounded-xl hover:border-white/20 transition-all">Cancel</button>
              <button onClick={handleAdd} disabled={saving} className="flex-1 py-3 bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white text-sm font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Plus size={16} />}
                Add to Library
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <div className="max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-white font-medium">{preview.name}</p>
              <button onClick={() => setPreview(null)} className="text-[#7A7A9E] hover:text-white"><X size={24} /></button>
            </div>
            <div className="relative w-full h-[60vh] max-h-[70vh]">
              <Image src={preview.url} alt={preview.name ?? 'Preview image'} fill className="rounded-2xl object-contain" />
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => copyUrl(preview.url)} className="flex-1 py-3 bg-[#161640] border border-white/10 text-white text-sm rounded-xl hover:border-[#7B2FF2]/30 transition-all flex items-center justify-center gap-2">
                {copied === preview.url ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                {copied === preview.url ? 'Copied!' : 'Copy URL'}
              </button>
              <a href={preview.url} target="_blank" className="py-3 px-5 bg-[#161640] border border-white/10 text-white text-sm rounded-xl hover:border-white/20 transition-all flex items-center gap-2">
                <ExternalLink size={16} /> Open
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      {items.length === 0 ? (
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-12 text-center">
          <ImageIcon size={40} aria-hidden="true" className="text-[#4A4A6A] mx-auto mb-4" />
          <p className="text-white font-semibold mb-2">No images in library</p>
          <p className="text-[#4A4A6A] text-sm mb-6">Upload images to ImgBB or Imgur and paste the URL here</p>
          <button onClick={() => setShowAdd(true)} className="bg-[#7B2FF2] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-all">Add First Image</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map(item => (
            <div key={item.id} className="group relative bg-[#161640] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all">
              <div className="relative aspect-square cursor-pointer" onClick={() => setPreview(item)}>
                <Image src={item.url} alt={item.name ?? 'Library image'} fill className="object-cover group-hover:scale-105 transition-transform duration-300" onError={e => (e.currentTarget.style.display = 'none')} />
              </div>
              <div className="p-3">
                <p className="text-white text-xs font-medium truncate">{item.name}</p>
                <div className="flex items-center gap-1 mt-2">
                  <button onClick={() => copyUrl(item.url)} className="flex-1 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[#7A7A9E] hover:text-[#7B2FF2] transition-colors flex items-center justify-center gap-1 text-xs">
                    {copied === item.url ? <Check size={10} className="text-green-400" /> : <Copy size={10} />}
                    {copied === item.url ? 'Copied' : 'Copy'}
                  </button>
                  <button onClick={() => deleteItem(item.id)} className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-[#7A7A9E] hover:text-red-400 hover:border-red-400/30 transition-all">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
