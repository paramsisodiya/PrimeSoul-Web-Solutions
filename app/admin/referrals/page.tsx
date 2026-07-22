'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Gift, Users } from 'lucide-react'

interface Referral {
  id: string
  code: string
  referrerName: string
  referrerEmail: string
  usageCount: number
  createdAt: { toDate: () => Date } | null
}

interface LeadWithReferral {
  id: string
  name: string
  email: string
  referralCode: string
  createdAt: { toDate: () => Date } | null
}

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [referredLeads, setReferredLeads] = useState<LeadWithReferral[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch referral codes from 'referrals' collection
        const refSnap = await getDocs(query(collection(db, 'referrals'), orderBy('createdAt', 'desc')))
        setReferrals(refSnap.docs.map(d => ({ id: d.id, ...d.data() } as Referral)))

        // Also fetch leads that used a referral code
        const leadsSnap = await getDocs(query(collection(db, 'leads'), orderBy('createdAt', 'desc')))
        const leadsWithRef = leadsSnap.docs
          .map(d => ({ id: d.id, ...d.data() } as LeadWithReferral))
          .filter(l => l.referralCode && l.referralCode.trim() !== '')
        setReferredLeads(leadsWithRef)
      } catch (err) {
        console.error('Error fetching referrals:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-[#7B2FF2] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-white text-2xl font-bold">Referrals</h1>
        <p className="text-[#4A4A6A] text-sm mt-1">Track referral program usage and conversions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-5">
          <p className="text-[#4A4A6A] text-xs uppercase tracking-wider mb-1">Total Referral Codes</p>
          <p className="text-white text-2xl font-bold">{referrals.length}</p>
        </div>
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-5">
          <p className="text-[#4A4A6A] text-xs uppercase tracking-wider mb-1">Leads from Referrals</p>
          <p className="text-white text-2xl font-bold">{referredLeads.length}</p>
        </div>
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-5">
          <p className="text-[#4A4A6A] text-xs uppercase tracking-wider mb-1">Unique Codes Used</p>
          <p className="text-white text-2xl font-bold">{new Set(referredLeads.map(l => l.referralCode)).size}</p>
        </div>
      </div>

      {/* Referral Codes */}
      {referrals.length > 0 && (
        <div>
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Gift size={18} className="text-[#7B2FF2]" /> Referral Codes
          </h2>
          <div className="bg-[#161640] border border-white/5 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-[#4A4A6A] font-medium px-5 py-3">Code</th>
                  <th className="text-left text-[#4A4A6A] font-medium px-5 py-3">Referrer</th>
                  <th className="text-left text-[#4A4A6A] font-medium px-5 py-3">Usage</th>
                  <th className="text-left text-[#4A4A6A] font-medium px-5 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map(ref => (
                  <tr key={ref.id} className="border-b border-white/5 last:border-0">
                    <td className="px-5 py-3 text-[#7B2FF2] font-mono font-semibold">{ref.code}</td>
                    <td className="px-5 py-3 text-white">{ref.referrerName || ref.referrerEmail || '—'}</td>
                    <td className="px-5 py-3 text-white">{ref.usageCount || 0}</td>
                    <td className="px-5 py-3 text-[#4A4A6A]">
                      {ref.createdAt?.toDate?.()?.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Leads with Referral Codes */}
      <div>
        <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Users size={18} className="text-[#7B2FF2]" /> Referred Leads
        </h2>
        {referredLeads.length === 0 ? (
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-12 text-center">
            <Gift size={40} className="text-[#4A4A6A] mx-auto mb-4" />
            <p className="text-[#7A7A9E] mb-2">No referred leads yet</p>
            <p className="text-[#4A4A6A] text-sm">When leads use a referral code, they&apos;ll appear here</p>
          </div>
        ) : (
          <div className="bg-[#161640] border border-white/5 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-[#4A4A6A] font-medium px-5 py-3">Lead Name</th>
                  <th className="text-left text-[#4A4A6A] font-medium px-5 py-3">Email</th>
                  <th className="text-left text-[#4A4A6A] font-medium px-5 py-3">Referral Code</th>
                  <th className="text-left text-[#4A4A6A] font-medium px-5 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {referredLeads.map(lead => (
                  <tr key={lead.id} className="border-b border-white/5 last:border-0">
                    <td className="px-5 py-3 text-white">{lead.name}</td>
                    <td className="px-5 py-3 text-white/80">{lead.email}</td>
                    <td className="px-5 py-3 text-[#7B2FF2] font-mono font-semibold">{lead.referralCode}</td>
                    <td className="px-5 py-3 text-[#4A4A6A]">
                      {lead.createdAt?.toDate?.()?.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
