import type { Metadata } from 'next'
import LegalDocument from '@/components/legal/LegalDocument'
import { legalDetails } from '@/lib/legal'
import { pageSeo } from '@/lib/seo'

export const metadata: Metadata = pageSeo({
  title: 'Mentions légales',
  description: 'Mentions légales du site Dossier Studio.',
  path: '/mentions-legales',
  noIndex: true,
})

export default function Page() {
  return (
    <LegalDocument
      label="Mentions légales"
      title="Mentions légales"
      intro="Cette page rassemble les informations permettant d’identifier l’éditeur du site, son hébergeur et les règles d’utilisation des contenus publiés."
      blocks={[
        {
          title: 'Éditeur du site',
          items: [
            `Nom commercial : ${legalDetails.brandName}`,
            `Éditeur : ${legalDetails.editorName}`,
            `Forme juridique : ${legalDetails.legalForm}`,
            `SIRET : ${legalDetails.siret}`,
            `TVA intracommunautaire : ${legalDetails.vatNumber}`,
            `Adresse professionnelle : ${legalDetails.registeredAddress}`,
            `Directeur de la publication : ${legalDetails.publicationDirector}`,
            `Email : ${legalDetails.contactEmail}`,
          ],
        },
        {
          title: 'Hébergement',
          body: [
            `Le site est hébergé par ${legalDetails.hostName}. Adresse : ${legalDetails.hostAddress}.`,
          ],
        },
        {
          title: 'Activité',
          body: [
            'Dossier Studio propose un accompagnement à la clarification, la structuration, la relecture et le montage de dossiers d’aides, de subventions et d’appels à projets dans le secteur musical et culturel.',
            'Les informations présentées sur ce site ont une vocation commerciale et informative. Elles ne constituent ni un conseil juridique individualisé, ni une garantie d’obtention d’un financement.',
          ],
        },
        {
          title: 'Propriété intellectuelle',
          body: [
            'Les textes, choix éditoriaux, interfaces, compositions graphiques et éléments de marque du site sont protégés. Toute reproduction ou réutilisation non autorisée est interdite.',
            'Les noms, sigles et logos d’organismes publics ou privés éventuellement cités restent la propriété de leurs titulaires respectifs. Leur présence ne signifie pas qu’il existe un partenariat, une certification ou une validation officielle de Dossier Studio par ces organismes.',
          ],
        },
        {
          title: 'Responsabilité',
          body: [
            'Dossier Studio apporte une méthode, une analyse et un accompagnement documentaire. Les décisions d’attribution relèvent exclusivement des organismes financeurs, commissions, collectivités ou guichets concernés.',
            'Le client reste responsable de l’exactitude des informations, pièces, budgets et justificatifs transmis pour la constitution d’un dossier.',
          ],
        },
        {
          title: 'Médiation et litiges',
          body: [
            'Pour les prestations destinées à des clients professionnels, les différends sont d’abord traités par échange amiable.',
            'Si des prestations sont proposées à des consommateurs au sens du droit français, les informations relatives au médiateur de la consommation devront être ajoutées ici avant commercialisation.',
          ],
        },
      ]}
    />
  )
}
