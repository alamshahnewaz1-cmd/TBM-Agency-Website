import { sanityFetch } from "@/sanity/lib/fetch"
import { servicesQuery } from "@/sanity/lib/queries"
import { imageUrl } from "@/sanity/lib/image"
import { resolveIcon } from "@/lib/icon-map"

import type {
  Service,
  ServiceInquiryField,
  ServiceInquiryFieldType,
  ServiceSubService,
  SanityImageRef,
  Seo,
} from "@/lib/types"

import { services as fallbackServices } from "@/lib/services"

const DEFAULT_BUDGET_OPTIONS = [
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000+",
  "Not sure yet",
]

type SanityInquiryField = {
  label: string
  name: string
  fieldType: ServiceInquiryFieldType

  placeholder?: string
  required?: boolean
  options?: string[]
  helpText?: string
  displayOrder?: number
}

type SanitySubService = {
  name: string
  slug: string
  summary: string

  pricePrefix?: string
  startingPrice?: string
  priceSuffix?: string
  pricingNote?: string

  deliverables?: string[]

  featured?: boolean
  displayOrder?: number

  inquiryButtonText?: string

  useCustomInquiryForm?: boolean

  inquiryTitle?: string
  inquiryDescription?: string
  inquirySubmitText?: string
  inquirySuccessMessage?: string
  inquiryFields?: SanityInquiryField[]
}

type SanityService = {
  slug: string
  title: string
  tagline: string
  icon?: string
  summary: string
  description: string

  coverImage?: SanityImageRef

  pricePrefix?: string
  startingPrice?: string
  priceSuffix?: string
  pricingNote?: string

  subServices?: SanitySubService[]

  forWho: string
  deliverables?: string[]
  outcomes?: string[]

  inquiryTitle?: string
  inquiryDescription?: string
  inquiryButtonText?: string
  inquirySubmitText?: string
  inquirySuccessMessage?: string

  showNameField?: boolean
  showEmailField?: boolean
  showPhoneField?: boolean
  showCompanyField?: boolean
  showBudgetField?: boolean
  showMessageField?: boolean

  budgetOptions?: string[]
  inquiryFields?: SanityInquiryField[]

  featured?: boolean
  displayOrder?: number

  seo?: Seo
}

function mapInquiryField(
  field: SanityInquiryField,
): ServiceInquiryField {
  return {
    label: field.label,
    name: field.name,
    fieldType: field.fieldType,

    placeholder: field.placeholder,
    required: field.required ?? false,
    options: field.options ?? [],
    helpText: field.helpText,
    displayOrder: field.displayOrder ?? 0,
  }
}

function mapSubService(
  subService: SanitySubService,
): ServiceSubService {
  return {
    name: subService.name,
    slug: subService.slug,
    summary: subService.summary,

    pricePrefix: subService.pricePrefix,
    startingPrice: subService.startingPrice,
    priceSuffix: subService.priceSuffix,
    pricingNote: subService.pricingNote,

    deliverables: subService.deliverables ?? [],

    featured: subService.featured ?? false,
    displayOrder: subService.displayOrder ?? 0,

    inquiryButtonText:
      subService.inquiryButtonText ?? "Get a quote",

    useCustomInquiryForm:
      subService.useCustomInquiryForm ?? false,

    inquiryTitle: subService.inquiryTitle,
    inquiryDescription: subService.inquiryDescription,
    inquirySubmitText: subService.inquirySubmitText,
    inquirySuccessMessage:
      subService.inquirySuccessMessage,

    inquiryFields:
      subService.inquiryFields?.map(mapInquiryField),
  }
}

function mapService(
  service: SanityService,
): Service {
  return {
    slug: service.slug,
    title: service.title,
    tagline: service.tagline,
    summary: service.summary,
    description: service.description,

    icon: resolveIcon(service.icon),
    coverImage: service.coverImage ?? null,

    /* Pricing */
    pricePrefix: service.pricePrefix,
    startingPrice: service.startingPrice,
    priceSuffix: service.priceSuffix,
    pricingNote: service.pricingNote,

    /* Sub-services */
    subServices:
      service.subServices?.map(mapSubService) ?? [],

    /* Details */
    forWho: service.forWho,
    deliverables: service.deliverables ?? [],
    outcomes: service.outcomes ?? [],

    /* Inquiry copy */
    inquiryTitle:
      service.inquiryTitle ??
      "Interested in this service?",

    inquiryDescription:
      service.inquiryDescription ??
      "Tell us about your project and we’ll recommend the right approach.",

    inquiryButtonText:
      service.inquiryButtonText ?? "Get a quote",

    inquirySubmitText:
      service.inquirySubmitText ?? "Send inquiry",

    inquirySuccessMessage:
      service.inquirySuccessMessage ??
      "Thanks for reaching out. We’ve received your inquiry and will get back to you shortly.",

    /*
     * Existing Sanity documents were created before these switches existed.
     *
     * undefined therefore means ON.
     *
     * Only an explicitly saved false value hides a field.
     */
    showNameField:
      service.showNameField ?? true,

    showEmailField:
      service.showEmailField ?? true,

    showPhoneField:
      service.showPhoneField ?? true,

    showCompanyField:
      service.showCompanyField ?? true,

    showBudgetField:
      service.showBudgetField ?? true,

    showMessageField:
      service.showMessageField ?? true,

    budgetOptions:
      service.budgetOptions &&
      service.budgetOptions.length > 0
        ? service.budgetOptions
        : DEFAULT_BUDGET_OPTIONS,

    inquiryFields:
      service.inquiryFields?.map(mapInquiryField) ?? [],

    /* Settings */
    featured: service.featured ?? false,
    displayOrder: service.displayOrder ?? 0,

    seo: service.seo ?? null,
  }
}

