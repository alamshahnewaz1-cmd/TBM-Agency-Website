import { LayoutGrid } from "lucide-react"
import { defineField, defineType } from "sanity"

import { ICON_OPTIONS } from "@/sanity/lib/iconOptions"

const inquiryField = {
  type: "object",
  name: "inquiryField",
  title: "Inquiry field",

  fields: [
    defineField({
      name: "label",
      title: "Field label",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "name",
      title: "Field key",
      type: "string",
      description:
        'Internal key used when saving the inquiry. Example: "websiteUrl", "productCount", "launchDate".',
      validation: (rule) =>
        rule
          .required()
          .regex(
            /^[a-zA-Z][a-zA-Z0-9_]*$/,
            "Use letters, numbers and underscores only. Start with a letter.",
          ),
    }),

    defineField({
      name: "fieldType",
      title: "Field type",
      type: "string",
      options: {
        list: [
          { title: "Short text", value: "text" },
          { title: "Email", value: "email" },
          { title: "Phone", value: "tel" },
          { title: "Website / URL", value: "url" },
          { title: "Number", value: "number" },
          { title: "Long text", value: "textarea" },
          { title: "Dropdown", value: "select" },
          { title: "Yes / No", value: "boolean" },
        ],
      },
      initialValue: "text",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "placeholder",
      title: "Placeholder",
      type: "string",
      hidden: ({ parent }) =>
        parent?.fieldType === "select" ||
        parent?.fieldType === "boolean",
    }),

    defineField({
      name: "required",
      title: "Required",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "options",
      title: "Dropdown options",
      type: "array",
      of: [{ type: "string" }],
      hidden: ({ parent }) => parent?.fieldType !== "select",
      description:
        "Used only for dropdown fields. Add each option separately.",
    }),

    defineField({
      name: "helpText",
      title: "Help text",
      type: "string",
      description:
        "Optional explanation displayed underneath the field.",
    }),

    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),
  ],

  preview: {
    select: {
      title: "label",
      fieldType: "fieldType",
      required: "required",
    },

    prepare({
      title,
      fieldType,
      required,
    }: {
      title?: string
      fieldType?: string
      required?: boolean
    }) {
      return {
        title: title || "Untitled field",
        subtitle: `${fieldType || "text"}${required ? " · Required" : ""}`,
      }
    },
  },
}

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
    /* -------------------------------------------------------------- */
    /* Content                                                        */
    /* -------------------------------------------------------------- */

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

    /* -------------------------------------------------------------- */
    /* Pricing                                                        */
    /* -------------------------------------------------------------- */

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

    /* -------------------------------------------------------------- */
    /* Sub-services                                                   */
    /* -------------------------------------------------------------- */

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
              of: [{ type: "string" }],
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

            /* ------------------------------------------------------ */
            /* Sub-service custom inquiry form                        */
            /* ------------------------------------------------------ */

            defineField({
              name: "useCustomInquiryForm",
              title: "Use custom inquiry form",
              type: "boolean",
              initialValue: false,
              description:
                "Turn this on if this sub-service needs different questions from the main service form.",
            }),

            defineField({
              name: "inquiryTitle",
              title: "Inquiry form heading",
              type: "string",
              hidden: ({ parent }) =>
                !parent?.useCustomInquiryForm,
            }),

            defineField({
              name: "inquiryDescription",
              title: "Inquiry form description",
              type: "text",
              rows: 3,
              hidden: ({ parent }) =>
                !parent?.useCustomInquiryForm,
            }),

            defineField({
              name: "inquirySubmitText",
              title: "Submit button text",
              type: "string",
              initialValue: "Send inquiry",
              hidden: ({ parent }) =>
                !parent?.useCustomInquiryForm,
            }),

            defineField({
              name: "inquirySuccessMessage",
              title: "Success message",
              type: "text",
              rows: 2,
              hidden: ({ parent }) =>
                !parent?.useCustomInquiryForm,
            }),

            defineField({
              name: "inquiryFields",
              title: "Custom inquiry questions",
              type: "array",
              of: [inquiryField],
              hidden: ({ parent }) =>
                !parent?.useCustomInquiryForm,
              description:
                "Add questions specific to this sub-service.",
            }),
          ],

          preview: {
            select: {
              title: "name",
              pricePrefix: "pricePrefix",
              startingPrice: "startingPrice",
              priceSuffix: "priceSuffix",
              customForm: "useCustomInquiryForm",
            },

            prepare({
              title,
              pricePrefix,
              startingPrice,
              priceSuffix,
              customForm,
            }: {
              title?: string
              pricePrefix?: string
              startingPrice?: string
              priceSuffix?: string
              customForm?: boolean
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
                subtitle: `${price}${customForm ? " · Custom form" : ""}`,
              }
            },
          },
        },
      ],
    }),

    /* -------------------------------------------------------------- */
    /* Details                                                        */
    /* -------------------------------------------------------------- */

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
      of: [{ type: "string" }],
      description:
        "List the main deliverables included with this service.",
      validation: (rule) => rule.min(1),
    }),

    defineField({
      name: "outcomes",
      title: "Expected outcomes",
      type: "array",
      group: "details",
      of: [{ type: "string" }],
      description:
        "List the main benefits or business outcomes.",
      validation: (rule) => rule.min(1),
    }),

    /* -------------------------------------------------------------- */
    /* Inquiry                                                        */
    /* -------------------------------------------------------------- */

    defineField({
      name: "inquiryTitle",
      title: "Inquiry heading",
      type: "string",
      group: "inquiry",
      initialValue: "Interested in this service?",
      description:
        "Shown at the top of this service's inquiry form.",
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
      title: "Open form button text",
      type: "string",
      group: "inquiry",
      initialValue: "Get a quote",
    }),

    defineField({
      name: "inquirySubmitText",
      title: "Submit button text",
      type: "string",
      group: "inquiry",
      initialValue: "Send inquiry",
    }),

    defineField({
      name: "inquirySuccessMessage",
      title: "Success message",
      type: "text",
      rows: 2,
      group: "inquiry",
      initialValue:
        "Thanks for reaching out. We’ve received your inquiry and will get back to you shortly.",
    }),

    defineField({
      name: "showNameField",
      title: "Show name field",
      type: "boolean",
      group: "inquiry",
      initialValue: true,
    }),

    defineField({
      name: "showEmailField",
      title: "Show email field",
      type: "boolean",
      group: "inquiry",
      initialValue: true,
    }),

    defineField({
      name: "showPhoneField",
      title: "Show phone field",
      type: "boolean",
      group: "inquiry",
      initialValue: true,
    }),

    defineField({
      name: "showCompanyField",
      title: "Show business / company field",
      type: "boolean",
      group: "inquiry",
      initialValue: true,
    }),

    defineField({
      name: "showBudgetField",
      title: "Show budget field",
      type: "boolean",
      group: "inquiry",
      initialValue: true,
    }),

    defineField({
      name: "showMessageField",
      title: "Show message field",
      type: "boolean",
      group: "inquiry",
      initialValue: true,
    }),

    defineField({
      name: "budgetOptions",
      title: "Budget options",
      type: "array",
      group: "inquiry",
      of: [{ type: "string" }],
      description:
        "Editable budget ranges displayed in the inquiry form.",
      initialValue: [
        "Under $500",
        "$500 – $1,000",
        "$1,000 – $2,500",
        "$2,500 – $5,000",
        "$5,000+",
        "Not sure yet",
      ],
    }),

    defineField({
      name: "inquiryFields",
      title: "Custom inquiry questions",
      type: "array",
      group: "inquiry",
      of: [inquiryField],
      description:
        "Add questions specific to this service, such as website URL, number of products, platforms, launch date, content volume, or other requirements.",
    }),

    /* -------------------------------------------------------------- */
    /* Settings                                                       */
    /* -------------------------------------------------------------- */

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

    /* -------------------------------------------------------------- */
    /* SEO                                                            */
    /* -------------------------------------------------------------- */

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
    }: {
      title?: string
      subtitle?: string
      media?: unknown
      displayOrder?: number
      pricePrefix?: string
      startingPrice?: string
      priceSuffix?: string
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