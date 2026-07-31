import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { BlogList } from "@/components/blog-list"
import { getPosts, getBlogCategories } from "@/lib/data/blog"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Ideas, playbooks and lessons on brand strategy, social media, content and growth from the team at The Backstage Marketing.",
  alternates: { canonical: "/blog" },
}

export default async function BlogPage() {
  const [blogPosts, blogCategories] = await Promise.all([getPosts(), getBlogCategories()])
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Notes from backstage"
        description="Practical thinking on brand, content and growth — the ideas we use with our own clients, shared openly."
      />

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <BlogList posts={blogPosts} categories={blogCategories} />
      </section>
    </>
  )
}
