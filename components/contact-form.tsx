"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { CheckCircle2, ArrowUpRight } from "lucide-react"
import { submitContact, type ContactState } from "@/app/contact/actions"

const initialState: ContactState = { status: "idle", message: "" }

const budgets = ["Under $1k", "$1k – $5k", "$5k – $15k", "$15k+", "Not sure yet"]

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-paper transition-all hover:-translate-y-0.5 hover:bg-accent-2 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Sending…" : "Send message"}
      {!pending ? <ArrowUpRight className="h-4 w-4" aria-hidden="true" /> : null}
    </button>
  )
}

function Field({
  label,
  children,
  error,
  htmlFor,
}: {
  label: string
  children: React.ReactNode
  error?: string
  htmlFor: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-xs font-medium text-accent" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

const inputClass =
  "min-h-12 rounded-2xl border border-line bg-paper px-4 text-sm text-ink outline-none transition-colors placeholder:text-muted-2 focus:border-ink"

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState)

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-3xl border border-line bg-card p-8">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-accent/10 text-accent">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="text-xl font-bold tracking-tight">Message sent</h3>
        <p className="text-pretty leading-relaxed text-muted">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-5 rounded-3xl border border-line bg-card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={state.errors?.name}>
          <input id="name" name="name" type="text" autoComplete="name" required className={inputClass} placeholder="Your name" />
        </Field>
        <Field label="Email" htmlFor="email" error={state.errors?.email}>
          <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} placeholder="you@company.com" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company (optional)" htmlFor="company">
          <input id="company" name="company" type="text" autoComplete="organization" className={inputClass} placeholder="Company or brand" />
        </Field>
        <Field label="Budget (optional)" htmlFor="budget">
          <select id="budget" name="budget" className={inputClass} defaultValue="">
            <option value="" disabled>
              Select a range
            </option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="What can we help with?" htmlFor="message" error={state.errors?.message}>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputClass} resize-y py-3 leading-relaxed`}
          placeholder="Tell us about your brand, your goals and what you're looking for."
        />
      </Field>

      {/* Honeypot: hidden from users, catches bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && state.message ? (
        <p className="text-sm font-medium text-accent" role="alert">
          {state.message}
        </p>
      ) : null}

      <div className="flex items-center gap-4 pt-1">
        <SubmitButton />
        <p className="text-xs text-muted">We reply within 1–2 business days.</p>
      </div>
    </form>
  )
}
