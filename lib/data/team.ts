import { sanityFetch } from "@/sanity/lib/fetch"
import { teamQuery } from "@/sanity/lib/queries"
import type { TeamMember, SanityImageRef } from "@/lib/types"

type SanityTeamMember = {
  name: string
  position: string
  bio?: string
  linkedin?: string
  email?: string
  photo?: SanityImageRef
}

function mapMember(m: SanityTeamMember): TeamMember {
  return {
    name: m.name,
    position: m.position,
    bio: m.bio,
    linkedin: m.linkedin,
    email: m.email,
    photo: m.photo ?? null,
  }
}

/**
 * Team members. There is no bundled team on the current site, so this returns
 * an empty array until members are added in Sanity — callers should render an
 * empty state when the list is empty.
 */
export async function getTeamMembers(): Promise<TeamMember[]> {
  const data = await sanityFetch<SanityTeamMember[]>({
    query: teamQuery,
    tags: ["teamMember"],
  })
  if (data && data.length > 0) return data.map(mapMember)
  return []
}
