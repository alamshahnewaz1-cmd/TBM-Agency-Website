"use client"

import {
  useActionState,
  useEffect,
  useId,
  useState,
} from "react"
import { createPortal } from "react-dom"
import { useFormStatus } from "react-dom"
import {
  ArrowRight,
  CheckCircle2,
  X,
} from "lucide-react"

import {
  submitServiceInquiry,
  type ServiceInquiryState,
} from "@/app/services/actions"

import type {
  ResolvedServiceInquiry,
} from "@/lib/data/services"

type TriggerVariant =
  | "accent"
  | "dark"
  | "light"

type ServiceInquiryModalProps = {
  config: ResolvedServiceInquiry
  variant?: TriggerVariant
  className?: string
}

const initialState: ServiceInquiryState = {
  status: "idle",
  message: "",
}

const inputClass =
  "min-h-12 w-full rounded-2xl border border-line bg-paper px-4 text-sm text-ink outline-none transition-colors placeholder:text-muted-2 focus:border-ink"

const textareaClass =
  `${inputClass} resize-y py-3 leading-relaxed`

function SubmitButton({
  text,
}: {
  text: string
}) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-paper transition-all hover:-translate-y-0.5 hover:bg-accent-2 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending
        ? "Sending…"
        : text}

      {!pending ? (
        <ArrowRight
          className="h-4 w-4"
          aria-hidden="true"
        />
      ) : null}
    </button>
  )
}

