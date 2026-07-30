export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readingTime: string
  cover: string
  body: BlogBlock[]
}

export const blogCategories = [
  "All",
  "Strategy",
  "Social Media",
  "Branding",
  "Growth",
]

// Blog content lives here for now. This shape maps cleanly onto a CMS
// like Sanity later — each post becomes a document, each block a portable-text node.
export const blogPosts: BlogPost[] = [
  {
    slug: "brand-strategy-before-logo",
    title: "Why Brand Strategy Should Always Come Before Your Logo",
    excerpt:
      "A beautiful logo built on a weak foundation is just decoration. Here is why strategy is the work that makes everything else pay off.",
    category: "Strategy",
    author: "Shahnewaz Alam",
    date: "2026-02-18",
    readingTime: "6 min read",
    cover: "/images/blog/brand-strategy.png",
    body: [
      {
        type: "paragraph",
        text: "Most brands rush to the logo. It is the fun part, the visible part, the thing you can show off. But a logo is only a symbol — and a symbol is worthless until it stands for something. That something is your brand strategy.",
      },
      {
        type: "heading",
        text: "Strategy is a decision-making filter",
      },
      {
        type: "paragraph",
        text: "Good strategy answers the questions that make design easy: who are we for, what do we stand for, and why should anyone choose us over the alternative. Once those answers are clear, every creative decision becomes a simple test — does this move us toward that position, or away from it?",
      },
      {
        type: "list",
        items: [
          "Positioning: the space you own in your customer's mind.",
          "Audience: who you are genuinely built to serve.",
          "Messaging: the words your whole team can repeat.",
          "Personality: how the brand looks, sounds and behaves.",
        ],
      },
      {
        type: "quote",
        text: "A logo tells people you exist. A strategy tells them why you matter.",
      },
      {
        type: "heading",
        text: "What happens when you skip it",
      },
      {
        type: "paragraph",
        text: "Skip strategy and you get a brand that looks fine but says nothing. Teams argue over taste instead of goals, campaigns feel disconnected, and you end up rebranding again in two years. Strategy is not the expensive part — inconsistency is.",
      },
      {
        type: "paragraph",
        text: "Start with the thinking. The logo, the colours and the campaigns will all be sharper for it — and they will actually earn their keep.",
      },
    ],
  },
  {
    slug: "social-content-that-converts",
    title: "Building a Social Content System That Actually Converts",
    excerpt:
      "Posting more is not a strategy. Here is the simple content system we use to turn attention into inquiries.",
    category: "Social Media",
    author: "The Backstage Marketing",
    date: "2026-01-29",
    readingTime: "7 min read",
    cover: "/images/blog/social-content.png",
    body: [
      {
        type: "paragraph",
        text: "The brands winning on social are not posting more — they are posting with intent. Behind every account that grows and converts is a system, not a scramble. Here is how we build one.",
      },
      {
        type: "heading",
        text: "Start with pillars, not posts",
      },
      {
        type: "paragraph",
        text: "Content pillars are the three to five themes your brand talks about consistently. They keep your feed focused and make planning fast, because you are never staring at a blank calendar wondering what to post.",
      },
      {
        type: "list",
        items: [
          "Educate: teach your audience something useful.",
          "Prove: show results, testimonials and social proof.",
          "Connect: share the people and story behind the brand.",
          "Convert: make a clear, confident offer.",
        ],
      },
      {
        type: "heading",
        text: "Design for the scroll",
      },
      {
        type: "paragraph",
        text: "The first frame is the whole game. If it does not stop the thumb, nothing else matters. Lead with tension, a bold statement or a clear promise — then deliver on it fast.",
      },
      {
        type: "quote",
        text: "Consistency beats intensity. A steady, on-brand cadence compounds; a viral one-off rarely does.",
      },
      {
        type: "heading",
        text: "Close the loop",
      },
      {
        type: "paragraph",
        text: "Attention only matters if it leads somewhere. Every pillar should ladder up to a conversion moment — a link, a DM prompt, a clear next step. Track what turns into inquiries and do more of that. The system is never finished; it is refined every month.",
      },
    ],
  },
  {
    slug: "small-team-big-brand",
    title: "How a Small Team Can Build a Big-Brand Presence",
    excerpt:
      "You do not need a huge budget to look and feel like a leader. You need focus, consistency and a system.",
    category: "Growth",
    author: "Shahnewaz Alam",
    date: "2026-01-08",
    readingTime: "5 min read",
    cover: "/images/blog/small-team.png",
    body: [
      {
        type: "paragraph",
        text: "Big-brand presence is not about big budgets. Some of the most premium-feeling brands online are run by tiny teams who understand one thing: consistency reads as credibility.",
      },
      {
        type: "heading",
        text: "Look like you have your act together",
      },
      {
        type: "paragraph",
        text: "A tight visual system does more heavy lifting than any single expensive asset. When your colours, type and tone are consistent everywhere, people assume the business behind them is just as organised.",
      },
      {
        type: "list",
        items: [
          "Lock a simple, repeatable design system.",
          "Show up on a schedule you can actually sustain.",
          "Say one thing clearly instead of ten things vaguely.",
          "Reuse and refine your best-performing work.",
        ],
      },
      {
        type: "quote",
        text: "Small teams win by being sharp and consistent, not by trying to be everywhere at once.",
      },
      {
        type: "paragraph",
        text: "Pick your channels, build your system, and protect your consistency. Ambition plus discipline is what makes a small team feel like a big brand — long before the headcount catches up.",
      },
    ],
  },
]

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug)
}

export function getRelatedPosts(slug: string, limit = 2) {
  const current = getPost(slug)
  if (!current) return blogPosts.slice(0, limit)
  return blogPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (a.category === current.category ? -1 : 1))
    .slice(0, limit)
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
