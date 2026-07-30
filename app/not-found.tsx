import { ButtonLink } from "@/components/button-link"

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center gap-6 px-5 py-24 text-center sm:px-8">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Error 404</span>
      <h1 className="text-balance text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl">
        This scene doesn&apos;t exist
      </h1>
      <p className="max-w-md text-pretty text-lg leading-relaxed text-muted">
        The page you&apos;re looking for has left the stage. Let&apos;s get you back to the spotlight.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" withIcon>
          Back to home
        </ButtonLink>
        <ButtonLink href="/contact" variant="ghost" withIcon>
          Contact us
        </ButtonLink>
      </div>
    </section>
  )
}
