import { sanityFetch } from "@/sanity/lib/fetch"
import { faqsQuery } from "@/sanity/lib/queries"
import type { Faq } from "@/lib/types"
import { faqs as fallbackFaqs } from "@/lib/faq"

export async function getFaqs(): Promise<Faq[]> {
  const data = await sanityFetch<Faq[]>({
    query: faqsQuery,
    tags: ["faq"],
  })
  if (data && data.length > 0) return data
  return fallbackFaqs as unknown as Faq[]
}
