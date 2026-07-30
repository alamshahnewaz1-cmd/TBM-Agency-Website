import type { ReactNode } from "react"
import { Reveal } from "@/components/reveal"
import { Eyebrow } from "@/components/section-heading"

type PageHeroProps = {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="border-b border-line bg-paper-2/40">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex max-w-3xl flex-col gap-5">
          {eyebrow ? (
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
          ) : null}
          <Reveal delay={80}>
            <h1 className="text-balance text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
              {title}
            </h1>
          </Reveal>
          {description ? (
            <Reveal delay={160}>
              <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted">{description}</p>
            </Reveal>
          ) : null}
          {children ? <Reveal delay={240}>{children}</Reveal> : null}
        </div>
      </div>
    </section>
  )
}
