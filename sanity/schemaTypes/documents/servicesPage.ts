import { LayoutGrid } from "lucide-react"
import { defineField, defineType } from "sanity"

const generalInquiryField = {
  type: "object",
  name: "generalInquiryField",
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
        'Internal key used when saving the answer. Example: "preferredStartDate" or "mainGoal".',
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
        "Used only for dropdown questions. Add each option separately.",
    }),

    defineField({
      name: "helpText",
      title: "Help text",
      type: "string",
      description:
        "Optional explanation displayed below the field.",
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

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  icon: LayoutGrid,

  groups: [
    {
      name: "page",
      title: "Page",
      default: true,
    },
    {
      name: "labels",
      title: "Labels",
    },
    {
      name: "inquiry",
      title: "General Inquiry",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    /* -------------------------------------------------------------- */
    /* Services page hero                                             */
    /* -------------------------------------------------------------- */

    defineField({
      name: "heroEyebrow",
      title: "Hero eyebrow",
      type: "string",
      group: "page",
      initialValue: "Our services",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "string",
      group: "page",
      initialValue:
        "Everything your brand needs, under one roof",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "heroDescription",
      title: "Hero description",
      type: "text",
      rows: 3,
      group: "page",
      initialValue:
        "Choose a major service, explore the individual services inside it, and enquire directly about exactly what your business needs.",
      validation: (rule) => rule.required(),
    }),

    /* -------------------------------------------------------------- */
    /* Editable page labels                                           */
    /* -------------------------------------------------------------- */

    defineField({
      name: "bestForLabel",
      title: "Best for label",
      type: "string",
      group: "labels",
      initialValue: "Best for",
    }),

    defineField({
      name: "deliverablesLabel",
      title: "Deliverables label",
      type: "string",
      group: "labels",
      initialValue: "What you get",
    }),

    defineField({
      name: "outcomesLabel",
      title: "Outcomes label",
      type: "string",
      group: "labels",
      initialValue: "Outcomes",
    }),

    defineField({
      name: "subServicesEyebrow",
      title: "Sub-services eyebrow",
      type: "string",
      group: "labels",
      initialValue: "Available services",
    }),

    defineField({
      name: "subServicesTitle",
      title: "Sub-services heading",
      type: "string",
      group: "labels",
      initialValue: "Choose what you need",
    }),

    defineField({
      name: "serviceInquiryEyebrow",
      title: "Service inquiry eyebrow",
      type: "string",
      group: "labels",
      initialValue: "Enquire",
    }),

    /* -------------------------------------------------------------- */
    /* General inquiry                                                */
    /* -------------------------------------------------------------- */

    defineField({
      name: "generalInquiryTitle",
      title: "General inquiry heading",
      type: "string",
      group: "inquiry",
      initialValue:
        "Not sure which service you need?",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "generalInquiryDescription",
      title: "General inquiry description",
      type: "text",
      rows: 3,
      group: "inquiry",
      initialValue:
        "Tell us about your business, your goals and your budget. We’ll help you work out the right mix of services.",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "generalInquiryButtonText",
      title: "Open form button text",
      type: "string",
      group: "inquiry",
      initialValue: "Make a general inquiry",
    }),

    defineField({
      name: "generalInquiryFormTitle",
      title: "Form heading",
      type: "string",
      group: "inquiry",
      initialValue:
        "Tell us what your business needs",
    }),

    defineField({
      name: "generalInquiryFormDescription",
      title: "Form description",
      type: "text",
      rows: 3,
      group: "inquiry",
      initialValue:
        "You don’t need to know exactly which service is right for you. Tell us what you’re trying to achieve and we’ll recommend the best approach.",
    }),

    defineField({
      name: "generalInquirySubmitText",
      title: "Submit button text",
      type: "string",
      group: "inquiry",
      initialValue: "Send inquiry",
    }),

    defineField({
      name: "generalInquirySuccessMessage",
      title: "Success message",
      type: "text",
      rows: 2,
      group: "inquiry",
      initialValue:
        "Thanks for reaching out. We’ve received your inquiry and will get back to you shortly.",
    }),

    /* -------------------------------------------------------------- */
    /* Core form fields                                               */
    /* -------------------------------------------------------------- */

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
        "Budget ranges displayed in the general inquiry form.",
      initialValue: [
        "Under $500",
        "$500 – $1,000",
        "$1,000 – $2,500",
        "$2,500 – $5,000",
        "$5,000+",
        "Not sure yet",
      ],
    }),

    /* -------------------------------------------------------------- */
    /* Custom questions                                               */
    /* -------------------------------------------------------------- */

    defineField({
      name: "inquiryFields",
      title: "Custom inquiry questions",
      type: "array",
      group: "inquiry",
      of: [generalInquiryField],
      description:
        "Add questions for people who are not sure which service they need.",
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

  preview: {
    prepare() {
      return {
        title: "Services Page",
        subtitle:
          "Page content and general inquiry form",
      }
    },
  },
})