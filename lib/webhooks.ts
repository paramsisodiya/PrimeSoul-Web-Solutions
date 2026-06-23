/**
 * Server-side webhook notification helper.
 * Reads webhook URLs from environment variables (not Firestore).
 * Called from API routes only — never from client-side code.
 */

export async function sendWebhookNotification(data: {
  name: string
  email: string
  phone?: string
  service: string
  message: string
}) {
  const slackUrl = process.env.SLACK_WEBHOOK_URL
  const discordUrl = process.env.DISCORD_WEBHOOK_URL

  if (!slackUrl && !discordUrl) return

  const text = `🔔 *New Lead from PrimeSoul Website*\n\n👤 *Name:* ${data.name}\n📧 *Email:* ${data.email}\n📱 *Phone:* ${data.phone || 'Not provided'}\n🎯 *Service:* ${data.service}\n💬 *Message:* ${data.message.substring(0, 200)}${data.message.length > 200 ? '...' : ''}`

  try {
    // Send to Slack
    if (slackUrl) {
      await fetch(slackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      }).catch(() => {})
    }

    // Send to Discord
    if (discordUrl) {
      await fetch(discordUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text }),
      }).catch(() => {})
    }
  } catch (err) {
    console.error('Webhook notification failed:', err)
  }
}
