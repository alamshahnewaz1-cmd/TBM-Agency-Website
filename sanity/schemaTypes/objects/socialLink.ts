import { defineField, defineType } from "sanity"

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Platform",
      type: "string",
      description: 'e.g. "Instagram", "LinkedIn", "Behance"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      validation: (rule) =>
        rule.required().uri({ scheme: ["http", "https", "mailto"] }),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
})
