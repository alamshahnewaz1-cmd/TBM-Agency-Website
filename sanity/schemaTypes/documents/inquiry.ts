import { Inbox } from "lucide-react"
import { defineField, defineType } from "sanity"

export const inquiry = defineType({
  name: "inquiry",
  title: "Inquiry",
  type: "document",
  icon: Inbox,

  groups: [
    {
      name: "inquiry",
      title: "Inquiry",
      default: true,
    },
    {
      name: "answers",
      title: "Custom answers",
    },
    {
      name: "management",
      title: "Management",
    },
  ],

  fields: [
    /* -------------------------------------------------------------- */
    /* Customer                                                       */
    /* -------------------------------------------------------------- */

    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "inquiry",
      readOnly: true,
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "inquiry",
      readOnly: true,
    }),

    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      group: "inquiry",
      readOnly: true,
    }),

    defineField({
      name: "company",
      title: "Business / Company",
      type: "string",
      group: "inquiry",
      readOnly: true,
    }),

    defineField({
      name: "budget",
      title: "Budget",
      type: "string",
      group: "inquiry",
      readOnly: true,
    }),

    /* -------------------------------------------------------------- */
    /* Service context                                                */
    /* -------------------------------------------------------------- */

    defineField({
      name: "inquiryType",
      title: "Inquiry type",
      type: "string",
      group: "inquiry",
      readOnly: true,
      options: {
        list: [
          {
            title: "General inquiry",
            value: "general",
          },
          {
            title: "Major service",
            value: "service",
          },
          {
            title: "Sub-service",
            value: "subService",
          },
        ],
      },
    }),

    defineField({
      name: "service",
      title: "Service",
      type: "string",
      group: "inquiry",
      readOnly: true,
    }),

    defineField({
      name: "serviceSlug",
      title: "Service slug",
      type: "string",
      group: "inquiry",
      readOnly: true,
    }),

    defineField({
      name: "subService",
      title: "Sub-service",
      type: "string",
      group: "inquiry",
      readOnly: true,
    }),

    defineField({
      name: "subServiceSlug",
      title: "Sub-service slug",
      type: "string",
      group: "inquiry",
      readOnly: true,
    }),

    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 5,
      group: "inquiry",
      readOnly: true,
    }),

    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      group: "inquiry",
      readOnly: true,
    }),

    defineField({
      name: "source",
      title: "Source",
      type: "string",
      group: "inquiry",
      readOnly: true,
      description:
        "Where the inquiry was submitted from.",
    }),

    /* -------------------------------------------------------------- */
    /* Dynamic Sanity-configured answers                              */
    /* -------------------------------------------------------------- */

    defineField({
      name: "answers",
      title: "Custom answers",
      type: "array",
      group: "answers",
      readOnly: true,

      of: [
        {
          type: "object",
          name: "inquiryAnswer",
          title: "Answer",

          fields: [
            defineField({
              name: "label",
              title: "Question",
              type: "string",
            }),

            defineField({
              name: "key",
              title: "Field key",
              type: "string",
            }),

            defineField({
              name: "value",
              title: "Answer",
              type: "text",
              rows: 3,
            }),
          ],

          preview: {
            select: {
              title: "label",
              subtitle: "value",
            },

            prepare({
              title,
              subtitle,
            }) {
              return {
                title: title || "Custom answer",
                subtitle:
                  subtitle || "No answer provided",
              }
            },
          },
        },
      ],
    }),

    /* -------------------------------------------------------------- */
    /* Lead management                                                */
    /* -------------------------------------------------------------- */

    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "management",
      initialValue: "new",

      options: {
        list: [
          {
            title: "New",
            value: "new",
          },
          {
            title: "Contacted",
            value: "contacted",
          },
          {
            title: "Qualified",
            value: "qualified",
          },
          {
            title: "Proposal sent",
            value: "proposalSent",
          },
          {
            title: "Won",
            value: "won",
          },
          {
            title: "Closed",
            value: "closed",
          },
        ],
        layout: "radio",
      },

      validation: (rule) =>
        rule.required(),
    }),

    defineField({
      name: "internalNotes",
      title: "Internal notes",
      type: "text",
      rows: 5,
      group: "management",
      description:
        "Private notes for the TBM team. Never shown to the client.",
    }),

    /*
     * Legacy field kept temporarily so any older inquiry documents
     * remain compatible. New workflow should use Status instead.
     */
    defineField({
      name: "handled",
      title: "Legacy handled status",
      type: "boolean",
      group: "management",
      hidden: true,
    }),
  ],

  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [
        {
          field: "submittedAt",
          direction: "desc",
        },
      ],
    },

    {
      title: "Oldest first",
      name: "submittedAtAsc",
      by: [
        {
          field: "submittedAt",
          direction: "asc",
        },
      ],
    },

    {
      title: "Status",
      name: "statusAsc",
      by: [
        {
          field: "status",
          direction: "asc",
        },
        {
          field: "submittedAt",
          direction: "desc",
        },
      ],
    },
  ],

  preview: {
    select: {
      name: "name",
      email: "email",
      company: "company",
      service: "service",
      subService: "subService",
      status: "status",
    },

    prepare({
      name,
      email,
      company,
      service,
      subService,
      status,
    }) {
      const statusLabels: Record<string, string> = {
        new: "NEW",
        contacted: "CONTACTED",
        qualified: "QUALIFIED",
        proposalSent: "PROPOSAL SENT",
        won: "WON",
        closed: "CLOSED",
      }

      const serviceLabel =
        subService ||
        service ||
        "General inquiry"

      const customer =
        company
          ? `${name || "Unknown"} · ${company}`
          : name || "Unknown inquiry"

      return {
        title: `${statusLabels[status] || "NEW"} — ${customer}`,
        subtitle: `${serviceLabel}${email ? ` · ${email}` : ""}`,
      }
    },
  },
})