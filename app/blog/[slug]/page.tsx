import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { ButtonLink } from "@/components/button-link"
import { Reveal } from "@/components/reveal"
import {
  blogPosts,
  getPost,
  getRelatedPosts,
  formatDate,
  type BlogBlock,
} from "@/lib/blog"

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: "Article not found" }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.cover }],
    },
  }
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="mt-10 text-2xl font-black tracking-tight sm:text-3xl">{block.text}</h2>
    case "paragraph":
      return <p className="mt-5 text-pretty text-lg leading-relaxed text-ink/80">{block.text}</p>
    case "quote":
      return (
        <blockquote className="my-8 border-l-2 border-accent pl-6 text-xl font-semibold leading-relaxed text-ink">
          {block.text}
        </blockquote>
      )
    case "list":
      return (
        <ul className="mt-5 flex flex-col gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-lg leading-relaxed text-ink/80">
              <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      )
    default:
      return null
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const related = getRelatedPosts(slug, 2)

  return (
    <>
      <article>
        {/* Header */}
        <header className="border-b border-line bg-paper-2/40">
          <div className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All articles
            </Link>
            <div className="mt-8 flex flex-col gap-5">
              <span className="w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                {post.category}
              </span>
              <h1 className="text-balance text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                <span className="font-semibold text-ink">{post.author}</span>
                <span aria-hidden="true">•</span>
                <span>{formatDate(post.date)}</span>
                <span aria-hidden="true">•</span>
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Cover */}
        <div className="mx-auto w-full max-w-4xl px-5 pt-12 sm:px-8">
          <div className="overflow-hidden rounded-[28px] border border-line bg-paper-2">
            <img
              src={post.cover || "/placeholder.svg"}
              alt=""
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </article>

      {/* Related */}
      {related.length > 0 ? (
        <section className="border-t border-line bg-paper-2/40">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Keep reading</h2>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
              >
                All articles
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={i * 70}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="group flex h-full gap-5 rounded-3xl border border-line bg-card p-4 transition-all hover:-translate-y-1 hover:shadow-[0_18px_50px_-24px_rgba(9,9,11,0.35)]"
                  >
                    <div className="relative aspect-square w-28 flex-none overflow-hidden rounded-2xl bg-paper-2">
                      <img
                        src={r.cover || "/placeholder.svg"}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col gap-1 py-1">
                      <span className="text-xs font-semibold text-accent">{r.category}</span>
                      <h3 className="text-base font-bold leading-snug tracking-tight text-balance">{r.title}</h3>
                      <span className="mt-auto text-xs text-muted">{r.readingTime}</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="flex flex-col items-start gap-6 rounded-[32px] bg-ink px-7 py-14 text-paper sm:px-14 sm:py-16">
            <h2 className="max-w-2xl text-balance text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl">
              Want this kind of thinking applied to your brand?
            </h2>
            <ButtonLink href="/contact" withIcon>
              Work with us
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  )
}
