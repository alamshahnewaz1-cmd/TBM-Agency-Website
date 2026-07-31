import { Home } from "lucide-react"
import { defineField, defineType } from "sanity"

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: Home,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "stats", title: "Statistics" },
    { name: "services", title: "Services" },
    { name: "process", title: "Process" },
    { name: "work", title: "Featured work" },
    { name: "testimonials", title: "Testimonials" },
    { name: "blog", title: "Featured blog" },
    { name: "cta", title: "Closing CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // Hero
    defineField({ name: "heroEyebrow", title: "Eyebrow", type: "string", group: "hero" }),
    defineField({
      name: "heroTitleLead",
      title: "Title (lead)",
      type: "string",
      group: "hero",
      description: 'First part of the headline, e.g. "Built backstage."',
    }),
    defineField({
      name: "heroTitleHighlight",
      title: "Title (highlight)",
      type: "string",
      group: "hero",
      description: 'Accent-coloured part, e.g. "Made for the spotlight."',
    }),
    defineField({ name: "heroDescription", title: "Description", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroPrimaryCta", title: "Primary button", type: "ctaButton", group: "hero" }),
    defineField({ name: "heroSecondaryCta", title: "Secondary button", type: "ctaButton", group: "hero" }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description: "Image shown in the hero card. Leave blank to use the logo panel.",
    }),
    defineField({ name: "heroCardTitle", title: "Hero card title", type: "string", group: "hero" }),
    defineField({ name: "heroCardSubtitle", title: "Hero card subtitle", type: "string", group: "hero" }),
    defineField({
      name: "marquee",
      title: "Marquee items",
      type: "array",
      of: [{ type: "string" }],
      group: "hero",
      options: { layout: "tags" },
    }),

    // Statistics
    defineField({
      name: "stats",
      title: "Statistics",
      type: "array",
      of: [{ type: "statItem" }],
      group: "stats",
      validation: (rule) => rule.max(4).warning("The layout is designed for up to 4 stats."),
    }),

    // Services section heading
    defineField({ name: "servicesHeading", title: "Services section heading", type: "sectionHeading", group: "services" }),

    // Process
    defineField({ name: "processEyebrow", title: "Process eyebrow", type: "string", group: "process" }),
    defineField({ name: "processTitle", title: "Process title", type: "string", group: "process" }),
    defineField({
      name: "process",
      title: "Process steps",
      type: "array",
      of: [{ type: "processStep" }],
      group: "process",
    }),

    // Featured work
    defineField({ name: "workHeading", title: "Featured work heading", type: "sectionHeading", group: "work" }),
    defineField({
      name: "featuredProjects",
      title: "Featured projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      group: "work",
      description: "Up to 2 projects shown on the homepage. Leave empty to auto-use the latest.",
      validation: (rule) => rule.max(2),
    }),

    // Testimonials
    defineField({ name: "testimonialsHeading", title: "Testimonials heading", type: "sectionHeading", group: "testimonials" }),
    defineField({
      name: "featuredTestimonials",
      title: "Featured testimonials",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
      group: "testimonials",
      description: "Up to 3 shown on the homepage. Leave empty to auto-use featured testimonials.",
      validation: (rule) => rule.max(3),
    }),

    // Featured blog (optional / future-ready — not rendered by default)
    defineField({
      name: "featuredPosts",
      title: "Featured blog posts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post" }] }],
      group: "blog",
      description:
        "Optional. Reserved for a future homepage blog highlight. Setting these does not change the current layout.",
    }),

    // Closing CTA
    defineField({ name: "ctaTitle", title: "CTA title", type: "string", group: "cta" }),
    defineField({ name: "ctaDescription", title: "CTA description", type: "text", rows: 2, group: "cta" }),
    defineField({ name: "ctaPrimary", title: "CTA primary button", type: "ctaButton", group: "cta" }),
    defineField({ name: "ctaSecondary", title: "CTA secondary button", type: "ctaButton", group: "cta" }),

    // SEO
    defineField({ name: "seo", title: "Homepage SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
})
