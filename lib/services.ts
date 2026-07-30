export type Service = {
  slug: string
  title: string
  tagline: string
  description: string
  deliverables: string[]
  forWho: string
  outcomes: string[]
}

export const services: Service[] = [
  {
    slug: "brand-strategy",
    title: "Brand Strategy",
    tagline: "The thinking before the making.",
    description:
      "We define who you are, who you serve and why you win. Positioning, messaging and a clear strategic foundation that every creative decision can be measured against.",
    deliverables: [
      "Market and competitor research",
      "Positioning and value proposition",
      "Audience personas and insight",
      "Messaging framework and tone of voice",
      "Brand roadmap and priorities",
    ],
    forWho:
      "Founders and teams who feel their brand is inconsistent, unclear or being out-positioned by competitors.",
    outcomes: [
      "A sharp, defensible market position",
      "Messaging your whole team can repeat",
      "A decision-making filter for future work",
    ],
  },
  {
    slug: "brand-identity",
    title: "Brand Identity",
    tagline: "A look that behaves like an asset.",
    description:
      "Logos, type, colour and a full visual system engineered for consistency across every touchpoint — from a phone screen to a storefront.",
    deliverables: [
      "Logo suite and lockups",
      "Colour and typography system",
      "Iconography and graphic language",
      "Brand guidelines document",
      "Social and template kit",
    ],
    forWho:
      "New brands launching with intent, or established brands that have outgrown their current look.",
    outcomes: [
      "Instant recognition across channels",
      "A scalable, reusable design system",
      "Premium perception that supports pricing",
    ],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    tagline: "Show up like the brand you want to be.",
    description:
      "End-to-end social management — strategy, content calendars, publishing, community and reporting — built to grow reach that actually converts.",
    deliverables: [
      "Channel strategy and content pillars",
      "Monthly content calendar",
      "Design and copy for every post",
      "Community management",
      "Monthly performance reporting",
    ],
    forWho:
      "Brands that want a consistent, high-quality social presence without hiring a full in-house team.",
    outcomes: [
      "Consistent, on-brand publishing",
      "Steady audience and engagement growth",
      "A pipeline of leads from social",
    ],
  },
  {
    slug: "content-creation",
    title: "Content Creation",
    tagline: "Stories worth stopping for.",
    description:
      "Photography, short-form video, graphics and copy — produced in themed batches so your channels never run dry and always feel intentional.",
    deliverables: [
      "Content direction and concepts",
      "Short-form video and reels",
      "Photography and graphic design",
      "Copywriting and captions",
      "Batch production shoots",
    ],
    forWho:
      "Teams that struggle to produce enough content, or content that feels off-brand and inconsistent.",
    outcomes: [
      "A reliable library of assets",
      "Higher watch-time and saves",
      "A recognisable content signature",
    ],
  },
  {
    slug: "creative-campaigns",
    title: "Creative Campaigns",
    tagline: "Ideas big enough to be remembered.",
    description:
      "Concept-led campaigns that connect a single idea across social, paid, content and activations — built to earn attention and move numbers.",
    deliverables: [
      "Campaign concept and narrative",
      "Cross-channel creative assets",
      "Launch and rollout plan",
      "Paid and organic integration",
      "Post-campaign analysis",
    ],
    forWho:
      "Brands with a launch, moment or goal that deserves more than another one-off post.",
    outcomes: [
      "A cohesive, memorable campaign",
      "Measurable lifts in awareness",
      "Momentum you can build on",
    ],
  },
  {
    slug: "website-design",
    title: "Website Design",
    tagline: "The home base that converts.",
    description:
      "Fast, responsive, conversion-focused websites designed and built to reflect your brand and turn visitors into inquiries.",
    deliverables: [
      "UX structure and wireframes",
      "Responsive visual design",
      "Development and deployment",
      "SEO and performance setup",
      "Analytics and handover",
    ],
    forWho:
      "Brands whose website no longer matches the quality of their product or ambition.",
    outcomes: [
      "A fast, mobile-first website",
      "Clear paths to conversion",
      "A platform you can grow into",
    ],
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    tagline: "Spend that pays its way.",
    description:
      "Paid media across Meta, Google and beyond — structured, tested and optimised against the metrics that matter to your business.",
    deliverables: [
      "Paid media strategy and setup",
      "Ad creative and copy",
      "Audience and funnel structure",
      "A/B testing and optimisation",
      "Transparent ROAS reporting",
    ],
    forWho:
      "Brands ready to scale demand with measurable, accountable ad spend.",
    outcomes: [
      "Lower cost per acquisition",
      "Predictable, scalable pipeline",
      "Clear reporting on every dollar",
    ],
  },
]

export function getService(slug: string) {
  return services.find((s) => s.slug === slug)
}
