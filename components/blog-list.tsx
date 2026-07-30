"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { formatDate, type BlogPost } from "@/lib/blog"

export function BlogList({
  posts,
  categories,
}: {
  posts: BlogPost[]
  categories: string[]
}) {
  const [active, setActive] = useState("All")
  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active)

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = cat === active
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={isActive}
              className={`min-h-10 rounded-full border px-5 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-3xl border border-line bg-card p-10 text-center text-muted">
          No articles in this category yet. Check back soon.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <Reveal key={post.slug} delay={i * 70}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card transition-all hover:-translate-y-1 hover:shadow-[0_18px_50px_-24px_rgba(9,9,11,0.35)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
                  <img
                    src={post.cover || "/placeholder.svg"}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-paper/95 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span>{formatDate(post.date)}</span>
                    <span aria-hidden="true">•</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3 className="text-lg font-bold leading-snug tracking-tight text-balance">{post.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{post.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-accent">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
