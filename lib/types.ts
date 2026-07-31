/**
 * Shared content types for the whole site. These are the shapes the UI
 * components consume. The data-access layer (`lib/data/*`) maps Sanity
 * documents into these shapes, and the bundled fallback content in
 * `lib/*.ts` already matches them — so the UI never needs to know where the
 * data came from.
 */

import type { LucideIcon } from "lucide-react"

/* ------------------------------------------------------------------ */
/* Sanity image reference                                              */
/* ------------------------------------------------------------------ */

export type SanityImageRef = {
  asset?: { _ref?: string; _type?: string } | null
  hotspot?: unknown
  crop?: unknown
  alt?: string | null
} | null

/* ------------------------------------------------------------------ */
/* SEO                                                                 */
/* ------------------------------------------------------------------ */

export type Seo = {
  metaTitle?: string | null
  metaDescription?: string | null
  ogImage?: SanityImageRef
  noIndex?: boolean | null
} | null

/* ------------------------------------------------------------------ */
/* Site settings                                                      */
/* ------------------------------------------------------------------ */

export type SocialLink = { label: string; href: string }
export type NavLink = { label: string; href: string }

export type SiteSettings = {
  name: string
  shortName: string
  tagline: string
  description: string
  email: string
  phone?: string
  address?: string
  url: string
  logo?: SanityImageRef
  socials: SocialLink[]
  navLinks: NavLink[]
  partners: string[]
  footerNote?: string
  seo?: Seo
}

/* ------------------------------------------------------------------ */
/* Services                                                           */
/* ------------------------------------------------------------------ */

export type Service = {
  slug: string
  title: string
  tagline: string
  summary: string
  description: string
  deliverables: string[]
  forWho: string
  outcomes: string[]
  icon: LucideIcon
  coverImage?: SanityImageRef
  featured?: boolean
}

/* ------------------------------------------------------------------ */
/* Projects                                                           */
/* ------------------------------------------------------------------ */

export type ProjectResult = { label: string; value: string }

export type Project = {
  slug: string
  client: string
  title: string
  type: string
  category: string
  services: string[]
  status: string
  year: string
  summary: string
  featured: boolean
  website?: string
  cover: string
  overview?: string
  challenge?: string
  strategy?: string
  gallery?: string[]
  results?: ProjectResult[]
  seo?: Seo
}

/* ------------------------------------------------------------------ */
/* Blog                                                               */
/* ------------------------------------------------------------------ */

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }

export type PortableTextBlock = Record<string, unknown>

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readingTime: string
  cover: string
  featured?: boolean
  /** Legacy structured blocks (fallback content). */
  body?: BlogBlock[]
  /** Sanity Portable Text (CMS content). */
  portableBody?: PortableTextBlock[]
  seo?: Seo
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                       */
/* ------------------------------------------------------------------ */

export type Testimonial = {
  quote: string
  name: string
  role: string
  company: string
  rating?: number
  featured?: boolean
  photo?: SanityImageRef
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                */
/* ------------------------------------------------------------------ */

export type Faq = {
  question: string
  answer: string
  category?: string
}

/* ------------------------------------------------------------------ */
/* Team                                                               */
/* ------------------------------------------------------------------ */

export type TeamMember = {
  name: string
  role: string
  bio?: string
  linkedin?: string
  photo?: SanityImageRef
}

/* ------------------------------------------------------------------ */
/* Pricing                                                            */
/* ------------------------------------------------------------------ */

export type PricingPlan = {
  name: string
  pricePrefix: string
  startingPrice: string
  description?: string
  features: string[]
  cta?: { label: string; href: string }
  featured?: boolean
}

/* ------------------------------------------------------------------ */
/* Homepage                                                           */
/* ------------------------------------------------------------------ */

export type HomepageStat = { value: string; label: string }
export type HomepageProcessStep = { step: string; title: string; copy: string }

export type Homepage = {
  heroEyebrow: string
  heroTitleLead: string
  heroTitleHighlight: string
  heroDescription: string
  heroPrimaryCta: { label: string; href: string }
  heroSecondaryCta: { label: string; href: string }
  heroImage?: SanityImageRef
  heroCardTitle: string
  heroCardTagline: string
  stats: HomepageStat[]
  marqueeItems: string[]
  servicesEyebrow: string
  servicesTitle: string
  servicesDescription: string
  processEyebrow: string
  processTitle: string
  processSteps: HomepageProcessStep[]
  workEyebrow: string
  workTitle: string
  workDescription: string
  testimonialsEyebrow: string
  testimonialsTitle: string
  ctaTitle: string
  ctaDescription: string
  seo?: Seo
}

/* ------------------------------------------------------------------ */
/* About page                                                         */
/* ------------------------------------------------------------------ */

export type AboutValue = { icon: string; title: string; copy: string }
export type AboutMilestone = { year: string; copy: string }

export type AboutPage = {
  heroEyebrow: string
  heroTitle: string
  heroDescription: string
  storyEyebrow: string
  storyTitle: string
  storyParagraphs: string[]
  milestones: AboutMilestone[]
  valuesEyebrow: string
  valuesTitle: string
  values: AboutValue[]
  team: TeamMember[]
  ctaTitle: string
  ctaDescription: string
  seo?: Seo
}