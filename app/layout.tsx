import type { Metadata } from 'next'
import { Barlow_Condensed, Barlow, Space_Mono } from 'next/font/google'
import Analytics from '@/components/analytics/Analytics'
import MotionProvider from '@/components/motion/MotionProvider'
import JsonLd from '@/components/seo/JsonLd'
import { seoKeywords, siteConfig } from '@/lib/seo'
import { colors, layout } from '@/lib/tokens'
import './globals.css'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800', '900'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-barlow',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  category: 'Business services',
  title: {
    default: siteConfig.title,
    template: '%s | Dossier Studio',
  },
  description: siteConfig.description,
  keywords: seoKeywords,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: '/',
    siteName: 'Dossier Studio',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: "Dossier Studio - De l'idée artistique au dossier finançable",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/twitter-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'llms-txt': '/llms.txt',
    'ai-summary': siteConfig.tagline,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`theme-dark ${barlowCondensed.variable} ${barlow.variable} ${spaceMono.variable}`}
      style={
        {
          '--white': colors.white,
          '--paper': colors.paper,
          '--track-bg': colors.trackBg,
          '--surface': colors.surface,
          '--surface-2': colors.surface2,
          '--black': colors.black,
          '--ink': colors.ink,
          '--soft': colors.soft,
          '--dim': colors.dim,
          '--rule': colors.rule,
          '--rule-dark': colors.ruleDark,
          '--accent': colors.accent,
          '--accent-dim': colors.accentDim,
          '--accent-glow': colors.accentGlow,
          '--label-w': `${layout.labelW}px`,
          '--nav-h': `${layout.navH}px`,
          '--ruler-h': `${layout.rulerH}px`,
        } as React.CSSProperties
      }
    >
      <body style={{ backgroundColor: colors.white, color: colors.ink }}>
        <JsonLd />
        <Analytics />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
