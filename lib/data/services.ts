import { sanityFetch } from "@/sanity/lib/fetch"
import { servicesQuery } from "@/sanity/lib/queries"
import { imageUrl } from "@/sanity/lib/image"
import { resolveIcon } from "@/lib/icon-map"
import type { Service, SanityImageRef } from "@/lib/types"
import { services as fallbackServices } from "@/lib/services"

type SanityService = {
  slug: string
  title: string
  tagline: string
  icon?: string
  summary: string
  description: string
  deliverables?: string[]
  forWho: string
  outcomes?: string[]
  coverImage?: SanityImageRef
  featured?: boolean
}

function mapService(s: SanityService): Service {
  return {
    slug: s.slug,
    title: s.title,
    tagline: s.tagline,
    summary: s.summary,
    description: s.description,
    deliverables: s.deliverables ?? [],
    forWho: s.forWho,
    outcomes: s.outcomes ?? [],
    icon: resolveIcon(s.icon),
    coverImage: s.coverImage ?? null,
    featured: s.featured ?? false,
  }
}

/** All services, CMS-first with bundled fallback. */
export async function getServices(): Promise<Service[]> {
  const data = await sanityFetch<SanityService[]>({
    query: servicesQuery,
    tags: ["service"],
  })
  if (data && data.length > 0) return data.map(mapService)
  return fallbackServices as unknown as Service[]
}

/** A single service by slug. */
export async function getService(slug: string): Promise<Service | undefined> {
  const all = await getServices()
  return all.find((s) => s.slug === slug)
}

export { imageUrl }
