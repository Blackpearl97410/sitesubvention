import Script from 'next/script'

export default function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Dossier Studio',
    description: "Accompagnement au montage de dossiers d'aides et de subventions pour le secteur musical francophone.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dossier-studio.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'France & La Réunion',
      addressCountry: 'FR',
    },
    areaServed: 'Francophonie',
    knowsAbout: [
      'Music Industry',
      'Grants',
      'Funding',
      'CNM',
      'SPEDIDAM',
      'ADAMI',
      'SACEM',
    ],
  }

  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
