import Link from "next/link"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { ButtonLink } from "@/components/button-link"
import { Reveal } from "@/components/reveal"
import { Eyebrow, SectionHeading } from "@/components/section-heading"
import { services } from "@/lib/services"
import { projects } from "@/lib/projects"
import { testimonials } from "@/lib/testimonials"
import { site } from "@/lib/site"

const stats = [
  { value: "40+", label: "Brands launched & scaled" },
  { value: "3.4x", label: "Avg. return on ad spend" },
  { value: "12M+", label: "Organic impressions driven" },
  { value: "98%", label: "Client retention rate" },
]

const process = [
  { step: "01", title: "Discover", copy: "We dig into your market, audience and goals to find the real growth levers." },
  { step: "02", title: "Design", copy: "Brand systems, messaging and creative concepts built to stand out and convert." },
  { step: "03", title: "Deploy", copy: "We ship campaigns, content and assets across the channels that matter." },
  { step: "04", title: "Drive", copy: "Continuous testing and reporting so performance compounds month over month." },
]

const marqueeItems = [
  "Brand Strategy",
  "Social Media",
  "Content Creation",
  "Performance Ads",
  "Web Design",
  "Video Production",
  "Campaigns",
  "Creative Direction",
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="flex flex-col gap-7">
            <Reveal>
              <Eyebrow>Creative growth agency</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-balance text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl md:text-7xl">
                Built backstage.{" "}
                <span className="text-accent">Made for the spotlight.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted">
                {site.name} is the team behind the brands you notice. We craft identity, content and
                campaigns that turn attention into measurable growth.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" withIcon>
                  Start a project
                </ButtonLink>
                <ButtonLink href="/projects" variant="ghost" withIcon>
                  View our work
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6 sm:max-w-lg sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="text-2xl font-black tracking-tight sm:text-3xl">{s.value}</dt>
                    <dd className="mt-1 text-xs leading-snug text-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-ink">
              <div className="absolute inset-0 grid place-items-center p-8">
                <img
                  src="/images/tbm-logo.png"
                  alt=""
                  className="w-3/4 max-w-[280px] object-contain opacity-90 [filter:invert(1)] mix-blend-screen"
                />
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-paper/95 px-5 py-4 backdrop-blur">
                <div>
                  <p className="text-sm font-bold text-ink">The Backstage Marketing</p>
                  <p className="text-xs text-muted">{site.tagline}</p>
                </div>
                <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-accent text-paper">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Marquee */}
        <div className="border-y border-line bg-paper-2/60 py-4">
          <div className="flex overflow-hidden">
            <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span key={i} className="flex items-center gap-8 text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                  {item}
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title="Full-stack creative, built for growth"
            description="From the first sketch to the final campaign report, we cover every stage of your brand's journey."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 60}>
              <Link
                href={`/services#${service.slug}`}
                className="group flex h-full flex-col gap-4 rounded-3xl border border-line bg-card p-7 transition-all hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_18px_50px_-24px_rgba(9,9,11,0.35)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-paper transition-colors group-hover:bg-accent">
                  <service.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-xl font-bold tracking-tight">{service.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{service.summary}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process — dark band */}
      <section className="bg-ink text-paper">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-paper/50">
                <span className="h-px w-6 bg-accent" aria-hidden="true" />
                How we work
              </span>
              <h2 className="max-w-2xl text-balance text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
                A proven process from idea to impact
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 70}>
                <div className="flex h-full flex-col gap-3 rounded-3xl border border-paper/10 bg-white/[0.03] p-6">
                  <span className="text-sm font-black text-accent">{p.step}</span>
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-paper/65">{p.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Selected work"
              title="Projects with a spotlight moment"
              description="A look at the brands and campaigns we've helped step into the light."
            />
            <ButtonLink href="/projects" variant="ghost" withIcon className="shrink-0">
              All projects
            </ButtonLink>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6">
          {projects.slice(0, 2).map((project, i) => (
            <Reveal key={project.slug} delay={i * 80}>
              <Link
                href={`/projects/${project.slug}`}
                className="group grid overflow-hidden rounded-3xl border border-line bg-card transition-all hover:-translate-y-1 hover:shadow-[0_18px_50px_-24px_rgba(9,9,11,0.35)] md:grid-cols-2"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-paper-2 md:aspect-auto">
                  <img
                    src={project.cover || "/placeholder.svg"}
                    alt={project.client}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-7 sm:p-9">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      {project.category}
                    </span>
                    <span className="text-xs font-medium text-muted">{project.status}</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">{project.client}</h3>
                  <p className="text-sm leading-relaxed text-muted">{project.summary}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.services.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full bg-paper-2 px-3 py-1 text-xs font-medium text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-accent">
                    View case study
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-paper-2/50">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <SectionHeading eyebrow="Kind words" title="Trusted by founders and marketing teams" align="center" />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <Reveal key={t.name} delay={i * 70}>
                <figure className="flex h-full flex-col gap-5 rounded-3xl border border-line bg-card p-7">
                  <blockquote className="text-pretty text-base leading-relaxed text-ink">“{t.quote}”</blockquote>
                  <figcaption className="mt-auto flex items-center gap-3">
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-ink text-sm font-bold text-paper">
                      {t.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-ink">{t.name}</span>
                      <span className="block text-xs text-muted">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-ink px-7 py-14 text-paper sm:px-14 sm:py-20">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/30 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-start gap-6">
              <h2 className="max-w-2xl text-balance text-3xl font-black leading-[1.05] tracking-tight sm:text-5xl">
                Ready to step into the spotlight?
              </h2>
              <p className="max-w-xl text-pretty text-base leading-relaxed text-paper/70 sm:text-lg">
                Tell us where you want to grow. We'll bring the strategy, creative and execution to get you there.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" withIcon>
                  Start a project
                </ButtonLink>
                <ButtonLink href="/services" variant="light" withIcon>
                  Explore services
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
