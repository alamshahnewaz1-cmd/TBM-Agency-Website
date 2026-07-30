"use server"

export type ContactState = {
  status: "idle" | "success" | "error"
  message: string
  errors?: Partial<Record<"name" | "email" | "message", string>>
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const company = String(formData.get("company") ?? "").trim()
  const budget = String(formData.get("budget") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()
  // Honeypot field — bots fill this, humans never see it.
  const website = String(formData.get("website") ?? "").trim()

  const errors: ContactState["errors"] = {}
  if (name.length < 2) errors.name = "Please enter your name."
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address."
  if (message.length < 10) errors.message = "Please add a little more detail (10+ characters)."

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", errors }
  }

  // Silently accept spam without doing anything.
  if (website) {
    return { status: "success", message: "Thanks! We'll be in touch shortly." }
  }

  // No email provider is connected yet, so we log the inquiry server-side.
  // Swap this for an email/CRM integration (e.g. Resend, a database insert) later.
  console.log("[v0] New contact inquiry:", { name, email, company, budget, message })

  return {
    status: "success",
    message: "Thanks for reaching out! We've received your message and will reply within 1–2 business days.",
  }
}
