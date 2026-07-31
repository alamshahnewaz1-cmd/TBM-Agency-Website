import { sanityFetch } from "@/sanity/lib/fetch"
import { pricingQuery } from "@/sanity/lib/queries"
import type { PricingPlan } from "@/lib/types"

type SanityPricingPlan = {
  name: string
  pricePrefix: string
  startingPrice: string
  description?: string
  features?: string[]
  cta?: { label: string; href: string }
  featured?: boolean
}

function mapPlan(p: SanityPricingPlan): PricingPlan {
  return {
    name: p.name,
    pricePrefix: p.pricePrefix,
    startingPrice: p.startingPrice,
    description: p.description,
    features: p.features ?? [],
    cta: p.cta,
    featured: p.featured ?? false,
  }
}

/**
 * Pricing plans. Schema exists and is editable in Sanity; nothing renders it on
 * the site yet (per project decision). Returns an empty array until plans are
 * added.
 */
export async function getPricingPlans(): Promise<PricingPlan[]> {
  const data = await sanityFetch<SanityPricingPlan[]>({
    query: pricingQuery,
    tags: ["pricingPlan"],
  })
  if (data && data.length > 0) return data.map(mapPlan)
  return []
}
