"use server"

import {
  getService,
  resolveServiceInquiry,
} from "@/lib/data/services"

import {
  getServicesPage,
} from "@/lib/data/services-page"

import { getWriteClient } from "@/sanity/lib/client"

export type ServiceInquiryState = {
  status: "idle" | "success" | "error"
  message: string
  errors?: Record<string, string>
}

const EMAIL_RE =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FORMSUBMIT_ENDPOINT =
  "https://formsubmit.co/ajax/inquiry.tbm@protonmail.com"

function getText(
  formData: FormData,
  key: string,
) {
  return String(
    formData.get(key) ?? "",
  ).trim()
}

function makeAnswerKey(
  fieldName: string,
  index: number,
) {
  return `${fieldName}-${index}-${Date.now()}`
}

type NotificationData = {
  name?: string
  email?: string
  phone?: string
  company?: string
  budget?: string
  service?: string
  subService?: string
  message?: string
  customAnswers?: string
  subject: string
}

async function sendEmailNotification(
  data: NotificationData,
) {
  const controller =
    new AbortController()

  const timeout =
    setTimeout(
      () => controller.abort(),
      15000,
    )

  try {
    await fetch(
      FORMSUBMIT_ENDPOINT,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Accept:
            "application/json",

          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",

          Origin:
            "https://formsubmit.co",

          Referer:
            "https://formsubmit.co/",
        },

        body: JSON.stringify({
          name:
            data.name || "—",

          email:
            data.email || "—",

          phone:
            data.phone || "—",

          company:
            data.company || "—",

          budget:
            data.budget || "—",

          service:
            data.service || "General inquiry",

          sub_service:
            data.subService || "—",

          message:
            data.message || "—",

          custom_answers:
            data.customAnswers || "—",

          _subject:
            data.subject,

          _template:
            "table",

          _captcha:
            "false",

          _replyto:
            data.email || undefined,
        }),

        signal:
          controller.signal,

        cache:
          "no-store",
      },
    )
  } finally {
    clearTimeout(timeout)
  }
}

/* ------------------------------------------------------------------ */
/* Service / sub-service inquiry                                      */
/* ------------------------------------------------------------------ */

export async function submitServiceInquiry(
  _previousState: ServiceInquiryState,
  formData: FormData,
): Promise<ServiceInquiryState> {
  const serviceSlug =
    getText(formData, "serviceSlug")

  const subServiceSlug =
    getText(formData, "subServiceSlug")

  const botTrap =
    getText(formData, "_websiteTrap")

  if (botTrap) {
    return {
      status: "success",
      message:
        "Thanks! We’ve received your inquiry.",
    }
  }

  if (!serviceSlug) {
    return {
      status: "error",
      message:
        "We couldn’t identify the selected service. Please refresh and try again.",
    }
  }

  const service =
    await getService(serviceSlug)

  if (!service) {
    return {
      status: "error",
      message:
        "This service could not be found. Please refresh the page and try again.",
    }
  }

  const subService =
    subServiceSlug
      ? service.subServices?.find(
          (item) =>
            item.slug === subServiceSlug,
        )
      : undefined

  const config =
    resolveServiceInquiry(
      service,
      subService,
    )

  const name =
    getText(formData, "name")

  const email =
    getText(formData, "email")

  const phone =
    getText(formData, "phone")

  const company =
    getText(formData, "company")

  const budget =
    getText(formData, "budget")

  const message =
    getText(formData, "message")

  const errors: Record<string, string> = {}

  if (
    config.showNameField &&
    name.length < 2
  ) {
    errors.name =
      "Please enter your name."
  }

  if (
    config.showEmailField &&
    !EMAIL_RE.test(email)
  ) {
    errors.email =
      "Please enter a valid email address."
  }

  const answers =
    config.fields.map(
      (field, index) => {
        const formKey =
          `custom__${field.name}`

        const value =
          getText(
            formData,
            formKey,
          )

        if (
          field.required &&
          !value
        ) {
          errors[formKey] =
            `${field.label} is required.`
        }

        return {
          _key:
            makeAnswerKey(
              field.name,
              index,
            ),

          _type:
            "inquiryAnswer",

          label:
            field.label,

          key:
            field.name,

          value,
        }
      },
    )

  if (
    Object.keys(errors).length > 0
  ) {
    return {
      status: "error",
      message:
        "Please check the highlighted fields.",
      errors,
    }
  }

  const submittedAt =
    new Date().toISOString()

  try {
    const writeClient =
      getWriteClient()

    await writeClient.create({
      _type: "inquiry",

      name:
        config.showNameField
          ? name
          : undefined,

      email:
        config.showEmailField
          ? email
          : undefined,

      phone:
        config.showPhoneField
          ? phone || undefined
          : undefined,

      company:
        config.showCompanyField
          ? company || undefined
          : undefined,

      budget:
        config.showBudgetField
          ? budget || undefined
          : undefined,

      message:
        config.showMessageField
          ? message || undefined
          : undefined,

      inquiryType:
        subService
          ? "subService"
          : "service",

      service:
        service.title,

      serviceSlug:
        service.slug,

      subService:
        subService?.name,

      subServiceSlug:
        subService?.slug,

      answers,

      submittedAt,

      source:
        "Services page",

      status:
        "new",

      handled:
        false,
    })
  } catch (error) {
    console.error(
      "[Service Inquiry] Sanity save failed:",
      error,
    )

    return {
      status: "error",
      message:
        "We couldn’t save your inquiry right now. Please try again.",
    }
  }

  try {
    const customAnswers =
      answers
        .filter(
          (answer) =>
            Boolean(answer.value),
        )
        .map(
          (answer) =>
            `${answer.label}: ${answer.value}`,
        )
        .join("\n")

    const subjectParts = [
      "New TBM inquiry",
      service.title,
      subService?.name,
    ].filter(Boolean)

    await sendEmailNotification({
      name,
      email,
      phone,
      company,
      budget,

      service:
        service.title,

      subService:
        subService?.name,

      message,

      customAnswers,

      subject:
        subjectParts.join(" — "),
    })
  } catch (error) {
    console.error(
      "[Service Inquiry] Email notification failed:",
      error,
    )
  }

  return {
    status: "success",
    message:
      config.successMessage,
  }
}

