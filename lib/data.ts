export const AGENCY = {
  name: 'PrimeSoul',
  tagline: 'Digital Experiences That Drive Growth',
  description: 'We craft premium digital solutions — from high-converting websites to full-scale web platforms — for businesses that refuse to settle for average.',
  founder: {
    name: 'Param Sisodiya',
    role: 'Founder',
    location: 'Rajgarh, Madhya Pradesh',
    bio: 'Visionary behind PrimeSoul, driving the agency\'s direction, client relationships, and overall growth strategy. Our team combines design, engineering, and strategy to deliver premium digital products.',
    email: 'info@primesoul.tech',
    phone: '8770404559',
    whatsapp: '918770404559',
  },
  social: {
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
} as const

export interface Project {
  slug: string
  title: string
  category: string
  client: string
  year: string
  description: string
  problem: string
  solution: string
  result: string
  tech: string[]
  liveUrl: string
  image: string
  imageAlt: string
  featured: boolean
  isProduct?: boolean
  metrics: { label: string; value: string }[]
  color: string
}

export const PRIMEOMS_PRODUCT = {
  name: 'PrimeOMS',
  tagline: 'Restaurant Operations, Simplified',
  eyebrow: 'PRIMESOUL FLAGSHIP PRODUCT',
  badge: 'Built & Maintained by PrimeSoul',
  heroHeadline: 'Smarter Restaurant Operations. Simpler Ordering.',
  heroDescription: 'PrimeOMS brings restaurant operations into one powerful platform — from digital menus and QR table ordering to billing, customer loyalty, and everyday kitchen workflows.',
  liveUrl: '/primeoms',
  officialUrl: 'https://primeoms.vercel.app/',
  signupUrl: 'https://primeoms.vercel.app/signup',
  pricing: {
    basic: {
      name: 'Basic',
      price: 799,
      period: 'month',
      description: 'Ideal for small cafes, quick-service diners, and standalone restaurants.',
      features: [
        'High-Resolution Printable QR Codes',
        'Mobile Digital Menu with Custom Categories',
        'Contactless Table Ordering',
        'Live Order Status Pipeline',
        'Direct UPI & Cash Payment Tracking',
        'Digital Receipts (SMS/WhatsApp shareable)',
        'Basic Daily Sales Overview',
        'Email & WhatsApp Support',
      ],
      popular: false,
      cta: 'Start 14-Day Free Trial',
    },
    pro: {
      name: 'Pro',
      price: 1499,
      period: 'month',
      description: 'For growing restaurants, multi-table venues, and busy food operations.',
      features: [
        'Everything in Basic Plan',
        'Full Real-Time Analytics Dashboard',
        'Hourly Sales & Peak Hours Distribution',
        'Best-Selling Items & Category Breakdown',
        'Customer CRM (Diner Database & History)',
        'Automated Loyalty & Rewards System',
        'Promotional Coupons & Digital Gift Cards',
        'Inventory & Stock Tracking',
        'Priority Phone & Dedicated WhatsApp Support',
      ],
      popular: true,
      cta: 'Start 14-Day Free Trial',
    },
  },
  featureCategories: [
    {
      id: 'ordering',
      title: 'Restaurant Ordering',
      description: 'Enable frictionless diner self-ordering directly from table standees.',
      icon: 'qr-code',
      items: [
        { title: 'QR Table Ordering', description: 'Guests scan the table QR code and order immediately without waiting for waitstaff.' },
        { title: 'Interactive Digital Menu', description: 'Crisp item photos, descriptions, veg/non-veg tags, and live price management.' },
        { title: 'Real-Time Kitchen Sync', description: 'Instant order alerts with item instructions sent directly to kitchen display.' },
        { title: 'Order Stage Tracking', description: 'Status progression: Pending → Accepted → Preparing → Ready → Served.' },
      ],
    },
    {
      id: 'management',
      title: 'Restaurant Management',
      description: 'Centralize tables, daily shifts, and operational metrics in one place.',
      icon: 'layout-dashboard',
      items: [
        { title: 'Analytics Dashboard', description: 'Real-time sales revenue, total orders count, and Average Order Value metrics.' },
        { title: 'Table Management', description: 'Generate and print custom QR standees for regular tables and VIP lounges.' },
        { title: 'Peak Hours Insights', description: 'Understand busiest dining hours and staff accordingly for faster turn times.' },
        { title: 'Inventory Tracking', description: 'Monitor essential ingredient stocks and receive low inventory alerts.' },
      ],
    },
    {
      id: 'billing',
      title: 'Billing & Payments',
      description: 'Fast, accurate bills with zero gateway commission fees.',
      icon: 'credit-card',
      items: [
        { title: 'Direct UPI Payments', description: 'Display restaurant UPI QR for direct-to-bank settlement without third-party cuts.' },
        { title: 'Digital Receipts & Invoices', description: 'Instant PDF invoices and mobile receipts sent directly to customer phones.' },
        { title: 'Sales Reconciliation', description: 'Daily revenue reports and payment method breakdown (UPI vs Cash).' },
        { title: 'Quick Discounts', description: 'Apply percentage or flat rupee discounts directly at checkout.' },
      ],
    },
    {
      id: 'crm',
      title: 'Customer Loyalty & CRM',
      description: 'Turn one-time diners into high-frequency repeat regulars.',
      icon: 'heart-handshake',
      items: [
        { title: 'Diner Profile CRM', description: 'Maintain verified customer profiles with phone numbers and lifetime spend.' },
        { title: 'Automated Loyalty Points', description: 'Issue points on every purchase and let diners redeem points for bill discounts.' },
        { title: 'Promotional Coupons', description: 'Create time-limited discount codes for festive seasons and special events.' },
        { title: 'Digital Gift Cards', description: 'Issue and redeem digital prepaid gift vouchers to drive upfront revenue.' },
      ],
    },
  ],
  workflow: [
    { step: '01', title: 'Customer Scans QR', description: 'Diner sits at table and scans the high-resolution QR standee with their phone.' },
    { step: '02', title: 'Browses Digital Menu', description: 'Explores high-res dishes, customizes options, and adds items to order cart.' },
    { step: '03', title: 'Places Order', description: 'Submits the table order directly without waiting for a waiter.' },
    { step: '04', title: 'Kitchen Prepares', description: 'Kitchen receives the live ticket with special instructions instantly.' },
    { step: '05', title: 'Food Served & Billed', description: 'Staff marks order as served, generates bill with direct UPI or cash.' },
    { step: '06', title: 'Loyalty Points Earned', description: 'Customer receives digital invoice and automated loyalty points for their visit.' },
  ],
} as const

export const PRIMEOMS_FAQS = [
  {
    question: 'What is PrimeOMS?',
    answer: 'PrimeOMS is an all-in-one restaurant operations SaaS platform developed and maintained by PrimeSoul Web Solutions. It provides high-resolution QR table menus, contactless table ordering, live kitchen order management (KDS), direct-to-bank UPI billing, and an automated customer loyalty rewards system.',
  },
  {
    question: 'Who is PrimeOMS built for?',
    answer: 'PrimeOMS is built for standalone restaurants, cafes, fine dining establishments, quick-service diners, food courts, and multi-table food & beverage operations looking to speed up order taking, eliminate paper bill delays, and build direct diner relationships without paying heavy commissions.',
  },
  {
    question: 'Do I need special hardware or proprietary POS machines?',
    answer: 'No. PrimeOMS runs in any standard modern web browser on laptops, tablets, iPads, or smartphones. Diners scan QR codes directly with their standard phone camera without downloading any third-party app.',
  },
  {
    question: 'Is PrimeOMS built and supported by PrimeSoul Web Solutions?',
    answer: 'Yes. PrimeOMS is a flagship software product engineered and maintained directly by the PrimeSoul Web Solutions product team. All updates, cloud hosting, bug fixes, and customer support are handled by PrimeSoul.',
  },
  {
    question: 'How much does PrimeOMS cost?',
    answer: 'PrimeOMS offers two straightforward plans: the Basic Plan at ₹799/month (ideal for small cafes and quick diners) and the Pro Plan at ₹1,499/month (includes full analytics dashboard, customer CRM, loyalty points, coupons, and inventory tracking). Both plans are 100% commission-free.',
  },
  {
    question: 'How do I start my 14-day free trial?',
    answer: 'Click any "Start 14-Day Free Trial" button or contact us via WhatsApp (+91 8770 404 559). Our team will set up your restaurant profile, upload your digital menu, generate printable QR table standees, and give you full access within 15 minutes with no credit card required.',
  },
]

export const PROJECTS: Project[] = [
  {
    slug: 'primeoms',
    title: 'PrimeOMS — Restaurant SaaS',
    category: 'Product · SaaS',
    client: 'Built by PrimeSoul',
    year: '2026',
    description: 'PrimeSoul\'s flagship restaurant management SaaS platform featuring QR table ordering, live kitchen pipeline, direct UPI billing, and customer loyalty rewards.',
    problem: 'Traditional restaurants struggle with manual handwritten order taking, slow billing during peak hours, high aggregator commissions, and zero customer data retention.',
    solution: 'Engineered a unified full-stack restaurant operating system with printable QR table standees, real-time kitchen status pipeline, direct UPI payments, and an automated customer loyalty program.',
    result: 'Streamlined restaurant operations end-to-end, eliminated manual order errors, accelerated table turnaround times, and gave restaurant owners direct customer loyalty retention.',
    tech: ['Next.js 14', 'TypeScript', 'Firebase', 'Tailwind CSS', 'QR Engine', 'UPI Integration'],
    liveUrl: '/primeoms',
    image: '/images/primeoms-hero-mockup.jpg',
    imageAlt: 'PrimeOMS restaurant management software dashboard and QR table standee',
    featured: true,
    isProduct: true,
    metrics: [
      { label: 'Platform', value: 'SaaS' },
      { label: 'Order Flow', value: 'Instant' },
      { label: 'Pricing', value: 'From ₹799' },
    ],
    color: '#FF5A1F',
  },
  {
    slug: 'asso-solar-solutions',
    title: 'A&S Solar Solutions',
    category: 'Business Website',
    client: 'A&S Solar Solutions',
    year: '2024',
    description: 'A conversion-focused website for Rajgarh\'s leading solar company — featuring a live savings calculator, government subsidy information, and a clean lead capture system.',
    problem: 'The client had no web presence and was losing potential customers to competitors. They needed a professional platform that could explain government subsidies, calculate savings, and convert visitors into leads.',
    solution: 'Built a full-stack Next.js website with a real-time solar savings calculator, project gallery, pricing section, and a WhatsApp-integrated lead system. Designed for trust-building with local credibility signals.',
    result: 'Within weeks of launch, the client began receiving qualified leads directly through the website. The savings calculator became the highest-engagement feature, keeping visitors on-site longer.',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'JavaScript'],
    liveUrl: 'https://assolarsolutions.netlify.app',
    image: '/images/project-solar.png',
    imageAlt: 'A&S Solar Solutions website screenshot',
    featured: true,
    metrics: [
      { label: 'Pages Built', value: '8+' },
      { label: 'Load Time', value: '<1.5s' },
      { label: 'Mobile Score', value: '97' },
    ],
    color: '#1E3AE0',
  },
  {
    slug: 'param-sisodiya-portfolio',
    title: 'Personal Portfolio',
    category: 'Portfolio Website',
    client: 'Personal Brand',
    year: '2024',
    description: 'A high-end personal portfolio showcasing design and development work — built with animated sections, smooth transitions, and a strong conversion flow.',
    problem: 'Needed a digital presence that communicated credibility, showcased real projects, and converted profile visitors into clients — without looking like a generic template.',
    solution: 'Designed a dark-themed portfolio with editorial typography, animated hero section, interactive project cards, and a structured case study layout. Emphasis on storytelling over listing skills.',
    result: 'The portfolio established a professional brand presence and began attracting inbound client inquiries. Served as the foundation for launching the PrimeSoul agency.',
    tech: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    liveUrl: 'https://paramsisodiya.netlify.app',
    image: '/images/project-portfolio.png',
    imageAlt: 'Param Sisodiya portfolio website',
    featured: true,
    metrics: [
      { label: 'Sections', value: '7' },
      { label: 'Animations', value: '20+' },
      { label: 'Performance', value: '95+' },
    ],
    color: '#2EC4C4',
  },
  {
    slug: 'svns-school-khilchipur',
    title: 'SVNS School Khilchipur',
    category: 'Institutional Website',
    client: 'SVNS School',
    year: '2024',
    description: 'A complete institutional website for a government-affiliated school — featuring an online admission system, fee status checker, notices board, and gallery.',
    problem: 'The school had no digital presence and relied entirely on word-of-mouth. Parents had no way to check fee status, find notices, or apply online — causing unnecessary friction.',
    solution: 'Built a feature-rich school website with a student fee status lookup, online admission form, results section, gallery, and a mobile-first responsive layout designed for all age groups.',
    result: 'The school now has a professional digital identity. Parents actively use the fee status feature, reducing administrative calls. Admissions opened online for the first time.',
    tech: ['Next.js', 'MongoDB', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://svnskhilchipur.netlify.app',
    image: '/images/project-school.png',
    imageAlt: 'SVNS School Khilchipur website',
    featured: true,
    metrics: [
      { label: 'Features', value: '10+' },
      { label: 'Students Served', value: '300+' },
      { label: 'Admin Panels', value: '2' },
    ],
    color: '#4DA6FF',
  },
  {
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    category: 'E-Commerce',
    client: 'In Development',
    year: '2025',
    description: 'A full-featured e-commerce platform with product catalog, cart, checkout, and admin order management — currently in active development.',
    problem: 'Local businesses in Rajgarh lacked an affordable, professional e-commerce solution to sell products online without relying on third-party marketplaces.',
    solution: 'Designing a full-stack e-commerce platform with custom product management, secure checkout, order tracking, and a lightweight CMS for non-technical business owners.',
    result: 'Currently in development. Beta testing scheduled for Q3 2025 with an initial merchant cohort.',
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    liveUrl: '#',
    image: '/images/project-ecommerce.avif',
    imageAlt: 'E-commerce platform in development',
    featured: false,
    metrics: [
      { label: 'Status', value: 'Dev' },
      { label: 'Features', value: '15+' },
      { label: 'Launch', value: 'Q3 2025' },
    ],
    color: '#2B47D9',
  },
]

export const SERVICES = [
  {
    id: 'web-design',
    title: 'Web Design & Development',
    shortTitle: 'Web Development',
    description: 'Premium websites built with Next.js, TypeScript, and Tailwind CSS. Fast, accessible, and built to convert visitors into clients.',
    features: ['Custom UI/UX Design', 'Mobile-First Development', 'Performance Optimization', 'SEO Foundation'],
    icon: 'monitor',
    accent: '#1E3AE0',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    shortTitle: 'UI/UX',
    description: 'Interface design that balances visual sophistication with intuitive usability. Every interaction is deliberate.',
    features: ['User Research', 'Wireframing & Prototyping', 'Design Systems', 'Figma Handoff'],
    icon: 'layers',
    accent: '#2EC4C4',
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Applications',
    shortTitle: 'Full-Stack',
    description: 'End-to-end web applications with robust backends, database design, admin panels, and API architecture.',
    features: ['Next.js App Router', 'MongoDB & PostgreSQL', 'REST APIs', 'Admin Dashboards'],
    icon: 'code',
    accent: '#4DA6FF',
  },
  {
    id: 'branding',
    title: 'Brand Identity',
    shortTitle: 'Branding',
    description: 'Logo, color systems, typography, and brand guidelines that give your business a consistent, professional identity.',
    features: ['Logo Design', 'Color & Typography Systems', 'Brand Guidelines', 'Social Assets'],
    icon: 'sparkles',
    accent: '#2B47D9',
  },
  {
    id: 'seo',
    title: 'SEO & Performance',
    shortTitle: 'SEO',
    description: 'Technical SEO, Core Web Vitals optimization, and content structure that helps your site rank and load fast.',
    features: ['Technical SEO Audit', 'Core Web Vitals', 'Meta & Schema Markup', 'Page Speed'],
    icon: 'trending-up',
    accent: '#2EC4C4',
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Support',
    shortTitle: 'Support',
    description: 'Ongoing updates, bug fixes, feature additions, and performance monitoring so your site stays sharp.',
    features: ['Monthly Updates', 'Security Patches', 'Uptime Monitoring', 'Priority Support'],
    icon: 'shield',
    accent: '#1E3AE0',
  },
  {
    id: 'ai-automation',
    title: 'AI & Business Automation',
    shortTitle: 'AI & Automation',
    description: 'Streamline your operations with custom AI chatbots, workflow automation, CRM sync, and smart data pipelines.',
    features: ['AI Support Chatbots', 'Workflow Automation', 'Lead Qualification', 'API & CRM Sync'],
    icon: 'bot',
    accent: '#8B5CF6',
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    shortTitle: 'Data Analytics',
    description: 'Transform raw data into growth insights. Custom dashboards, GA4 tracking, conversion funnels, and reporting.',
    features: ['GA4 & GTM Setup', 'Looker Dashboards', 'Conversion Funnels', 'Heatmaps & Insights'],
    icon: 'bar-chart',
    accent: '#10B981',
  },
  {
    id: 'email-marketing',
    title: 'Email Marketing',
    shortTitle: 'Email Marketing',
    description: 'High-converting email campaigns, automated lifecycle flows, cart recovery, and responsive HTML email design.',
    features: ['Automated Email Flows', 'Template Design', 'Copywriting', 'Deliverability Setup'],
    icon: 'mail',
    accent: '#E879F9',
  },
]

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery',
    description: 'We start by understanding your business, goals, audience, and what success looks like for you.',
  },
  {
    step: '02',
    title: 'Strategy & Design',
    description: 'Information architecture, wireframes, and a visual direction aligned with your brand identity.',
  },
  {
    step: '03',
    title: 'Development',
    description: 'Clean, production-grade code. Responsive, performant, and built to scale from day one.',
  },
  {
    step: '04',
    title: 'Launch & Grow',
    description: 'Rigorous testing, deployment, and post-launch support to ensure everything runs perfectly.',
  },
]

