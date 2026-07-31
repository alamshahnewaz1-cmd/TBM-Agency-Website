import Image from "next/image"
import {
  PortableText as PortableTextRenderer,
  type PortableTextComponents,
} from "@portabletext/react"
import { imageUrl } from "@/sanity/lib/image"
import type { PortableTextBlock } from "@/lib/types"

/**
 * Renders Sanity Portable Text using the exact same typographic styles the
 * blog previously used for its structured blocks, so CMS-authored articles
 * look identical to the original hardcoded ones.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 text-pretty text-lg leading-relaxed text-ink/80">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl font-black tracking-tight sm:text-3xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-black tracking-tight sm:text-2xl">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-accent pl-6 text-xl font-semibold leading-relaxed text-ink">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 flex flex-col gap-3">{children}</ul>,
    number: ({ children }) => (
      <ol className="mt-5 flex list-decimal flex-col gap-3 pl-5 text-lg leading-relaxed text-ink/80">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-lg leading-relaxed text-ink/80">
        <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-accent underline underline-offset-2"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const url = imageUrl(value, "")
      if (!url) return null
      return (
        <span className="my-8 block overflow-hidden rounded-[28px] border border-line bg-paper-2">
          <Image
            src={url || "/placeholder.svg"}
            alt={value?.alt || ""}
            width={1200}
            height={675}
            className="aspect-[16/9] w-full object-cover"
          />
        </span>
      )
    },
  },
}

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return <PortableTextRenderer value={value as never} components={components} />
}
