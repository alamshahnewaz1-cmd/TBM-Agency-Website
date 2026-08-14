import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react"

import { GeneralServicesInquiryModal } from "@/components/general-services-inquiry-modal"
import { PageHero } from "@/components/page-hero"
import { Reveal } from "@/components/reveal"
import {
  Eyebrow,
  SectionHeading,
} from "@/components/section-heading"
import { ServiceInquiryModal } from "@/components/service-inquiry-modal"

import {
  getServices,
  resolveServiceInquiry,
} from "@/lib/data/services"

import {
  getServicesPage,
} from "@/lib/data/services-page"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Branding, social media, content, websites, performance marketing and growth services from The Backstage Marketing.",
  alternates: {
    canonical: "/services",
  },
}

function formatPrice({
  prefix,
  price,
  suffix,
}: {
  prefix?: string
  price?: string
  suffix?: string
}) {
  if (!price) return null

  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      {prefix ? (
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          {prefix}
        </span>
      ) : null}

      <span className="text-2xl font-black tracking-tight text-ink">
        {price}
      </span>

      {suffix ? (
        <span className="text-sm font-medium text-muted">
          {suffix}
        </span>
      ) : null}
    </div>
  )
}

export default async function ServicesPage() {
  const [
    services,
    page,
  ] = await Promise.all([
    getServices(),
    getServicesPage(),
  ])

  return (
    <>
      <PageHero
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        description={page.heroDescription}
      />

      {/* Quick navigation */}
      <section className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap gap-2 rounded-3xl border border-line bg-card p-4">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`#${service.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-muted transition-all hover:-translate-y-0.5 hover:border-ink hover:text-ink"
            >
              <service.icon
                className="h-4 w-4 text-accent"
                aria-hidden="true"
              />

              {service.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Major services */}
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {services.map((service, index) => {
          const serviceInquiry =
            resolveServiceInquiry(service)

          return (
            <section
              key={service.slug}
              id={service.slug}
              className="scroll-mt-28 border-b border-line py-16 last:border-b-0 sm:py-24"
            >
              <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                {/* Service introduction */}
                <Reveal>
                  <div className="flex flex-col items-start gap-5 lg:sticky lg:top-28 lg:self-start">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-paper">
                      <service.icon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </span>

                    <Eyebrow>
                      {`${String(
                        index + 1,
                      ).padStart(
                        2,
                        "0",
                      )} — ${service.tagline}`}
                    </Eyebrow>

                    <h2 className="text-balance text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                      {service.title}
                    </h2>

                    <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                      {service.description}
                    </p>

                    {/* Major-service pricing */}
                    {service.startingPrice ? (
                      <div className="w-full rounded-3xl border border-line bg-card p-5">
                        {formatPrice({
                          prefix:
                            service.pricePrefix,
                          price:
                            service.startingPrice,
                          suffix:
                            service.priceSuffix,
                        })}

                        {service.pricingNote ? (
                          <p className="mt-2 text-xs leading-relaxed text-muted">
                            {
                              service.pricingNote
                            }
                          </p>
                        ) : null}
                      </div>
                    ) : null}

                    {/* Best for */}
                    <div className="w-full rounded-2xl bg-paper-2/70 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                        {page.bestForLabel}
                      </p>

                      <p className="mt-1 text-sm font-medium leading-relaxed text-ink">
                        {service.forWho}
                      </p>
                    </div>

                    {/* Major-service inquiry */}
                    <ServiceInquiryModal
                      config={
                        serviceInquiry
                      }
                      variant="accent"
                    />
                  </div>
                </Reveal>

                {/* Service details */}
                <div className="flex flex-col gap-8">
                  <Reveal delay={80}>
                    <div className="grid gap-6 sm:grid-cols-2">
                      {/* Deliverables */}
                      <div className="rounded-3xl border border-line bg-card p-6">
                        <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-ink">
                          {
                            page.deliverablesLabel
                          }
                        </h3>

                        <ul className="mt-4 flex flex-col gap-3">
                          {service.deliverables.map(
                            (
                              deliverable,
                            ) => (
                              <li
                                key={
                                  deliverable
                                }
                                className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                              >
                                <Check
                                  className="mt-0.5 h-4 w-4 flex-none text-accent"
                                  aria-hidden="true"
                                />

                                {
                                  deliverable
                                }
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      {/* Outcomes */}
                      <div className="rounded-3xl border border-line bg-card p-6">
                        <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-ink">
                          {
                            page.outcomesLabel
                          }
                        </h3>

                        <ul className="mt-4 flex flex-col gap-3">
                          {service.outcomes.map(
                            (outcome) => (
                              <li
                                key={outcome}
                                className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                              >
                                <ArrowRight
                                  className="mt-0.5 h-4 w-4 flex-none text-accent"
                                  aria-hidden="true"
                                />

                                {outcome}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </Reveal>

                  {/* Sub-services */}
                  {service.subServices &&
                  service.subServices
                    .length > 0 ? (
                    <Reveal delay={120}>
                      <div className="flex flex-col gap-5">
                        <div>
                          <Eyebrow>
                            {
                              page.subServicesEyebrow
                            }
                          </Eyebrow>

                          <h3 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                            {
                              page.subServicesTitle
                            }
                          </h3>
                        </div>

                        <div className="grid gap-4">
                          {service.subServices.map(
                            (
                              subService,
                            ) => {
                              const subServiceInquiry =
                                resolveServiceInquiry(
                                  service,
                                  subService,
                                )

                              return (
                                <article
                                  key={
                                    subService.slug
                                  }
                                  id={`${service.slug}-${subService.slug}`}
                                  className="scroll-mt-28 rounded-3xl border border-line bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-28px_rgba(9,9,11,0.28)] sm:p-7"
                                >
                                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="max-w-xl">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <h4 className="text-xl font-black tracking-tight">
                                          {
                                            subService.name
                                          }
                                        </h4>

                                        {subService.featured ? (
                                          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
                                            <Sparkles
                                              className="h-3 w-3"
                                              aria-hidden="true"
                                            />

                                            Popular
                                          </span>
                                        ) : null}
                                      </div>

                                      <p className="mt-2 text-sm leading-relaxed text-muted">
                                        {
                                          subService.summary
                                        }
                                      </p>

                                      {subService.deliverables &&
                                      subService
                                        .deliverables
                                        .length >
                                        0 ? (
                                        <ul className="mt-4 flex flex-col gap-2">
                                          {subService.deliverables.map(
                                            (
                                              item,
                                            ) => (
                                              <li
                                                key={
                                                  item
                                                }
                                                className="flex items-start gap-2 text-sm leading-relaxed text-muted"
                                              >
                                                <Check
                                                  className="mt-0.5 h-4 w-4 flex-none text-accent"
                                                  aria-hidden="true"
                                                />

                                                {
                                                  item
                                                }
                                              </li>
                                            ),
                                          )}
                                        </ul>
                                      ) : null}
                                    </div>

                                    <div className="flex min-w-44 flex-col items-start gap-4 sm:items-end">
                                      {subService.startingPrice
                                        ? formatPrice(
                                            {
                                              prefix:
                                                subService.pricePrefix,
                                              price:
                                                subService.startingPrice,
                                              suffix:
                                                subService.priceSuffix,
                                            },
                                          )
                                        : null}

                                      {subService.pricingNote ? (
                                        <p className="max-w-48 text-xs leading-relaxed text-muted sm:text-right">
                                          {
                                            subService.pricingNote
                                          }
                                        </p>
                                      ) : null}

                                      {/* Sub-service inquiry */}
                                      <ServiceInquiryModal
                                        config={
                                          subServiceInquiry
                                        }
                                        variant="dark"
                                      />
                                    </div>
                                  </div>
                                </article>
                              )
                            },
                          )}
                        </div>
                      </div>
                    </Reveal>
                  ) : null}

                  {/* Major-service inquiry block */}
                  <Reveal delay={150}>
                    <div className="rounded-[28px] bg-ink p-7 text-paper sm:p-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-paper/60">
                        {
                          page.serviceInquiryEyebrow
                        }
                      </p>

                      <h3 className="mt-3 text-2xl font-black tracking-tight">
                        {service.inquiryTitle ||
                          "Interested in this service?"}
                      </h3>

                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-paper/70">
                        {service.inquiryDescription ||
                          "Tell us about your project and we’ll recommend the right approach."}
                      </p>

                      <div className="mt-6">
                        <ServiceInquiryModal
                          config={
                            serviceInquiry
                          }
                          variant="light"
                        />
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      {/* General inquiry */}
      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="flex flex-col items-center gap-6 rounded-[32px] border border-line bg-card px-7 py-14 text-center sm:px-12 sm:py-16">
            <SectionHeading
              align="center"
              title={
                page.generalInquiryTitle
              }
              description={
                page.generalInquiryDescription
              }
            />

            <GeneralServicesInquiryModal
              page={page}
            />
          </div>
        </Reveal>
      </section>
    </>
  )
}