"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import type { Faq } from "@/lib/types"

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i} className="overflow-hidden rounded-2xl border border-line bg-card">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-base font-bold tracking-tight text-ink sm:text-lg">{item.question}</span>
                <span
                  className={`grid h-8 w-8 flex-none place-items-center rounded-full border border-line text-ink transition-transform duration-300 ${
                    isOpen ? "rotate-45 border-accent text-accent" : ""
                  }`}
                  aria-hidden="true"
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-pretty leading-relaxed text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
