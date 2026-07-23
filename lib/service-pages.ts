import { SERVICES } from './data'

export interface ServicePageData {
  id: string
  slug: string
  title: string
  shortTitle: string
  metaTitle: string
  metaDescription: string
  heroTagline: string
  heroDescription: string
  icon: string
  accent: string
  problem: {
    title: string
    description: string
    painPoints: string[]
  }
  solution: {
    title: string
    description: string
    approach: string[]
  }
  features: {
    title: string
    description: string
    icon: string
  }[]
  benefits: string[]
  techStack: string[]
  process: { step: string; title: string; description: string }[]
  faq: { question: string; answer: string }[]
  cta: {
    title: string
    description: string
  }
}

export const SERVICE_PAGES: ServicePageData[] = [
  {
    id: 'web-design',
    slug: 'web-design-development',
    title: 'Web Design & Development',
    shortTitle: 'Web Development',
    metaTitle: 'Professional Web Design & Development Services | PrimeSoul',
    metaDescription: 'Custom website design and development using Next.js, TypeScript & Tailwind CSS. Fast, responsive, and built to convert visitors into clients. Get a free quote today.',
    heroTagline: 'Custom Websites That Convert',
    heroDescription: 'We build premium, high-performance websites using modern technologies like Next.js, TypeScript, and Tailwind CSS. Every site is designed to load fast, look stunning, and convert visitors into paying customers.',
    icon: 'monitor',
    accent: '#7B2FF2',
    problem: {
      title: 'Your Website Is Losing You Customers',
      description: 'A slow, outdated, or poorly designed website doesn\'t just look bad — it actively drives potential customers away. Studies show 75% of users judge a business\'s credibility by its website design.',
      painPoints: [
        'Slow loading times causing visitors to bounce before seeing your content',
        'Non-responsive design that breaks on mobile devices — where 60% of traffic comes from',
        'Generic templates that make your business look like everyone else',
        'Poor SEO structure that keeps you invisible on Google search results',
        'No clear call-to-action, leaving visitors confused about what to do next',
      ],
    },
    solution: {
      title: 'A Website Built for Performance & Conversions',
      description: 'We design and develop websites from scratch using Next.js — the same framework trusted by Netflix, Nike, and Notion. Every pixel is intentional, every interaction is smooth, and every page is optimized to convert.',
      approach: [
        'Custom UI design tailored to your brand identity and target audience',
        'Next.js for blazing-fast server-side rendering and SEO optimization',
        'Mobile-first responsive development for perfect display on all devices',
        'Performance optimization targeting 90+ Google Lighthouse scores',
        'Integrated analytics and conversion tracking from day one',
        'Post-launch support to keep your site updated and secure',
      ],
    },
    features: [
      { title: 'Custom UI/UX Design', description: 'Unique designs that reflect your brand, not templates. Every element serves a purpose.', icon: 'palette' },
      { title: 'Mobile-First Development', description: 'Built for mobile first, then scaled up. Perfect experience on every screen size.', icon: 'smartphone' },
      { title: 'Performance Optimization', description: 'Sub-2-second load times. Optimized images, lazy loading, and code splitting.', icon: 'zap' },
      { title: 'SEO Foundation', description: 'Semantic HTML, meta tags, structured data, and clean URLs baked in from the start.', icon: 'search' },
      { title: 'CMS Integration', description: 'Easy content management so you can update your site without touching code.', icon: 'edit' },
      { title: 'Analytics & Tracking', description: 'Google Analytics, conversion tracking, and heatmaps to understand your visitors.', icon: 'bar-chart' },
    ],
    benefits: [
      '3x faster load times compared to WordPress sites',
      'Mobile-optimized for 60%+ of web traffic',
      'SEO-ready structure for better Google rankings',
      '90+ Lighthouse performance scores',
      'Scalable architecture that grows with your business',
      'Ongoing support and maintenance',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    process: [
      { step: '01', title: 'Discovery Call', description: 'We understand your business, goals, target audience, and what success looks like for your website.' },
      { step: '02', title: 'Design & Prototype', description: 'We create wireframes and high-fidelity designs in Figma for your review and feedback.' },
      { step: '03', title: 'Development', description: 'We build your site with clean, production-grade code. You get regular previews throughout.' },
      { step: '04', title: 'Testing & Launch', description: 'Rigorous cross-browser testing, performance audits, and SEO checks before going live.' },
    ],
    faq: [
      { question: 'How long does it take to build a website?', answer: 'A typical business website takes 2-4 weeks from design to launch. Complex web applications may take 4-8 weeks depending on features.' },
      { question: 'Do you provide hosting?', answer: 'We deploy to Vercel or Netlify, which offer free hosting for most projects. For larger sites, we can set up custom hosting solutions.' },
      { question: 'Can I update the content myself?', answer: 'Absolutely! We integrate a CMS (content management system) so you can update text, images, and pages without any coding knowledge.' },
      { question: 'What if I need changes after launch?', answer: 'We offer 30-60 days of free support after launch. After that, we have affordable maintenance plans starting at ₹999/month.' },
    ],
    cta: {
      title: 'Ready to Build a Website That Actually Works?',
      description: 'Get a free consultation and discover how a custom-built website can transform your online presence.',
    },
  },
  {
    id: 'ui-ux',
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    shortTitle: 'UI/UX Design',
    metaTitle: 'UI/UX Design Services — Intuitive Interfaces | PrimeSoul',
    metaDescription: 'Professional UI/UX design services. User research, wireframing, prototyping, and design systems that balance visual sophistication with intuitive usability.',
    heroTagline: 'Design That Users Love',
    heroDescription: 'We create interfaces that balance visual sophistication with intuitive usability. Every interaction is deliberate, every layout is tested, and every design decision is backed by user research.',
    icon: 'layers',
    accent: '#2EC4C4',
    problem: {
      title: 'Beautiful Doesn\'t Mean Usable',
      description: 'Many businesses invest in flashy designs that confuse users instead of guiding them. Poor UX leads to abandoned carts, high bounce rates, and frustrated customers who never return.',
      painPoints: [
        'Users can\'t find what they\'re looking for on your current website',
        'High bounce rates despite decent traffic numbers',
        'Complex forms and checkout flows causing drop-offs',
        'Inconsistent design making your brand look unprofessional',
        'No mobile optimization — losing mobile users completely',
      ],
    },
    solution: {
      title: 'Research-Driven Design That Converts',
      description: 'We don\'t design based on trends or personal taste. We start with user research, map customer journeys, and create interfaces where every element earns its place.',
      approach: [
        'User research and persona development to understand your audience',
        'Information architecture and user flow mapping',
        'Low-fidelity wireframes for rapid iteration on layout and structure',
        'High-fidelity prototypes with interactions for stakeholder review',
        'Comprehensive design system for consistency across all touchpoints',
        'Usability testing to validate design decisions before development',
      ],
    },
    features: [
      { title: 'User Research', description: 'Interviews, surveys, and competitive analysis to understand what your users actually need.', icon: 'users' },
      { title: 'Wireframing & Prototyping', description: 'Interactive prototypes that let you test the experience before writing a single line of code.', icon: 'layout' },
      { title: 'Design Systems', description: 'A complete component library ensuring consistency and speeding up future development.', icon: 'grid' },
      { title: 'Figma Handoff', description: 'Developer-ready design files with proper spacing, colors, and interaction specifications.', icon: 'package' },
      { title: 'Responsive Design', description: 'Designs that adapt perfectly from mobile to desktop, covering every screen size.', icon: 'monitor' },
      { title: 'Accessibility', description: 'WCAG-compliant designs that work for everyone, including users with disabilities.', icon: 'eye' },
    ],
    benefits: [
      'Reduce bounce rates by up to 40%',
      'Increase conversion rates with optimized user flows',
      'Consistent brand experience across all platforms',
      'Faster development with a comprehensive design system',
      'Data-driven decisions, not guesswork',
      'Accessible to all users, expanding your audience',
    ],
    techStack: ['Figma', 'Adobe XD', 'Framer', 'Maze', 'Hotjar', 'Google Analytics'],
    process: [
      { step: '01', title: 'Research & Audit', description: 'We analyze your current design, study competitors, and understand your users through research.' },
      { step: '02', title: 'Information Architecture', description: 'We map user flows, create sitemaps, and define the content hierarchy.' },
      { step: '03', title: 'Wireframes & Prototypes', description: 'Interactive wireframes and prototypes for testing and stakeholder feedback.' },
      { step: '04', title: 'Visual Design & Handoff', description: 'High-fidelity designs with a complete design system, ready for development.' },
    ],
    faq: [
      { question: 'What\'s the difference between UI and UX?', answer: 'UX (User Experience) is about how something works — the flow, structure, and usability. UI (User Interface) is about how it looks — colors, typography, and visual elements. We handle both.' },
      { question: 'Do you do user testing?', answer: 'Yes. We can conduct usability testing with real users to validate design decisions and identify friction points before development begins.' },
      { question: 'What tools do you use?', answer: 'We primarily use Figma for design and prototyping. For user testing, we use Maze and Hotjar for heatmaps and session recordings.' },
      { question: 'Can you redesign an existing product?', answer: 'Absolutely. We specialize in redesigning existing websites and apps to improve usability, visual appeal, and conversion rates.' },
    ],
    cta: {
      title: 'Ready for a Design That Users Actually Love?',
      description: 'Let\'s discuss how research-driven design can transform your product experience.',
    },
  },
  {
    id: 'fullstack',
    slug: 'full-stack-applications',
    title: 'Full-Stack Applications',
    shortTitle: 'Full-Stack',
    metaTitle: 'Full-Stack Web Application Development | PrimeSoul',
    metaDescription: 'End-to-end web application development with Next.js, MongoDB, PostgreSQL & REST APIs. Custom admin panels, dashboards & scalable architecture.',
    heroTagline: 'End-to-End Web Applications',
    heroDescription: 'We build complete web applications from frontend to backend — databases, APIs, admin panels, and everything in between. Scalable architecture designed for real-world demands.',
    icon: 'code',
    accent: '#4DA6FF',
    problem: {
      title: 'Off-the-Shelf Software Doesn\'t Fit',
      description: 'Generic SaaS tools force you to adapt your business to their limitations. Custom applications are built around your actual workflows, giving you a competitive advantage.',
      painPoints: [
        'Paying for features you don\'t need in expensive SaaS subscriptions',
        'Workflows that don\'t match how your business actually operates',
        'Data scattered across multiple disconnected platforms',
        'No ability to customize or extend as your business grows',
        'Security concerns with third-party platforms handling your data',
      ],
    },
    solution: {
      title: 'Custom Software Built Around Your Business',
      description: 'We architect and build web applications using modern full-stack technologies. Your application, your data, your rules — with the scalability to grow with you.',
      approach: [
        'Requirements gathering and technical specification document',
        'Database schema design optimized for your data relationships',
        'RESTful API architecture with proper authentication and authorization',
        'Admin dashboard with role-based access control',
        'Automated testing and CI/CD pipeline for reliable deployments',
        'Documentation and training for your team',
      ],
    },
    features: [
      { title: 'Next.js App Router', description: 'Server-side rendering, API routes, and static generation — all in one framework.', icon: 'server' },
      { title: 'Database Design', description: 'MongoDB or PostgreSQL schemas optimized for your data patterns and query performance.', icon: 'database' },
      { title: 'REST APIs', description: 'Clean, documented API endpoints with authentication, rate limiting, and error handling.', icon: 'terminal' },
      { title: 'Admin Dashboards', description: 'Custom admin panels with data visualization, user management, and content control.', icon: 'settings' },
      { title: 'Authentication', description: 'Secure user auth with email/password, OAuth, or custom solutions based on your needs.', icon: 'lock' },
      { title: 'Cloud Deployment', description: 'Deployed on Vercel, AWS, or Railway with automatic scaling and monitoring.', icon: 'cloud' },
    ],
    benefits: [
      'Software built exactly for your business workflows',
      'Own your data — no vendor lock-in',
      'Scalable architecture that grows with you',
      'Lower long-term costs than SaaS subscriptions',
      'Complete control over features and roadmap',
      'Secure, with your data on your infrastructure',
    ],
    techStack: ['Next.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Prisma', 'Redis', 'Docker'],
    process: [
      { step: '01', title: 'Technical Discovery', description: 'We map your requirements, define the data model, and plan the architecture.' },
      { step: '02', title: 'MVP Development', description: 'We build the core features first, deploying a functional product you can start using.' },
      { step: '03', title: 'Iterate & Expand', description: 'Based on real usage, we add features, optimize performance, and refine the UX.' },
      { step: '04', title: 'Deploy & Support', description: 'Production deployment with monitoring, backups, and ongoing maintenance.' },
    ],
    faq: [
      { question: 'How much does a custom web app cost?', answer: 'Pricing depends on complexity. Simple apps start around ₹15,000, while complex platforms with multiple user roles and integrations can range from ₹30,000-₹1,00,000+.' },
      { question: 'Can you work with my existing database?', answer: 'Yes. We can integrate with existing MongoDB, PostgreSQL, MySQL, or Firebase databases. We can also help migrate data from one system to another.' },
      { question: 'Do you provide ongoing maintenance?', answer: 'Yes. We offer maintenance plans that include bug fixes, security updates, feature additions, and performance monitoring.' },
      { question: 'How do you handle security?', answer: 'We implement industry-standard security practices: encrypted connections (HTTPS), input validation, SQL injection prevention, JWT authentication, and role-based access control.' },
    ],
    cta: {
      title: 'Need a Custom Application Built Right?',
      description: 'Tell us about your requirements and we\'ll architect a solution that fits your business perfectly.',
    },
  },
  {
    id: 'branding',
    slug: 'brand-identity',
    title: 'Brand Identity',
    shortTitle: 'Branding',
    metaTitle: 'Brand Identity & Logo Design Services | PrimeSoul',
    metaDescription: 'Complete brand identity design — logo, color systems, typography & brand guidelines. Build a consistent, professional identity that sets you apart.',
    heroTagline: 'Your Brand, Defined',
    heroDescription: 'We create complete brand identities — from logos and color palettes to typography systems and brand guidelines. A cohesive brand builds trust, recognition, and loyalty.',
    icon: 'sparkles',
    accent: '#2B47D9',
    problem: {
      title: 'An Inconsistent Brand Is an Invisible Brand',
      description: 'Without a cohesive brand identity, your business looks different on every platform. Customers can\'t recognize you, trust you, or remember you — and they choose competitors who look more professional.',
      painPoints: [
        'Different logos, colors, and fonts used across platforms',
        'No brand guidelines, leading to inconsistent marketing materials',
        'A DIY logo that doesn\'t reflect your business quality',
        'Difficulty standing out in a crowded market',
        'Customers not taking your business seriously due to unprofessional visuals',
      ],
    },
    solution: {
      title: 'A Complete Brand System You\'ll Be Proud Of',
      description: 'We design brand identities that tell your story visually. From the logo to every marketing asset, everything works together to build recognition and trust.',
      approach: [
        'Brand discovery workshop to understand your values, audience, and positioning',
        'Competitive landscape analysis to identify differentiation opportunities',
        'Logo concept development with multiple directions and iterations',
        'Color system and typography selection aligned with brand personality',
        'Comprehensive brand guidelines document for consistent application',
        'Social media templates and digital asset creation',
      ],
    },
    features: [
      { title: 'Logo Design', description: 'Multiple concept directions, refined through feedback to a polished final mark.', icon: 'star' },
      { title: 'Color System', description: 'A curated palette with primary, secondary, and accent colors for all applications.', icon: 'palette' },
      { title: 'Typography', description: 'Font selection and hierarchy rules that ensure readability and brand consistency.', icon: 'type' },
      { title: 'Brand Guidelines', description: 'A comprehensive document showing how to use every element correctly.', icon: 'book' },
      { title: 'Social Assets', description: 'Templates for social media posts, stories, and profile images.', icon: 'share' },
      { title: 'Print Design', description: 'Business cards, letterheads, and presentation templates for offline presence.', icon: 'printer' },
    ],
    benefits: [
      'Instantly recognizable brand across all platforms',
      'Professional appearance that builds customer trust',
      'Clear guidelines preventing brand inconsistency',
      'Stand out from competitors with unique visual identity',
      'Ready-to-use templates for marketing materials',
      'Scalable brand system that grows with you',
    ],
    techStack: ['Adobe Illustrator', 'Figma', 'Adobe Photoshop', 'Canva Pro'],
    process: [
      { step: '01', title: 'Brand Discovery', description: 'We learn about your business, values, audience, and competitive landscape.' },
      { step: '02', title: 'Concept Development', description: 'We create 3-5 logo directions with mood boards and typography options.' },
      { step: '03', title: 'Refinement', description: 'Based on your feedback, we refine the chosen direction to perfection.' },
      { step: '04', title: 'Brand Package', description: 'Final deliverables including all files, guidelines, and social media templates.' },
    ],
    faq: [
      { question: 'How many logo concepts do I get?', answer: 'We typically present 3-5 initial concept directions. You choose the one you like most, and we refine it through 2-3 rounds of revisions.' },
      { question: 'What file formats do I receive?', answer: 'You get your logo in SVG, PNG (transparent), JPG, PDF, and AI formats — suitable for web, print, and social media.' },
      { question: 'Can you rebrand an existing business?', answer: 'Absolutely. We can evolve your existing brand or create a completely new identity, depending on your needs.' },
      { question: 'How long does the branding process take?', answer: 'A typical brand identity project takes 1-3 weeks from discovery to final delivery, depending on complexity and feedback cycles.' },
    ],
    cta: {
      title: 'Ready to Build a Brand That Commands Respect?',
      description: 'Let\'s create a visual identity that makes your business unforgettable.',
    },
  },
  {
    id: 'seo',
    slug: 'seo-performance',
    title: 'SEO & Performance',
    shortTitle: 'SEO',
    metaTitle: 'SEO & Performance Optimization Services | PrimeSoul',
    metaDescription: 'Technical SEO audits, Core Web Vitals optimization, meta & schema markup, and page speed improvements. Rank higher and load faster.',
    heroTagline: 'Rank Higher, Load Faster',
    heroDescription: 'We optimize your website\'s technical SEO, Core Web Vitals, and content structure so search engines love your site and visitors get a lightning-fast experience.',
    icon: 'trending-up',
    accent: '#2EC4C4',
    problem: {
      title: 'You\'re Invisible on Google',
      description: 'Having a beautiful website means nothing if nobody can find it. Poor technical SEO and slow loading times keep your business buried on page 5 of Google results.',
      painPoints: [
        'Your website doesn\'t appear on the first page for relevant searches',
        'Slow page load times hurting both rankings and user experience',
        'Missing meta tags, structured data, and proper heading hierarchy',
        'No mobile optimization — Google uses mobile-first indexing',
        'Competitors outranking you despite having inferior services',
      ],
    },
    solution: {
      title: 'Technical SEO That Delivers Real Rankings',
      description: 'We don\'t do black-hat tricks or keyword stuffing. We focus on solid technical foundations — clean code, fast loading, proper structure — that earn sustainable rankings.',
      approach: [
        'Comprehensive technical SEO audit identifying every issue',
        'Core Web Vitals optimization for Google ranking signals',
        'Meta tags, Open Graph, and Twitter Card implementation',
        'Schema markup (LocalBusiness, FAQ, Service) for rich snippets',
        'Image optimization and lazy loading for faster page speeds',
        'Content structure analysis and heading hierarchy fixes',
      ],
    },
    features: [
      { title: 'Technical SEO Audit', description: 'A complete analysis of your site\'s technical SEO health with actionable recommendations.', icon: 'search' },
      { title: 'Core Web Vitals', description: 'Optimization of LCP, FID, and CLS metrics that directly affect Google rankings.', icon: 'activity' },
      { title: 'Schema Markup', description: 'Structured data implementation for rich search results and knowledge panels.', icon: 'code' },
      { title: 'Page Speed', description: 'Image optimization, code splitting, caching strategies, and CDN configuration.', icon: 'zap' },
      { title: 'Mobile Optimization', description: 'Ensuring perfect mobile experience for Google\'s mobile-first indexing.', icon: 'smartphone' },
      { title: 'Analytics Setup', description: 'Google Search Console, Analytics 4, and conversion tracking configuration.', icon: 'bar-chart' },
    ],
    benefits: [
      'Higher Google rankings for relevant keywords',
      'Faster page load times (sub-2-second)',
      'Rich search results with schema markup',
      'Better user experience reducing bounce rates',
      'Mobile-optimized for Google\'s mobile-first indexing',
      'Data-driven insights with proper analytics',
    ],
    techStack: ['Google Search Console', 'Google Analytics 4', 'Lighthouse', 'GTmetrix', 'Ahrefs', 'Schema.org'],
    process: [
      { step: '01', title: 'SEO Audit', description: 'We run a comprehensive technical audit identifying every issue affecting your rankings.' },
      { step: '02', title: 'Strategy & Priorities', description: 'We prioritize fixes by impact and create a clear implementation roadmap.' },
      { step: '03', title: 'Implementation', description: 'We fix technical issues, optimize content structure, and implement schema markup.' },
      { step: '04', title: 'Monitor & Report', description: 'Monthly reports tracking keyword rankings, traffic growth, and performance metrics.' },
    ],
    faq: [
      { question: 'How long until I see SEO results?', answer: 'Technical SEO improvements can show results in 2-4 weeks. Content-driven SEO typically takes 3-6 months for significant ranking improvements.' },
      { question: 'Do you guarantee first-page rankings?', answer: 'No ethical SEO provider can guarantee specific rankings. What we guarantee is implementing best practices that significantly improve your visibility over time.' },
      { question: 'Do you do content writing?', answer: 'We focus on technical SEO and content structure. For content writing, we can recommend partners or provide guidance for your team.' },
      { question: 'What\'s included in the monthly report?', answer: 'Keyword ranking changes, organic traffic metrics, Core Web Vitals scores, crawl error reports, and actionable recommendations for the next month.' },
    ],
    cta: {
      title: 'Ready to Dominate Google Search Results?',
      description: 'Get a free SEO audit and discover exactly what\'s holding your website back from ranking.',
    },
  },
  {
    id: 'maintenance',
    slug: 'maintenance-support',
    title: 'Maintenance & Support',
    shortTitle: 'Support',
    metaTitle: 'Website Maintenance & Support Plans | PrimeSoul',
    metaDescription: 'Ongoing website maintenance, security patches, performance monitoring & priority support. Keep your site secure, fast & up-to-date.',
    heroTagline: 'Your Site, Always Sharp',
    heroDescription: 'Websites aren\'t set-and-forget. We provide ongoing updates, security patches, performance monitoring, and priority support so your site stays fast, secure, and relevant.',
    icon: 'shield',
    accent: '#7B2FF2',
    problem: {
      title: 'Neglected Websites Break Down',
      description: 'An unmaintained website is a liability. Outdated software creates security vulnerabilities, broken features frustrate users, and degrading performance hurts your Google rankings.',
      painPoints: [
        'Security vulnerabilities from outdated dependencies',
        'Broken features that nobody noticed until a customer complained',
        'Slowly degrading performance that\'s invisible until it\'s critical',
        'No backup strategy — risking total data loss',
        'No one to call when something goes wrong at 2 AM',
      ],
    },
    solution: {
      title: 'Proactive Care, Not Reactive Firefighting',
      description: 'We monitor, update, and optimize your website continuously. You focus on your business — we handle the technical side.',
      approach: [
        'Monthly dependency updates and security patches',
        'Automated daily backups with disaster recovery plan',
        'Uptime monitoring with instant alerts for downtime',
        'Performance optimization and speed checks every month',
        'Content updates and minor feature additions',
        'Domain registration and hosting management',
        'Priority support with guaranteed response times',
      ],
    },
    features: [
      { title: 'Monthly Updates', description: 'Regular dependency updates, bug fixes, and content changes to keep your site current.', icon: 'refresh' },
      { title: 'Security Patches', description: 'Proactive vulnerability scanning and immediate patching of security issues.', icon: 'shield' },
      { title: 'Uptime Monitoring', description: '24/7 monitoring with instant alerts if your site goes down, and rapid response.', icon: 'activity' },
      { title: 'Priority Support', description: 'Direct line to your development team with guaranteed response times.', icon: 'headphones' },
      { title: 'Performance Checks', description: 'Monthly Lighthouse audits and Core Web Vitals monitoring with optimization.', icon: 'zap' },
      { title: 'Daily Backups', description: 'Automated backups with easy restoration, so you never lose data.', icon: 'save' },
      { title: 'Domain & Hosting', description: 'We handle your domain renewals and server management automatically.', icon: 'globe' },
    ],
    benefits: [
      'Peace of mind knowing your site is monitored 24/7',
      'No surprise downtime or security breaches',
      'Consistent performance and speed improvements',
      'Always-current content and features',
      'Priority access to development resources',
      'Predictable monthly costs — no surprise bills',
    ],
    techStack: ['Vercel', 'UptimeRobot', 'Sentry', 'GitHub Actions', 'Lighthouse CI'],
    process: [
      { step: '01', title: 'Site Audit', description: 'We assess your current site health, identify vulnerabilities, and create a maintenance plan.' },
      { step: '02', title: 'Setup Monitoring', description: 'We configure uptime monitoring, error tracking, and automated backup systems.' },
      { step: '03', title: 'Ongoing Care', description: 'Monthly updates, security patches, and performance optimization on a predictable schedule.' },
      { step: '04', title: 'Monthly Reports', description: 'Transparent reports showing uptime, performance metrics, and work completed.' },
    ],
    faq: [
      { question: 'What\'s included in the maintenance plan?', answer: 'Monthly updates, security patches, uptime monitoring, daily backups, performance checks, and up to 2 hours of content/feature changes per month. Domain and hosting management are also included.' },
      { question: 'How much does maintenance cost?', answer: 'Plans start at ₹999/month for basic monitoring and updates. Premium plans with priority support start at ₹2,499/month.' },
      { question: 'What\'s the response time for issues?', answer: 'Critical issues (site down): within 1 hour. Non-critical issues: within 24 hours. Feature requests: within 48 hours.' },
      { question: 'Do you manage domains and hosting?', answer: 'Yes! We can register domains on your behalf and handle all hosting setup, renewals, and configurations so you don\'t have to deal with technical setups.' },
      { question: 'Can I cancel anytime?', answer: 'Yes, maintenance plans are month-to-month with no long-term contracts. You can cancel with 30 days notice.' },
    ],
    cta: {
      title: 'Keep Your Website Running Perfectly',
      description: 'Choose a maintenance plan that fits your needs and never worry about your website again.',
    },
  },
  {
    id: 'meta-ads',
    slug: 'meta-ads-management',
    title: 'Meta Ads Management',
    shortTitle: 'Meta Ads',
    metaTitle: 'Meta (Facebook & Instagram) Ads Management | PrimeSoul',
    metaDescription: 'Expert setup and management for Facebook and Instagram ad campaigns. Drive targeted traffic and leads to your business.',
    heroTagline: 'Targeted Growth with Meta Ads',
    heroDescription: 'We set up and run highly targeted Facebook and Instagram ad campaigns designed to generate leads and sales, not just likes.',
    icon: 'target',
    accent: '#1877F2',
    problem: {
      title: 'Wasting Money on Ads That Don\'t Convert?',
      description: 'Running ads without a proper strategy or targeting often results in burning through your budget with zero return on investment.',
      painPoints: [
        'High cost per click and low conversion rates',
        'Confusing Facebook Ads Manager interface',
        'Not knowing which creatives or audiences work best',
      ],
    },
    solution: {
      title: 'Data-Driven Ad Campaigns',
      description: 'We handle everything from audience research and ad creative to ongoing optimization and reporting.',
      approach: [
        'Audience targeting based on demographics and interests',
        'A/B testing ad copy and creatives',
        'Pixel setup and conversion tracking',
      ],
    },
    features: [
      { title: 'Campaign Strategy', description: 'Custom ad strategies tailored to your specific goals.', icon: 'map' },
      { title: 'Ad Creatives', description: 'Eye-catching visuals and persuasive copy.', icon: 'image' },
      { title: 'A/B Testing', description: 'Continuous testing to find the best performing ads.', icon: 'sliders' },
    ],
    benefits: [
      'Lower Cost Per Acquisition (CPA)',
      'Highly targeted local or global reach',
      'Transparent ROI reporting',
    ],
    techStack: ['Meta Ads Manager', 'Facebook Pixel', 'Google Analytics'],
    process: [
      { step: '01', title: 'Strategy', description: 'Define goals, budget, and target audience.' },
      { step: '02', title: 'Setup', description: 'Create campaigns, ad sets, and configure pixel tracking.' },
      { step: '03', title: 'Launch', description: 'Deploy ads and monitor initial performance closely.' },
    ],
    faq: [
      { question: 'What is a good starting budget?', answer: 'We recommend at least ₹15,000/month in ad spend to gather enough data for optimization.' },
      { question: 'Do you create the ad images/videos?', answer: 'Yes, our team designs the graphics and writes the copy for the ads.' },
    ],
    cta: {
      title: 'Ready to Scale with Meta Ads?',
      description: 'Let us handle your campaigns while you focus on closing leads.',
    },
  },
  {
    id: 'gbp',
    slug: 'google-business-profile',
    title: 'Google Business Profile Optimization',
    shortTitle: 'Local SEO',
    metaTitle: 'Google Business Profile Setup & Optimization | PrimeSoul',
    metaDescription: 'Optimize your Google Business Profile to dominate local search results and attract more customers in your area.',
    heroTagline: 'Dominate Local Search',
    heroDescription: 'We help local businesses set up, verify, and optimize their Google Business Profile to rank higher in Google Maps and local search results.',
    icon: 'map-pin',
    accent: '#EA4335',
    problem: {
      title: 'Missing Out on Local Customers',
      description: 'When people search for your services "near me", they call the businesses that appear at the top of Google Maps. If you are not there, you are losing money.',
      painPoints: [
        'Profile not verified or incomplete',
        'Competitors outranking you in Google Maps',
        'Lack of reviews or poorly managed reviews',
      ],
    },
    solution: {
      title: 'Complete GBP Management',
      description: 'We fully optimize your profile with the right categories, services, products, and images to ensure maximum visibility.',
      approach: [
        'Complete profile audit and setup',
        'Keyword-optimized business description',
        'Regular updates and post management',
      ],
    },
    features: [
      { title: 'Profile Verification', description: 'Assistance with the Google verification process.', icon: 'check-circle' },
      { title: 'SEO Optimization', description: 'Adding relevant keywords to your profile and services.', icon: 'search' },
      { title: 'Review Strategy', description: 'Guidance on how to acquire and respond to customer reviews.', icon: 'star' },
    ],
    benefits: [
      'Appear in the coveted Google Local 3-Pack',
      'Increase phone calls and website visits',
      'Build trust through a professional, complete profile',
    ],
    techStack: ['Google Business Profile', 'Local SEO Tools'],
    process: [
      { step: '01', title: 'Audit', description: 'Review your current local presence and competitor profiles.' },
      { step: '02', title: 'Optimization', description: 'Fill out all profile sections with keyword-rich content.' },
      { step: '03', title: 'Management', description: 'Ongoing updates, posts, and performance monitoring.' },
    ],
    faq: [
      { question: 'How long does it take to rank higher?', answer: 'Local SEO can take anywhere from a few weeks to a few months depending on competition in your area.' },
      { question: 'Do I need a website for this?', answer: 'While highly recommended, a website is not strictly required to have a Google Business Profile.' },
    ],
    cta: {
      title: 'Want More Local Customers?',
      description: 'Let\'s optimize your Google Business Profile today.',
    },
  },
  {
    id: 'social-media',
    slug: 'social-media-management',
    title: 'Social Media Management',
    shortTitle: 'Social Media',
    metaTitle: 'Social Media Management Services | PrimeSoul',
    metaDescription: 'Professional social media management. Content posting, festival creatives, and audience engagement for Facebook & Instagram.',
    heroTagline: 'Engage Your Audience',
    heroDescription: 'We manage your social media presence with regular content posting, custom festival creatives, and consistent branding to keep your audience engaged.',
    icon: 'instagram',
    accent: '#E1306C',
    problem: {
      title: 'Inconsistent Social Media Presence',
      description: 'Posting randomly or abandoning your social media accounts makes your business look inactive and unprofessional to potential customers.',
      painPoints: [
        'No time to create posts and graphics',
        'Missing out on festival greetings and trending topics',
        'Inconsistent branding across posts',
      ],
    },
    solution: {
      title: 'Done-For-You Content Creation',
      description: 'We handle your content calendar, design eye-catching graphics, and post consistently to keep your brand top-of-mind.',
      approach: [
        'Monthly content calendar planning',
        'Custom graphic design for every post',
        'Strategic hashtag and caption writing',
      ],
    },
    features: [
      { title: 'Content Calendar', description: 'Planned posts for the entire month in advance.', icon: 'calendar' },
      { title: 'Festival Creatives', description: 'Custom graphics for all major holidays and festivals.', icon: 'gift' },
      { title: 'Copywriting', description: 'Engaging captions with relevant hashtags.', icon: 'edit-3' },
    ],
    benefits: [
      'Save hours of time every week',
      'Maintain a professional, active online presence',
      'Build brand loyalty with consistent engagement',
    ],
    techStack: ['Canva', 'Meta Business Suite', 'Buffer'],
    process: [
      { step: '01', title: 'Onboarding', description: 'Understand your brand voice and visual style.' },
      { step: '02', title: 'Creation', description: 'Design a month\'s worth of content for your approval.' },
      { step: '03', title: 'Publishing', description: 'Schedule and publish posts at optimal times.' },
    ],
    faq: [
      { question: 'Which platforms do you manage?', answer: 'We primarily focus on Facebook and Instagram for local businesses.' },
      { question: 'Do you reply to comments?', answer: 'Basic engagement (liking comments) is included. Custom responses to specific inquiries are forwarded to you.' },
    ],
    cta: {
      title: 'Need a Consistent Social Presence?',
      description: 'Let us handle your social media so you can run your business.',
    },
  },
  {
    id: 'graphic-design',
    slug: 'graphic-design',
    title: 'Graphic Design',
    shortTitle: 'Graphic Design',
    metaTitle: 'Professional Graphic Design Services | PrimeSoul',
    metaDescription: 'High-quality graphic design for posters, banners, social creatives, and branding assets.',
    heroTagline: 'Visuals That Speak',
    heroDescription: 'From striking posters and banners to cohesive social media creatives, we design visual assets that make your brand stand out.',
    icon: 'pen-tool',
    accent: '#FF4081',
    problem: {
      title: 'Poor Visuals Hurt Your Brand',
      description: 'Amateur designs and templates make your business blend in with everyone else, reducing trust and perceived value.',
      painPoints: [
        'Using generic templates that competitors also use',
        'Visuals that look pixelated or unprofessional',
        'Designs that don\'t communicate your message clearly',
      ],
    },
    solution: {
      title: 'Custom, High-Impact Designs',
      description: 'We create bespoke graphics tailored to your brand identity, ensuring you look premium across all mediums.',
      approach: [
        'Understanding the goal and medium of the design',
        'Creating custom illustrations and layouts',
        'Providing print-ready and web-ready formats',
      ],
    },
    features: [
      { title: 'Marketing Materials', description: 'Flyers, brochures, and posters.', icon: 'file-text' },
      { title: 'Digital Assets', description: 'Web banners, social creatives, and ad graphics.', icon: 'monitor' },
      { title: 'Brand Assets', description: 'Business cards, letterheads, and presentation templates.', icon: 'briefcase' },
    ],
    benefits: [
      'Elevate your brand\'s perceived value',
      'Stand out with unique, custom visuals',
      'Get files in the exact formats you need',
    ],
    techStack: ['Adobe Illustrator', 'Photoshop', 'Figma'],
    process: [
      { step: '01', title: 'Brief', description: 'Tell us what you need and where it will be used.' },
      { step: '02', title: 'Design', description: 'We create the initial design concepts.' },
      { step: '03', title: 'Delivery', description: 'Refinement and final file delivery.' },
    ],
    faq: [
      { question: 'Do you design for print?', answer: 'Yes, we provide high-resolution, CMYK, print-ready files with proper bleed margins.' },
      { question: 'How many revisions do I get?', answer: 'Most projects include 2-3 rounds of revisions to ensure you are perfectly happy with the result.' },
    ],
    cta: {
      title: 'Need Professional Graphics?',
      description: 'Elevate your marketing with our custom design services.',
    },
  },
  {
    id: 'ai-automation',
    slug: 'ai-business-automation',
    title: 'AI & Business Automation',
    shortTitle: 'AI & Automation',
    metaTitle: 'AI & Business Automation Services | PrimeSoul',
    metaDescription: 'Streamline your business workflows with custom AI integrations, chatbots, automated CRM sync, and smart process automation. Save 20+ hours per week.',
    heroTagline: 'Automate Repetitive Work With AI',
    heroDescription: 'We design and build custom AI-powered workflows, automated customer support bots, data extraction pipelines, and CRM integrations that save your business hundreds of manual hours every month.',
    icon: 'bot',
    accent: '#8B5CF6',
    problem: {
      title: 'Manual Processes Are Slowing Your Business Down',
      description: 'Your team spends hours copying data between spreadsheets, responding to repetitive customer inquiries, and manually processing invoices. This wastes time, increases human error, and limits growth.',
      painPoints: [
        'Hours wasted on repetitive data entry and manual follow-ups',
        'Delayed response times to customer inquiries costing sales',
        'Disconnected software tools that don\'t talk to each other',
        'High operational costs from hiring for repetitive tasks',
        'Missed leads due to lack of 24/7 automated engagement',
      ],
    },
    solution: {
      title: 'Smart AI Workflows & Custom Automation',
      description: 'We integrate custom AI models (OpenAI, Claude, custom LLMs) and automated workflows (Make/Zapier, Python scripts, webhooks) directly into your business stack.',
      approach: [
        'Workflow audit to identify high-ROI automation targets',
        'Custom AI chatbot setup for 24/7 instant customer support',
        'Automated lead capture, qualification, and CRM routing',
        'Document parsing and automated data extraction',
        'API integrations connecting your website, email, and tools',
        'Continuous monitoring and AI prompt refinement',
      ],
    },
    features: [
      { title: 'AI Customer Support Chatbots', description: 'Train AI on your knowledge base to answer customer questions 24/7 instantly.', icon: 'bot' },
      { title: 'Workflow Automation', description: 'Connect your CRM, email, forms, and database for zero-manual-effort workflows.', icon: 'zap' },
      { title: 'Lead Qualification AI', description: 'Qualify and segment incoming leads automatically before routing to sales.', icon: 'users' },
      { title: 'Document & Invoice Parsing', description: 'Extract key data from PDFs, receipts, and forms directly into your database.', icon: 'edit' },
      { title: 'Custom AI API Integration', description: 'Integrate GPT-4, Claude, or custom LLMs directly into your web applications.', icon: 'code' },
      { title: 'Automated Email & SMS Alerts', description: 'Trigger personalized follow-up emails and SMS alerts based on user actions.', icon: 'mail' },
    ],
    benefits: [
      'Save 20+ hours per team member every week',
      '24/7 instant response time to incoming leads',
      '99% reduction in manual data entry errors',
      'Lower operational costs with scalable automation',
      'Seamless software stack integration',
      'Faster sales cycle from instant lead follow-ups',
    ],
    techStack: ['OpenAI API', 'Make / Zapier', 'Python', 'Node.js', 'Webhooks', 'Next.js'],
    process: [
      { step: '01', title: 'Automation Audit', description: 'We map out your current business processes and identify repetitive tasks with highest ROI for automation.' },
      { step: '02', title: 'Architecture & Design', description: 'We design custom workflow blueprints, select the right AI models, and define security parameters.' },
      { step: '03', title: 'Development & Integration', description: 'We build and test custom automation scripts, AI prompts, API webhooks, and database syncs.' },
      { step: '04', title: 'Deployment & Training', description: 'We launch the automation live, train your team, and provide ongoing optimization.' },
    ],
    faq: [
      { question: 'What software can you automate?', answer: 'We can integrate almost any tool with an API or webhook, including CRM systems (HubSpot, Salesforce), email tools, Google Sheets, WhatsApp, Slack, databases, and custom web apps.' },
      { question: 'Is my business data secure with AI?', answer: 'Yes. We use enterprise API endpoints with strict data privacy guidelines where your data is never used to train public AI models.' },
      { question: 'How long does an automation project take?', answer: 'Simple workflow automations take 3-5 days. Custom AI chatbots and multi-tool pipelines take 1-3 weeks.' },
      { question: 'Do I need technical skills to manage it?', answer: 'Not at all! We build user-friendly dashboards and control panels so anyone on your team can manage or trigger automations easily.' },
    ],
    cta: {
      title: 'Ready to Automate Your Business & Save 20+ Hours/Week?',
      description: 'Get a free automation consultation and discover how AI can streamline your operations.',
    },
  },
  {
    id: 'data-analytics',
    slug: 'data-analytics',
    title: 'Data Analytics',
    shortTitle: 'Data Analytics',
    metaTitle: 'Data Analytics Services & Custom Dashboards | PrimeSoul',
    metaDescription: 'Transform raw data into actionable growth insights. Custom analytics dashboards, GA4 tracking, conversion rate optimization, and business intelligence.',
    heroTagline: 'Data-Driven Insights for Smarter Decisions',
    heroDescription: 'Stop guessing what works. We set up comprehensive tracking systems, custom business intelligence dashboards, and user behavior analytics to give you real-time clarity on revenue, traffic, and user conversion.',
    icon: 'bar-chart',
    accent: '#10B981',
    problem: {
      title: 'Operating Without Clear Data Is Costing You Revenue',
      description: 'Most business owners have no idea which marketing channels bring real sales, where users drop off on their website, or what their actual customer acquisition cost is. Guessing leads to wasted marketing budget.',
      painPoints: [
        'No clear visibility into website sales conversions or user drop-off points',
        'Incorrect or broken Google Analytics (GA4) event setups',
        'Scattered data across multiple tools with no single source of truth',
        'Wasted ad spend on low-performing campaigns or keywords',
        'Lack of automated reporting dashboards for management',
      ],
    },
    solution: {
      title: 'Complete Analytics Infrastructure & Real-Time Dashboards',
      description: 'We configure end-to-end tracking (GA4, Google Tag Manager, Mixpanel), build custom Looker Studio dashboards, and deliver actionable insights that directly drive business growth.',
      approach: [
        'Analytics audit & measurement plan tailored to your business KPIs',
        'GA4 & Google Tag Manager custom event and conversion setup',
        'Heatmaps and session recording integration (Hotjar/Clarity)',
        'Custom Looker Studio / Metabase automated reporting dashboards',
        'Funnel analysis & Conversion Rate Optimization (CRO) recommendations',
        'Regular performance reviews and growth insights',
      ],
    },
    features: [
      { title: 'GA4 & GTM Setup', description: 'Advanced event tracking, ecommerce tracking, and custom dimension configuration.', icon: 'search' },
      { title: 'Custom Looker Dashboards', description: 'Real-time visual dashboards combining sales, ad spend, and website traffic data.', icon: 'bar-chart' },
      { title: 'Conversion Funnel Analysis', description: 'Identify exact drop-off points in your sign-up, checkout, or lead forms.', icon: 'trending-up' },
      { title: 'Heatmaps & User Behavior', description: 'See how users scroll, click, and interact with your website visually.', icon: 'eye' },
      { title: 'E-Commerce Tracking', description: 'Track revenue, average order value, cart abandonment, and product performance.', icon: 'grid' },
      { title: 'Automated Executive Reports', description: 'Receive weekly or monthly visual email reports delivered directly to your inbox.', icon: 'edit' },
    ],
    benefits: [
      '100% accurate data tracking across all user touchpoints',
      'Identify and fix conversion bottlenecks to boost sales',
      'Optimize marketing spend by doubling down on top channels',
      'Save hours on manual reporting with automated dashboards',
      'Make confident business decisions backed by real numbers',
      'Improve ROI on paid ad campaigns',
    ],
    techStack: ['Google Analytics 4', 'Google Tag Manager', 'Looker Studio', 'Hotjar', 'PostgreSQL', 'BigQuery'],
    process: [
      { step: '01', title: 'Data Audit & KPI Mapping', description: 'We review your existing tracking, define core business KPIs, and create a custom tracking plan.' },
      { step: '02', title: 'Tracking Setup & Tagging', description: 'We configure GA4, Google Tag Manager, custom events, pixels, and conversion goals.' },
      { step: '03', title: 'Dashboard Building', description: 'We build interactive, easy-to-understand Looker Studio / custom reporting dashboards.' },
      { step: '04', title: 'Insights & Optimization', description: 'We analyze initial data, share actionable optimization recommendations, and refine tracking.' },
    ],
    faq: [
      { question: 'Why is GA4 setup important?', answer: 'Default GA4 setups miss critical user actions like button clicks, form submissions, and video plays. Custom GTM configuration ensures every important business action is measured.' },
      { question: 'Can you combine data from multiple sources?', answer: 'Yes! We can merge data from your website, Facebook ads, Google Ads, CRM, and payment gateways into a single Looker Studio dashboard.' },
      { question: 'How quickly can analytics be set up?', answer: 'Basic tracking & dashboard setups take 3-5 days. Advanced ecommerce and multi-platform integrations take 1-2 weeks.' },
    ],
    cta: {
      title: 'Turn Your Raw Data Into Measurable Growth',
      description: 'Get a free analytics audit and see how custom reporting can boost your business performance.',
    },
  },
  {
    id: 'email-marketing',
    slug: 'email-marketing',
    title: 'Email Marketing',
    shortTitle: 'Email Marketing',
    metaTitle: 'Email Marketing & Flow Automation Services | PrimeSoul',
    metaDescription: 'High-converting email marketing campaigns, automated welcome flows, cart recovery sequences, and newsletter design that turn subscribers into repeat buyers.',
    heroTagline: 'High-ROI Email Campaigns & Automated Flows',
    heroDescription: 'Email marketing generates the highest ROI of any digital channel ($36 for every $1 spent). We design responsive email templates, set up automated revenue sequences, and craft compelling copy that drives recurring sales.',
    icon: 'mail',
    accent: '#E879F9',
    problem: {
      title: 'Leaving Money on the Table Without Automated Email Flows',
      description: 'If you\'re only sending occasional manual emails — or none at all — you\'re missing out on 30-40% of potential recurring revenue. One-time website visitors leave and forget your brand forever.',
      painPoints: [
        'High website traffic but low repeat customer purchase rates',
        'No automated welcome series to nurture new subscribers',
        'High shopping cart / lead form abandonment with no recovery sequence',
        'Emails landing in spam folders due to poor domain warmup and deliverability',
        'Outdated, non-responsive email designs that break on mobile devices',
      ],
    },
    solution: {
      title: 'Automated Email Funnels & High-Converting Campaigns',
      description: 'We design custom HTML email templates, write persuasive copy, build behavioral automation flows (Klaviyo, Mailchimp, Brevo), and optimize deliverability to maximize inbox placement.',
      approach: [
        'Email marketing audit and strategy development',
        'Custom responsive HTML/CSS email template design matching your brand',
        'Persuasive, conversion-driven email copywriting',
        'Automated lifecycle flows (Welcome series, Abandoned cart, Re-engagement)',
        'Audience segmentation for hyper-targeted campaign sending',
        'Spam testing, domain authentication (SPF, DKIM, DMARC), and deliverability optimization',
      ],
    },
    features: [
      { title: 'Automated Lifecycle Flows', description: 'Set-and-forget welcome series, abandoned cart, post-purchase, and win-back sequences.', icon: 'zap' },
      { title: 'Custom Email Template Design', description: 'Pixel-perfect, mobile-responsive HTML email designs tailored to your brand.', icon: 'palette' },
      { title: 'Conversion Copywriting', description: 'Subject lines that get opened and email copy that gets clicks and conversions.', icon: 'edit' },
      { title: 'Audience Segmentation', description: 'Target subscribers based on purchase history, behavior, engagement, and interests.', icon: 'users' },
      { title: 'Deliverability & Domain Warmup', description: 'SPF, DKIM, and DMARC setup to ensure your emails land in the primary inbox.', icon: 'shield' },
      { title: 'A/B Testing & Optimization', description: 'Test subject lines, CTA buttons, send times, and design layouts for maximum ROI.', icon: 'trending-up' },
    ],
    benefits: [
      'Generate 25-40% additional revenue from automated flows',
      '35%+ average open rates with optimized deliverability',
      'Turn one-time buyers into loyal repeat customers',
      'Complete hands-off automated email sales engine',
      'Mobile-responsive email designs built for all devices',
      'Clear ROI tracking on every email campaign',
    ],
    techStack: ['Klaviyo', 'Mailchimp', 'Brevo (Sendinblue)', 'ConvertKit', 'Figma', 'HTML/CSS'],
    process: [
      { step: '01', title: 'Audit & Strategy', description: 'We analyze your current list, subscriber growth, and deliverability to craft a high-converting email roadmap.' },
      { step: '02', title: 'Design & Copywriting', description: 'We design custom brand templates and write compelling, high-converting copy for all email sequences.' },
      { step: '03', title: 'Automation Setup', description: 'We build trigger-based flows, segment subscriber lists, and test across all major email clients.' },
      { step: '04', title: 'Launch & A/B Optimization', description: 'We go live, monitor open/click rates, optimize deliverability, and continuously refine performance.' },
    ],
    faq: [
      { question: 'Which email platform do you recommend?', answer: 'We work with Klaviyo (best for ecommerce), Mailchimp, Brevo, ConvertKit, and ActiveCampaign. We can recommend or migrate you to the best option.' },
      { question: 'How do you prevent emails from going to Spam?', answer: 'We properly configure technical domain authentication (SPF, DKIM, DMARC), implement gradual IP/domain warmup, and follow strict content guidelines to maximize inbox placement.' },
      { question: 'How quickly can email flows be launched?', answer: 'Core email flow setup (Welcome, Abandoned Cart, Post-Purchase) takes 1-2 weeks from design to launch.' },
    ],
    cta: {
      title: 'Ready to Build a High-ROI Email Marketing Funnel?',
      description: 'Get a free email consultation and learn how automated email flows can boost your revenue.',
    },
  },
]

export function getServiceBySlug(slug: string): ServicePageData | undefined {
  return SERVICE_PAGES.find(s => s.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return SERVICE_PAGES.map(s => s.slug)
}
