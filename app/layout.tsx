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
        url: "/images/tbm-logo.png",
        width: 1000,
        height: 1000,
        alt: "The Backstage Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Backstage Marketing | Creative Growth Agency",
    description:
      "Strategy, branding, social media and growth — built backstage, made for the spotlight.",
    images: ["/images/tbm-logo.png"],
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
        <div className="noise" aria-hidden="true" />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
