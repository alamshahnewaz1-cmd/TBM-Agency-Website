"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"

import { Logo } from "@/components/logo"
import type { NavLink } from "@/lib/types"

export function SiteHeader({ navLinks }: { navLinks: NavLink[] }) {
  const pathname = usePathname()

  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
    }

    onScroll()

    window.addEventListener("scroll", onScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <>
      <header
        className={`sticky top-0 z-[70] border-b transition-colors duration-300 ${
          scrolled
            ? "border-line bg-paper/85 backdrop-blur-md"
            : "border-transparent bg-paper/0"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
          <Logo />

          {/* Desktop navigation */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-ink text-paper"
                    : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              Start a project

              <ArrowUpRight
                className="h-4 w-4"
                aria-hidden="true"
              />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-ink lg:hidden"
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — outside the header so it stays fixed to the viewport */}
      {open ? (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 bottom-0 top-16 z-[60] overflow-y-auto overscroll-contain border-t border-line bg-paper px-5 py-6 sm:top-20 lg:hidden"
        >
          <nav
            aria-label="Mobile"
            className="flex flex-col gap-1"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-2xl px-4 py-4 text-lg font-semibold transition-colors ${
                  isActive(link.href)
                    ? "bg-ink text-paper"
                    : "text-ink hover:bg-black/5"
                }`}
              >
                {link.label}

                <ArrowUpRight
                  className="h-5 w-5 opacity-40"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-6 flex items-center justify-center gap-1.5 rounded-full bg-accent px-5 py-4 text-base font-semibold text-paper"
          >
            Start a project

            <ArrowUpRight
              className="h-4 w-4"
              aria-hidden="true"
            />
          </Link>
        </div>
      ) : null}
    </>
  )
}