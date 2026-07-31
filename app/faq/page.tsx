import type { Metadata } from "next"
import { ButtonLink } from "@/components/button-link"
import { Reveal } from "@/components/reveal"
import { PageHero } from "@/components/page-hero"
import { FaqAccordion } from "@/components/faq-accordion"
import { getFaqs } from "@/lib/data/faq"

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about working with The Backstage Marketing — services, pricing, timelines, revisions and how to get started.",
  alternates: { canonical: "/faq" },
}

export default async function FaqPage() {
  const faqs = await getFaqs()
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered"
        description="Everything you need to know before working with us. Can't find your answer? Reach out and we'll help."
      />

      <section className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <FaqAccordion items={faqs} />
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-[32px] bg-ink px-7 py-14 text-center text-paper sm:py-16">
            <h2 className="text-balance text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl">
              Still have questions?
            </h2>
            <p className="text-pretty leading-relaxed text-paper/70">
              Tell us what you&apos;re working on and we&apos;ll get back to you with clear, honest answers — no
              pressure.
            </p>
            <ButtonLink href="/contact" withIcon>
              Get in touch
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  )
}
