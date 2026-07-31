import Image from "next/image"
import type { Metadata } from "next"

import { ButtonLink } from "@/components/button-link"
import { PageHero } from "@/components/page-hero"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { getAboutPage } from "@/lib/data/about"
import { resolveIcon } from "@/lib/icon-map"
import { urlForImage } from "@/sanity/lib/image"

export const metadata: Metadata = {
  title: "About",
  description:
    "The Backstage Marketing is a creative growth agency doing the work behind the scenes so your brand can take center stage.",
  alternates: {
    canonical: "/about",
  },
}

export default async function AboutPage() {
  const about = await getAboutPage()

  const { values, milestones, team } = about

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
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="flex flex-col gap-5">
              <SectionHeading
                eyebrow={about.storyEyebrow}
                title={about.storyTitle}
              />

              {about.storyParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-pretty leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col gap-4">
              {milestones.map((milestone) => (
                <div
                  key={milestone.year}
                  className="rounded-3xl border border-line bg-card p-6"
                >
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-accent">
                    {milestone.year}
                  </p>

                  <p className="mt-2 leading-relaxed text-muted">
                    {milestone.copy}
                  </p>
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
            {values.map((value, index) => {
              const Icon = resolveIcon(value.icon)

              return (
                <Reveal key={value.title} delay={index * 60}>
                  <div className="flex h-full flex-col gap-4 rounded-3xl border border-line bg-card p-7">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-paper">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>

                    <h3 className="text-lg font-bold tracking-tight">
                      {value.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-muted">
                      {value.copy}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading
                eyebrow="Meet the team"
                title="The people behind the work"
                align="center"
              />

              <p className="mt-5 text-pretty leading-relaxed text-muted">
                A focused team combining strategy, creativity and execution to
                help brands show up with clarity and confidence.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => {
              const photoUrl = member.photo
                ? urlForImage(member.photo)
                    ?.width(900)
                    .height(900)
                    .fit("crop")
                    .url()
                : null

              return (
                <Reveal
                  key={`${member.name}-${index}`}
                  delay={index * 80}
                >
                  <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card transition-transform duration-300 hover:-translate-y-1">
                    <div className="relative aspect-square overflow-hidden bg-paper-2">
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt={member.photo?.alt || member.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="grid h-full w-full place-items-center">
                          <span className="text-6xl font-black uppercase tracking-tight text-accent/30">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold tracking-tight">
                            {member.name}
                          </h3>

                          <p className="mt-1 text-sm font-bold uppercase tracking-[0.12em] text-accent">
                            {member.role}
                          </p>
                        </div>

                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${member.name}'s LinkedIn profile`}
                            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:bg-accent hover:text-paper"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.94v5.666H9.352V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.064 2.064 0 1 1 0-4.128 2.064 2.064 0 0 1 0 4.128ZM6.887 20.452H3.783V9h3.104v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z" />
                            </svg>
                          </a>
                        )}
                      </div>

                      {member.bio && (
                        <p className="mt-5 text-sm leading-relaxed text-muted">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-28">
        <Reveal>
          <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] bg-accent px-6 py-14 text-paper sm:px-12 sm:py-20 lg:px-16">
            <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-paper/70">
                  Start a project
                </p>

                <h2 className="mt-4 text-pretty text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                  {about.ctaTitle}
                </h2>

                <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-paper/80">
                  {about.ctaDescription}
                </p>
              </div>

              <div className="shrink-0">
                <ButtonLink href="/contact" withIcon>
                  Let&apos;s talk
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}