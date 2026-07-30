export type Project = {
  slug: string
  client: string
  title: string
  type: string
  category: string
  services: string[]
  status: string
  year: string
  summary: string
  featured: boolean
  website?: string
  cover: string
  overview?: string
  challenge?: string
  strategy?: string
  gallery?: string[]
  results?: { label: string; value: string }[]
}

export const projectCategories = [
  "All",
  "Social Media",
  "Branding",
  "Campaigns",
  "Website",
]

export const projects: Project[] = [
  {
    slug: "dokanbondhu",
    client: "Dokanbondhu",
    title: "Scaling a business-management platform with content-led growth",
    type: "Growing business-management application",
    category: "Social Media",
    services: [
      "Social Media Marketing",
      "Campaign Strategy",
      "Creative Direction",
      "Content Design",
      "Growth Marketing",
    ],
    status: "Active partnership",
    year: "2026",
    summary:
      "A full-stack growth partnership helping a fast-growing business-management app turn everyday shopkeepers into a loyal, engaged community.",
    featured: true,
    website: "https://www.dokanbondhu.com",
    cover: "/images/projects/dokanbondhu-cover.png",
    overview:
      "Dokanbondhu is a growing business-management application built to help small retailers and shopkeepers run their businesses with confidence. The Backstage Marketing partners with Dokanbondhu as their creative and growth team — owning social presence, campaign strategy and content design as the product scales.",
    challenge:
      "Dokanbondhu had a strong product but an unclear voice. The category is crowded, the audience is practical and time-poor, and generic feature posts were not building trust or driving sign-ups. They needed a brand presence that felt as dependable as the tool itself.",
    strategy:
      "We built a content-led growth system anchored on real shopkeeper problems. Clear pillars — education, product value, community and trust — guide a monthly calendar of short-form video, carousels and testimonials. Campaigns are concept-led and tied to measurable growth goals, with creative direction keeping every asset unmistakably Dokanbondhu.",
    gallery: [
      "/images/projects/dokanbondhu-1.png",
      "/images/projects/dokanbondhu-2.png",
      "/images/projects/dokanbondhu-3.png",
      "/images/projects/dokanbondhu-4.png",
    ],
    results: [
      { label: "Engagement lift", value: "In progress" },
      { label: "Content cadence", value: "Weekly" },
      { label: "Partnership", value: "Active" },
      { label: "Since", value: "2026" },
    ],
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProject() {
  return projects.find((p) => p.featured) ?? projects[0]
}
