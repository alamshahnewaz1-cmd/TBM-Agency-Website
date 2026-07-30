export const site = {
  name: "The Backstage Marketing",
  shortName: "TBM",
  tagline: "Built backstage. Made for the spotlight.",
  email: "inquiry.tbm@protonmail.com",
  url: "https://thebackstagemarketing.com",
  description:
    "A creative growth agency for branding, social media, content and campaigns.",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Behance", href: "https://behance.net" },
  ],
}

export type NavLink = {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
]
