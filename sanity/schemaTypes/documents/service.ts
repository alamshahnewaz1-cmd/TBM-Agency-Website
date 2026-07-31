import { LayoutGrid } from "lucide-react"
import { defineField, defineType } from "sanity"

import { ICON_OPTIONS } from "@/sanity/lib/iconOptions"

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: LayoutGrid,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "detail", title: "Details" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Name",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      group: "content",
      options: { list: ICON_OPTIONS },
      description: "Icon shown in cards and section headers.",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "content",
      description: "Short phrase, e.g. “The thinking before the making.”",
    }),
    defineField({
      name: "summary",
      title: "Short description",
      type: "text",
      rows: 2,
      group: "content",
      description: "Used on cards and the homepage.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Full description",
      type: "text",
      rows: 4,
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      description: "Optional image for the service.",
    }),
    defineField({
      name: "forWho",
      title: "Best for",
      type: "text",
      rows: 2,
      group: "detail",
    }),
    defineField({
      name: "deliverables",
      title: "Deliverables (What you get)",
      type: "array",
      of: [{ type: "string" }],
      group: "detail",
    }),
    defineField({
      name: "outcomes",
      title: "Key features / Outcomes",
      type: "array",
      of: [{ type: "string" }],
      group: "detail",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      group: "settings",
      initialValue: 0,
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "settings",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "settings",
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "tagline" },
  },
})
