/**
 * Centralised Sanity environment configuration.
 *
 * These values are read from environment variables so the same code runs in
 * local dev, preview and production without changes. Nothing here throws at
 * import time — the data layer degrades gracefully to the bundled fallback
 * content when Sanity has not been configured yet (see `lib/data/*`).
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01"

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ""

/**
 * True only when a Sanity project has been wired up. The whole site keeps
 * working (using bundled content) until this flips to true.
 */
export const isSanityConfigured = projectId.length > 0

/**
 * Studio-only helper. When the project id is missing we still want the
 * `/studio` route to render a helpful message instead of crashing.
 */
export function assertProjectId(): string {
  if (!projectId) {
    throw new Error(
      "Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Add it to your environment variables to enable Sanity.",
    )
  }
  return projectId
}
