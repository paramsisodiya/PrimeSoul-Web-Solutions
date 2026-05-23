import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface WebhookConfig {
  slackUrl: string
  discordUrl: string
  enabled: boolean
  events: {
    newLead: boolean
    formSubmission: boolean
  }
}

export async function sendWebhookNotification(data: {
  name: string
  email: string
  phone?: string
  service: string
  message: string
}) {
  try {
    const snap = await getDoc(doc(db, 'settings', 'webhooks'))
    if (!snap.exists()) return

    const config = snap.data() as WebhookConfig
    if (!config.enabled) return
    if (!config.events?.newLead) return

    const text = `🔔 *New Lead from PrimeSoul Website*\n\n👤 *Name:* ${data.name}\n📧 *Email:* ${data.email}\n📱 *Phone:* ${data.phone || 'Not provided'}\n🎯 *Service:* ${data.service}\n💬 *Message:* ${data.message.substring(0, 200)}${data.message.length > 200 ? '...' : ''}`

    // Send to Slack
    if (config.slackUrl) {
      fetch(config.slackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
        mode: 'no-cors',
      }).catch(() => {})
    }

    // Send to Discord
    if (config.discordUrl) {
      fetch(config.discordUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text }),
        mode: 'no-cors',
      }).catch(() => {})
    }
  } catch (err) {
    console.error('Webhook notification failed:', err)
  }
}