export const PRICING_PLANS = [
  {
    name: 'Starter',
    price: '₹4,999',
    priceUSD: '$60',
    timeline: '5–7 days',
    description: 'Perfect for freelancers and small businesses needing a clean, professional web presence.',
    features: [
      'Up to 5 pages',
      'Mobile-first responsive design',
      'Contact form integration',
      'Basic SEO setup',
      'Google Analytics',
      '1 round of revisions',
      '30 days support',
    ],
    highlighted: false,
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    price: '₹8,999',
    priceUSD: '$108',
    timeline: '10–14 days',
    description: 'For growing businesses that need a complete, high-performance digital platform.',
    features: [
      'Up to 12 pages',
      'Custom UI/UX design',
      'Admin panel / CMS',
      'Database integration',
      'Lead capture system',
      'Advanced SEO + performance',
      '3 rounds of revisions',
      '60 days support',
    ],
    highlighted: true,
    cta: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    priceUSD: 'Custom',
    timeline: '3–6 weeks',
    description: 'Full-scale web applications, platforms, and custom software for serious businesses.',
    features: [
      'Unlimited pages & features',
      'Full-stack development',
      'Custom integrations & APIs',
      'Multi-role admin panels',
      'E-commerce / payments',
      'Dedicated project management',
      'Unlimited revisions',
      '6 months priority support',
    ],
    highlighted: false,
    cta: 'Let\'s Talk',
  },
]

