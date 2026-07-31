import { sanityFetch } from "@/sanity/lib/fetch"
import { siteSettingsQuery } from "@/sanity/lib/queries"
import { imageUrl } from "@/sanity/lib/image"
import type { SiteSettings, SanityImageRef, Seo } from "@/lib/types"
import { site as fallbackSite, navLinks as fallbackNavLinks } from "@/lib/site"
import { partners as fallbackPartners } from "@/lib/testimonials"

type SanitySiteSettings = {
  companyName?: string
  shortName?: string
  tagline?: string
  description?: string
  email?: string
  phone?: string
  address?: string
  url?: string
  logo?: SanityImageRef
  socials?: { label: string; href: string }[]
  navLinks?: { label: string; href: string }[]
  partners?: string[]
  footerNote?: string
  seo?: Seo
}

const fallbackSettings: SiteSettings = {
  name: fallbackSite.name,
  shortName: fallbackSite.shortName,
  tagline: fallbackSite.tagline,
  description: fallbackSite.description,
  email: fallbackSite.email,
  url: fallbackSite.url,
  socials: fallbackSite.socials,
  navLinks: fallbackNavLinks,
  partners: fallbackPartners,
  seo: null,
}

/**
 * Global site settings. Cached across the whole app; every layout/component
 * that needs company info, nav, socials or the logo reads from here.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await sanityFetch<SanitySiteSettings | null>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
  })

  if (!data) return fallbackSettings

  return {
    name: data.companyName || fallbackSettings.name,
    shortName: data.shortName || fallbackSettings.shortName,
    tagline: data.tagline || fallbackSettings.tagline,
    description: data.description || fallbackSettings.description,
    email: data.email || fallbackSettings.email,
    phone: data.phone,
    address: data.address,
    url: data.url || fallbackSettings.url,
    logo: data.logo ?? null,
    socials: data.socials?.length ? data.socials : fallbackSettings.socials,
    navLinks: data.navLinks?.length ? data.navLinks : fallbackSettings.navLinks,
    partners: data.partners?.length ? data.partners : fallbackSettings.partners,
    footerNote: data.footerNote,
    seo: data.seo ?? null,
  }
}

/** Resolve the logo to a usable URL (or the bundled PNG fallback). */
export function siteLogoUrl(settings: SiteSettings): string {
  return settings.logo ? imageUrl(settings.logo, "/images/tbm-logo.png") : "/images/tbm-logo.png"
}
