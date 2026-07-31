import { sanityFetch } from "@/sanity/lib/fetch"
import { aboutPageQuery } from "@/sanity/lib/queries"
import type { AboutPage, Seo } from "@/lib/types"

type SanityAboutPage = Omit<AboutPage, "seo"> & { seo?: Seo }

/**
 * Fallback About content — mirrors exactly what was previously hardcoded in
 * app/about/page.tsx (including the {site.name} interpolation resolved to the
 * default company name).
 */
export const fallbackAbout: AboutPage = {
  heroEyebrow: "About us",
  heroTitle: "The team working backstage on your brand",
  heroDescription:
    "The Backstage Marketing exists to do the unglamorous, essential work that makes brands look effortless in the spotlight — the strategy, the systems and the craft behind every standout moment.",
  storyEyebrow: "Our story",
  storyTitle: "Built for the brands you notice",
  storyParagraphs: [
    "The best performances look easy — but they're the result of relentless preparation happening out of sight. We named ourselves The Backstage Marketing because that's exactly where we thrive: behind the scenes, doing the deep work that turns a good brand into an unforgettable one.",
    "We're a compact, senior team of strategists, designers and marketers. That means you get the people who actually do the work — no layers, no hand-offs, no diluted ideas. Just focused craft and a partner genuinely invested in your growth.",
  ],
  milestones: [
    { year: "The start", copy: "Founded on a simple belief: great brands are built backstage, long before the spotlight hits." },
    { year: "The work", copy: "Partnered with founders and teams across retail, tech and services to build brands that grow." },
    { year: "The now", copy: "A tight creative unit delivering strategy, design and performance under one roof." },
  ],
  valuesEyebrow: "What we value",
  valuesTitle: "The principles behind every project",
  values: [
    { icon: "Target", title: "Strategy first", copy: "Every design and campaign traces back to a clear objective. No pretty work without a purpose." },
    { icon: "Sparkles", title: "Craft obsessed", copy: "Details compound. We sweat the small things so the finished work feels effortless." },
    { icon: "HeartHandshake", title: "True partners", copy: "We work like an extension of your team — invested, honest and in it for the long game." },
    { icon: "Lightbulb", title: "Ideas that move", copy: "Creativity is only as good as the result it drives. We chase impact, not applause." },
  ],
  ctaTitle: "Let's build something worth watching",
  ctaDescription:
    "Whether you're starting fresh or scaling up, we'd love to hear what you're working on.",
  seo: null,
}

export async function getAboutPage(): Promise<AboutPage> {
  const data = await sanityFetch<SanityAboutPage | null>({
    query: aboutPageQuery,
    tags: ["aboutPage"],
  })
  if (!data) return fallbackAbout

  return {
    ...fallbackAbout,
    ...Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== null && v !== undefined),
    ),
    storyParagraphs: data.storyParagraphs?.length ? data.storyParagraphs : fallbackAbout.storyParagraphs,
    milestones: data.milestones?.length ? data.milestones : fallbackAbout.milestones,
    values: data.values?.length ? data.values : fallbackAbout.values,
    seo: data.seo ?? null,
  } as AboutPage
}
