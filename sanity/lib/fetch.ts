import "server-only"

import { client } from "@/sanity/lib/client"
import { isSanityConfigured } from "@/sanity/env"

/**
 * Default revalidation window (seconds). Content also revalidates on demand
 * via the `/api/revalidate` webhook using the tags passed here.
 */
const DEFAULT_REVALIDATE = 60

type FetchParams = Record<string, unknown>

/**
 * Thin, typed wrapper around the Sanity client that:
 *  - short-circuits to `null` when Sanity is not configured (so callers can
 *    fall back to bundled content and the site never breaks), and
 *  - wires up Next.js ISR caching with tag-based on-demand revalidation.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = DEFAULT_REVALIDATE,
}: {
  query: string
  params?: FetchParams
  tags?: string[]
  revalidate?: number | false
}): Promise<T | null> {
  if (!isSanityConfigured) return null

  try {
    return await client.fetch<T>(query, params, {
      next: {
        revalidate: tags.length ? false : revalidate,
        tags,
      },
    })
  } catch (error) {
    console.log("[v0] Sanity fetch failed, falling back to bundled content:", error)
    return null
  }
}
