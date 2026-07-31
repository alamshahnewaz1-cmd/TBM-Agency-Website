import type { Metadata } from "next"
import { ButtonLink } from "@/components/button-link"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { PageHero } from "@/components/page-hero"
import { getAboutPage } from "@/lib/data/about"
import { resolveIcon } from "@/lib/icon-map"

export const metadata: Metadata = {
  title: "About",
  description:
    "The Backstage Marketing is a creative growth agency doing the work behind the scenes so your brand can take center stage.",
  alternates: { canonical: "/about" },
}

export default async function AboutPage() {
  const about = await getAboutPage()

  const { values, milestones } = about

  return (
    <>
      <PageHero
        eyebrow={about.heroEyebrow}
        title={about.heroTitle}
        description={about.heroDescription}
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
              <SectionHeading eyebrow={about.storyEyebrow} title={about.storyTitle} />
              {about.storyParagraphs.map((paragraph, i) => (
                <p key={i} className="text-pretty leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
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
              eyebrow={about.valuesEyebrow}
              title={about.valuesTitle}
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = resolveIcon(v.icon)
              return (
                <Reveal key={v.title} delay={i * 60}>
                  <div className="flex h-full flex-col gap-4 rounded-3xl border border-line bg-card p-7">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-paper">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-bold tracking-tight">{v.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{v.copy}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
     

    </>
  )
}
