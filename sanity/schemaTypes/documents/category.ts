import { Tag } from "lucide-react"
import { defineField, defineType } from "sanity"

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: Tag,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "appliesTo",
      title: "Used for",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Blog posts", value: "blog" },
          { title: "Projects", value: "project" },
        ],
        layout: "grid",
      },
      description: "Which filter bars this category appears in.",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 0,
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
    select: { title: "title", subtitle: "appliesTo" },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: Array.isArray(subtitle) ? subtitle.join(", ") : "",
    }),
  },
})
