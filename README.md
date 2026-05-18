# PrimeSoul — Premium Digital Agency Frontend

A complete, production-ready Next.js 14 frontend for the PrimeSoul digital agency.

## Brand Colors (from logo)
- **Navy Blue** `#1E3AE0` — Primary brand, buttons, headings
- **Cyan/Teal** `#2EC4C4` — Accent, highlights, live indicators
- **Sky Blue** `#4DA6FF` — Tertiary gradient, soft elements
- **Ink** `#0D1340` — Primary text
- **Surface** `#F8F9FE` — Base background

## Tech Stack
- **Next.js 14** App Router
- **TypeScript** (strict)
- **Tailwind CSS** with custom design tokens
- **Framer Motion** (add to individual components as needed)
- **Lenis** smooth scroll (hooked in)
- **Google Fonts** — Playfair Display (display) + DM Sans (body) + DM Mono

## Project Structure

```
primesoul/
├── app/
│   ├── layout.tsx            # Root layout (Navbar, Footer, WhatsApp)
│   ├── page.tsx              # Home — all sections assembled
│   ├── about/page.tsx        # About / Founder page
│   ├── services/page.tsx     # Services detail page
│   ├── portfolio/
│   │   ├── page.tsx          # Portfolio grid
│   │   └── [slug]/page.tsx   # Dynamic case study page
│   ├── contact/page.tsx      # Contact form
│   ├── not-found.tsx         # 404 page
│   └── api/
│       └── contact/route.ts  # API endpoint (ready for MongoDB/Nodemailer)
│
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── TrustSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── FounderSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CTASection.tsx
│   ├── shared/
│   │   ├── Navbar.tsx         # Sticky, scroll-aware, mobile menu
│   │   ├── Footer.tsx
│   │   └── WhatsAppFloat.tsx  # Animated floating button
│   └── ui/
│       ├── AnimatedSection.tsx # Scroll-triggered fade/slide
│       └── SectionLabel.tsx   # Badge component
│
├── hooks/
│   ├── useLenis.ts            # Smooth scroll hook
│   └── useInView.ts           # Intersection Observer hook
│
├── lib/
│   ├── data.ts                # All real content (projects, services, etc.)
│   ├── utils.ts               # cn() utility + easing constants
│   └── db.ts                  # MongoDB helper (ready to uncomment)
│
├── models/
│   └── Lead.ts                # Mongoose Lead schema (ready to uncomment)
│
├── public/
│   └── images/                # logo.png, logo-dark.png, founder.jpg, projects
│
└── styles/
    └── globals.css            # CSS variables, typography, utilities
```

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 3. Run development server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, Trust, Services, Portfolio, Process, Founder, Pricing, Testimonials, CTA |
| `/about` | Founder story, skills, values |
| `/services` | Detailed service listings with process |
| `/portfolio` | All projects grid |
| `/portfolio/[slug]` | Individual case study (4 projects included) |
| `/contact` | Contact form + FAQ |

## Projects in Portfolio

| Slug | Project | URL |
|------|---------|-----|
| `asso-solar-solutions` | A&S Solar Solutions | https://assolarsolutions.netlify.app |
| `param-sisodiya-portfolio` | Personal Portfolio | https://paramsisodiya.netlify.app |
| `svns-school-khilchipur` | SVNS School | https://svnskhilchipur.netlify.app |
| `ecommerce-platform` | E-Commerce (In Dev) | — |

## Adding a New Project

Edit `/lib/data.ts` — add an entry to the `PROJECTS` array with the `Project` interface.
Add a screenshot to `/public/images/`.
The case study page generates automatically via `[slug]`.

## Connecting the Backend (Later)

### Contact Form → MongoDB
1. `npm install mongoose nodemailer`
2. Add `MONGODB_URI` to `.env.local`
3. Uncomment the MongoDB block in `/lib/db.ts`
4. Uncomment the Lead model in `/models/Lead.ts`
5. Uncomment the save block in `/app/api/contact/route.ts`
6. Update `/app/contact/page.tsx` — replace the `setTimeout` simulation with a real `fetch('/api/contact', ...)`

### Email Notifications
1. Create a Gmail App Password (Google Account → Security → App Passwords)
2. Add `SMTP_USER` and `SMTP_PASS` to `.env.local`
3. Uncomment the Nodemailer block in `/app/api/contact/route.ts`

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set environment variables in the Vercel dashboard under Project → Settings → Environment Variables.

## Performance Notes
- All images use Next.js `Image` component (automatic WebP/AVIF conversion)
- Google Fonts loaded via `<link>` with `display=swap`
- Sections animate in on scroll using IntersectionObserver (no layout shift)
- No heavy dependencies — bundle stays lean

---

Built by **Param Sisodiya** — PrimeSoul, Rajgarh MP  
Contact: paramsisodiya061@gmail.com | +91 8770404559
