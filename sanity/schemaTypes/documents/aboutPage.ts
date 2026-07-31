import { Users } from "lucide-react"
import { defineField, defineType } from "sanity"

import { ICON_OPTIONS } from "@/sanity/lib/iconOptions"

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: Users,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "story", title: "Story" },
    { name: "values", title: "Values" },
    { name: "cta", title: "CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "heroEyebrow", title: "Hero eyebrow", type: "string", group: "hero" }),
    defineField({ name: "heroTitle", title: "Hero title", type: "string", group: "hero" }),
    defineField({ name: "heroDescription", title: "Hero description", type: "text", rows: 3, group: "hero" }),

    defineField({ name: "storyEyebrow", title: "Story eyebrow", type: "string", group: "story" }),
    defineField({ name: "storyTitle", title: "Story title", type: "string", group: "story" }),
    defineField({
      name: "storyParagraphs",
      title: "Story paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      group: "story",
    }),
    defineField({
      name: "milestones",
      title: "Milestones",
      type: "array",
      group: "story",
      of: [
        {
          type: "object",
          fields: [
            { name: "year", title: "Label", type: "string" },
            { name: "copy", title: "Copy", type: "text", rows: 2 },
          ],
          preview: { select: { title: "year", subtitle: "copy" } },
        },
      ],
    }),

    defineField({ name: "valuesEyebrow", title: "Values eyebrow", type: "string", group: "values" }),
    defineField({ name: "valuesTitle", title: "Values title", type: "string", group: "values" }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      group: "values",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: ICON_OPTIONS },
            },
            { name: "title", title: "Title", type: "string" },
            { name: "copy", title: "Copy", type: "text", rows: 2 },
          ],
          preview: { select: { title: "title", subtitle: "copy" } },
        },
      ],
    }),

    defineField({ name: "ctaTitle", title: "CTA title", type: "string", group: "cta" }),
    defineField({ name: "ctaDescription", title: "CTA description", type: "text", rows: 2, group: "cta" }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare: () => ({ title: "About Page" }),
  },
})
