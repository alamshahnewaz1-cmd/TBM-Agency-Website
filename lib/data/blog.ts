import { sanityFetch } from "@/sanity/lib/fetch"
import {
  postsQuery,
  postBySlugQuery,
  postSlugsQuery,
  relatedPostsQuery,
  blogCategoriesQuery,
} from "@/sanity/lib/queries"
import { imageUrl } from "@/sanity/lib/image"
import type {
  BlogPost,
  BlogBlock,
  PortableTextBlock,
  SanityImageRef,
  Seo,
} from "@/lib/types"
import {
  blogPosts as fallbackPosts,
  blogCategories as fallbackCategories,
  formatDate,
} from "@/lib/blog"

type SanityPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readingTime: string
  cover?: SanityImageRef
  featured?: boolean
  body?: PortableTextBlock[]
  seo?: Seo
}

function mapPost(p: SanityPost): BlogPost {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    author: p.author,
    date: p.date,
    readingTime: p.readingTime,
    cover: imageUrl(p.cover, "/placeholder.svg"),
    featured: p.featured ?? false,
    portableBody: p.body,
    seo: p.seo ?? null,
  }
}

export async function getPosts(): Promise<BlogPost[]> {
  const data = await sanityFetch<SanityPost[]>({
    query: postsQuery,
    tags: ["post"],
  })
  if (data && data.length > 0) return data.map(mapPost)
  return fallbackPosts as unknown as BlogPost[]
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const data = await sanityFetch<SanityPost | null>({
    query: postBySlugQuery,
    params: { slug },
    tags: ["post"],
  })
  if (data) return mapPost(data)
  return (fallbackPosts as unknown as BlogPost[]).find((p) => p.slug === slug)
}

export async function getRelatedPosts(slug: string, limit = 2): Promise<BlogPost[]> {
  const current = await getPost(slug)
  const data = await sanityFetch<SanityPost[]>({
    query: relatedPostsQuery,
    params: { slug, category: current?.category ?? "", limit },
    tags: ["post"],
  })
  if (data && data.length > 0) return data.map(mapPost)

  // Fallback: mirror the original related-posts logic.
  const all = fallbackPosts as unknown as BlogPost[]
  if (!current) return all.slice(0, limit)
  return all
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (a.category === current.category ? -1 : 1))
    .slice(0, limit)
}

export async function getPostSlugs(): Promise<string[]> {
  const data = await sanityFetch<{ slug: string }[]>({
    query: postSlugsQuery,
    tags: ["post"],
  })
  if (data && data.length > 0) return data.map((d) => d.slug)
  return (fallbackPosts as unknown as BlogPost[]).map((p) => p.slug)
}

export async function getBlogCategories(): Promise<string[]> {
  const data = await sanityFetch<{ title: string }[]>({
    query: blogCategoriesQuery,
    tags: ["category"],
  })
  if (data && data.length > 0) return ["All", ...data.map((d) => d.title)]
  return fallbackCategories
}

/** Legacy structured-block accessor (used only by fallback content). */
export type { BlogBlock }
export { formatDate }
