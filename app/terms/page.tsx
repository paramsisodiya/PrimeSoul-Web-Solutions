import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for PrimeSoul Digital Agency.',
}

export default function TermsPage() {
  return (
    <section className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-sm sm:prose-base prose-gray">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8" style={{ fontFamily: "'Poppins', sans-serif", color: '#0E0E2C' }}>
          Terms of Service
        </h1>
        <p className="text-ink-muted text-sm mb-8">Last updated: May 2025</p>

        <h2>1. Services</h2>
        <p>PrimeSoul provides web design, development, and digital consulting services. The specific scope, timeline, and deliverables for each project will be agreed upon before work begins.</p>

        <h2>2. Payment Terms</h2>
        <ul>
          <li>A 50% advance payment is required before project commencement.</li>
          <li>The remaining 50% is due upon project completion, before final deployment.</li>
          <li>All prices are quoted in Indian Rupees (₹) unless stated otherwise.</li>
        </ul>

        <h2>3. Revisions</h2>
        <p>Each project includes a defined number of revision rounds as specified in the project agreement. Additional revisions beyond the agreed scope may incur extra charges.</p>

        <h2>4. Intellectual Property</h2>
        <p>Upon full payment, all rights to the final deliverables transfer to the client. PrimeSoul retains the right to showcase the work in our portfolio unless otherwise agreed.</p>

        <h2>5. Confidentiality</h2>
        <p>We respect your business information. Any confidential data shared during the project will not be disclosed to third parties without your explicit consent.</p>

        <h2>6. Project Timeline</h2>
        <p>Timelines are estimates and depend on timely feedback and content delivery from the client. Delays in providing required materials may extend the project timeline.</p>

        <h2>7. Limitation of Liability</h2>
        <p>PrimeSoul shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or the websites we build.</p>

        <h2>8. Contact</h2>
        <p>For questions regarding these terms, contact us at <a href="mailto:paramsisodiya061@gmail.com" className="text-brand-primary">paramsisodiya061@gmail.com</a>.</p>
      </div>
    </section>
  )
}
