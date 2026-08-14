import { sanityFetch } from "@/sanity/lib/fetch"
import { servicesPageQuery } from "@/sanity/lib/queries"

import type {
  ServiceInquiryField,
  ServiceInquiryFieldType,
  ServicesPage,
  Seo,
} from "@/lib/types"

const DEFAULT_BUDGET_OPTIONS = [
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000+",
  "Not sure yet",
]

const DEFAULT_SERVICES_PAGE: ServicesPage = {
  heroEyebrow: "Our services",

  heroTitle:
    "Everything your brand needs, under one roof",

  heroDescription:
    "Choose a major service, explore the individual services inside it, and enquire directly about exactly what your business needs.",

  bestForLabel: "Best for",
  deliverablesLabel: "What you get",
  outcomesLabel: "Outcomes",
  subServicesEyebrow: "Available services",
  subServicesTitle: "Choose what you need",
  serviceInquiryEyebrow: "Enquire",

  generalInquiryTitle:
    "Not sure which service you need?",

  generalInquiryDescription:
    "Tell us about your business, your goals and your budget. We’ll help you work out the right mix of services.",

  generalInquiryButtonText:
    "Make a general inquiry",

  generalInquiryFormTitle:
    "Tell us what your business needs",

  generalInquiryFormDescription:
    "You don’t need to know exactly which service is right for you. Tell us what you’re trying to achieve and we’ll recommend the best approach.",

  generalInquirySubmitText:
    "Send inquiry",

  generalInquirySuccessMessage:
    "Thanks for reaching out. We’ve received your inquiry and will get back to you shortly.",

  showNameField: true,
  showEmailField: true,
  showPhoneField: true,
  showCompanyField: true,
  showBudgetField: true,
  showMessageField: true,

  budgetOptions: DEFAULT_BUDGET_OPTIONS,

  inquiryFields: [],

  seo: null,
}

type SanityInquiryField = {
  label?: string
  name?: string
  fieldType?: ServiceInquiryFieldType

  placeholder?: string
  required?: boolean
  options?: string[]
  helpText?: string
  displayOrder?: number
}

type SanityServicesPage = {
  heroEyebrow?: string
  heroTitle?: string
  heroDescription?: string

  bestForLabel?: string
  deliverablesLabel?: string
  outcomesLabel?: string
  subServicesEyebrow?: string
  subServicesTitle?: string
  serviceInquiryEyebrow?: string

  generalInquiryTitle?: string
  generalInquiryDescription?: string
  generalInquiryButtonText?: string

  generalInquiryFormTitle?: string
  generalInquiryFormDescription?: string
  generalInquirySubmitText?: string
  generalInquirySuccessMessage?: string

  showNameField?: boolean
  showEmailField?: boolean
  showPhoneField?: boolean
  showCompanyField?: boolean
  showBudgetField?: boolean
  showMessageField?: boolean

  budgetOptions?: string[]
  inquiryFields?: SanityInquiryField[]

  seo?: Seo
}

function mapInquiryField(
  field: SanityInquiryField,
): ServiceInquiryField | null {
  if (
    !field.label ||
    !field.name ||
    !field.fieldType
  ) {
    return null
  }

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

function mapServicesPage(
  page: SanityServicesPage,
): ServicesPage {
  const inquiryFields =
    page.inquiryFields
      ?.map(mapInquiryField)
      .filter(
        (
          field,
        ): field is ServiceInquiryField =>
          Boolean(field),
      ) ?? []

  return {
    heroEyebrow:
      page.heroEyebrow ||
      DEFAULT_SERVICES_PAGE.heroEyebrow,

    heroTitle:
      page.heroTitle ||
      DEFAULT_SERVICES_PAGE.heroTitle,

    heroDescription:
      page.heroDescription ||
      DEFAULT_SERVICES_PAGE.heroDescription,

    bestForLabel:
      page.bestForLabel ||
      DEFAULT_SERVICES_PAGE.bestForLabel,

    deliverablesLabel:
      page.deliverablesLabel ||
      DEFAULT_SERVICES_PAGE.deliverablesLabel,

    outcomesLabel:
      page.outcomesLabel ||
      DEFAULT_SERVICES_PAGE.outcomesLabel,

    subServicesEyebrow:
      page.subServicesEyebrow ||
      DEFAULT_SERVICES_PAGE.subServicesEyebrow,

    subServicesTitle:
      page.subServicesTitle ||
      DEFAULT_SERVICES_PAGE.subServicesTitle,

    serviceInquiryEyebrow:
      page.serviceInquiryEyebrow ||
      DEFAULT_SERVICES_PAGE.serviceInquiryEyebrow,

    generalInquiryTitle:
      page.generalInquiryTitle ||
      DEFAULT_SERVICES_PAGE.generalInquiryTitle,

    generalInquiryDescription:
      page.generalInquiryDescription ||
      DEFAULT_SERVICES_PAGE.generalInquiryDescription,

    generalInquiryButtonText:
      page.generalInquiryButtonText ||
      DEFAULT_SERVICES_PAGE.generalInquiryButtonText,

    generalInquiryFormTitle:
      page.generalInquiryFormTitle ||
      DEFAULT_SERVICES_PAGE.generalInquiryFormTitle,

    generalInquiryFormDescription:
      page.generalInquiryFormDescription ||
      DEFAULT_SERVICES_PAGE.generalInquiryFormDescription,

    generalInquirySubmitText:
      page.generalInquirySubmitText ||
      DEFAULT_SERVICES_PAGE.generalInquirySubmitText,

    generalInquirySuccessMessage:
      page.generalInquirySuccessMessage ||
      DEFAULT_SERVICES_PAGE.generalInquirySuccessMessage,

    /*
     * Existing singleton documents may not yet have
     * these booleans populated.
     *
     * undefined therefore means ON.
     */
    showNameField:
      page.showNameField ?? true,

    showEmailField:
      page.showEmailField ?? true,

    showPhoneField:
      page.showPhoneField ?? true,

    showCompanyField:
      page.showCompanyField ?? true,

    showBudgetField:
      page.showBudgetField ?? true,

    showMessageField:
      page.showMessageField ?? true,

    budgetOptions:
      page.budgetOptions &&
      page.budgetOptions.length > 0
        ? page.budgetOptions
        : DEFAULT_BUDGET_OPTIONS,

    inquiryFields,

    seo:
      page.seo ?? null,
  }
}

/**
 * Services page CMS content.
 *
 * Sanity is the primary source.
 * Defaults keep the page fully functional even if
 * the singleton hasn't been populated yet.
 */
export async function getServicesPage(): Promise<ServicesPage> {
  const data =
    await sanityFetch<SanityServicesPage | null>({
      query: servicesPageQuery,
      tags: ["servicesPage"],
    })

  if (!data) {
    return DEFAULT_SERVICES_PAGE
  }

  return mapServicesPage(data)
}

export {
  DEFAULT_BUDGET_OPTIONS,
  DEFAULT_SERVICES_PAGE,
}