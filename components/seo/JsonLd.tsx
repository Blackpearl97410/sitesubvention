import Script from 'next/script'
import { dispositifList } from '@/lib/dispositifs'
import { absoluteUrl, siteConfig } from '@/lib/seo'

export default function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${siteConfig.url}/#business`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        description: siteConfig.description,
        slogan: siteConfig.tagline,
        url: siteConfig.url,
        email: siteConfig.email,
        founder: {
          '@type': 'Person',
          name: siteConfig.author,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'France & La Réunion',
          addressCountry: 'FR',
        },
        areaServed: [
          { '@type': 'Country', name: 'France' },
          { '@type': 'AdministrativeArea', name: 'La Réunion' },
          { '@type': 'Place', name: 'Francophonie' },
        ],
        serviceType: [
          "Montage de dossiers d'aides musicales",
          'Accompagnement subventions culturelles',
          'Rédaction de dossiers CNM, SACEM, ADAMI, SPEDIDAM',
          'Structuration budgétaire de projets musicaux',
        ],
        knowsAbout: [
          'Centre national de la musique',
          'CNM',
          'SPEDIDAM',
          'ADAMI',
          'SACEM',
          'SCPP',
          'SPPF',
          'DAC',
          'Aides régionales',
          'Appels à projets culturels',
          'Production phonographique',
          'Financement de projets musicaux',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: "Accompagnements aux dossiers d'aides",
          itemListElement: [
            {
              '@type': 'Offer',
              name: 'Diagnostic et recherche ciblée',
              description: 'Audit de la situation, ciblage des dispositifs et lecture du calendrier de dépôt.',
              url: absoluteUrl('/diagnostic'),
            },
            {
              '@type': 'Offer',
              name: 'Montage complet de dossier',
              description: "Structuration, budget, argumentaire, pièces et préparation d'un dossier prêt à déposer.",
              url: absoluteUrl('/offres'),
            },
            {
              '@type': 'Offer',
              name: 'Accompagnement sur devis',
              description: 'Veille, stratégie multi-dossiers et accompagnement de structures culturelles complexes.',
              url: absoluteUrl('/offres'),
            },
          ],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: 'fr-FR',
        description: siteConfig.description,
        publisher: { '@id': `${siteConfig.url}/#business` },
      },
      {
        '@type': 'ItemList',
        '@id': `${siteConfig.url}/#dispositifs`,
        name: 'Dispositifs de financement accompagnés',
        itemListElement: dispositifList.map((dispositif, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: dispositif.title,
          url: absoluteUrl(`/dispositifs/${dispositif.slug}`),
          description: dispositif.summary,
        })),
      },
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
