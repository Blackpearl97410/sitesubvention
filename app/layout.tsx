import type { Metadata } from 'next'
import { Barlow_Condensed, Barlow, Space_Mono } from 'next/font/google'
import Script from 'next/script'
import MotionProvider from '@/components/motion/MotionProvider'
import JsonLd from '@/components/seo/JsonLd'
import DeviceTypeProvider from '@/components/system/DeviceTypeProvider'
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

const googleAnalyticsIds = ['G-RV696ZWMXX', 'G-FZEX2C0F4N']
const googleAdsId = 'AW-17697827383'
const googleTagIds = [...googleAnalyticsIds, googleAdsId]

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
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon-48x48.png',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            ${googleTagIds.map((id) => `gtag('config', '${id}');`).join('\n            ')}
          `}
        </Script>
        <DeviceTypeProvider />
        <JsonLd />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
