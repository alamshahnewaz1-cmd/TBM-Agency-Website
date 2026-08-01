import { LayoutGrid } from "lucide-react"
import { defineField, defineType } from "sanity"

import { ICON_OPTIONS } from "@/sanity/lib/iconOptions"

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: LayoutGrid,

  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "details",
      title: "Details",
    },
    {
      name: "settings",
      title: "Settings",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Service name",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      group: "content",
      options: {
        list: ICON_OPTIONS,
      },
      description:
        "Choose the icon displayed on the homepage and Services page.",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "content",
      description:
        'A short phrase such as “The thinking before the making.”',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "summary",
      title: "Short description",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "Used on the homepage and compact service cards.",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "description",
      title: "Full description",
      type: "text",
      rows: 5,
      group: "content",
      description:
        "The main description shown in the expanded Services section.",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "content",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description:
            "Briefly describe the image for accessibility and search engines.",
        }),
      ],
      description:
        "Optional artwork or photograph for this service.",
    }),

    defineField({
      name: "forWho",
      title: "Best for",
      type: "text",
      rows: 3,
      group: "details",
      description:
        "Describe the type of client or situation this service is designed for.",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "deliverables",
      title: "What you get",
      type: "array",
      group: "details",
      of: [
        {
          type: "string",
        },
      ],
      description:
        "List the main deliverables included with this service.",
      validation: (rule) => rule.min(1),
    }),

    defineField({
      name: "outcomes",
      title: "Expected outcomes",
      type: "array",
      group: "details",
      of: [
        {
          type: "string",
        },
      ],
      description:
        "List the main benefits or business outcomes.",
      validation: (rule) => rule.min(1),
    }),

    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      group: "settings",
      description:
        "Lower numbers appear first. Use 1, 2, 3 and so on.",
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0),
    }),

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "settings",
      description:
        "Mark this service as featured for future highlighted sections.",
      initialValue: false,
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],

  orderings: [
    {
      title: "Display order",
      name: "displayOrderAsc",
      by: [
        {
          field: "displayOrder",
          direction: "asc",
        },
      ],
    },
    {
      title: "Service name",
      name: "titleAsc",
      by: [
        {
          field: "title",
          direction: "asc",
        },
      ],
    },
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "tagline",
      media: "coverImage",
      displayOrder: "displayOrder",
    },

    prepare({
      title,
      subtitle,
      media,
      displayOrder,
    }) {
      const orderPrefix =
        typeof displayOrder === "number"
          ? `${displayOrder}. `
          : ""

      return {
        title: title || "Untitled service",
        subtitle: `${orderPrefix}${subtitle || "No tagline"}`,
        media,
      }
    },
  },
})