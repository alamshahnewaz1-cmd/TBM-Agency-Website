import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { ComponentProps } from "react"

type Variant = "primary" | "ink" | "ghost" | "light"

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 min-h-11 px-6 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"

const variants: Record<Variant, string> = {
  primary: "bg-accent text-paper hover:bg-accent-2 focus-visible:ring-offset-background",
  ink: "bg-ink text-paper hover:bg-ink-2 focus-visible:ring-offset-background",
  ghost:
    "border border-line-strong text-ink hover:border-ink hover:bg-black/[0.04] focus-visible:ring-offset-background",
  light:
    "border border-paper/25 text-paper hover:bg-paper hover:text-ink focus-visible:ring-offset-ink",
}

type ButtonLinkProps = {
  href: string
  variant?: Variant
  withIcon?: boolean
  className?: string
  external?: boolean
} & Omit<ComponentProps<typeof Link>, "href" | "className">

export function ButtonLink({
  href,
  variant = "primary",
  withIcon = false,
  className = "",
  external = false,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${className}`
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
        {withIcon && <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
      </a>
    )
  }
  return (
    <Link href={href} className={classes} {...props}>
      {children}
      {withIcon && <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
    </Link>
  )
}
