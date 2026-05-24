import type { Metadata } from 'next'
import LegalDocument from '@/components/legal/LegalDocument'
import { pageSeo } from '@/lib/seo'

export const metadata: Metadata = pageSeo({
  title: 'Cookies',
  description: 'Information sur les cookies et traceurs utilisés sur Dossier Studio.',
  path: '/cookies',
  noIndex: true,
})

export default function Page() {
  return (
    <LegalDocument
      label="Cookies"
      title="Cookies et traceurs"
      intro="Cette page explique les traceurs susceptibles d’être utilisés sur le site et la manière dont tu peux les gérer."
      blocks={[
        {
          title: 'Principe',
          body: [
            'Un cookie ou traceur est une information déposée ou lue sur ton terminal lorsque tu consultes un site. Certains traceurs sont nécessaires au fonctionnement technique du service, d’autres nécessitent ton accord préalable.',
          ],
        },
        {
          title: 'Traceurs nécessaires',
          body: [
            'Le site peut utiliser des éléments techniques nécessaires à son affichage, sa sécurité, sa performance ou son hébergement. Ces éléments ne poursuivent pas une finalité publicitaire.',
          ],
        },
        {
          title: 'Prise de rendez-vous Cal.com',
          body: [
            'La page diagnostic intègre un module Cal.com pour permettre la réservation d’un appel. Lorsque tu interagis avec ce module, Cal.com peut traiter des données et utiliser ses propres traceurs nécessaires à la réservation.',
          ],
        },
        {
          title: 'Mesure d’audience et marketing',
          body: [
            'À ce stade, aucun outil de publicité ciblée ou de mesure d’audience marketing n’est déclaré sur le site. Si un outil de ce type est ajouté, un mécanisme de consentement devra être mis en place avant le dépôt des traceurs concernés.',
          ],
        },
        {
          title: 'Gestion depuis le navigateur',
          body: [
            'Tu peux configurer ton navigateur pour bloquer ou supprimer les cookies. Le blocage de certains traceurs nécessaires peut cependant dégrader le fonctionnement de certaines fonctionnalités, notamment la prise de rendez-vous.',
          ],
        },
      ]}
    />
  )
}
