import type { SchemaTypeDefinition } from "sanity"

// Objects
import { seo } from "./objects/seo"
import { statItem } from "./objects/statItem"
import { resultItem } from "./objects/resultItem"
import { ctaButton } from "./objects/ctaButton"
import { socialLink } from "./objects/socialLink"
import { processStep } from "./objects/processStep"
import { sectionHeading } from "./objects/sectionHeading"

// Documents
import { siteSettings } from "./documents/siteSettings"
import { homepage } from "./documents/homepage"
import { aboutPage } from "./documents/aboutPage"
import { service } from "./documents/service"
import { project } from "./documents/project"
import { post } from "./documents/post"
import { author } from "./documents/author"
import { category } from "./documents/category"
import { teamMember } from "./documents/teamMember"
import { testimonial } from "./documents/testimonial"
import { faq } from "./documents/faq"
import { pricingPlan } from "./documents/pricingPlan"
import { inquiry } from "./documents/inquiry"

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  seo,
  statItem,
  resultItem,
  ctaButton,
  socialLink,
  processStep,
  sectionHeading,
  // Documents
  siteSettings,
  homepage,
  aboutPage,
  service,
  project,
  post,
  author,
  category,
  teamMember,
  testimonial,
  faq,
  pricingPlan,
  inquiry,
]
