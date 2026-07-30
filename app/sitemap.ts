import type { MetadataRoute } from "next"
import { projects } from "@/lib/projects"
import { blogPosts } from "@/lib/blog"
import { site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url

  const staticRoutes = ["", "/services", "/projects", "/about", "/blog", "/faq", "/contact"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  )

  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const blogRoutes = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
