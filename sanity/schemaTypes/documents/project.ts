import { Briefcase } from "lucide-react"
import { defineField, defineType } from "sanity"

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: Briefcase,

  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "caseStudy",
      title: "Case study",
    },
    {
      name: "media",
      title: "Media",
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
      name: "client",
      title: "Client name",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "title",
      title: "Project headline",
      type: "string",
      group: "content",
      description:
        "The main project title shown on the project and case-study pages.",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: {
        source: "client",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "type",
      title: "Project type",
      type: "string",
      group: "content",
      description:
        'A short descriptor such as “Growing business-management application”.',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "content",
      to: [
        {
          type: "category",
        },
      ],
      options: {
        filter: 'appliesTo match "project"',
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
      group: "content",
      description: "The client’s industry or business sector.",
    }),

    defineField({
      name: "status",
      title: "Project status",
      type: "string",
      group: "content",
      description:
        'For example: “Active partnership”, “In progress” or “Completed”.',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "year",
      title: "Year",
      type: "string",
      group: "content",
      description:
        "The year displayed on project cards and the case-study page.",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "completionDate",
      title: "Completion date",
      type: "date",
      group: "content",
      options: {
        dateFormat: "MMMM YYYY",
      },
    }),

    defineField({
      name: "website",
      title: "Client website",
      type: "url",
      group: "content",
      description:
        "Optional link to the client’s website, application or product.",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"],
        }),
    }),

    defineField({
      name: "summary",
      title: "Project summary",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "The short description used on homepage and Projects-page cards.",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "services",
      title: "Services provided",
      type: "array",
      group: "content",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        layout: "tags",
      },
      description:
        "List the main services delivered for this project.",
      validation: (rule) => rule.min(1),
    }),

    defineField({
      name: "tags",
      title: "Additional tags",
      type: "array",
      group: "content",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        layout: "tags",
      },
      description:
        "Optional internal or public tags related to this project.",
    }),

    defineField({
      name: "overview",
      title: "Overview",
      type: "text",
      rows: 5,
      group: "caseStudy",
      description:
        "Introduce the client, project and overall partnership.",
    }),

    defineField({
      name: "challenge",
      title: "Challenge",
      type: "text",
      rows: 5,
      group: "caseStudy",
      description:
        "Explain the problem, opportunity or business challenge.",
    }),

    defineField({
      name: "strategy",
      title: "Solution and approach",
      type: "text",
      rows: 5,
      group: "caseStudy",
      description:
        "Explain how the team approached and delivered the project.",
    }),

    defineField({
      name: "results",
      title: "Results",
      type: "array",
      group: "caseStudy",
      of: [
        {
          type: "resultItem",
        },
      ],
      description:
        "Add measurable results, achievements or important outcomes.",
    }),

    defineField({
      name: "cover",
      title: "Cover image",
      type: "image",
      group: "media",
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
        "The main image shown on project cards and the case-study header.",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "gallery",
      title: "Project gallery",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              description:
                "Briefly describe this image for accessibility.",
            }),
          ],
        },
      ],
      description:
        "Additional images displayed throughout the case study.",
    }),

    defineField({
      name: "featured",
      title: "Featured project",
      type: "boolean",
      group: "settings",
      description:
        "Featured projects are prioritised on the homepage.",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      group: "settings",
      description:
        "Lower numbers appear first. Use 1, 2, 3 and so on.",
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0),
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
      name: "orderAsc",
      by: [
        {
          field: "order",
          direction: "asc",
        },
      ],
    },
    {
      title: "Newest projects",
      name: "yearDesc",
      by: [
        {
          field: "year",
          direction: "desc",
        },
      ],
    },
    {
      title: "Client name",
      name: "clientAsc",
      by: [
        {
          field: "client",
          direction: "asc",
        },
      ],
    },
  ],

  preview: {
    select: {
      title: "client",
      subtitle: "title",
      media: "cover",
      status: "status",
      order: "order",
    },

    prepare({
      title,
      subtitle,
      media,
      status,
      order,
    }) {
      const orderPrefix =
        typeof order === "number"
          ? `${order}. `
          : ""

      const statusSuffix = status
        ? ` · ${status}`
        : ""

      return {
        title: title || "Untitled project",
        subtitle: `${orderPrefix}${subtitle || "No project headline"}${statusSuffix}`,
        media,
      }
    },
  },
})