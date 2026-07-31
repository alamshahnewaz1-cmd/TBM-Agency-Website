/**
 * Reusable GROQ queries. Kept in one place so projections stay consistent and
 * every consumer benefits from the same field selection. Image assets are
 * projected as raw objects and resolved to URLs in the data-access layer.
 */

import { groq } from "next-sanity"

/* ------------------------------------------------------------------ *
 * Shared fragments
 * ------------------------------------------------------------------ */

const imageFields = /* groq */ `
  "image": { "asset": asset, "hotspot": hotspot, "crop": crop, "alt": alt }
`

const seoFields = /* groq */ `
  seo {
    metaTitle,
    metaDescription,
    "ogImage": ogImage{ ${imageFields} }.image,
    noIndex
  }
`

/* ------------------------------------------------------------------ *
 * Site settings (singleton)
 * ------------------------------------------------------------------ */

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    companyName,
    shortName,
    tagline,
    description,
    email,
    phone,
    address,
    url,
    "logo": logo{ ${imageFields} }.image,
    socials[]{ label, href },
    navLinks[]{ label, href },
    partners,
    footerNote,
    "seo": defaultSeo {
      metaTitle,
      metaDescription,
      "ogImage": ogImage{ ${imageFields} }.image,
      noIndex
    }
  }
`

/* ------------------------------------------------------------------ *
 * Homepage (singleton)
 * ------------------------------------------------------------------ */

export const homepageQuery = groq`
  *[_type == "homepage"][0]{
    heroEyebrow,
    heroTitleLead,
    heroTitleHighlight,
    heroDescription,
    heroPrimaryCta{ label, href },
    heroSecondaryCta{ label, href },
    "heroImage": heroImage{ ${imageFields} }.image,
    heroCardTitle,
    heroCardTagline,
    stats[]{ value, label },
    marqueeItems,
    servicesEyebrow,
    servicesTitle,
    servicesDescription,
    processEyebrow,
    processTitle,
    processSteps[]{ step, title, copy },
    workEyebrow,
    workTitle,
    workDescription,
    testimonialsEyebrow,
    testimonialsTitle,
    ctaTitle,
    ctaDescription,
    ${seoFields}
  }
`

/* ------------------------------------------------------------------ *
 * About page (singleton)
 * ------------------------------------------------------------------ */

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0]{
    heroEyebrow,
    heroTitle,
    heroDescription,
    storyEyebrow,
    storyTitle,
    storyParagraphs,
    milestones[]{ year, copy },
    valuesEyebrow,
    valuesTitle,
    values[]{ icon, title, copy },
    ctaTitle,
    ctaDescription,
    ${seoFields}
  }
`

/* ------------------------------------------------------------------ *
 * Services
 * ------------------------------------------------------------------ */

export const servicesQuery = groq`
  *[_type == "service"] | order(displayOrder asc, title asc){
    "slug": slug.current,
    title,
    tagline,
    icon,
    summary,
    description,
    deliverables,
    forWho,
    outcomes,
    "coverImage": coverImage{ ${imageFields} }.image,
    featured,
    displayOrder
  }
`

/* ------------------------------------------------------------------ *
 * Projects
 * ------------------------------------------------------------------ */

const projectFields = /* groq */ `
  "slug": slug.current,
  client,
  title,
  type,
  category,
  services,
  status,
  year,
  summary,
  featured,
  website,
  "cover": coverImage{ ${imageFields} }.image,
  overview,
  challenge,
  strategy,
  "gallery": gallery[]{ ${imageFields} }.image,
  results[]{ label, value },
  ${seoFields}
`

export const projectsQuery = groq`
  *[_type == "project"] | order(featured desc, year desc, _createdAt desc){
    ${projectFields}
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    ${projectFields}
  }
`

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)]{ "slug": slug.current }
`

/* ------------------------------------------------------------------ *
 * Blog posts
 * ------------------------------------------------------------------ */

const postFields = /* groq */ `
  "slug": slug.current,
  title,
  excerpt,
  "category": coalesce(category->title, "Uncategorised"),
  "author": coalesce(author->name, "The Backstage Marketing"),
  "date": publishDate,
  readingTime,
  "cover": coverImage{ ${imageFields} }.image,
  featured
`

export const postsQuery = groq`
  *[_type == "post"] | order(publishDate desc){
    ${postFields}
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    ${postFields},
    body,
    ${seoFields}
  }
`

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`

export const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $slug] | order(
    select(coalesce(category->title, "") == $category => 0, 1) asc,
    publishDate desc
  )[0...$limit]{
    ${postFields}
  }
`

export const blogCategoriesQuery = groq`
  *[_type == "category"] | order(title asc){ "title": title }
`

/* ------------------------------------------------------------------ *
 * Testimonials
 * ------------------------------------------------------------------ */

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(featured desc, displayOrder asc, _createdAt asc){
    quote,
    name,
    role,
    company,
    rating,
    featured,
    "photo": photo{ ${imageFields} }.image
  }
`

/* ------------------------------------------------------------------ *
 * FAQ
 * ------------------------------------------------------------------ */

export const faqsQuery = groq`
  *[_type == "faq"] | order(displayOrder asc, _createdAt asc){
    question,
    answer,
    category
  }
`

/* ------------------------------------------------------------------ *
 * Team
 * ------------------------------------------------------------------ */

export const teamQuery = groq`
  *[_type == "teamMember"] | order(displayOrder asc, name asc){
    name,
    position,
    bio,
    linkedin,
    email,
    "photo": photo{ ${imageFields} }.image,
    displayOrder
  }
`

/* ------------------------------------------------------------------ *
 * Pricing
 * ------------------------------------------------------------------ */

export const pricingQuery = groq`
  *[_type == "pricingPlan"] | order(displayOrder asc, _createdAt asc){
    name,
    pricePrefix,
    startingPrice,
    description,
    features,
    cta{ label, href },
    featured,
    displayOrder
  }
`

/* ------------------------------------------------------------------ *
 * Partners (from testimonials lib originally) — stored on siteSettings
 * ------------------------------------------------------------------ */

export const partnersQuery = groq`
  *[_type == "siteSettings"][0].partners
`
