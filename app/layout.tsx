import type { Metadata } from 'next'
import { Barlow_Condensed, Barlow, Space_Mono } from 'next/font/google'
import MotionProvider from '@/components/motion/MotionProvider'
import JsonLd from '@/components/seo/JsonLd'
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dossier-studio.com'),
  title: {
    default: 'Dossier Studio — Montage de dossiers · Secteur musical francophone',
    template: '%s | Dossier Studio',
  },
  description:
    "Accompagnement au montage de dossiers d'aides et de subventions pour labels, éditeurs, producteurs, studios et artistes francophones. CNM, SPEDIDAM, ADAMI, SACEM, régions et plus.",
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Dossier Studio — De l\'idée artistique au dossier finançable',
    description: "Accompagnement au montage de dossiers d'aides et de subventions pour le secteur musical francophone.",
    url: '/',
    siteName: 'Dossier Studio',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dossier Studio',
    description: "Montage de dossiers d'aides pour le secteur musical francophone.",
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
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
