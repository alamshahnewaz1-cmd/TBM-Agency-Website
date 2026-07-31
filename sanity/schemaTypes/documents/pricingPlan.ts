import { BadgeDollarSign } from "lucide-react"
import { defineField, defineType } from "sanity"

export const pricingPlan = defineType({
  name: "pricingPlan",
  title: "Pricing Package",
  type: "document",
  icon: BadgeDollarSign,
  fields: [
    defineField({
      name: "name",
      title: "Package name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pricePrefix",
      title: "Price prefix",
      type: "string",
      description: 'e.g. "Starting from", "From", "Starting at".',
      initialValue: "Starting from",
    }),
    defineField({
      name: "startingPrice",
      title: "Starting price",
      type: "string",
      description: 'Example price, not a fixed quote. e.g. "$100", "$250", "$1000".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "features",
      title: "Features list",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "cta",
      title: "CTA button",
      type: "ctaButton",
    }),
    defineField({
      name: "featured",
      title: "Featured package",
      type: "boolean",
      initialValue: false,
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
    select: { title: "name", price: "startingPrice", prefix: "pricePrefix" },
    prepare: ({ title, price, prefix }) => ({
      title,
      subtitle: [prefix, price].filter(Boolean).join(" "),
    }),
  },
})
