/**
 * Shared content types for the whole site. These are the shapes the UI
 * components consume. The data-access layer (`lib/data/*`) maps Sanity
 * documents into these shapes, and the bundled fallback content in
 * `lib/*.ts` already matches them — so the UI never needs to know where the
 * data came from.
 */

import type { LucideIcon } from "lucide-react"

/* ------------------------------------------------------------------ */
/* Sanity image reference                                             */
/* ------------------------------------------------------------------ */

export type SanityImageRef = {
  asset?: { _ref?: string; _type?: string } | null
  hotspot?: unknown
  crop?: unknown
  alt?: string | null
} | null

/* ------------------------------------------------------------------ */
/* SEO                                                                */
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

export type SocialLink = {
  label: string
  href: string
}

export type NavLink = {
  label: string
  href: string
}

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

export type ServiceInquiryFieldType =
  | "text"
  | "email"
  | "tel"
  | "url"
  | "number"
  | "textarea"
  | "select"
  | "boolean"

export type ServiceInquiryField = {
  label: string
  name: string
  fieldType: ServiceInquiryFieldType

  placeholder?: string
  required?: boolean
  options?: string[]
  helpText?: string
  displayOrder?: number
}

export type ServiceSubService = {
  name: string
  slug: string
  summary: string

  pricePrefix?: string
  startingPrice?: string
  priceSuffix?: string
  pricingNote?: string

  deliverables?: string[]

  featured?: boolean
  displayOrder?: number

  inquiryButtonText?: string

  /**
   * When false, the sub-service uses the parent service inquiry form.
   * When true, the custom heading/copy/questions below override the
   * corresponding parent-service values.
   */
  useCustomInquiryForm?: boolean

  inquiryTitle?: string
  inquiryDescription?: string
  inquirySubmitText?: string
  inquirySuccessMessage?: string
  inquiryFields?: ServiceInquiryField[]
}

export type Service = {
  slug: string
  title: string
  tagline: string
  summary: string
  description: string

  icon: LucideIcon
  coverImage?: SanityImageRef

  /* Pricing */
  pricePrefix?: string
  startingPrice?: string
  priceSuffix?: string
  pricingNote?: string

  /* Sub-services */
  subServices?: ServiceSubService[]

  /* Details */
  forWho: string
  deliverables: string[]
  outcomes: string[]

  /* Inquiry form */
  inquiryTitle?: string
  inquiryDescription?: string
  inquiryButtonText?: string
  inquirySubmitText?: string
  inquirySuccessMessage?: string

  showNameField?: boolean
  showEmailField?: boolean
  showPhoneField?: boolean
  showCompanyField?: boolean
  showBudgetField?: boolean
  showMessageField?: boolean

  budgetOptions?: string[]
  inquiryFields?: ServiceInquiryField[]

  /* Settings */
  featured?: boolean
  displayOrder?: number

  seo?: Seo
}
/* ------------------------------------------------------------------ */
/* Services page                                                      */
/* ------------------------------------------------------------------ */

export type ServicesPage = {
  heroEyebrow: string
  heroTitle: string
  heroDescription: string

  bestForLabel: string
  deliverablesLabel: string
  outcomesLabel: string
  subServicesEyebrow: string
  subServicesTitle: string
  serviceInquiryEyebrow: string

  generalInquiryTitle: string
  generalInquiryDescription: string
  generalInquiryButtonText: string

  generalInquiryFormTitle: string
  generalInquiryFormDescription: string
  generalInquirySubmitText: string
  generalInquirySuccessMessage: string

  showNameField: boolean
  showEmailField: boolean
  showPhoneField: boolean
  showCompanyField: boolean
  showBudgetField: boolean
  showMessageField: boolean

  budgetOptions: string[]
  inquiryFields: ServiceInquiryField[]

  seo?: Seo
}
/* ------------------------------------------------------------------ */
/* Projects                                                           */
/* ------------------------------------------------------------------ */

export type ProjectResult = {
  label: string
  value: string
}

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

/**
 * Legacy standalone pricing type.
 * Keep this temporarily until pricing has been fully migrated into Services.
 */
export type PricingPlan = {
  name: string
  pricePrefix: string
  startingPrice: string
  description?: string
  features: string[]
  cta?: {
    label: string
    href: string
  }
  featured?: boolean
}

/* ------------------------------------------------------------------ */
/* Homepage                                                           */
/* ------------------------------------------------------------------ */

export type HomepageStat = {
  value: string
  label: string
}

export type HomepageProcessStep = {
  step: string
  title: string
  copy: string
}

export type Homepage = {
  heroEyebrow: string
  heroTitleLead: string
  heroTitleHighlight: string
  heroDescription: string

  heroPrimaryCta: {
    label: string
    href: string
  }

  heroSecondaryCta: {
    label: string
    href: string
  }

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

export type AboutValue = {
  icon: string
  title: string
  copy: string
}

export type AboutMilestone = {
  year: string
  copy: string
}

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