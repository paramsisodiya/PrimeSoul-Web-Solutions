'use client'

import { useEffect, useState, useCallback } from 'react'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Palette, RotateCcw, Save, Check, Eye, Type, Sparkles, Sun, Moon } from 'lucide-react'

interface ThemeSettings {
  primaryColor: string
  primaryDark: string
  primaryLight: string
  accentColor: string
  cyanColor: string
  headingFont: string
  bodyFont: string
}

const DEFAULTS: ThemeSettings = {
  primaryColor: '#7B2FF2',
  primaryDark: '#5A1DB8',
  primaryLight: '#A855F7',
  accentColor: '#E879F9',
  cyanColor: '#2EC4C4',
  headingFont: 'Poppins',
  bodyFont: 'DM Sans',
}

const PRESETS: { name: string; icon: string; colors: Partial<ThemeSettings> }[] = [
  { name: 'Purple (Default)', icon: '💜', colors: { primaryColor: '#7B2FF2', primaryDark: '#5A1DB8', primaryLight: '#A855F7', accentColor: '#E879F9', cyanColor: '#2EC4C4' } },
  { name: 'Ocean Blue', icon: '🌊', colors: { primaryColor: '#2563EB', primaryDark: '#1D4ED8', primaryLight: '#60A5FA', accentColor: '#38BDF8', cyanColor: '#06B6D4' } },
  { name: 'Emerald', icon: '🌿', colors: { primaryColor: '#059669', primaryDark: '#047857', primaryLight: '#34D399', accentColor: '#6EE7B7', cyanColor: '#14B8A6' } },
  { name: 'Sunset', icon: '🌅', colors: { primaryColor: '#EA580C', primaryDark: '#C2410C', primaryLight: '#FB923C', accentColor: '#FBBF24', cyanColor: '#F97316' } },
  { name: 'Rose', icon: '🌹', colors: { primaryColor: '#E11D48', primaryDark: '#BE123C', primaryLight: '#FB7185', accentColor: '#F9A8D4', cyanColor: '#EC4899' } },
  { name: 'Midnight', icon: '🌙', colors: { primaryColor: '#6366F1', primaryDark: '#4F46E5', primaryLight: '#818CF8', accentColor: '#A78BFA', cyanColor: '#8B5CF6' } },
]

const FONT_OPTIONS = [
  { name: 'Poppins', style: "'Poppins', sans-serif" },
  { name: 'Inter', style: "'Inter', sans-serif" },
  { name: 'DM Sans', style: "'DM Sans', sans-serif" },
  { name: 'Outfit', style: "'Outfit', sans-serif" },
  { name: 'Space Grotesk', style: "'Space Grotesk', sans-serif" },
  { name: 'Plus Jakarta Sans', style: "'Plus Jakarta Sans', sans-serif" },
]

