import { Cog } from "lucide-react"
import { defineField, defineType } from "sanity"

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: Cog,
  groups: [
    { name: "general", title: "General", default: true },
    { name: "contact", title: "Contact" },
    { name: "navigation", title: "Navigation" },
    { name: "footer", title: "Footer" },
    { name: "seo", title: "Default SEO" },
  ],
  fields: [
    defineField({
      name: "companyName",
      title: "Company name",
      type: "string",
      group: "general",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortName",
      title: "Short name",
      type: "string",
      description: 'e.g. "TBM"',
      group: "general",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      group: "general",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      group: "general",
    }),
    defineField({
      name: "url",
      title: "Website URL",
      type: "url",
      group: "general",
    }),
    defineField({
      name: "email",
      title: "Contact email",
      type: "string",
      group: "contact",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 2,
      group: "contact",
    }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      of: [{ type: "socialLink" }],
      group: "contact",
    }),
    defineField({
      name: "navLinks",
      title: "Navigation links",
      type: "array",
      group: "navigation",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Href", type: "string" },
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
    defineField({
      name: "partners",
      title: "Partners / clients",
      type: "array",
      of: [{ type: "string" }],
      description: "Names shown in the partners strip.",
      group: "general",
    }),
    defineField({
      name: "footerNote",
      title: "Footer note",
      type: "text",
      rows: 2,
      description: "Short paragraph shown in the footer.",
      group: "footer",
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
})
