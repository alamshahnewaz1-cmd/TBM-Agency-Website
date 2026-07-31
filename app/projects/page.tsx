import type { Metadata } from "next"
import { ButtonLink } from "@/components/button-link"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { PageHero } from "@/components/page-hero"
import { ProjectsGrid } from "@/components/projects-grid"
import { getProjects, projectCategories } from "@/lib/data/projects"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work from The Backstage Marketing — brand, social and campaign projects built to turn attention into measurable growth.",
  alternates: { canonical: "/projects" },
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Brands we've helped step into the spotlight"
        description="A selection of the strategy, creative and campaigns we've delivered. Each project starts backstage and ends in results."
      />

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <ProjectsGrid projects={projects} categories={projectCategories} />
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
        <Reveal>
          <div className="flex flex-col items-center gap-6 rounded-[32px] border border-line bg-card px-7 py-14 text-center sm:py-16">
            <SectionHeading
              align="center"
              title="Your brand could be next"
              description="We take on a limited number of partners at a time so every project gets our full attention. Let's talk about yours."
            />
            <ButtonLink href="/contact" withIcon>
              Start a project
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  )
}
