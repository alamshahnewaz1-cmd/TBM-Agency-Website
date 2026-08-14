import { FileText } from "lucide-react"
import { defineField, defineType } from "sanity"

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  icon: FileText,

  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "publishing",
      title: "Publishing",
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
      title: "Article title",
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "Short summary shown on the Blog page, article cards and search results.",
      validation: (rule) => rule.required().max(300),
    }),

    defineField({
      name: "cover",
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
            "Describe the image briefly for accessibility and search engines.",
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "body",
      title: "Article body",
      type: "array",
      group: "content",
      of: [
        {
          type: "block",

          styles: [
            {
              title: "Normal",
              value: "normal",
            },
            {
              title: "Heading",
              value: "h2",
            },
            {
              title: "Subheading",
              value: "h3",
            },
            {
              title: "Quote",
              value: "blockquote",
            },
          ],

          lists: [
            {
              title: "Bullet list",
              value: "bullet",
            },
            {
              title: "Numbered list",
              value: "number",
            },
          ],

          marks: {
            decorators: [
              {
                title: "Bold",
                value: "strong",
              },
              {
                title: "Italic",
                value: "em",
              },
            ],

            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",

                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",

                    validation: (rule) =>
                      rule.uri({
                        scheme: ["http", "https", "mailto"],
                      }),
                  }),
                ],
              },
            ],
          },
        },

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
            }),

            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],

      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "publishing",

      to: [
        {
          type: "author",
        },
      ],

      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "publishing",

      to: [
        {
          type: "category",
        },
      ],

      options: {
        filter: 'appliesTo match "blog"',
      },

      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "publishing",

      of: [
        {
          type: "string",
        },
      ],

      options: {
        layout: "tags",
      },

      description:
        "Optional keywords used to organise and relate articles.",
    }),

    defineField({
      name: "publishedAt",
      title: "Publish date",
      type: "datetime",
      group: "publishing",

      initialValue: () => new Date().toISOString(),

      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "readingTime",
      title: "Reading time",
      type: "string",
      group: "publishing",

      description:
        'For example: "6 min read".',
    }),

    defineField({
      name: "featured",
      title: "Featured article",
      type: "boolean",
      group: "settings",

      description:
        "Featured articles can be prioritised on the Blog page.",

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
      title: "Newest first",
      name: "publishedAtDesc",

      by: [
        {
          field: "publishedAt",
          direction: "desc",
        },
      ],
    },

    {
      title: "Oldest first",
      name: "publishedAtAsc",

      by: [
        {
          field: "publishedAt",
          direction: "asc",
        },
      ],
    },

    {
      title: "Article title",
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
      category: "category.title",
      author: "author.name",
      date: "publishedAt",
      media: "cover",
    },

    prepare({
      title,
      category,
      author,
      date,
      media,
    }) {
      const meta = [
        category,
        author,
        date
          ? new Date(date).toLocaleDateString("en-AU", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : null,
      ]
        .filter(Boolean)
        .join(" · ")

      return {
        title: title || "Untitled article",
        subtitle: meta || "Blog post",
        media,
      }
    },
  },
})