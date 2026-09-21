import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { GeneralServicesInquiryModal } from "@/components/general-services-inquiry-modal"
import { PageHero } from "@/components/page-hero"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"

import { getServices } from "@/lib/data/services"
import { getServicesPage } from "@/lib/data/services-page"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore branding, social media, content creation, website development and performance marketing services from The Backstage Marketing.",
  alternates: {
    canonical: "/services",
  },
}

export default async function ServicesPage() {
  const [services, page] = await Promise.all([
    getServices(),
    getServicesPage(),
  ])

  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        description={page.heroDescription}
      />

      {/* Services directory */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal
              key={service.slug}
              delay={index * 60}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col gap-4 rounded-3xl border border-line bg-card p-7 transition-all hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_18px_50px_-24px_rgba(9,9,11,0.35)]"
              >
                {/* Icon */}
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-paper transition-colors group-hover:bg-accent">
                  <service.icon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>

                {/* Service name */}
                <h2 className="text-xl font-bold tracking-tight text-ink">
                  {service.title}
                </h2>

                {/* Short description */}
                <p className="text-sm leading-relaxed text-muted">
                  {service.summary}
                </p>

                {/* CTA */}
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-accent">
                  Explore service

                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* General inquiry */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
        <Reveal>
          <div className="flex flex-col items-center gap-6 rounded-[32px] border border-line bg-card px-7 py-14 text-center sm:px-12 sm:py-16">
            <SectionHeading
              align="center"
              title={page.generalInquiryTitle}
              description={page.generalInquiryDescription}
            />

            <GeneralServicesInquiryModal page={page} />
          </div>
        </Reveal>
      </section>
    </>
  )
}