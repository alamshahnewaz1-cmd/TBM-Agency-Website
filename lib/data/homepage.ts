import { sanityFetch } from "@/sanity/lib/fetch"
import { homepageQuery } from "@/sanity/lib/queries"
import type { Homepage, SanityImageRef, Seo } from "@/lib/types"

type SanityHomepage = Omit<Homepage, "heroImage" | "seo"> & {
  heroImage?: SanityImageRef
  seo?: Seo
}

/**
 * Fallback homepage content — mirrors exactly what was previously hardcoded in
 * app/page.tsx, so the page is byte-identical before Sanity is populated.
 */
export const fallbackHomepage: Homepage = {
  heroEyebrow: "Creative growth agency",
  heroTitleLead: "Built backstage.",
  heroTitleHighlight: "Made for the spotlight.",
  heroDescription:
    "The Backstage Marketing is the team behind the brands you notice. We craft identity, content and campaigns that turn attention into measurable growth.",
  heroPrimaryCta: { label: "Start a project", href: "/contact" },
  heroSecondaryCta: { label: "View our work", href: "/projects" },
  heroImage: null,
  heroCardTitle: "The Backstage Marketing",
  heroCardTagline: "Built backstage. Made for the spotlight.",
  stats: [
  { value: "2026", label: "Founded" },
  { value: "10+", label: "Creative projects" },
  { value: "100%", label: "Client-focused approach" },
  { value: "24h", label: "Response time" },
],
 marqueeItems: [
  "Brand Strategy",
  "Social Media",
  "Meme Marketing",
  "Content Creation",
  "UGC Content",
  "Performance Marketing",
  "Creative Campaigns",
  "Web Design",
  "Creative Direction",
  "Community Building",
],
  servicesEyebrow: "What we do",
  servicesTitle: "Full-stack creative, built for growth",
  servicesDescription:
    "From the first sketch to the final campaign report, we cover every stage of your brand's journey.",
  processEyebrow: "How we work",
  processTitle: "A proven process from idea to impact",
  processSteps: [
    { step: "01", title: "Discover", copy: "We dig into your market, audience and goals to find the real growth levers." },
    { step: "02", title: "Design", copy: "Brand systems, messaging and creative concepts built to stand out and convert." },
    { step: "03", title: "Deploy", copy: "We ship campaigns, content and assets across the channels that matter." },
    { step: "04", title: "Drive", copy: "Continuous testing and reporting so performance compounds month over month." },
  ],
  workEyebrow: "Selected work",
  workTitle: "Projects with a spotlight moment",
  workDescription: "A look at the brands and campaigns we've helped step into the light.",
  testimonialsEyebrow: "Kind words",
  testimonialsTitle: "Trusted by founders and marketing teams",
  ctaTitle: "Ready to step into the spotlight?",
  ctaDescription:
    "Tell us where you want to grow. We'll bring the strategy, creative and execution to get you there.",
  seo: null,
}

function withDefaults(data: SanityHomepage): Homepage {
  return {
    ...fallbackHomepage,
    ...Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== null && v !== undefined),
    ),
    stats: data.stats?.length ? data.stats : fallbackHomepage.stats,
    marqueeItems: data.marqueeItems?.length ? data.marqueeItems : fallbackHomepage.marqueeItems,
    processSteps: data.processSteps?.length ? data.processSteps : fallbackHomepage.processSteps,
    heroPrimaryCta: data.heroPrimaryCta ?? fallbackHomepage.heroPrimaryCta,
    heroSecondaryCta: data.heroSecondaryCta ?? fallbackHomepage.heroSecondaryCta,
    heroImage: data.heroImage ?? null,
    seo: data.seo ?? null,
  } as Homepage
}

export async function getHomepage(): Promise<Homepage> {
  const data = await sanityFetch<SanityHomepage | null>({
    query: homepageQuery,
    tags: ["homepage"],
  })
  if (data) return withDefaults(data)
  return fallbackHomepage
}
