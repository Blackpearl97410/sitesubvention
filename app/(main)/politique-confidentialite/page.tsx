import type { Metadata } from 'next'
import LegalDocument from '@/components/legal/LegalDocument'
import { legalDetails } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Dossier Studio',
  description: 'Politique de confidentialité et traitement des données personnelles par Dossier Studio.',
}

export default function Page() {
  return (
    <LegalDocument
      label="Confidentialité"
      title="Politique de confidentialité"
      intro="Cette politique explique quelles données sont collectées, pourquoi elles le sont, combien de temps elles sont conservées et comment exercer tes droits."
      blocks={[
        {
          title: 'Responsable du traitement',
          body: [
            `Le responsable du traitement est ${legalDetails.brandName}, édité par ${legalDetails.editorName}. Pour toute question relative aux données personnelles, tu peux écrire à ${legalDetails.contactEmail}.`,
          ],
        },
        {
          title: 'Données collectées',
          items: [
            'Formulaire de contact : prénom, email, WhatsApp ou téléphone facultatif, message et contexte transmis.',
            'Diagnostic : statut juridique, type de projet, budget estimé, prénom, email et WhatsApp ou téléphone facultatif.',
            'Prise de rendez-vous : informations saisies dans l’interface Cal.com lorsque tu réserves un appel.',
            'Données techniques : informations strictement nécessaires à la sécurité et au bon fonctionnement du site, comme les journaux serveur.',
          ],
        },
        {
          title: 'Finalités',
          items: [
            'Répondre à une demande de contact ou de diagnostic.',
            'Évaluer l’adéquation entre un projet et les dispositifs d’aides possibles.',
            'Préparer un échange commercial, un devis ou une proposition d’accompagnement.',
            'Planifier un appel lorsque tu utilises le module de réservation.',
            'Assurer la sécurité, la maintenance et l’amélioration du site.',
          ],
        },
        {
          title: 'Bases légales',
          body: [
            'Les traitements reposent principalement sur l’exécution de mesures précontractuelles lorsque tu demandes un diagnostic, un devis ou un échange, ainsi que sur l’intérêt légitime de Dossier Studio à répondre aux demandes reçues et à sécuriser le site.',
            'Lorsque des communications commerciales distinctes seraient mises en place, elles nécessiteraient une information dédiée et, selon les cas, ton consentement préalable.',
          ],
        },
        {
          title: 'Destinataires et sous-traitants',
          items: [
            'Dossier Studio, pour lire et traiter les demandes.',
            'Resend, pour l’acheminement des emails envoyés depuis les formulaires.',
            'Cal.com, lorsque tu utilises le module de réservation d’appel.',
            'Vercel ou l’hébergeur retenu, pour l’hébergement technique du site.',
          ],
        },
        {
          title: 'Durée de conservation',
          items: [
            'Demandes de contact et diagnostics sans suite : jusqu’à 24 mois après le dernier échange.',
            'Prospects et échanges commerciaux : jusqu’à 3 ans après le dernier contact actif.',
            'Documents contractuels, devis, factures et pièces liées à une mission : durée légale applicable aux obligations comptables et contractuelles.',
            'Journaux techniques : durée limitée aux besoins de sécurité et d’exploitation.',
          ],
        },
        {
          title: 'Transferts hors Union européenne',
          body: [
            'Certains prestataires techniques, notamment d’hébergement, d’email ou de réservation, peuvent impliquer des traitements ou accès depuis des pays situés hors Union européenne. Dossier Studio s’appuie sur les garanties contractuelles et mesures de sécurité proposées par ces prestataires.',
          ],
        },
        {
          title: 'Tes droits',
          body: [
            `Tu peux demander l’accès, la rectification, l’effacement, la limitation ou l’opposition au traitement de tes données en écrivant à ${legalDetails.contactEmail}.`,
            'Tu peux également introduire une réclamation auprès de la CNIL si tu estimes que tes droits ne sont pas respectés.',
          ],
        },
      ]}
    />
  )
}
