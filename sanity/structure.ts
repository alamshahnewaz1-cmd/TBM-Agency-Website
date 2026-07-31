import {
  Home,
  Users,
  Cog,
  LayoutGrid,
  Briefcase,
  FileText,
  PenLine,
  Tag,
  UserRound,
  Quote,
  HelpCircle,
  BadgeDollarSign,
  Inbox,
} from "lucide-react"
import type { StructureResolver } from "sanity/structure"

// Singletons are edited as a single document rather than a list.
const SINGLETONS = [
  { id: "siteSettings", type: "siteSettings", title: "Site Settings", icon: Cog },
  { id: "homepage", type: "homepage", title: "Homepage", icon: Home },
  { id: "aboutPage", type: "aboutPage", title: "About Page", icon: Users },
] as const

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map((s) =>
        S.listItem()
          .title(s.title)
          .id(s.id)
          .icon(s.icon)
          .child(S.document().schemaType(s.type).documentId(s.id)),
      ),
      S.divider(),
      S.documentTypeListItem("service").title("Services").icon(LayoutGrid),
      S.documentTypeListItem("project").title("Projects").icon(Briefcase),
      S.documentTypeListItem("post").title("Blog Posts").icon(FileText),
      S.documentTypeListItem("pricingPlan").title("Pricing").icon(BadgeDollarSign),
      S.documentTypeListItem("testimonial").title("Testimonials").icon(Quote),
      S.documentTypeListItem("teamMember").title("Team Members").icon(UserRound),
      S.documentTypeListItem("faq").title("FAQs").icon(HelpCircle),
      S.divider(),
      S.documentTypeListItem("category").title("Categories").icon(Tag),
      S.documentTypeListItem("author").title("Authors").icon(PenLine),
      S.divider(),
      S.documentTypeListItem("inquiry").title("Inquiries").icon(Inbox),
    ])

/** Schema types that should not appear in the default "create new" lists. */
export const SINGLETON_TYPES = new Set<string>(SINGLETONS.map((s) => s.type))
