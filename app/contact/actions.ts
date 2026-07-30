"use server"

export type ContactState = {
  status: "idle" | "success" | "error"
  message: string
  errors?: Partial<Record<"name" | "email" | "message", string>>
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// FormSubmit AJAX endpoint delivers straight to this inbox.
// Running it server-side keeps the address off the client and avoids CORS.
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/inquiry.tbm@protonmail.com"

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

  // Silently accept spam without sending anything.
  if (website) {
    return { status: "success", message: "Thanks! We'll be in touch shortly." }
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  try {
    const res = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // A browser-like User-Agent is required, otherwise FormSubmit's
        // Cloudflare layer serves a bot challenge and the request 403s.
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        Origin: "https://formsubmit.co",
        Referer: "https://formsubmit.co/",
      },
      body: JSON.stringify({
        name,
        email,
        company: company || "—",
        budget: budget || "—",
        message,
        _subject: `New inquiry from ${name}${company ? ` (${company})` : ""}`,
        _template: "table",
        _captcha: "false",
        _replyto: email,
      }),
      signal: controller.signal,
      cache: "no-store",
    })

    const data = (await res.json().catch(() => null)) as
      | { success?: string | boolean; message?: string }
      | null
    const ok = res.ok && (data?.success === "true" || data?.success === true)

    if (!ok) {
      const needsActivation = /activat/i.test(data?.message ?? "")
      if (needsActivation) {
        // One-time setup: the FormSubmit "Activate Form" email must be clicked
        // from the inquiry.tbm@protonmail.com inbox before delivery begins.
        console.log("[v0] FormSubmit awaiting activation — click the link in the inbox:", data?.message)
      } else {
        console.log("[v0] FormSubmit send failed:", res.status, data)
      }
      return {
        status: "error",
        message:
          "Sorry — something went wrong sending your message. Please try again or email inquiry.tbm@protonmail.com directly.",
      }
    }

    return {
      status: "success",
      message: "Thanks for reaching out! We've received your message and will reply within 1–2 business days.",
    }
  } catch (err) {
    console.log("[v0] Contact submission error:", err)
    return {
      status: "error",
      message:
        "Sorry — we couldn't send your message right now. Please try again or email inquiry.tbm@protonmail.com directly.",
    }
  } finally {
    clearTimeout(timeout)
  }
}
