import type { Metadata } from 'next'
import MethodePageContent from '@/components/pages/MethodePageContent'

export const metadata: Metadata = {
  title: 'Comment ça fonctionne — Dossier Studio',
  description:
    "Le process Dossier Studio en 3 étapes : diagnostic, montage du dossier, dépôt et suivi pour les dossiers d'aides du secteur musical.",
}

export default function MethodePage() {
  return <MethodePageContent />
}
