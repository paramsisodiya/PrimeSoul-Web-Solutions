'use client'

import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Shuffle, Check, BarChart2, Trash2, Plus } from 'lucide-react'

interface ABTest {
  id: string
  name: string
  elementId: string
  variants: string[]
  traffic: number[] // percentage distribution
  impressions: number[]
  conversions: number[]
  active: boolean
}

const EMPTY_TEST: ABTest = {
  id: '',
  name: '',
  elementId: '',
  variants: ['', ''],
  traffic: [50, 50],
  impressions: [0, 0],
  conversions: [0, 0],
  active: false,
}

export default function ABTestingPage() {
  const [tests, setTests] = useState<ABTest[]>([])
  const [editing, setEditing] = useState<ABTest | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'ab_tests'))
        if (snap.exists()) {
          const data = snap.data()
          if (data.tests) setTests(data.tests)
        }
      } catch (err) {
        console.error('Error fetching A/B tests:', err)
      }
    }
    fetchTests()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const allTests = editing
        ? tests.find(t => t.id === editing.id)
          ? tests.map(t => t.id === editing.id ? editing : t)
          : [...tests, { ...editing, id: Date.now().toString() }]
        : tests
      await setDoc(doc(db, 'settings', 'ab_tests'), { tests: allTests })
      setTests(allTests)
      setEditing(null)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      console.error('Error saving A/B test:', err)
    } finally {
      setSaving(false)
    }
  }

  const deleteTest = async (id: string) => {
    const updated = tests.filter(t => t.id !== id)
    setTests(updated)
    await setDoc(doc(db, 'settings', 'ab_tests'), { tests: updated })
  }

  const toggleActive = async (id: string) => {
    const updated = tests.map(t => t.id === id ? { ...t, active: !t.active } : t)
    setTests(updated)
    await setDoc(doc(db, 'settings', 'ab_tests'), { tests: updated })
  }

  const getWinRate = (test: ABTest, idx: number) => {
    const total = test.impressions[idx] || 1
    return ((test.conversions[idx] / total) * 100).toFixed(1)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-white text-2xl font-bold">A/B Testing</h1>
          <p className="text-[#4A4A6A] text-sm mt-1">Split test headlines, CTAs, and copy to find what converts best</p>
        </div>
        <button
          onClick={() => setEditing({ ...EMPTY_TEST, id: '' })}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white hover:opacity-90 transition-all"
        >
          <Plus size={16} /> New Test
        </button>
      </div>

      {/* Test list */}
      {tests.length === 0 && !editing && (
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-12 text-center">
          <Shuffle size={40} className="text-[#4A4A6A] mx-auto mb-4" />
          <p className="text-[#7A7A9E] mb-2">No A/B tests yet</p>
          <p className="text-[#4A4A6A] text-sm">Create your first test to start optimizing conversions</p>
        </div>
      )}

      {tests.map(test => (
        <div key={test.id} className="bg-[#161640] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${test.active ? 'bg-green-400' : 'bg-[#4A4A6A]'}`} />
              <h3 className="text-white font-semibold">{test.name}</h3>
              <span className="text-[#4A4A6A] text-xs px-2 py-0.5 rounded bg-white/5">{test.elementId}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggleActive(test.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${test.active ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-[#4A4A6A]'}`}>
                {test.active ? 'Active' : 'Paused'}
              </button>
              <button onClick={() => setEditing(test)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-[#7A7A9E] hover:text-white transition-all">Edit</button>
              <button onClick={() => deleteTest(test.id)} className="p-1.5 rounded-lg text-[#4A4A6A] hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>

          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${test.variants.length}, 1fr)` }}>
            {test.variants.map((variant, i) => (
              <div key={i} className="bg-[#0E0E2C] rounded-xl p-4 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#7B2FF2]">Variant {String.fromCharCode(65 + i)}</span>
                  <span className="text-xs text-[#4A4A6A]">{test.traffic[i]}% traffic</span>
                </div>
                <p className="text-white text-sm mb-3 line-clamp-2">&quot;{variant}&quot;</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><span className="text-[#4A4A6A]">Impressions</span><p className="text-white font-semibold">{test.impressions[i]}</p></div>
                  <div><span className="text-[#4A4A6A]">Conv. Rate</span><p className="text-white font-semibold">{getWinRate(test, i)}%</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Edit modal */}
      {editing && (
        <div className="bg-[#161640] border border-[#7B2FF2]/30 rounded-2xl p-6 space-y-4">
          <h3 className="text-white font-semibold">{editing.id ? 'Edit Test' : 'New A/B Test'}</h3>
          <div className="grid grid-cols-2 gap-3">
            <input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} placeholder="Test name (e.g., Hero Headline)" className="bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2]" />
            <input value={editing.elementId} onChange={e => setEditing({ ...editing, elementId: e.target.value })} placeholder="Element ID (e.g., hero-title)" className="bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2]" />
          </div>
          {editing.variants.map((v, i) => (
            <div key={i} className="flex gap-2">
              <input value={v} onChange={e => { const vars = [...editing.variants]; vars[i] = e.target.value; setEditing({ ...editing, variants: vars }) }} placeholder={`Variant ${String.fromCharCode(65 + i)} text`} className="flex-1 bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2]" />
            </div>
          ))}
          <button onClick={() => setEditing({ ...editing, variants: [...editing.variants, ''], traffic: [...editing.traffic, 0], impressions: [...editing.impressions, 0], conversions: [...editing.conversions, 0] })} className="text-[#7B2FF2] text-sm font-medium hover:underline flex items-center gap-1"><Plus size={14} /> Add variant</button>
          <div className="flex gap-2">
            <button onClick={handleSave} disabled={saving} className="flex-1 bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white text-sm font-semibold py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-50">
              {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Test'}
            </button>
            <button onClick={() => setEditing(null)} className="px-6 py-3 rounded-xl text-sm font-medium bg-white/5 text-[#7A7A9E] hover:text-white transition-all">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
