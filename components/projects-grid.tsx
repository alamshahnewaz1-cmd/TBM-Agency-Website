"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import type { Project } from "@/lib/projects"

export function ProjectsGrid({
  projects,
  categories,
}: {
  projects: Project[]
  categories: string[]
}) {
  const [active, setActive] = useState("All")

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active)

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
          More work in this category is on the way. Check back soon.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((project, i) => (
            <Reveal key={project.slug} delay={i * 80}>
              <Link
                href={`/projects/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card transition-all hover:-translate-y-1 hover:shadow-[0_18px_50px_-24px_rgba(9,9,11,0.35)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
                  <img
                    src={project.cover || "/placeholder.svg"}
                    alt={project.client}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-paper/95 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
                    {project.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-7">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold tracking-tight">{project.client}</h3>
                    <span className="text-xs font-medium text-muted">{project.year}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{project.summary}</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {project.services.slice(0, 3).map((s) => (
                      <span key={s} className="rounded-full bg-paper-2 px-3 py-1 text-xs font-medium text-muted">
                        {s}
                      </span>
                    ))}
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-accent">
                    View case study
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
