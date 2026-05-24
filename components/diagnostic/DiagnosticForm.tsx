'use client'

import { FormEvent, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { openDiagnosticCal } from '@/components/diagnostic/CalFloatingPopup'

type Answers = {
  status: string
  projectType: string
  budget: string
  firstName: string
  email: string
  phone: string
}

const initialAnswers: Answers = {
  status: '',
  projectType: '',
  budget: '',
  firstName: '',
  email: '',
  phone: '',
}

const questions = [
  {
    id: 'status',
    eyebrow: 'Qualification · 01',
    title: 'Quel est ton statut juridique actuel ?',
    reason: "La majorité des aides nécessite une structure ou un cadre juridique clair.",
    options: ['Association', 'Société (SARL, SAS...)', 'Artiste-Auteur', 'Pas encore de structure'],
  },
  {
    id: 'projectType',
    eyebrow: 'Orientation · 02',
    title: 'Sur quel type de projet cherches-tu des financements ?',
    reason: "Cela permet d'orienter rapidement vers les bons guichets : CNM, SACEM, collectivités, appels à projets culturels...",
    options: [
      'Production phonographique',
      'Clip musical / vidéo',
      'Documentaire',
      'Spectacle & tournée',
      'Structuration & fonctionnement',
      'Autre',
    ],
  },
  {
    id: 'budget',
    eyebrow: 'Potentiel · 03',
    title: 'Quel est le budget global estimé de ton projet ?',
    reason: "Le niveau de budget permet d'évaluer si un accompagnement complet est pertinent.",
    options: ['Moins de 10k€', 'Entre 10k€ et 50k€', 'Plus de 50k€'],
  },
] as const

const fieldClass =
  'w-full border-0 border-b border-rule bg-transparent px-0 py-3 font-body text-[1rem] text-ink outline-none placeholder:text-dim focus:border-accent'

export default function DiagnosticForm() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>(initialAnswers)
  const [attempted, setAttempted] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const progress = ((step + 1) / 4) * 100
  const currentQuestion = questions[step]

  const contactValid = Boolean(answers.firstName.trim() && answers.email.trim())
  const isComplete = Boolean(answers.status && answers.projectType && answers.budget && contactValid)

  const choose = (key: 'status' | 'projectType' | 'budget', value: string) => {
    setAnswers((current) => ({ ...current, [key]: value }))
    setAttempted(false)
    setStep((current) => Math.min(current + 1, 3))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setAttempted(true)
    setSubmitError('')

    if (!isComplete) return

    setIsSending(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'diagnostic',
          firstName: answers.firstName,
          email: answers.email,
          phone: answers.phone,
          status: answers.status,
          projectType: answers.projectType,
          budget: answers.budget,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'Envoi impossible')
      }

      setIsSubmitted(true)
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "L'envoi n'a pas abouti. Réessaie dans un instant."
      )
    } finally {
      setIsSending(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative overflow-hidden rounded-[24px] border border-[rgba(23,21,20,0.12)] bg-[rgba(255,255,255,0.88)] px-8 py-16 text-center shadow-[0_8px_32px_rgba(23,21,20,0.08)] backdrop-blur-2xl"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.7), 0 24px 64px rgba(23,21,20,0.12)',
        }}
      >
        {/* Shimmer gradient for glass effect */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-white/60 to-transparent" />
        
        <div className="relative z-10 flex flex-col items-center justify-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent shadow-[0_0_24px_rgba(200,82,50,0.2)]">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-cond text-[2.2rem] font-black uppercase leading-none tracking-[-0.02em] text-black">
            C&apos;est noté !
          </h2>
          <p className="max-w-[420px] font-body text-[1.05rem] leading-[1.7] text-[rgba(23,21,20,0.78)]">
            Ton mail est en cours de préparation. Pour valider l&apos;éligibilité de ton projet, réserve ton appel découverte de 15 minutes.
          </p>
          <button
            type="button"
            onClick={openDiagnosticCal}
            data-cal-link="alexandre-paviel-formateur-consultant-ia-p4cha5/diagnostic-gratuit"
            data-cal-namespace="diagnostic-gratuit"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="mt-4 px-10 py-5 font-cond text-[0.8rem] font-bold uppercase tracking-[0.16em] text-white transition-transform hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, var(--accent), #d86a47)',
              boxShadow: '0 12px 32px rgba(200,82,50,0.25)',
              borderRadius: '999px',
            }}
          >
            📅 Planifier ma visio
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="overflow-hidden border border-rule-dark bg-[var(--surface)]">
      <div className="grid border-b border-rule lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="px-6 py-6">
          <p className="mb-3 font-mono text-[0.75rem] tracking-[0.16em] uppercase text-accent">
            Diagnostic gratuit
          </p>
          <p className="max-w-xl font-body text-[0.98rem] leading-[1.8] text-soft">
            Quatre réponses rapides suffisent pour filtrer les projets non éligibles, estimer le
            potentiel et préparer un retour clair.
          </p>
        </div>
        <div className="border-t border-rule px-6 py-6 lg:border-l lg:border-t-0" style={{ background: 'var(--surface-2)' }}>
          <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim">
            Étape {step + 1}/4
          </p>
          <div className="h-2 overflow-hidden rounded-full bg-[rgba(23,21,20,0.1)]">
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
        </div>
      </div>

      <div className="min-h-[430px] px-6 py-8 md:px-8 md:py-10">
        <AnimatePresence mode="wait">
          {currentQuestion ? (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]"
            >
              <div>
                <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-accent">
                  {currentQuestion.eyebrow}
                </p>
                <h2
                  className="mb-5 font-cond font-black uppercase leading-[0.95] tracking-[-0.03em] text-black"
                  style={{ fontSize: 'clamp(1.55rem, 2.55vw, 2.75rem)' }}
                >
                  {currentQuestion.title}
                </h2>
                <div className="grid gap-3">
                  {currentQuestion.options.map((option) => {
                    const selected = answers[currentQuestion.id] === option
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => choose(currentQuestion.id, option)}
                        className="group flex items-center justify-between border border-rule px-5 py-4 text-left transition-colors hover:border-accent hover:bg-[rgba(200,82,50,0.08)]"
                        style={{ background: selected ? 'rgba(200,82,50,0.1)' : 'var(--surface-2)' }}
                      >
                        <span className="font-cond text-[1rem] font-bold uppercase tracking-[0.08em] text-ink">
                          {option}
                        </span>
                        <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-accent">
                          {selected ? 'Choisi' : '→'}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
              <aside className="border-l border-rule-dark pl-6">
                <p className="mb-3 font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim">
                  Pourquoi cette question ?
                </p>
                <p className="font-body text-[0.95rem] leading-[1.8] text-soft">{currentQuestion.reason}</p>
              </aside>
            </motion.div>
          ) : (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]"
            >
              <div>
                <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-accent">
                  Contact · 04
                </p>
                <h2
                  className="mb-6 font-cond font-black uppercase leading-[0.95] tracking-[-0.03em] text-black"
                  style={{ fontSize: 'clamp(1.55rem, 2.55vw, 2.75rem)' }}
                >
                  Comment te contacter pour le verdict ?
                </h2>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim">Prénom</span>
                    <input
                      value={answers.firstName}
                      onChange={(event) => setAnswers((current) => ({ ...current, firstName: event.target.value }))}
                      placeholder="Ton prénom"
                      className={fieldClass}
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim">Email</span>
                    <input
                      type="email"
                      value={answers.email}
                      onChange={(event) => setAnswers((current) => ({ ...current, email: event.target.value }))}
                      placeholder="ton@email.com"
                      className={fieldClass}
                    />
                  </label>
                  <label className="flex flex-col gap-2 md:col-span-2">
                    <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim">
                      WhatsApp / téléphone facultatif
                    </span>
                    <input
                      value={answers.phone}
                      onChange={(event) => setAnswers((current) => ({ ...current, phone: event.target.value }))}
                      placeholder="+262..., +33..., WhatsApp..."
                      className={fieldClass}
                    />
                  </label>
                </div>
              </div>
              <aside className="border-l border-rule-dark pl-6">
                <p className="mb-3 font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim">
                  Synthèse
                </p>
                <div className="space-y-3">
                  {[
                    ['Statut', answers.status],
                    ['Projet', answers.projectType],
                    ['Budget', answers.budget],
                  ].map(([label, value]) => (
                    <p key={label} className="font-body text-[0.95rem] leading-[1.7] text-soft">
                      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-dim">{label} :</span>{' '}
                      {value}
                    </p>
                  ))}
                </div>
              </aside>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-4 border-t border-rule px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              setAttempted(false)
              setStep((current) => Math.max(current - 1, 0))
            }}
            disabled={step === 0}
            className="border border-rule px-5 py-3 font-cond text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-soft transition-opacity disabled:opacity-35"
          >
            Retour
          </button>
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((current) => Math.min(current + 1, 3))}
              className="border border-rule-dark px-5 py-3 font-cond text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink"
            >
              Passer
            </button>
          ) : null}
        </div>

        <div className="flex flex-col items-start gap-3 lg:items-end">
          {step === 3 ? (
            <button
              type="submit"
              disabled={isSending}
              className="font-cond font-bold uppercase tracking-[0.16em] text-white px-8 py-4 text-[0.6875rem] transition-opacity"
              style={{
                background: 'linear-gradient(135deg, var(--accent), #d86a47)',
                boxShadow: '0 18px 40px rgba(200,82,50,0.18)',
                opacity: contactValid && !isSending ? 1 : 0.72,
              }}
            >
              {isSending ? 'Envoi...' : 'Obtenir mon diagnostic'}
            </button>
          ) : (
            <p className="font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-dim">
              Réponse sous 48h ouvrées
            </p>
          )}
          {attempted && !isComplete ? (
            <p className="font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-accent">
              Merci de compléter le prénom et l&apos;email.
            </p>
          ) : null}
          {submitError ? (
            <p className="font-body text-[0.93rem] leading-[1.6] text-accent">{submitError}</p>
          ) : null}
        </div>
      </div>
    </form>
  )
}