/* ------------------------------------------------------------------ */
/* General Services inquiry                                           */
/* ------------------------------------------------------------------ */

export async function submitGeneralServiceInquiry(
  _previousState: ServiceInquiryState,
  formData: FormData,
): Promise<ServiceInquiryState> {
  const botTrap =
    getText(formData, "_websiteTrap")

  if (botTrap) {
    return {
      status: "success",
      message:
        "Thanks! We’ve received your inquiry.",
    }
  }

  /*
   * Reload the Services Page configuration
   * on the server instead of trusting the browser.
   */
  const page =
    await getServicesPage()

  const name =
    getText(formData, "name")

  const email =
    getText(formData, "email")

  const phone =
    getText(formData, "phone")

  const company =
    getText(formData, "company")

  const budget =
    getText(formData, "budget")

  const message =
    getText(formData, "message")

  const errors: Record<string, string> = {}

  if (
    page.showNameField &&
    name.length < 2
  ) {
    errors.name =
      "Please enter your name."
  }

  if (
    page.showEmailField &&
    !EMAIL_RE.test(email)
  ) {
    errors.email =
      "Please enter a valid email address."
  }

  const answers =
    page.inquiryFields.map(
      (field, index) => {
        const formKey =
          `custom__${field.name}`

        const value =
          getText(
            formData,
            formKey,
          )

        if (
          field.required &&
          !value
        ) {
          errors[formKey] =
            `${field.label} is required.`
        }

        return {
          _key:
            makeAnswerKey(
              field.name,
              index,
            ),

          _type:
            "inquiryAnswer",

          label:
            field.label,

          key:
            field.name,

          value,
        }
      },
    )

  if (
    Object.keys(errors).length > 0
  ) {
    return {
      status: "error",
      message:
        "Please check the highlighted fields.",
      errors,
    }
  }

  const submittedAt =
    new Date().toISOString()

  /* -------------------------------------------------------------- */
  /* Save to Sanity                                                 */
  /* -------------------------------------------------------------- */

  try {
    const writeClient =
      getWriteClient()

    await writeClient.create({
      _type: "inquiry",

      name:
        page.showNameField
          ? name
          : undefined,

      email:
        page.showEmailField
          ? email
          : undefined,

      phone:
        page.showPhoneField
          ? phone || undefined
          : undefined,

      company:
        page.showCompanyField
          ? company || undefined
          : undefined,

      budget:
        page.showBudgetField
          ? budget || undefined
          : undefined,

      message:
        page.showMessageField
          ? message || undefined
          : undefined,

      inquiryType:
        "general",

      /*
       * General inquiries intentionally have
       * no service or sub-service assigned yet.
       */
      service:
        undefined,

      serviceSlug:
        undefined,

      subService:
        undefined,

      subServiceSlug:
        undefined,

      answers,

      submittedAt,

      source:
        "Services page — General inquiry",

      status:
        "new",

      handled:
        false,
    })
  } catch (error) {
    console.error(
      "[General Services Inquiry] Sanity save failed:",
      error,
    )

    return {
      status: "error",
      message:
        "We couldn’t save your inquiry right now. Please try again.",
    }
  }

  /* -------------------------------------------------------------- */
  /* Email notification                                             */
  /* -------------------------------------------------------------- */

  try {
    const customAnswers =
      answers
        .filter(
          (answer) =>
            Boolean(answer.value),
        )
        .map(
          (answer) =>
            `${answer.label}: ${answer.value}`,
        )
        .join("\n")

    await sendEmailNotification({
      name,
      email,
      phone,
      company,
      budget,

      service:
        "General Services Inquiry",

      message,

      customAnswers,

      subject:
        "New TBM general services inquiry",
    })
  } catch (error) {
    console.error(
      "[General Services Inquiry] Email notification failed:",
      error,
    )
  }

  return {
    status: "success",

    message:
      page.generalInquirySuccessMessage,
  }
}