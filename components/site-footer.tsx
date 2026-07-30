import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"
import { Logo } from "@/components/logo"
import { navLinks, site } from "@/lib/site"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo variant="light" />
            <p className="max-w-sm text-pretty text-sm leading-relaxed text-paper/70">
              {site.tagline} We build brands and campaigns behind the scenes so your business can own the spotlight.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-paper/20 px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {site.email}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/50">Explore</p>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-paper/75 transition-colors hover:text-paper">
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="text-sm text-paper/75 transition-colors hover:text-paper">
              Contact
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/50">Connect</p>
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-paper/75 transition-colors hover:text-paper"
              >
                {social.label}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/10 pt-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
