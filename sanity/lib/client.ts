import { createClient, type SanityClient } from "next-sanity"

import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env"

/**
 * Read-only client used for public content on the site.
 * `useCdn` is enabled in production for fast, cached reads; ISR + tag based
 * revalidation (see `app/api/revalidate`) keeps content fresh.
 */
export const client: SanityClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
})

/**
 * Server-only write/preview client. Requires SANITY_API_TOKEN.
 * Used by the seed script and the contact form (to store inquiries).
 */
export function getWriteClient(): SanityClient {
  const token = process.env.SANITY_API_TOKEN
  if (!token) {
    throw new Error(
      "Missing SANITY_API_TOKEN. Add a token with write access to enable this feature.",
    )
  }
  return createClient({
    projectId: projectId || "placeholder",
    dataset,
    apiVersion,
    token,
    useCdn: false,
  })
}

export { isSanityConfigured }
