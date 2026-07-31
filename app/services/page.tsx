import type { Metadata } from "next"
import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"
import { ButtonLink } from "@/components/button-link"
import { Reveal } from "@/components/reveal"
import { Eyebrow, SectionHeading } from "@/components/section-heading"
import { PageHero } from "@/components/page-hero"
import { getServices } from "@/lib/data/services"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand strategy, identity, social media, content, campaigns, websites and performance marketing — the full creative stack from The Backstage Marketing.",
  alternates: { canonical: "/services" },
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Everything your brand needs, under one roof"
        description="We plug in as your creative and growth partner — from the strategy behind the scenes to the campaigns in the spotlight."
      />

      {/* Quick nav */}
      <section className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap gap-2 rounded-3xl border border-line bg-card p-4">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`#${s.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-ink hover:text-ink"
            >
              <s.icon className="h-4 w-4 text-accent" aria-hidden="true" />
              {s.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Detailed service sections */}
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {services.map((service, i) => (
          <section
            key={service.slug}
            id={service.slug}
            className="scroll-mt-28 border-b border-line py-16 last:border-b-0 sm:py-20"
          >
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <Reveal>
                <div className="flex flex-col gap-5">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-paper">
                    <service.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <Eyebrow>{`0${i + 1} — ${service.tagline}`}</Eyebrow>
                  <h2 className="text-balance text-3xl font-black tracking-tight sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="text-pretty text-base leading-relaxed text-muted">{service.description}</p>
                  <div className="rounded-2xl bg-paper-2/70 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Best for</p>
                    <p className="mt-1 text-sm font-medium text-ink">{service.forWho}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="rounded-3xl border border-line bg-card p-6">
                    <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-ink">What you get</h3>
                    <ul className="mt-4 flex flex-col gap-3">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                          <Check className="mt-0.5 h-4 w-4 flex-none text-accent" aria-hidden="true" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-line bg-card p-6">
                    <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-ink">Outcomes</h3>
                    <ul className="mt-4 flex flex-col gap-3">
                      {service.outcomes.map((o) => (
                        <li key={o} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                          <ArrowRight className="mt-0.5 h-4 w-4 flex-none text-accent" aria-hidden="true" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="flex flex-col items-center gap-6 rounded-[32px] border border-line bg-card px-7 py-14 text-center sm:py-16">
            <SectionHeading
              align="center"
              title="Not sure where to start?"
              description="Book a free discovery call and we'll map out the right mix of services for your goals and budget."
            />
            <ButtonLink href="/contact" withIcon>
              Book a discovery call
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  )
}
