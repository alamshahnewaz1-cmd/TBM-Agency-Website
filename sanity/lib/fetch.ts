import "server-only"

import { client } from "@/sanity/lib/client"
import { isSanityConfigured } from "@/sanity/env"

/**
 * Default revalidation window in seconds.
 *
 * Sanity content will automatically refresh at most every 60 seconds.
 * Cache tags are still included so webhook-based revalidation can be added
 * later without changing the data-fetching code.
 */
const DEFAULT_REVALIDATE = 60

type FetchParams = Record<string, unknown>

/**
 * Typed wrapper around the Sanity client.
 *
 * It:
 * - returns null when Sanity is not configured
 * - allows pages to use bundled fallback content
 * - caches published Sanity content
 * - automatically checks for updated content every 60 seconds
 * - supports cache tags for future on-demand revalidation
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
        revalidate,
        tags,
      },
    })
  } catch (error) {
    console.error(
      "[Sanity] Fetch failed. Falling back to bundled content:",
      error,
    )

    return null
  }
}