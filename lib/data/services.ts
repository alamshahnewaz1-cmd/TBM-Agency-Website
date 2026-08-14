import { sanityFetch } from "@/sanity/lib/fetch"
import { servicesQuery } from "@/sanity/lib/queries"
import { imageUrl } from "@/sanity/lib/image"
import { resolveIcon } from "@/lib/icon-map"

import type {
  Service,
  ServiceSubService,
  SanityImageRef,
  Seo,
} from "@/lib/types"

import { services as fallbackServices } from "@/lib/services"

type SanitySubService = {
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
}

type SanityService = {
  slug: string
  title: string
  tagline: string
  icon?: string
  summary: string
  description: string

  coverImage?: SanityImageRef

  pricePrefix?: string
  startingPrice?: string
  priceSuffix?: string
  pricingNote?: string

  subServices?: SanitySubService[]

  forWho: string
  deliverables?: string[]
  outcomes?: string[]

  inquiryTitle?: string
  inquiryDescription?: string
  inquiryButtonText?: string

  featured?: boolean
  displayOrder?: number

  seo?: Seo
}

function mapSubService(
  subService: SanitySubService,
): ServiceSubService {
  return {
    name: subService.name,
    slug: subService.slug,
    summary: subService.summary,

    pricePrefix: subService.pricePrefix,
    startingPrice: subService.startingPrice,
    priceSuffix: subService.priceSuffix,
    pricingNote: subService.pricingNote,

    deliverables: subService.deliverables ?? [],

    featured: subService.featured ?? false,
    displayOrder: subService.displayOrder ?? 0,

    inquiryButtonText:
      subService.inquiryButtonText ?? "Get a quote",
  }
}

function mapService(s: SanityService): Service {
  return {
    slug: s.slug,
    title: s.title,
    tagline: s.tagline,
    summary: s.summary,
    description: s.description,

    icon: resolveIcon(s.icon),
    coverImage: s.coverImage ?? null,

    pricePrefix: s.pricePrefix,
    startingPrice: s.startingPrice,
    priceSuffix: s.priceSuffix,
    pricingNote: s.pricingNote,

    subServices:
      s.subServices?.map(mapSubService) ?? [],

    forWho: s.forWho,
    deliverables: s.deliverables ?? [],
    outcomes: s.outcomes ?? [],

    inquiryTitle:
      s.inquiryTitle ?? "Interested in this service?",

    inquiryDescription:
      s.inquiryDescription ??
      "Tell us about your project and we’ll recommend the right approach.",

    inquiryButtonText:
      s.inquiryButtonText ?? "Get a quote",

    featured: s.featured ?? false,
    displayOrder: s.displayOrder ?? 0,

    seo: s.seo ?? null,
  }
}

/**
 * All services.
 * Sanity CMS is the primary source, with bundled content as fallback.
 */
export async function getServices(): Promise<Service[]> {
  const data = await sanityFetch<SanityService[]>({
    query: servicesQuery,
    tags: ["service"],
  })

  if (data && data.length > 0) {
    return data.map(mapService)
  }

  return fallbackServices as unknown as Service[]
}

/**
 * A single service by slug.
 */
export async function getService(
  slug: string,
): Promise<Service | undefined> {
  const all = await getServices()

  return all.find((service) => service.slug === slug)
}

export { imageUrl }