'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Star, Check, Trash2, MessageSquare } from 'lucide-react'

interface TestimonialRequest {
  id: string
  name: string
  company: string
  rating: number
  testimonial: string
  submittedAt: { toDate: () => Date } | null
  approved: boolean
}

export default function TestimonialRequestsPage() {
  const [requests, setRequests] = useState<TestimonialRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)

  const fetchRequests = async () => {
    try {
      const snap = await getDocs(query(collection(db, 'testimonial_requests'), orderBy('submittedAt', 'desc')))
      setRequests(snap.docs.map(d => ({ id: d.id, ...d.data() } as TestimonialRequest)))
    } catch (err) {
      console.error('Error fetching testimonial requests:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRequests() }, [])

  const approveRequest = async (req: TestimonialRequest) => {
    setProcessingId(req.id)
    try {
      // Copy to main testimonials collection
      await addDoc(collection(db, 'testimonials'), {
        name: req.name,
        company: req.company,
        rating: req.rating,
        text: req.testimonial,
        visible: true,
        source: 'submitted',
        createdAt: serverTimestamp(),
      })
      // Delete from requests
      await deleteDoc(doc(db, 'testimonial_requests', req.id))
      setRequests(prev => prev.filter(r => r.id !== req.id))
    } catch (err) {
      console.error('Error approving testimonial:', err)
    } finally {
      setProcessingId(null)
    }
  }

  const deleteRequest = async (id: string) => {
    setProcessingId(id)
    try {
      await deleteDoc(doc(db, 'testimonial_requests', id))
      setRequests(prev => prev.filter(r => r.id !== id))
    } catch (err) {
      console.error('Error deleting request:', err)
    } finally {
      setProcessingId(null)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-[#7B2FF2] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white text-2xl font-bold">Testimonial Requests</h1>
        <p className="text-[#4A4A6A] text-sm mt-1">{requests.length} pending review</p>
      </div>

      {requests.length === 0 ? (
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-12 text-center">
          <MessageSquare size={40} className="text-[#4A4A6A] mx-auto mb-4" />
          <p className="text-[#7A7A9E] mb-2">No testimonial requests yet</p>
          <p className="text-[#4A4A6A] text-sm">When clients submit testimonials, they&apos;ll appear here for review</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map(req => (
            <div key={req.id} className="bg-[#161640] border border-white/5 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white font-semibold">{req.name}</h3>
                  {req.company && <p className="text-[#4A4A6A] text-xs mt-0.5">{req.company}</p>}
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} size={14} fill={s <= req.rating ? '#F59E0B' : 'none'} stroke={s <= req.rating ? '#F59E0B' : '#4A4A6A'} />
                  ))}
                </div>
              </div>

              <p className="text-white/80 text-sm leading-relaxed mb-4">&quot;{req.testimonial}&quot;</p>

              <div className="flex items-center justify-between">
                <span className="text-[#4A4A6A] text-xs">
                  {req.submittedAt?.toDate?.()
                    ? req.submittedAt.toDate().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                    : 'Recently'}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => approveRequest(req)}
                    disabled={processingId === req.id}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-green-600 text-white hover:bg-green-700 transition-all disabled:opacity-50"
                  >
                    <Check size={14} /> Approve
                  </button>
                  <button
                    onClick={() => deleteRequest(req.id)}
                    disabled={processingId === req.id}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all disabled:opacity-50"
                  >
                    <Trash2 size={14} /> Delete
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
