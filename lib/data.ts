export const AGENCY = {
  name: 'PrimeSoul',
  tagline: 'Digital Experiences That Drive Growth',
  description: 'We craft premium digital solutions — from high-converting websites to full-scale web platforms — for businesses that refuse to settle for average.',
  founder: {
    name: 'Param Sisodiya',
    role: 'Founder & Lead Developer',
    location: 'Rajgarh, Madhya Pradesh',
    bio: 'A self-driven developer and designer obsessed with building digital products that actually work. From pixel-perfect interfaces to scalable web systems — every project gets my full attention.',
    email: 'paramsisodiya061@gmail.com',
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
  metrics: { label: string; value: string }[]
  color: string
}

export const PROJECTS: Project[] = [
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

