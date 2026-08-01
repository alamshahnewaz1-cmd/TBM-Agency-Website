import { Home } from "lucide-react"
import { defineField, defineType } from "sanity"

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: Home,

  groups: [
    {
      name: "hero",
      title: "Hero",
      default: true,
    },
    {
      name: "stats",
      title: "Statistics",
    },
    {
      name: "services",
      title: "Services",
    },
    {
      name: "process",
      title: "Process",
    },
    {
      name: "work",
      title: "Featured work",
    },
    {
      name: "testimonials",
      title: "Testimonials",
    },
    {
      name: "cta",
      title: "Closing CTA",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    /* -------------------------------------------------------------- */
    /* Hero                                                           */
    /* -------------------------------------------------------------- */

    defineField({
      name: "heroEyebrow",
      title: "Eyebrow",
      type: "string",
      group: "hero",
      description: 'Small text above the heading, e.g. "Creative growth agency".',
    }),

    defineField({
      name: "heroTitleLead",
      title: "Main heading",
      type: "string",
      group: "hero",
      description: 'First part of the headline, e.g. "Built backstage.".',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "heroTitleHighlight",
      title: "Highlighted heading",
      type: "string",
      group: "hero",
      description:
        'Accent-coloured part of the headline, e.g. "Made for the spotlight.".',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "heroDescription",
      title: "Description",
      type: "text",
      rows: 3,
      group: "hero",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "heroPrimaryCta",
      title: "Primary button",
      type: "ctaButton",
      group: "hero",
    }),

    defineField({
      name: "heroSecondaryCta",
      title: "Secondary button",
      type: "ctaButton",
      group: "hero",
    }),

    defineField({
      name: "heroImage",
      title: "Hero artwork",
      type: "image",
      group: "hero",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alternative text",
          type: "string",
          description:
            "Briefly describe the image for accessibility and search engines.",
        },
      ],
      description:
        "Upload the visual shown in the large homepage hero card. Leave blank to use the Site Settings logo as a fallback.",
    }),

    defineField({
      name: "heroCardTitle",
      title: "Hero card title",
      type: "string",
      group: "hero",
      description: 'For example: "The Backstage Marketing".',
    }),

    defineField({
      name: "heroCardTagline",
      title: "Hero card tagline",
      type: "string",
      group: "hero",
      description: 'For example: "Built backstage. Made for the spotlight.".',
    }),

    defineField({
      name: "marqueeItems",
      title: "Scrolling service names",
      type: "array",
      group: "hero",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        layout: "tags",
      },
      description:
        "Items shown in the scrolling strip underneath the homepage hero.",
    }),

    /* -------------------------------------------------------------- */
    /* Statistics                                                     */
    /* -------------------------------------------------------------- */

    defineField({
      name: "stats",
      title: "Statistics",
      type: "array",
      group: "stats",
      of: [
        {
          type: "statItem",
        },
      ],
      validation: (rule) =>
        rule.max(4).warning("The homepage layout is designed for up to 4 statistics."),
    }),

    /* -------------------------------------------------------------- */
    /* Services                                                       */
    /* -------------------------------------------------------------- */

    defineField({
      name: "servicesEyebrow",
      title: "Section eyebrow",
      type: "string",
      group: "services",
      description: 'For example: "What we do".',
    }),

    defineField({
      name: "servicesTitle",
      title: "Section title",
      type: "string",
      group: "services",
    }),

    defineField({
      name: "servicesDescription",
      title: "Section description",
      type: "text",
      rows: 3,
      group: "services",
    }),

    /* -------------------------------------------------------------- */
    /* Process                                                        */
    /* -------------------------------------------------------------- */

    defineField({
      name: "processEyebrow",
      title: "Section eyebrow",
      type: "string",
      group: "process",
      description: 'For example: "How we work".',
    }),

    defineField({
      name: "processTitle",
      title: "Section title",
      type: "string",
      group: "process",
    }),

    defineField({
      name: "processSteps",
      title: "Process steps",
      type: "array",
      group: "process",
      of: [
        {
          type: "processStep",
        },
      ],
      validation: (rule) =>
        rule.max(4).warning("The homepage layout is designed for up to 4 steps."),
    }),

    /* -------------------------------------------------------------- */
    /* Featured work                                                  */
    /* -------------------------------------------------------------- */

    defineField({
      name: "workEyebrow",
      title: "Section eyebrow",
      type: "string",
      group: "work",
      description: 'For example: "Selected work".',
    }),

    defineField({
      name: "workTitle",
      title: "Section title",
      type: "string",
      group: "work",
    }),

    defineField({
      name: "workDescription",
      title: "Section description",
      type: "text",
      rows: 3,
      group: "work",
    }),

    /* -------------------------------------------------------------- */
    /* Testimonials                                                   */
    /* -------------------------------------------------------------- */

    defineField({
      name: "testimonialsEyebrow",
      title: "Section eyebrow",
      type: "string",
      group: "testimonials",
      description: 'For example: "Kind words".',
    }),

    defineField({
      name: "testimonialsTitle",
      title: "Section title",
      type: "string",
      group: "testimonials",
    }),

    /* -------------------------------------------------------------- */
    /* Closing CTA                                                    */
    /* -------------------------------------------------------------- */

    defineField({
      name: "ctaTitle",
      title: "CTA title",
      type: "string",
      group: "cta",
    }),

    defineField({
      name: "ctaDescription",
      title: "CTA description",
      type: "text",
      rows: 3,
      group: "cta",
    }),

    /* -------------------------------------------------------------- */
    /* SEO                                                            */
    /* -------------------------------------------------------------- */

    defineField({
      name: "seo",
      title: "Homepage SEO",
      type: "seo",
      group: "seo",
    }),
  ],

  preview: {
    prepare: () => ({
      title: "Homepage",
      subtitle: "Edit homepage content and imagery",
    }),
  },
})