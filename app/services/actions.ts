"use server"

import {
  getService,
  resolveServiceInquiry,
} from "@/lib/data/services"
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

export async function submitServiceInquiry(
  _previousState: ServiceInquiryState,
  formData: FormData,
): Promise<ServiceInquiryState> {
  const serviceSlug =
    getText(formData, "serviceSlug")

  const subServiceSlug =
    getText(formData, "subServiceSlug")

  /*
   * Honeypot field.
   * Humans never see or fill this.
   */
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

  /*
   * Never trust the browser to tell us
   * which questions should exist.
   *
   * Resolve the form again on the server
   * using the Sanity service configuration.
   */
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

  /* -------------------------------------------------------------- */
  /* Core-field validation                                          */
  /* -------------------------------------------------------------- */

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

  /* -------------------------------------------------------------- */
  /* Dynamic Sanity-configured questions                            */
  /* -------------------------------------------------------------- */

  const answers = config.fields.map(
    (field, index) => {
      const formKey =
        `custom__${field.name}`

      const value =
        getText(formData, formKey)

      if (
        field.required &&
        !value
      ) {
        errors[formKey] =
          `${field.label} is required.`
      }

      return {
        _key: makeAnswerKey(
          field.name,
          index,
        ),

        _type: "inquiryAnswer",

        label: field.label,
        key: field.name,
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
  /* Save inquiry into Sanity                                       */
  /* -------------------------------------------------------------- */

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

  /* -------------------------------------------------------------- */
  /* Email notification                                              */
  /* -------------------------------------------------------------- */

  /*
   * Sanity is now our source of truth.
   *
   * Email is treated as a notification layer.
   * If email delivery fails but the Sanity
   * document was successfully created, the
   * customer still receives a success message.
   */

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

    const controller =
      new AbortController()

    const timeout =
      setTimeout(
        () =>
          controller.abort(),
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
              name || "—",

            email:
              email || "—",

            phone:
              phone || "—",

            company:
              company || "—",

            budget:
              budget || "—",

            service:
              service.title,

            sub_service:
              subService?.name ||
              "—",

            message:
              message || "—",

            custom_answers:
              customAnswers || "—",

            _subject:
              subjectParts.join(
                " — ",
              ),

            _template:
              "table",

            _captcha:
              "false",

            _replyto:
              email || undefined,
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