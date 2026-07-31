import { sanityFetch } from "@/sanity/lib/fetch"
import { testimonialsQuery } from "@/sanity/lib/queries"
import type { Testimonial, SanityImageRef } from "@/lib/types"
import { testimonials as fallbackTestimonials } from "@/lib/testimonials"

type SanityTestimonial = {
  quote: string
  name: string
  role: string
  company: string
  rating?: number
  featured?: boolean
  photo?: SanityImageRef
}

function mapTestimonial(t: SanityTestimonial): Testimonial {
  return {
    quote: t.quote,
    name: t.name,
    role: t.role,
    company: t.company,
    rating: t.rating,
    featured: t.featured ?? false,
    photo: t.photo ?? null,
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await sanityFetch<SanityTestimonial[]>({
    query: testimonialsQuery,
    tags: ["testimonial"],
  })
  if (data && data.length > 0) return data.map(mapTestimonial)
  return fallbackTestimonials as unknown as Testimonial[]
}
