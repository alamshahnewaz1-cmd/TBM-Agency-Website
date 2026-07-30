import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const siteUrl = "https://thebackstagemarketing.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Backstage Marketing | Creative Growth Agency",
    template: "%s | The Backstage Marketing",
  },
  description:
    "The Backstage Marketing is a creative growth agency for branding, brand strategy, social media, content creation and performance campaigns. Built backstage, made for the spotlight.",
  keywords: [
    "creative agency",
    "brand strategy",
    "brand identity",
    "social media marketing",
    "content creation",
    "performance marketing",
    "website design",
    "The Backstage Marketing",
  ],
  authors: [{ name: "The Backstage Marketing" }],
  creator: "The Backstage Marketing",
  icons: {
    icon: "/images/tbm-logo.png",
    apple: "/images/tbm-logo.png",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "The Backstage Marketing | Creative Growth Agency",
    description:
      "Strategy, branding, social media and growth — built backstage, made for the spotlight.",
    siteName: "The Backstage Marketing",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Backstage Marketing — Built backstage. Made for the spotlight.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Backstage Marketing | Creative Growth Agency",
    description:
      "Strategy, branding, social media and growth — built backstage, made for the spotlight.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#09090b",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "The Backstage Marketing",
              alternateName: "TBM",
              url: siteUrl,
              logo: `${siteUrl}/images/tbm-logo.png`,
              email: "inquiry.tbm@protonmail.com",
              description:
                "A creative growth agency for branding, brand strategy, social media, content creation and performance campaigns.",
              slogan: "Built backstage. Made for the spotlight.",
              sameAs: [
                "https://instagram.com",
                "https://linkedin.com",
                "https://behance.net",
              ],
            }),
          }}
        />
        <div className="noise" aria-hidden="true" />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
