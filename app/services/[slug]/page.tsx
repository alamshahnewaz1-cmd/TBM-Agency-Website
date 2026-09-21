import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react"

import { Reveal } from "@/components/reveal"
import { Eyebrow } from "@/components/section-heading"
import { ServiceInquiryModal } from "@/components/service-inquiry-modal"

import {
  getService,
  getServices,
  imageUrl,
  resolveServiceInquiry,
} from "@/lib/data/services"

import { getServicesPage } from "@/lib/data/services-page"

export async function generateStaticParams() {
  const services = await getServices()

  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    return {
      title: "Service not found",
    }
  }

  const title =
    service.seo?.metaTitle ||
    `${service.title} | The Backstage Marketing`

  const description =
    service.seo?.metaDescription ||
    service.summary

  const socialImage =
    service.seo?.ogImage ||
    service.coverImage

  const socialImageUrl =
    socialImage
      ? imageUrl(socialImage, "")
      : ""

  return {
    title,
    description,

    alternates: {
      canonical: `/services/${service.slug}`,
    },

    robots:
      service.seo?.noIndex
        ? {
            index: false,
            follow: false,
          }
        : undefined,

    openGraph: {
      title,
      description,
      images: socialImageUrl
        ? [{ url: socialImageUrl }]
        : undefined,
    },
  }
}

function Price({
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
    <div className="flex flex-wrap items-baseline gap-2">
      {prefix ? (
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          {prefix}
        </span>
      ) : null}

      <span className="text-3xl font-black tracking-tight text-ink">
        {price}
      </span>

      {suffix ? (
        <span className="text-sm text-muted">
          {suffix}
        </span>
      ) : null}
    </div>
  )
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const [service, page] =
    await Promise.all([
      getService(slug),
      getServicesPage(),
    ])

  if (!service) {
    notFound()
  }

  const inquiry =
    resolveServiceInquiry(service)

  const coverUrl =
    service.coverImage
      ? imageUrl(service.coverImage, "")
      : ""

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-paper-2/40">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft
              className="h-4 w-4"
              aria-hidden="true"
            />

            All services
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <Reveal>
              <div className="flex flex-col items-start gap-5">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-paper">
                  <service.icon
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                </span>

                <Eyebrow>
                  {service.tagline}
                </Eyebrow>

                <h1 className="text-balance text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
                  {service.title}
                </h1>

                <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted">
                  {service.description}
                </p>

                {service.startingPrice ? (
                  <div className="mt-2">
                    <Price
                      prefix={
                        service.pricePrefix
                      }
                      price={
                        service.startingPrice
                      }
                      suffix={
                        service.priceSuffix
                      }
                    />

                    {service.pricingNote ? (
                      <p className="mt-2 text-xs text-muted">
                        {
                          service.pricingNote
                        }
                      </p>
                    ) : null}
                  </div>
                ) : null}

                <ServiceInquiryModal
                  config={inquiry}
                  variant="accent"
                />
              </div>
            </Reveal>

            {/* Cover image */}
            <Reveal delay={100}>
              {coverUrl ? (
                <div className="overflow-hidden rounded-[28px] border border-line bg-card">
                  <img
                    src={coverUrl}
                    alt={
                      service.coverImage?.alt ||
                      `${service.title} service by The Backstage Marketing`
                    }
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              ) : (
                <div className="grid aspect-[4/3] place-items-center rounded-[28px] bg-ink">
                  <service.icon
                    className="h-16 w-16 text-paper"
                    aria-hidden="true"
                  />
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Main details */}
      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Best for */}
          <Reveal>
            <div className="h-full rounded-3xl border border-line bg-card p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                {page.bestForLabel}
              </p>

              <p className="mt-4 leading-relaxed text-ink">
                {service.forWho}
              </p>
            </div>
          </Reveal>

          {/* Deliverables */}
          <Reveal delay={60}>
            <div className="h-full rounded-3xl border border-line bg-card p-7">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                {page.deliverablesLabel}
              </h2>

              <ul className="mt-4 flex flex-col gap-3">
                {service.deliverables.map(
                  (item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 flex-none text-accent"
                        aria-hidden="true"
                      />

                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </Reveal>

          {/* Outcomes */}
          <Reveal delay={120}>
            <div className="h-full rounded-3xl border border-line bg-card p-7">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                {page.outcomesLabel}
              </h2>

              <ul className="mt-4 flex flex-col gap-3">
                {service.outcomes.map(
                  (item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                    >
                      <ArrowRight
                        className="mt-0.5 h-4 w-4 flex-none text-accent"
                        aria-hidden="true"
                      />

                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sub-services */}
      {service.subServices &&
      service.subServices.length > 0 ? (
        <section className="bg-paper-2/50">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <Reveal>
              <Eyebrow>
                {page.subServicesEyebrow}
              </Eyebrow>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                {page.subServicesTitle}
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {service.subServices.map(
                (subService, index) => {
                  const subInquiry =
                    resolveServiceInquiry(
                      service,
                      subService,
                    )

                  return (
                    <Reveal
                      key={subService.slug}
                      delay={index * 60}
                    >
                      <article className="flex h-full flex-col rounded-3xl border border-line bg-card p-7">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-xl font-black tracking-tight">
                            {subService.name}
                          </h3>

                          {subService.featured ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                              <Sparkles
                                className="h-3 w-3"
                                aria-hidden="true"
                              />

                              Popular
                            </span>
                          ) : null}
                        </div>

                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          {
                            subService.summary
                          }
                        </p>

                        {subService.deliverables &&
                        subService.deliverables
                          .length > 0 ? (
                          <ul className="mt-5 flex flex-col gap-2">
                            {subService.deliverables.map(
                              (item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2 text-sm text-muted"
                                >
                                  <Check
                                    className="mt-0.5 h-4 w-4 flex-none text-accent"
                                    aria-hidden="true"
                                  />

                                  {item}
                                </li>
                              ),
                            )}
                          </ul>
                        ) : null}

                        <div className="mt-auto pt-6">
                          {subService.startingPrice ? (
                            <div className="mb-4">
                              <Price
                                prefix={
                                  subService.pricePrefix
                                }
                                price={
                                  subService.startingPrice
                                }
                                suffix={
                                  subService.priceSuffix
                                }
                              />

                              {subService.pricingNote ? (
                                <p className="mt-2 text-xs text-muted">
                                  {
                                    subService.pricingNote
                                  }
                                </p>
                              ) : null}
                            </div>
                          ) : null}

                          <ServiceInquiryModal
                            config={
                              subInquiry
                            }
                            variant="dark"
                          />
                        </div>
                      </article>
                    </Reveal>
                  )
                },
              )}
            </div>
          </div>
        </section>
      ) : null}

      {/* Final inquiry */}
      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="rounded-[32px] bg-ink px-7 py-14 text-paper sm:px-14 sm:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-paper/60">
              {page.serviceInquiryEyebrow}
            </p>

            <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
              {service.inquiryTitle ||
                `Ready to get started with ${service.title}?`}
            </h2>

            <p className="mt-4 max-w-2xl leading-relaxed text-paper/70">
              {service.inquiryDescription ||
                "Tell us about your goals and we’ll recommend the right approach."}
            </p>

            <div className="mt-7">
              <ServiceInquiryModal
                config={inquiry}
                variant="light"
              />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}