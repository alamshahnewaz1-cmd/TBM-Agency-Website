export const metadata = {
  title: "TBM Studio",
  robots: { index: false, follow: false },
}

// The Studio manages its own full-screen shell; render children raw so it
// does not inherit the marketing site's header, footer, or fonts.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children
}