export const TESTIMONIALS = [
  {
    name: 'Suresh Sharma',
    role: 'Director, SVNS School Khilchipur',
    content: 'PrimeSoul transformed how our school operates online. The fee status system alone saved us hours of administrative work every week. Professional, reliable, and genuinely helpful throughout the entire process.',
    rating: 5,
    project: 'SVNS School Website',
  },
  {
    name: 'Arun Patidar',
    role: 'Owner, A&S Solar Solutions',
    content: 'We had zero online presence before PrimeSoul. Now we get genuine inquiries through our website every week. The solar calculator is the feature every visitor mentions — it builds instant trust.',
    rating: 5,
    project: 'A&S Solar Solutions Website',
  },
  {
    name: 'Rahul Verma',
    role: 'Startup Founder',
    content: 'What impressed me most was the attention to detail. Every section had a purpose. Param understood what we were trying to achieve and delivered something that genuinely reflects our brand.',
    rating: 5,
    project: 'Brand Identity & Website',
  },
]

export const STATS = [
  {
    value: '4+',
    numericValue: 4,
    suffix: '+',
    label: 'Years of Growth',
    description: 'Building digital excellence since our founding — delivering consistent results and empowering businesses to achieve their fullest potential online.',
  },
  {
    value: '₹5L+',
    numericValue: 5,
    suffix: 'L+',
    prefix: '₹',
    label: 'Revenue Generated',
    description: 'Lakhs in revenue generated through strategic web solutions, helping our clients achieve remarkable business growth and sustainable digital success.',
  },
  {
    value: '4+',
    numericValue: 4,
    suffix: '+',
    label: 'Businesses Served',
    description: 'Partnered with businesses across diverse industries, delivering tailored digital solutions that drive real results and foster long-term growth.',
  },
]

