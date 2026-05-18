'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Save, Settings, Globe, Phone, Mail, MapPin, Instagram, Linkedin, Github, Twitter } from 'lucide-react'

interface SiteSettings {
  siteName: string
  tagline: string
  email: string
  phone: string
  whatsapp: string
  address: string
  city: string
  country: string
  instagram: string
  linkedin: string
  github: string
  twitter: string
  metaTitle: string
  metaDescription: string
  googleAnalyticsId: string
  maintenanceMode: boolean
}

const defaultSettings: SiteSettings = {
  siteName: 'PrimeSoul Web Solutions',
  tagline: 'Premium Digital Agency',
  email: 'paramsisodiya061@gmail.com',
  phone: '',
  whatsapp: '',
  address: 'Rajgarh',
  city: 'Madhya Pradesh',
  country: 'India',
  instagram: '',
  linkedin: '',
  github: '',
  twitter: '',
  metaTitle: 'PrimeSoul — Premium Digital Agency',
  metaDescription: 'PrimeSoul builds premium websites for businesses that refuse to settle for average.',
  googleAnalyticsId: '',
  maintenanceMode: false,
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      const snap = await getDoc(doc(db, 'settings', 'site'))
      if (snap.exists()) setSettings({ ...defaultSettings, ...snap.data() as SiteSettings })
      setLoading(false)
    }
    fetchSettings()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await setDoc(doc(db, 'settings', 'site'), { ...settings, updatedAt: serverTimestamp() })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      alert('Error saving settings. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const update = (key: keyof SiteSettings, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
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
          <h1 className="text-white text-2xl font-bold">Site Settings</h1>
          <p className="text-[#4A4A6A] text-sm mt-1">Manage your website configuration</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all disabled:opacity-50">
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
          {saved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* General */}
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <Globe size={18} className="text-[#7B2FF2]" />
            <h3 className="text-white font-semibold">General</h3>
          </div>
          {[
            { key: 'siteName', label: 'Site Name', placeholder: 'PrimeSoul Web Solutions' },
            { key: 'tagline', label: 'Tagline', placeholder: 'Premium Digital Agency' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">{f.label}</label>
              <input
                value={(settings as any)[f.key]}
                onChange={e => update(f.key as keyof SiteSettings, e.target.value)}
                placeholder={f.placeholder}
                className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all"
              />
            </div>
          ))}
          <div className="flex items-center justify-between p-4 bg-[#0E0E2C] rounded-xl border border-white/10">
            <div>
              <p className="text-white text-sm font-medium">Maintenance Mode</p>
              <p className="text-[#4A4A6A] text-xs">Show maintenance page to visitors</p>
            </div>
            <button
              onClick={() => update('maintenanceMode', !settings.maintenanceMode)}
              className={`relative w-12 h-6 rounded-full transition-all ${settings.maintenanceMode ? 'bg-[#7B2FF2]' : 'bg-white/10'}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.maintenanceMode ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <Phone size={18} className="text-[#7B2FF2]" />
            <h3 className="text-white font-semibold">Contact Info</h3>
          </div>
          {[
            { key: 'email', label: 'Email', placeholder: 'your@email.com', icon: Mail },
            { key: 'phone', label: 'Phone', placeholder: '+91 XXXXX XXXXX', icon: Phone },
            { key: 'whatsapp', label: 'WhatsApp Number', placeholder: '91XXXXXXXXXX (with country code)', icon: Phone },
            { key: 'address', label: 'Address', placeholder: 'Street, Area', icon: MapPin },
            { key: 'city', label: 'City / State', placeholder: 'Rajgarh, Madhya Pradesh', icon: MapPin },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">{f.label}</label>
              <input
                value={(settings as any)[f.key]}
                onChange={e => update(f.key as keyof SiteSettings, e.target.value)}
                placeholder={f.placeholder}
                className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all"
              />
            </div>
          ))}
        </div>

        {/* Social Media */}
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <Instagram size={18} className="text-[#7B2FF2]" />
            <h3 className="text-white font-semibold">Social Media</h3>
          </div>
          {[
            { key: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/...' },
            { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/...' },
            { key: 'twitter', label: 'Twitter / X URL', placeholder: 'https://x.com/...' },
            { key: 'github', label: 'GitHub URL', placeholder: 'https://github.com/...' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">{f.label}</label>
              <input
                value={(settings as any)[f.key]}
                onChange={e => update(f.key as keyof SiteSettings, e.target.value)}
                placeholder={f.placeholder}
                className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all"
              />
            </div>
          ))}
        </div>

        {/* SEO */}
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <Settings size={18} className="text-[#7B2FF2]" />
            <h3 className="text-white font-semibold">SEO & Analytics</h3>
          </div>
          <div>
            <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Default Meta Title</label>
            <input
              value={settings.metaTitle}
              onChange={e => update('metaTitle', e.target.value)}
              placeholder="PrimeSoul — Premium Digital Agency"
              className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all"
            />
          </div>
          <div>
            <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Default Meta Description</label>
            <textarea
              value={settings.metaDescription}
              onChange={e => update('metaDescription', e.target.value)}
              placeholder="Site description for search engines..."
              rows={3}
              className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] resize-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Google Analytics ID</label>
            <input
              value={settings.googleAnalyticsId}
              onChange={e => update('googleAnalyticsId', e.target.value)}
              placeholder="G-XXXXXXXXXX"
              className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] transition-all"
            />
            <p className="text-[#4A4A6A] text-xs mt-1">From Google Analytics → Admin → Data Streams</p>
          </div>
        </div>
      </div>

      {/* Save Button Bottom */}
      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving} className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 ${saved ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white hover:opacity-90'}`}>
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
          {saved ? '✓ Settings Saved!' : 'Save All Changes'}
        </button>
      </div>
    </div>
  )
}
