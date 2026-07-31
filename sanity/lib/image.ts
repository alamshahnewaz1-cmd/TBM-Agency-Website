import { createImageUrlBuilder } from "@sanity/image-url"

import { dataset, projectId } from "@/sanity/env"

const builder = createImageUrlBuilder({ projectId: projectId || "placeholder", dataset })

/** The image reference shape accepted by the URL builder. */
type SanityImageSource = Parameters<typeof builder.image>[0]

/**
 * Build an optimised image URL from a Sanity image reference.
 * Returns an empty string when passed a falsy value so callers can fall back.
 */
export function urlForImage(source: SanityImageSource | undefined | null) {
  if (!source || !(source as { asset?: unknown }).asset) return undefined
  return builder.image(source).auto("format").fit("max")
}

/**
 * Convenience helper that returns a plain string URL (or a fallback path).
 */
export function imageUrl(
  source: SanityImageSource | undefined | null,
  fallback = "/placeholder.svg",
): string {
  const url = urlForImage(source)
  return url ? url.url() : fallback
}
