import type { Metadata } from 'next'
import DiagnosticFunnel from '@/components/sections/DiagnosticFunnel'

export const metadata: Metadata = {
  title: 'Diagnostic gratuit — Dossier Studio',
  description:
    "4 questions pour évaluer le potentiel de financement de ton projet musical. Diagnostic gratuit, verdict sous 48h.",
}

export default function DiagnosticPage() {
  return <DiagnosticFunnel />
}