/* ------------------------------------------------------------------ */
/* Resolved inquiry configuration                                     */
/* ------------------------------------------------------------------ */

export type ResolvedServiceInquiry = {
  serviceTitle: string
  serviceSlug: string

  subServiceTitle?: string
  subServiceSlug?: string

  title: string
  description: string
  buttonText: string
  submitText: string
  successMessage: string

  showNameField: boolean
  showEmailField: boolean
  showPhoneField: boolean
  showCompanyField: boolean
  showBudgetField: boolean
  showMessageField: boolean

  budgetOptions: string[]
  fields: ServiceInquiryField[]
}

/**
 * Builds the exact form configuration that should be shown to the visitor.
 *
 * Main service:
 *   Uses the service's inquiry form.
 *
 * Sub-service without a custom form:
 *   Inherits the main service form.
 *
 * Sub-service with a custom form:
 *   Keeps the parent's core contact fields and budget settings,
 *   but can replace the heading, description, submit copy,
 *   success message and custom questions.
 */
export function resolveServiceInquiry(
  service: Service,
  subService?: ServiceSubService,
): ResolvedServiceInquiry {
  const useCustomForm =
    Boolean(
      subService?.useCustomInquiryForm,
    )

  const title =
    useCustomForm
      ? subService?.inquiryTitle ||
        service.inquiryTitle ||
        "Interested in this service?"
      : service.inquiryTitle ||
        "Interested in this service?"

  const description =
    useCustomForm
      ? subService?.inquiryDescription ||
        service.inquiryDescription ||
        "Tell us about your project and we’ll recommend the right approach."
      : service.inquiryDescription ||
        "Tell us about your project and we’ll recommend the right approach."

  const submitText =
    useCustomForm
      ? subService?.inquirySubmitText ||
        service.inquirySubmitText ||
        "Send inquiry"
      : service.inquirySubmitText ||
        "Send inquiry"

  const successMessage =
    useCustomForm
      ? subService?.inquirySuccessMessage ||
        service.inquirySuccessMessage ||
        "Thanks for reaching out. We’ve received your inquiry and will get back to you shortly."
      : service.inquirySuccessMessage ||
        "Thanks for reaching out. We’ve received your inquiry and will get back to you shortly."

  /*
   * A custom sub-service form replaces only the custom questions.
   * Core contact fields still inherit from the parent service.
   */
  const fields =
    useCustomForm
      ? subService?.inquiryFields ?? []
      : service.inquiryFields ?? []

  return {
    serviceTitle: service.title,
    serviceSlug: service.slug,

    subServiceTitle: subService?.name,
    subServiceSlug: subService?.slug,

    title,
    description,

    buttonText:
      subService?.inquiryButtonText ||
      service.inquiryButtonText ||
      "Get a quote",

    submitText,
    successMessage,

    /*
     * !== false also protects bundled fallback content,
     * where these newer properties may not exist yet.
     */
    showNameField:
      service.showNameField !== false,

    showEmailField:
      service.showEmailField !== false,

    showPhoneField:
      service.showPhoneField !== false,

    showCompanyField:
      service.showCompanyField !== false,

    showBudgetField:
      service.showBudgetField !== false,

    showMessageField:
      service.showMessageField !== false,

    budgetOptions:
      service.budgetOptions &&
      service.budgetOptions.length > 0
        ? service.budgetOptions
        : DEFAULT_BUDGET_OPTIONS,

    fields,
  }
}

/* ------------------------------------------------------------------ */
/* Data access                                                        */
/* ------------------------------------------------------------------ */

/**
 * All services.
 * Sanity CMS is the primary source, with bundled content as fallback.
 */
export async function getServices(): Promise<Service[]> {
  const data =
    await sanityFetch<SanityService[]>({
      query: servicesQuery,
      tags: ["service"],
    })

  if (data && data.length > 0) {
    return data.map(mapService)
  }

  return fallbackServices as unknown as Service[]
}

/**
 * A single service by slug.
 */
export async function getService(
  slug: string,
): Promise<Service | undefined> {
  const all = await getServices()

  return all.find(
    (service) => service.slug === slug,
  )
}

export { imageUrl }