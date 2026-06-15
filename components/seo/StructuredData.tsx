import Script from 'next/script'
import { faqItems } from '@/lib/faq'
import { absoluteUrl, siteConfig } from '@/lib/seo'

type BreadcrumbItem = {
  name: string
  path: string
}

export function StructuredData({ id, data }: { id: string; data: Record<string, unknown> }) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function FAQJsonLd() {
  return (
    <StructuredData
      id="faq-json-ld"
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${siteConfig.url}/#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }}
    />
  )
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbItems: BreadcrumbItem[] =
    items[0]?.path === '/' ? items : [{ name: 'Accueil', path: '/' }, ...items]

  return (
    <StructuredData
      id={`breadcrumb-json-ld-${breadcrumbItems.map((item) => item.path.replace(/\W+/g, '-')).join('')}`}
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  )
}
