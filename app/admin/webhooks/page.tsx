'use client'

import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Webhook, Check, TestTube2, Bell } from 'lucide-react'

interface WebhookConfig {
  slackUrl: string
  discordUrl: string
  enabled: boolean
  events: {
    newLead: boolean
    formSubmission: boolean
  }
}

export default function WebhooksPage() {
  const [config, setConfig] = useState<WebhookConfig>({
    slackUrl: '',
    discordUrl: '',
    enabled: true,
    events: { newLead: true, formSubmission: true },
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const snap = await getDoc(doc(db, 'private_config', 'webhooks'))
        if (snap.exists()) setConfig(snap.data() as WebhookConfig)
      } catch (err) {
        console.error('Error fetching webhooks:', err)
      }
    }
    fetchConfig()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await setDoc(doc(db, 'private_config', 'webhooks'), config)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      console.error('Error saving webhooks:', err)
    } finally {
      setSaving(false)
    }
  }

  const testWebhook = async (type: 'slack' | 'discord') => {
    const url = type === 'slack' ? config.slackUrl : config.discordUrl
    if (!url) return
    setTesting(true)
    setTestResult('idle')

    try {
      const payload = type === 'slack'
        ? { text: '✅ PrimeSoul webhook test successful! New leads and form submissions will appear here.' }
        : { content: '✅ PrimeSoul webhook test successful! New leads and form submissions will appear here.' }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'no-cors',
      })
      setTestResult('success')
    } catch {
      setTestResult('error')
    } finally {
      setTesting(false)
      setTimeout(() => setTestResult('idle'), 4000)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white text-2xl font-bold">Webhooks & Integrations</h1>
        <p className="text-[#4A4A6A] text-sm mt-1">Get notified in Slack or Discord when new leads come in</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Slack */}
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4A154B]/20 flex items-center justify-center text-lg">💬</div>
            <div>
              <h3 className="text-white font-semibold text-sm">Slack</h3>
              <p className="text-[#4A4A6A] text-xs">Incoming Webhook URL</p>
            </div>
          </div>
          <input
            value={config.slackUrl}
            onChange={e => setConfig(prev => ({ ...prev, slackUrl: e.target.value }))}
            placeholder="https://hooks.slack.com/services/..."
            className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2]"
          />
          <button
            onClick={() => testWebhook('slack')}
            disabled={!config.slackUrl || testing}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-white/5 text-[#7A7A9E] hover:text-white border border-white/5 transition-all disabled:opacity-30"
          >
            <TestTube2 size={14} /> Test Connection
          </button>
        </div>

        {/* Discord */}
        <div className="bg-[#161640] border border-white/5 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5865F2]/20 flex items-center justify-center text-lg">🎮</div>
            <div>
              <h3 className="text-white font-semibold text-sm">Discord</h3>
              <p className="text-[#4A4A6A] text-xs">Webhook URL</p>
            </div>
          </div>
          <input
            value={config.discordUrl}
            onChange={e => setConfig(prev => ({ ...prev, discordUrl: e.target.value }))}
            placeholder="https://discord.com/api/webhooks/..."
            className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2]"
          />
          <button
            onClick={() => testWebhook('discord')}
            disabled={!config.discordUrl || testing}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-white/5 text-[#7A7A9E] hover:text-white border border-white/5 transition-all disabled:opacity-30"
          >
            <TestTube2 size={14} /> Test Connection
          </button>
        </div>
      </div>

      {testResult !== 'idle' && (
        <div className={`rounded-xl p-4 text-sm font-medium ${testResult === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          {testResult === 'success' ? '✅ Test message sent! Check your channel.' : '❌ Failed to send. Check the webhook URL.'}
        </div>
      )}

      {/* Events */}
      <div className="bg-[#161640] border border-white/5 rounded-2xl p-6 space-y-4">
        <h3 className="text-white font-semibold text-sm flex items-center gap-2"><Bell size={16} className="text-[#7B2FF2]" /> Notification Events</h3>
        {[
          { key: 'newLead', label: 'New Lead Received', desc: 'Get notified when someone submits the contact form' },
          { key: 'formSubmission', label: 'Form Submission', desc: 'All form submissions including newsletter signups' },
        ].map(event => (
          <div key={event.key} className="flex items-center justify-between p-4 rounded-xl bg-[#0E0E2C] border border-white/5">
            <div>
              <p className="text-white text-sm font-medium">{event.label}</p>
              <p className="text-[#4A4A6A] text-xs">{event.desc}</p>
            </div>
            <button
              onClick={() => setConfig(prev => ({ ...prev, events: { ...prev.events, [event.key]: !prev.events[event.key as keyof typeof prev.events] } }))}
              className={`w-10 h-5 rounded-full relative transition-colors ${config.events[event.key as keyof typeof config.events] ? 'bg-[#7B2FF2]' : 'bg-[#2A2A4A]'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${config.events[event.key as keyof typeof config.events] ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white text-sm font-semibold py-3.5 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {saving ? 'Saving...' : saved ? <><Check size={16} /> Saved!</> : 'Save Webhook Settings'}
      </button>
    </div>
  )
}
