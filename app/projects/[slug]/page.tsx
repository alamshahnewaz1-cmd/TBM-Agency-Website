import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react"
import { ButtonLink } from "@/components/button-link"
import { Reveal } from "@/components/reveal"
import { Eyebrow } from "@/components/section-heading"
import { getProject, getProjectSlugs } from "@/lib/data/projects"

export async function generateStaticParams() {
  const slugs = await getProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return { title: "Project not found" }
  return {
    title: `${project.client} — Case Study`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.client} — Case Study`,
      description: project.summary,
      images: [{ url: project.cover }],
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-paper-2/40">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All projects
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
            <div className="flex flex-col gap-5">
              <Eyebrow>{project.type}</Eyebrow>
              <h1 className="text-balance text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
                {project.title}
              </h1>
              <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted">{project.summary}</p>
              {project.website ? (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent hover:underline"
                >
                  Visit {project.client}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : null}
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 rounded-3xl border border-line bg-card p-6">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Client</dt>
                <dd className="mt-1 font-bold text-ink">{project.client}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Category</dt>
                <dd className="mt-1 font-bold text-ink">{project.category}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Status</dt>
                <dd className="mt-1 font-bold text-ink">{project.status}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Year</dt>
                <dd className="mt-1 font-bold text-ink">{project.year}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Cover */}
      <section className="mx-auto w-full max-w-6xl px-5 pt-14 sm:px-8 sm:pt-20">
        <Reveal>
          <div className="overflow-hidden rounded-[28px] border border-line bg-paper-2">
            <img
              src={project.cover || "/placeholder.svg"}
              alt={`${project.client} case study cover`}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* Body */}
      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Services delivered</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {project.services.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm font-medium text-ink">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-accent" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </aside>

          <div className="flex flex-col gap-12">
            {project.overview ? (
              <Reveal>
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl font-black tracking-tight">Overview</h2>
                  <p className="text-pretty leading-relaxed text-muted">{project.overview}</p>
                </div>
              </Reveal>
            ) : null}
            {project.challenge ? (
              <Reveal delay={80}>
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl font-black tracking-tight">The challenge</h2>
                  <p className="text-pretty leading-relaxed text-muted">{project.challenge}</p>
                </div>
              </Reveal>
            ) : null}
            {project.strategy ? (
              <Reveal delay={80}>
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl font-black tracking-tight">Our approach</h2>
                  <p className="text-pretty leading-relaxed text-muted">{project.strategy}</p>
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      {/* Results */}
      {project.results && project.results.length > 0 ? (
        <section className="bg-ink text-paper">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <Reveal>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Partnership snapshot</h2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {project.results.map((r, i) => (
                <Reveal key={r.label} delay={i * 70}>
                  <div className="rounded-3xl border border-paper/10 bg-white/[0.03] p-6">
                    <p className="text-3xl font-black tracking-tight text-accent sm:text-4xl">{r.value}</p>
                    <p className="mt-2 text-sm text-paper/65">{r.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 ? (
        <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Selected work</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {project.gallery.map((src, i) => (
              <Reveal key={src} delay={i * 60}>
                <div className="overflow-hidden rounded-3xl border border-line bg-paper-2">
                  <img
                    src={src || "/placeholder.svg"}
                    alt={`${project.client} work sample ${i + 1}`}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
        <Reveal>
          <div className="flex flex-col items-start gap-6 rounded-[32px] bg-ink px-7 py-14 text-paper sm:px-14 sm:py-16">
            <h2 className="max-w-2xl text-balance text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl">
              Want results like this for your brand?
            </h2>
            <ButtonLink href="/contact" withIcon>
              Start a project
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  )
}
