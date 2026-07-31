import { sanityFetch } from "@/sanity/lib/fetch"
import {
  projectsQuery,
  projectBySlugQuery,
  projectSlugsQuery,
} from "@/sanity/lib/queries"
import { imageUrl } from "@/sanity/lib/image"
import type { Project, ProjectResult, SanityImageRef, Seo } from "@/lib/types"
import { projects as fallbackProjects, projectCategories } from "@/lib/projects"

type SanityProject = {
  slug: string
  client: string
  title: string
  type: string
  category: string
  services?: string[]
  status: string
  year: string
  summary: string
  featured?: boolean
  website?: string
  cover?: SanityImageRef
  overview?: string
  challenge?: string
  strategy?: string
  gallery?: SanityImageRef[]
  results?: ProjectResult[]
  seo?: Seo
}

function mapProject(p: SanityProject): Project {
  return {
    slug: p.slug,
    client: p.client,
    title: p.title,
    type: p.type,
    category: p.category,
    services: p.services ?? [],
    status: p.status,
    year: p.year,
    summary: p.summary,
    featured: p.featured ?? false,
    website: p.website,
    cover: imageUrl(p.cover, "/placeholder.svg"),
    overview: p.overview,
    challenge: p.challenge,
    strategy: p.strategy,
    gallery: (p.gallery ?? [])
      .map((g) => imageUrl(g, ""))
      .filter((url): url is string => Boolean(url)),
    results: p.results ?? [],
    seo: p.seo ?? null,
  }
}

export async function getProjects(): Promise<Project[]> {
  const data = await sanityFetch<SanityProject[]>({
    query: projectsQuery,
    tags: ["project"],
  })
  if (data && data.length > 0) return data.map(mapProject)
  return fallbackProjects as unknown as Project[]
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const data = await sanityFetch<SanityProject | null>({
    query: projectBySlugQuery,
    params: { slug },
    tags: ["project"],
  })
  if (data) return mapProject(data)
  return (fallbackProjects as unknown as Project[]).find((p) => p.slug === slug)
}

export async function getFeaturedProject(): Promise<Project | undefined> {
  const all = await getProjects()
  return all.find((p) => p.featured) ?? all[0]
}

export async function getProjectSlugs(): Promise<string[]> {
  const data = await sanityFetch<{ slug: string }[]>({
    query: projectSlugsQuery,
    tags: ["project"],
  })
  if (data && data.length > 0) return data.map((d) => d.slug)
  return (fallbackProjects as unknown as Project[]).map((p) => p.slug)
}

export { projectCategories }
