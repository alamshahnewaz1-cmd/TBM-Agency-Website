import type { Metadata } from "next"
import { Lightbulb, HeartHandshake, Target, Sparkles } from "lucide-react"
import { ButtonLink } from "@/components/button-link"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { PageHero } from "@/components/page-hero"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "The Backstage Marketing is a creative growth agency doing the work behind the scenes so your brand can own the spotlight. Meet the team and our philosophy.",
  alternates: { canonical: "/about" },
}

const values = [
  {
    icon: Target,
    title: "Strategy first",
    copy: "Every design and campaign traces back to a clear objective. No pretty work without a purpose.",
  },
  {
    icon: Sparkles,
    title: "Craft obsessed",
    copy: "Details compound. We sweat the small things so the finished work feels effortless.",
  },
  {
    icon: HeartHandshake,
    title: "True partners",
    copy: "We work like an extension of your team — invested, honest and in it for the long game.",
  },
  {
    icon: Lightbulb,
    title: "Ideas that move",
    copy: "Creativity is only as good as the result it drives. We chase impact, not applause.",
  },
]

const milestones = [
  { year: "The start", copy: "Founded on a simple belief: great brands are built backstage, long before the spotlight hits." },
  { year: "The work", copy: "Partnered with founders and teams across retail, tech and services to build brands that grow." },
  { year: "The now", copy: "A tight creative unit delivering strategy, design and performance under one roof." },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="The team working backstage on your brand"
        description={`${site.name} exists to do the unglamorous, essential work that makes brands look effortless in the spotlight — the strategy, the systems and the craft behind every standout moment.`}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact" withIcon>
            Work with us
          </ButtonLink>
          <ButtonLink href="/projects" variant="ghost" withIcon>
            See our work
          </ButtonLink>
        </div>
      </PageHero>

      {/* Story */}
      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <div className="flex flex-col gap-5">
              <SectionHeading eyebrow="Our story" title="Built for the brands you notice" />
              <p className="text-pretty leading-relaxed text-muted">
                The best performances look easy — but they&apos;re the result of relentless preparation happening
                out of sight. We named ourselves The Backstage Marketing because that&apos;s exactly where we thrive:
                behind the scenes, doing the deep work that turns a good brand into an unforgettable one.
              </p>
              <p className="text-pretty leading-relaxed text-muted">
                We&apos;re a compact, senior team of strategists, designers and marketers. That means you get the
                people who actually do the work — no layers, no hand-offs, no diluted ideas. Just focused craft and
                a partner genuinely invested in your growth.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col gap-4">
              {milestones.map((m) => (
                <div key={m.year} className="rounded-3xl border border-line bg-card p-6">
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-accent">{m.year}</p>
                  <p className="mt-2 leading-relaxed text-muted">{m.copy}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-paper-2/50">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="What we value"
              title="The principles behind every project"
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 60}>
                <div className="flex h-full flex-col gap-4 rounded-3xl border border-line bg-card p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-paper">
                    <v.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold tracking-tight">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{v.copy}</p>
                </div>
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
                Let&apos;s build something worth watching
              </h2>
              <p className="max-w-xl text-pretty leading-relaxed text-paper/70 sm:text-lg">
                Whether you&apos;re starting fresh or scaling up, we&apos;d love to hear what you&apos;re working on.
              </p>
              <ButtonLink href="/contact" withIcon>
                Start a conversation
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
