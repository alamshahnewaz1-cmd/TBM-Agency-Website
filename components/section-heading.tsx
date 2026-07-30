import type { ReactNode } from "react"

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
      <span className="h-px w-6 bg-accent" aria-hidden="true" />
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: "left" | "center"
}) {
  return (
    <div className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center mx-auto max-w-2xl" : "max-w-2xl"}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-balance text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
      {description ? <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">{description}</p> : null}
    </div>
  )
}
