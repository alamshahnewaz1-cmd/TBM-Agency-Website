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
      name: "pricing",
      title: "Pricing",
    },
    {
      name: "subServices",
      title: "Sub-services",
    },
    {
      name: "details",
      title: "Details",
    },
    {
      name: "inquiry",
      title: "Inquiry",
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
      name: "pricePrefix",
      title: "Price prefix",
      type: "string",
      group: "pricing",
      initialValue: "From",
      description:
        'For example: "From", "Starting from", or leave blank.',
    }),

    defineField({
      name: "startingPrice",
      title: "Starting price",
      type: "string",
      group: "pricing",
      description:
        'For example: "$499". Keep the currency symbol here.',
    }),

    defineField({
      name: "priceSuffix",
      title: "Price suffix",
      type: "string",
      group: "pricing",
      description:
        'Optional. For example: "/month", "/project", or "+ GST".',
    }),

    defineField({
      name: "pricingNote",
      title: "Pricing note",
      type: "text",
      rows: 2,
      group: "pricing",
      description:
        "Optional short note such as “Final pricing depends on scope and complexity.”",
    }),

    defineField({
      name: "subServices",
      title: "Sub-services",
      type: "array",
      group: "subServices",
      description:
        "Add the individual services available under this major service.",
      of: [
        {
          type: "object",
          name: "subService",
          title: "Sub-service",

          fields: [
            defineField({
              name: "name",
              title: "Sub-service name",
              type: "string",
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: "slug",
              title: "Slug",
              type: "slug",
              options: {
                source: "name",
                maxLength: 96,
              },
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: "summary",
              title: "Short description",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: "pricePrefix",
              title: "Price prefix",
              type: "string",
              initialValue: "From",
              description:
                'For example: "From", "Starting from", or leave blank.',
            }),

            defineField({
              name: "startingPrice",
              title: "Starting price",
              type: "string",
              description:
                'For example: "$499".',
            }),

            defineField({
              name: "priceSuffix",
              title: "Price suffix",
              type: "string",
              description:
                'Optional. For example: "/month" or "/project".',
            }),

            defineField({
              name: "pricingNote",
              title: "Pricing note",
              type: "string",
              description:
                "Optional short pricing disclaimer.",
            }),

            defineField({
              name: "deliverables",
              title: "What is included",
              type: "array",
              of: [
                {
                  type: "string",
                },
              ],
            }),

            defineField({
              name: "featured",
              title: "Featured sub-service",
              type: "boolean",
              initialValue: false,
            }),

            defineField({
              name: "displayOrder",
              title: "Display order",
              type: "number",
              initialValue: 0,
              validation: (rule) =>
                rule.integer().min(0),
            }),

            defineField({
              name: "inquiryButtonText",
              title: "Inquiry button text",
              type: "string",
              initialValue: "Get a quote",
              description:
                'For example: "Get a quote", "Enquire now", or "Start a project".',
            }),
          ],

          preview: {
            select: {
              title: "name",
              pricePrefix: "pricePrefix",
              startingPrice: "startingPrice",
              priceSuffix: "priceSuffix",
            },

            prepare({
              title,
              pricePrefix,
              startingPrice,
              priceSuffix,
            }) {
              const price = startingPrice
                ? [
                    pricePrefix,
                    startingPrice,
                    priceSuffix,
                  ]
                    .filter(Boolean)
                    .join(" ")
                : "No price set"

              return {
                title: title || "Untitled sub-service",
                subtitle: price,
              }
            },
          },
        },
      ],
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
      name: "inquiryTitle",
      title: "Inquiry heading",
      type: "string",
      group: "inquiry",
      initialValue: "Interested in this service?",
      description:
        "Shown above the inquiry form or quote button for this service.",
    }),

    defineField({
      name: "inquiryDescription",
      title: "Inquiry description",
      type: "text",
      rows: 3,
      group: "inquiry",
      initialValue:
        "Tell us about your project and we’ll recommend the right approach.",
    }),

    defineField({
      name: "inquiryButtonText",
      title: "Inquiry button text",
      type: "string",
      group: "inquiry",
      initialValue: "Get a quote",
    }),

    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      group: "settings",
      description:
        "Lower numbers appear first. Use 1, 2, 3 and so on.",
      initialValue: 0,
      validation: (rule) =>
        rule.required().integer().min(0),
    }),

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "settings",
      description:
        "Mark this service as featured for highlighted sections.",
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
      pricePrefix: "pricePrefix",
      startingPrice: "startingPrice",
      priceSuffix: "priceSuffix",
    },

    prepare({
      title,
      subtitle,
      media,
      displayOrder,
      pricePrefix,
      startingPrice,
      priceSuffix,
    }) {
      const orderPrefix =
        typeof displayOrder === "number"
          ? `${displayOrder}. `
          : ""

      const price = startingPrice
        ? [
            pricePrefix,
            startingPrice,
            priceSuffix,
          ]
            .filter(Boolean)
            .join(" ")
        : ""

      const subtitleParts = [
        subtitle || "No tagline",
        price,
      ].filter(Boolean)

      return {
        title: title || "Untitled service",
        subtitle: `${orderPrefix}${subtitleParts.join(" · ")}`,
        media,
      }
    },
  },
})