function adjustBrightness(hex: string, amount: number): string {
  hex = hex.replace('#', '')
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
  const r = Math.max(0, Math.min(255, parseInt(hex.substring(0, 2), 16) + amount))
  const g = Math.max(0, Math.min(255, parseInt(hex.substring(2, 4), 16) + amount))
  const b = Math.max(0, Math.min(255, parseInt(hex.substring(4, 6), 16) + amount))
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

export default function ThemeCustomizerPage() {
  const [theme, setTheme] = useState<ThemeSettings>(DEFAULTS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activePreset, setActivePreset] = useState<string>('Purple (Default)')

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'theme'))
        if (snap.exists()) {
          const data = snap.data() as Partial<ThemeSettings>
          setTheme({ ...DEFAULTS, ...data })
          const match = PRESETS.find(p =>
            p.colors.primaryColor === data.primaryColor &&
            p.colors.accentColor === data.accentColor
          )
          if (match) setActivePreset(match.name)
          else setActivePreset('')
        }
      } catch (err) { console.error(err) }
      finally { setLoading(false) }
    }
    fetchTheme()
  }, [])

  const update = useCallback((key: keyof ThemeSettings, value: string) => {
    setTheme(prev => {
      const next = { ...prev, [key]: value }
      if (key === 'primaryColor') {
        next.primaryDark = adjustBrightness(value, -40)
        next.primaryLight = adjustBrightness(value, 40)
      }
      return next
    })
    setActivePreset('')
  }, [])

  const applyPreset = useCallback((preset: typeof PRESETS[0]) => {
    setTheme(prev => ({ ...prev, ...preset.colors }))
    setActivePreset(preset.name)
  }, [])

  const resetDefaults = useCallback(() => {
    setTheme(DEFAULTS)
    setActivePreset('Purple (Default)')
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await setDoc(doc(db, 'settings', 'theme'), { ...theme, updatedAt: serverTimestamp() })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) { alert('Error saving theme. Please try again.') }
    finally { setSaving(false) }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-[#7B2FF2] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">Theme Customizer</h1>
          <p className="text-[#4A4A6A] text-sm mt-1">Customize your website&apos;s look and feel</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={resetDefaults} className="flex items-center gap-2 bg-[#161640] border border-white/10 text-[#7A7A9E] text-sm font-medium px-4 py-2.5 rounded-xl hover:border-white/20 hover:text-white transition-all">
            <RotateCcw size={15} /> Reset
          </button>
          <button onClick={handleSave} disabled={saving} className={`flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50 ${saved ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white hover:opacity-90'}`}>
            {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : saved ? <Check size={15} /> : <Save size={15} />}
            {saved ? 'Published!' : 'Publish Theme'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column — Controls */}
        <div className="lg:col-span-2 space-y-6">

          {/* Preset Themes */}
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <Sparkles size={18} className="text-[#7B2FF2]" />
              <h3 className="text-white font-semibold">Preset Themes</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PRESETS.map(preset => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className={`relative group p-4 rounded-xl border transition-all text-left ${activePreset === preset.name ? 'border-[#7B2FF2] bg-[#7B2FF2]/10' : 'border-white/5 hover:border-white/15 bg-[#0E0E2C]'}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-lg">{preset.icon}</span>
                    <span className="text-white text-xs font-medium">{preset.name}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[preset.colors.primaryColor, preset.colors.primaryLight, preset.colors.accentColor, preset.colors.cyanColor].map((c, i) => (
                      <div key={i} className="w-5 h-5 rounded-full border border-white/10" style={{ background: c }} />
                    ))}
                  </div>
                  {activePreset === preset.name && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#7B2FF2] flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <Palette size={18} className="text-[#7B2FF2]" />
              <h3 className="text-white font-semibold">Custom Colors</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {([
                { key: 'primaryColor' as const, label: 'Primary Color', desc: 'Main brand color, buttons, links' },
                { key: 'accentColor' as const, label: 'Accent Color', desc: 'Gradient endpoints, highlights' },
                { key: 'primaryLight' as const, label: 'Primary Light', desc: 'Hover states, light backgrounds' },
                { key: 'primaryDark' as const, label: 'Primary Dark', desc: 'Shadows, dark variant' },
                { key: 'cyanColor' as const, label: 'Secondary Accent', desc: 'Cards, badges, secondary elements' },
              ]).map(item => (
                <div key={item.key} className="flex items-center gap-4 p-3 bg-[#0E0E2C] rounded-xl border border-white/5">
                  <label className="relative cursor-pointer group">
                    <div className="w-10 h-10 rounded-lg border-2 border-white/10 group-hover:border-white/30 transition-all overflow-hidden" style={{ background: theme[item.key] }}>
                      <input type="color" value={theme[item.key]} onChange={e => update(item.key, e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                    </div>
                  </label>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">{item.label}</p>
                    <p className="text-[#4A4A6A] text-xs truncate">{item.desc}</p>
                  </div>
                  <span className="text-[#4A4A6A] text-xs font-mono">{theme[item.key]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fonts */}
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <Type size={18} className="text-[#7B2FF2]" />
              <h3 className="text-white font-semibold">Typography</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {([
                { key: 'headingFont' as const, label: 'Heading Font' },
                { key: 'bodyFont' as const, label: 'Body Font' },
              ]).map(item => (
                <div key={item.key}>
                  <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">{item.label}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {FONT_OPTIONS.map(font => (
                      <button
                        key={font.name}
                        onClick={() => { setTheme(prev => ({ ...prev, [item.key]: font.name })); setActivePreset('') }}
                        className={`p-3 rounded-xl border text-left transition-all ${theme[item.key] === font.name ? 'border-[#7B2FF2] bg-[#7B2FF2]/10' : 'border-white/5 bg-[#0E0E2C] hover:border-white/15'}`}
                      >
                        <span className="text-white text-sm block truncate" style={{ fontFamily: font.style }}>{font.name}</span>
                        <span className="text-[#4A4A6A] text-[10px] block mt-0.5" style={{ fontFamily: font.style }}>Aa Bb Cc 123</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column — Live Preview */}
        <div className="space-y-6">
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-6 sticky top-24">
            <div className="flex items-center gap-3 mb-5">
              <Eye size={18} className="text-[#7B2FF2]" />
              <h3 className="text-white font-semibold">Live Preview</h3>
            </div>

            {/* Mini Website Preview */}
            <div className="rounded-xl overflow-hidden border border-white/10">
              {/* Mini navbar */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded" style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.accentColor})` }} />
                  <span className="text-[10px] font-bold text-gray-900" style={{ fontFamily: `'${theme.headingFont}', sans-serif` }}>PrimeSoul</span>
                </div>
                <div className="flex gap-2">
                  {['Home', 'About', 'Work'].map(l => (
                    <span key={l} className="text-[8px] text-gray-400" style={{ fontFamily: `'${theme.bodyFont}', sans-serif` }}>{l}</span>
                  ))}
                </div>
              </div>

              {/* Mini hero */}
              <div className="bg-gray-50 px-4 py-6 relative overflow-hidden">
                <div className="absolute top-2 right-2 w-16 h-16 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${theme.primaryColor}, transparent)` }} />
                <div className="relative">
                  <div className="inline-block px-2 py-0.5 rounded-full text-[7px] font-semibold mb-2" style={{ background: `${theme.primaryColor}15`, color: theme.primaryColor, fontFamily: `'${theme.headingFont}', sans-serif` }}>
                    ● Beyond Expectations
                  </div>
                  <p className="text-[13px] font-extrabold text-gray-900 leading-tight mb-1" style={{ fontFamily: `'${theme.headingFont}', sans-serif` }}>
                    Crafting <span style={{ color: theme.primaryColor }}>Success</span>
                  </p>
                  <p className="text-[8px] text-gray-400 mb-3" style={{ fontFamily: `'${theme.bodyFont}', sans-serif` }}>
                    Empowering brands with innovative digital strategies.
                  </p>
                  <div className="flex gap-1.5">
                    <div className="px-3 py-1 rounded-full text-[8px] font-semibold text-white" style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.primaryLight})` }}>
                      View Work →
                    </div>
                    <div className="px-3 py-1 rounded-full text-[8px] font-medium text-gray-600 border border-gray-200">
                      Contact
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini cards */}
              <div className="bg-white px-4 py-4">
                <p className="text-[9px] font-bold text-gray-900 mb-2" style={{ fontFamily: `'${theme.headingFont}', sans-serif` }}>Services</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { title: 'Web Design', icon: '🎨' },
                    { title: 'Full-Stack', icon: '⚡' },
                  ].map(s => (
                    <div key={s.title} className="p-2 rounded-lg border border-gray-100 hover:shadow-sm transition-all">
                      <span className="text-[10px]">{s.icon}</span>
                      <p className="text-[8px] font-semibold text-gray-700 mt-1" style={{ fontFamily: `'${theme.headingFont}', sans-serif` }}>{s.title}</p>
                      <div className="w-6 h-0.5 rounded-full mt-1" style={{ background: `linear-gradient(90deg, ${theme.primaryColor}, ${theme.accentColor})` }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini CTA */}
              <div className="px-4 py-3" style={{ background: theme.primaryColor + '10' }}>
                <p className="text-[8px] font-semibold text-gray-700 mb-1.5" style={{ fontFamily: `'${theme.headingFont}', sans-serif` }}>Ready to start?</p>
                <div className="w-full py-1.5 rounded-full text-center text-[8px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.accentColor})` }}>
                  Let&apos;s Talk! →
                </div>
              </div>

              {/* Mini footer */}
              <div className="bg-[#0E0E2C] px-4 py-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-3 h-3 rounded" style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.accentColor})` }} />
                  <span className="text-[8px] font-bold text-white" style={{ fontFamily: `'${theme.headingFont}', sans-serif` }}>PrimeSoul</span>
                </div>
                <div className="flex gap-1">
                  {[theme.primaryColor, theme.accentColor, theme.cyanColor].map((c, i) => (
                    <div key={i} className="w-4 h-4 rounded-full opacity-60" style={{ background: c }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Color Palette Display */}
            <div className="mt-4">
              <p className="text-[#4A4A6A] text-xs mb-2">Active Palette</p>
              <div className="flex gap-1.5 items-center">
                {[theme.primaryDark, theme.primaryColor, theme.primaryLight, theme.accentColor, theme.cyanColor].map((c, i) => (
                  <div key={i} className="flex-1 h-8 rounded-lg first:rounded-l-xl last:rounded-r-xl transition-all" style={{ background: c }} />
                ))}
              </div>
            </div>

            {/* Current Theme Info */}
            <div className="mt-4 p-3 bg-[#0E0E2C] rounded-xl border border-white/5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[#4A4A6A] text-[10px] uppercase tracking-wider font-semibold">Heading Font</span>
                <span className="text-white text-xs" style={{ fontFamily: `'${theme.headingFont}', sans-serif` }}>{theme.headingFont}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#4A4A6A] text-[10px] uppercase tracking-wider font-semibold">Body Font</span>
                <span className="text-white text-xs" style={{ fontFamily: `'${theme.bodyFont}', sans-serif` }}>{theme.bodyFont}</span>
              </div>
            </div>

            {/* Info */}
            <p className="text-[#4A4A6A] text-xs mt-4 leading-relaxed">
              💡 Changes are previewed here instantly. Click <strong className="text-white">Publish Theme</strong> to apply to your live website.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
