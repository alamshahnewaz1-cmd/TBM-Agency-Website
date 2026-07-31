import { Inbox } from "lucide-react"
import { defineField, defineType } from "sanity"

/**
 * Contact form submissions. Written server-side by the contact action so the
 * team has a record of every inquiry inside the Studio, even alongside email.
 */
export const inquiry = defineType({
  name: "inquiry",
  title: "Inquiry",
  type: "document",
  icon: Inbox,
  // Inquiries are created programmatically; keep the editor read-only-ish.
  fields: [
    defineField({ name: "name", title: "Name", type: "string", readOnly: true }),
    defineField({ name: "email", title: "Email", type: "string", readOnly: true }),
    defineField({ name: "company", title: "Company", type: "string", readOnly: true }),
    defineField({ name: "budget", title: "Budget", type: "string", readOnly: true }),
    defineField({ name: "message", title: "Message", type: "text", readOnly: true }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "handled",
      title: "Handled",
      type: "boolean",
      description: "Tick once you've replied.",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "email", handled: "handled" },
    prepare: ({ title, subtitle, handled }) => ({
      title: `${handled ? "✓ " : ""}${title ?? "Inquiry"}`,
      subtitle,
    }),
  },
})
