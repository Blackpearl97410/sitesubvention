import type { Metadata } from 'next'
import LegalDocument from '@/components/legal/LegalDocument'
import { legalDetails } from '@/lib/legal'
import { pageSeo } from '@/lib/seo'

export const metadata: Metadata = pageSeo({
  title: 'Conditions générales',
  description: 'Conditions générales de service de Dossier Studio.',
  path: '/conditions-generales',
  noIndex: true,
})

export default function Page() {
  return (
    <LegalDocument
      label="Conditions"
      title="Conditions générales"
      intro="Ces conditions cadrent l’utilisation du site et les principes applicables aux prestations d’accompagnement proposées par Dossier Studio."
      blocks={[
        {
          title: 'Objet',
          body: [
            'Dossier Studio accompagne des artistes, labels, éditeurs, associations et structures culturelles dans la préparation de dossiers d’aides, de subventions et d’appels à projets.',
            'Les prestations peuvent inclure le diagnostic, la recherche d’aides ciblée, la structuration budgétaire, la relecture, la rédaction ou l’amélioration d’un argumentaire et la préparation d’un calendrier de dépôt.',
          ],
        },
        {
          title: 'Diagnostic et devis',
          body: [
            'Le diagnostic gratuit sert à qualifier le besoin et à estimer si un accompagnement est pertinent. Il ne constitue pas une acceptation automatique de mission.',
            'Toute prestation payante fait l’objet d’un devis, d’une proposition ou d’un accord écrit précisant le périmètre, les livrables, les délais, les tarifs et les éventuelles conditions de success fee.',
          ],
        },
        {
          title: 'Modèle tarifaire',
          body: [
            'Selon la situation, l’accompagnement peut reposer sur un forfait fixe, une prestation sur devis, ou un modèle hybride associant frais d’ingénierie et commission de succès.',
            'Lorsqu’un success fee est prévu, son taux, son assiette, son fait générateur et ses modalités de paiement doivent être indiqués dans le devis ou la lettre de mission.',
          ],
        },
        {
          title: 'Obligations du client',
          items: [
            'Transmettre des informations exactes, sincères et complètes.',
            'Fournir les pièces nécessaires dans les délais convenus.',
            'Signaler tout changement de calendrier, budget, statut juridique ou périmètre du projet.',
            'Valider les éléments soumis avant dépôt lorsque le dépôt reste effectué par le client.',
          ],
        },
        {
          title: 'Absence de garantie d’obtention',
          body: [
            'Dossier Studio s’engage sur une méthode, une qualité de préparation et un niveau d’accompagnement, mais ne garantit jamais l’obtention d’une aide, d’une subvention ou d’un appel à projets.',
            'Les décisions appartiennent aux organismes financeurs, jurys, commissions ou collectivités concernés.',
          ],
        },
        {
          title: 'Délais et calendrier',
          body: [
            'Les délais de réalisation dépendent de la disponibilité des informations, des pièces transmises et des dates limites propres à chaque dispositif. Un dossier transmis trop tardivement peut nécessiter un report, un accompagnement réduit ou un refus de mission.',
          ],
        },
        {
          title: 'Confidentialité',
          body: [
            'Les informations artistiques, budgétaires, stratégiques ou administratives transmises dans le cadre d’une mission sont traitées comme confidentielles, sauf accord contraire ou obligation légale.',
          ],
        },
        {
          title: 'Paiement, annulation et retard',
          body: [
            'Les conditions de paiement, d’acompte, d’annulation, de suspension et de retard doivent être précisées dans le devis ou les conditions particulières remises au client.',
            'Si une facturation avec pénalités de retard ou indemnité forfaitaire de recouvrement est applicable, les mentions exactes devront être ajoutées avant usage commercial.',
          ],
        },
        {
          title: 'Droit applicable et contact',
          body: [
            'Les présentes conditions sont régies par le droit français. En cas de difficulté, les parties privilégient d’abord un échange amiable.',
            `Pour toute question : ${legalDetails.contactEmail}.`,
          ],
        },
      ]}
    />
  )
}