function FieldWrapper({
  label,
  htmlFor,
  required,
  helpText,
  error,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  helpText?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="text-sm font-semibold text-ink"
      >
        {label}

        {required ? (
          <span
            className="ml-1 text-accent"
            aria-hidden="true"
          >
            *
          </span>
        ) : null}
      </label>

      {children}

      {helpText ? (
        <p className="text-xs leading-relaxed text-muted">
          {helpText}
        </p>
      ) : null}

      {error ? (
        <p
          className="text-xs font-medium text-accent"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}

function InquiryForm({
  config,
  onClose,
}: {
  config: ResolvedServiceInquiry
  onClose: () => void
}) {
  const [state, formAction] =
    useActionState(
      submitServiceInquiry,
      initialState,
    )

  const id = useId()

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-5 px-6 py-10 sm:px-8 sm:py-12">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-accent/10 text-accent">
          <CheckCircle2
            className="h-7 w-7"
            aria-hidden="true"
          />
        </span>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Inquiry received
          </p>

          <h3 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
            Thank you
          </h3>

          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
            {state.message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-paper transition-all hover:-translate-y-0.5"
        >
          Close
        </button>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-6 px-6 pb-8 sm:px-8 sm:pb-10"
    >
      {/* Service context */}
      <input
        type="hidden"
        name="serviceSlug"
        value={config.serviceSlug}
      />

      <input
        type="hidden"
        name="subServiceSlug"
        value={config.subServiceSlug ?? ""}
      />

      {/* Honeypot */}
      <div
        className="hidden"
        aria-hidden="true"
      >
        <label htmlFor={`${id}-website-trap`}>
          Website
        </label>

        <input
          id={`${id}-website-trap`}
          name="_websiteTrap"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Contact fields */}
      {config.showNameField ? (
        <FieldWrapper
          label="Name"
          htmlFor={`${id}-name`}
          required
          error={state.errors?.name}
        >
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            className={inputClass}
            placeholder="Your name"
          />
        </FieldWrapper>
      ) : null}

      {config.showEmailField ? (
        <FieldWrapper
          label="Email"
          htmlFor={`${id}-email`}
          required
          error={state.errors?.email}
        >
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClass}
            placeholder="you@company.com"
          />
        </FieldWrapper>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        {config.showPhoneField ? (
          <FieldWrapper
            label="Phone"
            htmlFor={`${id}-phone`}
          >
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              className={inputClass}
              placeholder="+61..."
            />
          </FieldWrapper>
        ) : null}

        {config.showCompanyField ? (
          <FieldWrapper
            label="Business / Company"
            htmlFor={`${id}-company`}
          >
            <input
              id={`${id}-company`}
              name="company"
              type="text"
              autoComplete="organization"
              className={inputClass}
              placeholder="Your business"
            />
          </FieldWrapper>
        ) : null}
      </div>

      {config.showBudgetField ? (
        <FieldWrapper
          label="Budget"
          htmlFor={`${id}-budget`}
        >
          <select
            id={`${id}-budget`}
            name="budget"
            className={inputClass}
            defaultValue=""
          >
            <option value="">
              Select a budget range
            </option>

            {config.budgetOptions.map(
              (option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ),
            )}
          </select>
        </FieldWrapper>
      ) : null}

      {/* Sanity-configured custom questions */}
      {config.fields.map((field) => {
        const fieldName =
          `custom__${field.name}`

        const fieldId =
          `${id}-${field.name}`

        const error =
          state.errors?.[fieldName]

        if (field.fieldType === "textarea") {
          return (
            <FieldWrapper
              key={field.name}
              label={field.label}
              htmlFor={fieldId}
              required={field.required}
              helpText={field.helpText}
              error={error}
            >
              <textarea
                id={fieldId}
                name={fieldName}
                rows={4}
                required={field.required}
                className={textareaClass}
                placeholder={
                  field.placeholder ?? ""
                }
              />
            </FieldWrapper>
          )
        }

        if (field.fieldType === "select") {
          return (
            <FieldWrapper
              key={field.name}
              label={field.label}
              htmlFor={fieldId}
              required={field.required}
              helpText={field.helpText}
              error={error}
            >
              <select
                id={fieldId}
                name={fieldName}
                required={field.required}
                className={inputClass}
                defaultValue=""
              >
                <option
                  value=""
                  disabled={field.required}
                >
                  Select an option
                </option>

                {(field.options ?? []).map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  ),
                )}
              </select>
            </FieldWrapper>
          )
        }

        if (field.fieldType === "boolean") {
          return (
            <FieldWrapper
              key={field.name}
              label={field.label}
              htmlFor={fieldId}
              required={field.required}
              helpText={field.helpText}
              error={error}
            >
              <select
                id={fieldId}
                name={fieldName}
                required={field.required}
                className={inputClass}
                defaultValue=""
              >
                <option
                  value=""
                  disabled={field.required}
                >
                  Select an option
                </option>

                <option value="Yes">
                  Yes
                </option>

                <option value="No">
                  No
                </option>
              </select>
            </FieldWrapper>
          )
        }

        const inputType =
          field.fieldType === "number"
            ? "number"
            : field.fieldType === "email"
              ? "email"
              : field.fieldType === "tel"
                ? "tel"
                : field.fieldType === "url"
                  ? "url"
                  : "text"

        return (
          <FieldWrapper
            key={field.name}
            label={field.label}
            htmlFor={fieldId}
            required={field.required}
            helpText={field.helpText}
            error={error}
          >
            <input
              id={fieldId}
              name={fieldName}
              type={inputType}
              required={field.required}
              className={inputClass}
              placeholder={
                field.placeholder ?? ""
              }
            />
          </FieldWrapper>
        )
      })}

      {config.showMessageField ? (
        <FieldWrapper
          label="Anything else we should know?"
          htmlFor={`${id}-message`}
        >
          <textarea
            id={`${id}-message`}
            name="message"
            rows={5}
            className={textareaClass}
            placeholder="Tell us anything else that will help us understand your project."
          />
        </FieldWrapper>
      ) : null}

      {state.status === "error" &&
      state.message ? (
        <div
          className="rounded-2xl border border-accent/20 bg-accent/5 px-4 py-3 text-sm font-medium text-accent"
          role="alert"
        >
          {state.message}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton
          text={config.submitText}
        />

        <p className="text-xs leading-relaxed text-muted">
          We typically reply within 1–2 business days.
        </p>
      </div>
    </form>
  )
}

function InquiryModal({
  config,
  onClose,
}: {
  config: ResolvedServiceInquiry
  onClose: () => void
}) {
  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow

    document.body.style.overflow =
      "hidden"

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    )

    return () => {
      document.body.style.overflow =
        previousOverflow

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      )
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center bg-black/55 backdrop-blur-sm sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose()
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-inquiry-title"
        className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[32px] border border-line bg-paper shadow-2xl sm:max-w-2xl sm:rounded-[32px]"
      >
        {/* Modal header */}
        <div className="flex items-start justify-between gap-6 px-6 pb-5 pt-6 sm:px-8 sm:pt-8">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              {config.subServiceTitle
                ? config.serviceTitle
                : "Service inquiry"}
            </p>

            {config.subServiceTitle ? (
              <p className="mt-2 text-sm font-semibold text-muted">
                {config.subServiceTitle}
              </p>
            ) : null}

            <h2
              id="service-inquiry-title"
              className="mt-2 text-balance text-2xl font-black tracking-tight text-ink sm:text-3xl"
            >
              {config.title}
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              {config.description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 flex-none place-items-center rounded-full border border-line bg-card text-ink transition-colors hover:bg-paper-2"
            aria-label="Close inquiry form"
          >
            <X
              className="h-5 w-5"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="overflow-y-auto">
          <InquiryForm
            config={config}
            onClose={onClose}
          />
        </div>
      </section>
    </div>,
    document.body,
  )
}

export function ServiceInquiryModal({
  config,
  variant = "accent",
  className = "",
}: ServiceInquiryModalProps) {
  const [open, setOpen] =
    useState(false)

  const baseClass =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all hover:-translate-y-0.5"

  const variantClass =
    variant === "dark"
      ? "bg-ink text-paper hover:bg-accent"
      : variant === "light"
        ? "bg-paper text-ink hover:bg-paper-2"
        : "bg-accent text-paper hover:bg-accent-2"

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${baseClass} ${variantClass} ${className}`}
      >
        {config.buttonText}

        <ArrowRight
          className="h-4 w-4"
          aria-hidden="true"
        />
      </button>

      {open ? (
        <InquiryModal
          config={config}
          onClose={() =>
            setOpen(false)
          }
        />
      ) : null}
    </>
  )
}