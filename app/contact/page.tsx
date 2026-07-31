import type { Metadata } from "next"
import { Mail, Clock, MessageSquare } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { PageHero } from "@/components/page-hero"
import { ContactForm } from "@/components/contact-form"
import { getSiteSettings } from "@/lib/data/site"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with The Backstage Marketing. Tell us about your brand and goals and we'll get back to you within 1–2 business days.",
  alternates: { canonical: "/contact" },
}

export default async function ContactPage() {
  const site = await getSiteSettings()
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build something worth watching"
        description="Whether you're launching, rebranding or scaling, tell us where you want to go. We'll bring the strategy and the craft to get you there."
      />

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl bg-ink text-paper">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink">Email us</h2>
                    <a href={`mailto:${site.email}`} className="mt-1 block text-muted transition-colors hover:text-accent">
                      {site.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl bg-ink text-paper">
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink">Response time</h2>
                    <p className="mt-1 text-muted">Within 1–2 business days.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl bg-ink text-paper">
                    <MessageSquare className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink">What to expect</h2>
                    <p className="mt-1 text-muted">A reply, a discovery call, then a tailored proposal.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-ink p-7 text-paper">
                <p className="text-lg font-bold">Prefer to see our work first?</p>
                <p className="mt-2 text-sm leading-relaxed text-paper/70">
                  Browse recent projects and case studies to get a feel for how we think and what we deliver.
                </p>
                <a
                  href="/projects"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                >
                  View our projects
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
