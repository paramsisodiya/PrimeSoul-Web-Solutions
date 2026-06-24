import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for PrimeSoul Digital Agency — how we handle your data.',
}

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-sm sm:prose-base prose-gray">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-ink">
          Privacy Policy
        </h1>
        <p className="text-ink-muted text-sm mb-8">Last updated: May 2025</p>

        <h2>1. Information We Collect</h2>
        <p>When you visit primesoul.tech, we may collect the following information:</p>
        <ul>
          <li><strong>Contact Information:</strong> Name, email address, and phone number when you submit a contact form or reach out via WhatsApp.</li>
          <li><strong>Usage Data:</strong> Pages visited, time spent on pages, browser type, and device information through analytics tools.</li>
          <li><strong>Cookies:</strong> Small data files stored on your device to improve your browsing experience.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To respond to your inquiries and provide our services.</li>
          <li>To improve our website and user experience.</li>
          <li>To send project updates and relevant communications (only with your consent).</li>
          <li>To analyze website traffic and optimize performance.</li>
        </ul>

        <h2>3. Data Protection</h2>
        <p>We take the security of your personal information seriously. We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, or destruction.</p>

        <h2>4. Third-Party Services</h2>
        <p>We may use third-party services like Google Analytics, Vercel Analytics, and WhatsApp Business for communication. These services have their own privacy policies governing how they handle your data.</p>

        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Request access to the personal data we hold about you.</li>
          <li>Request correction or deletion of your personal data.</li>
          <li>Opt out of any marketing communications.</li>
        </ul>

        <h2>6. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:paramsisodiya061@gmail.com" className="text-brand-primary">paramsisodiya061@gmail.com</a>.</p>
      </div>
    </section>
  )
}
