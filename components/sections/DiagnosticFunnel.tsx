'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CalFloatingPopup, { openDiagnosticCal } from '@/components/diagnostic/CalFloatingPopup'
import { motionTiming } from '@/lib/tokens'
import Ruler from '@/components/daw/Ruler'

/* ─── Types ─────────────────────────────────── */
type Answers = {
  statut: string
  projet: string
  budget: string
  prenom: string
  email: string
  phone: string
  description: string
  website: string
}

const STEPS = ['Statut', 'Projet', 'Budget', 'Contact']

/* ─── Options ───────────────────────────────── */
const STATUTS = [
  { value: 'association',  label: 'Association' },
  { value: 'societe',      label: 'Société (SARL, SAS…)' },
  { value: 'artiste',      label: 'Artiste-Auteur' },
  { value: 'aucun',        label: 'Pas encore de structure' },
]

const PROJETS = [
  { value: 'production',    label: 'Production phonographique' },
  { value: 'clip-video',    label: 'Clip musical / vidéo' },
  { value: 'documentaire',  label: 'Documentaire' },
  { value: 'spectacle',     label: 'Spectacle & tournée' },
  { value: 'structuration', label: 'Structuration & fonctionnement' },
  { value: 'autre',         label: 'Autre' },
]

const BUDGETS = [
  { value: 'moins10',   label: 'Moins de 10 000 €' },
  { value: '10a50',     label: 'Entre 10 000 € et 50 000 €' },
  { value: 'plus50',    label: 'Plus de 50 000 €' },
]

/* ─── Variants ──────────────────────────────── */
const slideIn = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.45, ease: motionTiming.ease } },
  exit:    { opacity: 0, x: -32, transition: { duration: 0.3, ease: motionTiming.ease } },
}

/* ─── Component ─────────────────────────────── */
export default function DiagnosticFunnel() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({
    statut: '', projet: '', budget: '', prenom: '', email: '', phone: '', description: '', website: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function pick(field: keyof Answers, value: string) {
    setAnswers(a => ({ ...a, [field]: value }))
    if (step < 3) setTimeout(() => setStep(s => s + 1), 220)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!answers.prenom || !answers.email) return
    setSending(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'diagnostic',
          firstName: answers.prenom,
          email: answers.email,
          phone: answers.phone,
          status: answers.statut,
          projectType: answers.projet,
          budget: answers.budget,
          message: answers.description,
          website: answers.website,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'Envoi impossible')
      }

      setSubmitted(true)
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "L'envoi n'a pas abouti. Réessaie dans un instant."
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      className="min-h-screen"
      style={{ paddingTop: 'var(--nav-h)', borderBottom: '2px solid var(--black)' }}
    >
      <CalFloatingPopup />
      <Ruler label="Diagnostic · 2026" playheadDuration={20} />
      <h1 className="sr-only">Diagnostic gratuit pour aides et subventions musique</h1>

      {/* Progress */}
      <div
        className="flex border-b"
        style={{
          borderColor: 'var(--rule)',
          background: 'var(--surface)',
          height: 40,
        }}
      >
        <div
          className="hidden flex-shrink-0 items-center border-r px-5 md:flex"
          style={{ width: 'var(--label-w)', borderColor: 'var(--rule-dark)' }}
        >
          <span className="font-mono text-[0.5625rem] tracking-[0.14em] uppercase" style={{ color: 'var(--dim)' }}>
            Étape {step + 1}/{STEPS.length}
          </span>
        </div>
        <div className="mobile-no-scrollbar flex flex-1 items-center gap-3 overflow-x-auto px-4 md:px-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-shrink-0 items-center gap-2">
              <div
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: 34,
                  background: i <= step ? 'var(--accent)' : 'var(--rule)',
                }}
              />
              <span
                className="font-mono text-[0.5rem] tracking-[0.14em] uppercase transition-colors"
                style={{ color: i <= step ? 'var(--soft)' : 'var(--rule-dark)' }}
              >
                {s}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Funnel */}
      <div
        className="flex"
        style={{ minHeight: 'calc(100vh - var(--nav-h) - 40px - var(--ruler-h))' }}
      >
        {/* Label col */}
        <div
          className="hidden flex-shrink-0 flex-col justify-between border-r px-5 py-12 md:flex"
          style={{
            width: 'var(--label-w)',
            background: 'var(--track-bg)',
            borderColor: 'var(--rule-dark)',
          }}
        >
          <div>
            <span className="font-mono text-[0.625rem] font-bold tracking-[0.14em] uppercase block mb-1" style={{ color: 'var(--soft)' }}>
              Diagnostic
            </span>
            <span className="font-mono text-[0.5625rem] tracking-[0.1em] uppercase block" style={{ color: 'var(--dim)' }}>
              Évaluation
            </span>
          </div>
          <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)', boxShadow: '0 0 10px var(--accent-glow)' }} />
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center px-5 py-10 md:px-8 md:py-16" style={{ background: 'var(--surface)' }}>
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key={`step-${step}`} {...slideIn}>

                  {/* Step 0 — Statut */}
                  {step === 0 && (
                    <div>
                      <p className="font-mono text-[0.5625rem] tracking-[0.18em] uppercase mb-6" style={{ color: 'var(--accent)' }}>
                        Question 01 · Statut
                      </p>
                      <h2
                        className="font-cond font-black uppercase leading-[0.9] tracking-[-0.03em] mb-10"
                        style={{ fontSize: 'var(--fs-h2)', color: 'var(--black)' }}
                      >
                        Quel est ton statut<br />juridique actuel ?
                      </h2>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
                        {STATUTS.map(opt => (
                          <button
                            key={opt.value}
                            onClick={() => pick('statut', opt.value)}
                            className="min-h-[76px] text-left px-5 py-4 border rounded-xl font-cond font-bold uppercase tracking-[0.04em] text-[1rem] transition-all duration-200 hover:-translate-y-0.5 md:px-6 md:py-5 md:text-[1.05rem]"
                            style={{
                              borderColor: answers.statut === opt.value ? 'var(--accent)' : 'var(--rule-dark)',
                              background: answers.statut === opt.value ? 'rgba(200,82,50,0.08)' : 'var(--surface-2)',
                              color: answers.statut === opt.value ? 'var(--accent)' : 'var(--black)',
                              boxShadow: answers.statut === opt.value ? '0 0 0 1px var(--accent)' : 'none',
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 1 — Projet */}
                  {step === 1 && (
                    <div>
                      <p className="font-mono text-[0.5625rem] tracking-[0.18em] uppercase mb-6" style={{ color: 'var(--accent)' }}>
                        Question 02 · Type de projet
                      </p>
                      <h2
                        className="font-cond font-black uppercase leading-[0.9] tracking-[-0.03em] mb-10"
                        style={{ fontSize: 'var(--fs-h2)', color: 'var(--black)' }}
                      >
                        Sur quel type de projet<br />cherches-tu des financements ?
                      </h2>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
                        {PROJETS.map(opt => (
                          <button
                            key={opt.value}
                            onClick={() => pick('projet', opt.value)}
                            className="min-h-[76px] text-left px-5 py-4 border rounded-xl font-cond font-bold uppercase tracking-[0.04em] text-[1rem] transition-all duration-200 hover:-translate-y-0.5 md:px-6 md:py-5 md:text-[1.05rem]"
                            style={{
                              borderColor: answers.projet === opt.value ? 'var(--accent)' : 'var(--rule-dark)',
                              background: answers.projet === opt.value ? 'rgba(200,82,50,0.08)' : 'var(--surface-2)',
                              color: answers.projet === opt.value ? 'var(--accent)' : 'var(--black)',
                              boxShadow: answers.projet === opt.value ? '0 0 0 1px var(--accent)' : 'none',
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2 — Budget */}
                  {step === 2 && (
                    <div>
                      <p className="font-mono text-[0.5625rem] tracking-[0.18em] uppercase mb-6" style={{ color: 'var(--accent)' }}>
                        Question 03 · Budget
                      </p>
                      <h2
                        className="font-cond font-black uppercase leading-[0.9] tracking-[-0.03em] mb-10"
                        style={{ fontSize: 'var(--fs-h2)', color: 'var(--black)' }}
                      >
                        Quel est le budget global<br />estimé de ton projet ?
                      </h2>
                      <div className="flex flex-col gap-4">
                        {BUDGETS.map(opt => (
                          <button
                            key={opt.value}
                            onClick={() => pick('budget', opt.value)}
                            className="text-left px-5 py-4 border rounded-xl font-cond font-bold uppercase tracking-[0.04em] text-[1rem] transition-all duration-200 hover:-translate-y-0.5 md:px-8 md:py-5 md:text-[1.15rem]"
                            style={{
                              borderColor: answers.budget === opt.value ? 'var(--accent)' : 'var(--rule-dark)',
                              background: answers.budget === opt.value ? 'rgba(200,82,50,0.08)' : 'var(--surface-2)',
                              color: answers.budget === opt.value ? 'var(--accent)' : 'var(--black)',
                              boxShadow: answers.budget === opt.value ? '0 0 0 1px var(--accent)' : 'none',
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

	                  {/* Step 3 — Contact */}
	                  {step === 3 && (
	                    <form onSubmit={handleSubmit}>
	                      <div className="hidden" aria-hidden="true">
	                        <label>
	                          Site web
	                          <input
	                            tabIndex={-1}
	                            autoComplete="off"
	                            value={answers.website}
	                            onChange={e => setAnswers(a => ({ ...a, website: e.target.value }))}
	                          />
	                        </label>
	                      </div>
	                      <p className="font-mono text-[0.5625rem] tracking-[0.18em] uppercase mb-6" style={{ color: 'var(--accent)' }}>
                        Question 04 · Contact
                      </p>
                      <h2
                        className="font-cond font-black uppercase leading-[0.9] tracking-[-0.03em] mb-10"
                        style={{ fontSize: 'var(--fs-h2)', color: 'var(--black)' }}
                      >
                        Comment te contacter<br />pour le verdict ?
                      </h2>
                      <div className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="flex flex-col gap-2">
                            <label className="font-mono text-[0.5625rem] tracking-[0.14em] uppercase" style={{ color: 'var(--dim)' }}>
                              Prénom *
                            </label>
	                            <input
	                              type="text"
	                              required
	                              name="firstName"
	                              autoComplete="given-name"
	                              maxLength={80}
	                              value={answers.prenom}
                              onChange={e => setAnswers(a => ({ ...a, prenom: e.target.value }))}
                              placeholder="Ton prénom"
                              className="px-5 py-3 rounded-lg border font-body text-[0.95rem] outline-none transition-all"
                              style={{
                                background: 'var(--surface-2)',
                                borderColor: 'var(--rule-dark)',
                                color: 'var(--black)',
                              }}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="font-mono text-[0.5625rem] tracking-[0.14em] uppercase" style={{ color: 'var(--dim)' }}>
                              Email *
                            </label>
	                            <input
	                              type="email"
	                              required
	                              name="email"
	                              autoComplete="email"
	                              maxLength={254}
	                              value={answers.email}
                              onChange={e => setAnswers(a => ({ ...a, email: e.target.value }))}
                              placeholder="ton@email.com"
                              className="px-5 py-3 rounded-lg border font-body text-[0.95rem] outline-none transition-all"
                              style={{
                                background: 'var(--surface-2)',
                                borderColor: 'var(--rule-dark)',
                                color: 'var(--black)',
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="font-mono text-[0.5625rem] tracking-[0.14em] uppercase" style={{ color: 'var(--dim)' }}>
                            WhatsApp / téléphone facultatif
                          </label>
	                          <input
	                            type="tel"
	                            name="phone"
	                            autoComplete="tel"
	                            maxLength={40}
	                            value={answers.phone}
                            onChange={e => setAnswers(a => ({ ...a, phone: e.target.value }))}
                            placeholder="+262..., +33..., WhatsApp..."
                            className="px-5 py-3 rounded-lg border font-body text-[0.95rem] outline-none transition-all"
                            style={{
                              background: 'var(--surface-2)',
                              borderColor: 'var(--rule-dark)',
                              color: 'var(--black)',
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="font-mono text-[0.5625rem] tracking-[0.14em] uppercase" style={{ color: 'var(--dim)' }}>
                            Description du projet facultative
                          </label>
	                          <textarea
	                            name="message"
	                            maxLength={3000}
	                            value={answers.description}
                            onChange={e => setAnswers(a => ({ ...a, description: e.target.value }))}
                            placeholder="Quelques lignes sur ton projet, le dispositif envisagé, les délais ou le blocage actuel..."
                            rows={4}
                            className="resize-y px-5 py-3 rounded-lg border font-body text-[0.95rem] leading-[1.6] outline-none transition-all"
                            style={{
                              background: 'var(--surface-2)',
                              borderColor: 'var(--rule-dark)',
                              color: 'var(--black)',
                            }}
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={sending}
                          className="mt-4 w-full px-6 py-4 rounded-xl font-cond font-black uppercase tracking-[0.06em] text-[0.95rem] transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 md:px-10 md:text-[1rem]"
                          style={{
                            background: 'linear-gradient(135deg, var(--accent), #d86a47)',
                            color: '#fff',
                            boxShadow: '0 18px 40px rgba(200,82,50,0.2)',
                          }}
                        >
                          {sending ? 'Envoi…' : 'Obtenir mon diagnostic →'}
                        </button>
	                        {submitError ? (
	                          <p role="alert" className="font-body text-[0.9rem] leading-[1.6]" style={{ color: 'var(--accent)' }}>
	                            {submitError}
	                          </p>
                        ) : null}
                        <p className="font-body text-[0.78rem] leading-[1.7]" style={{ color: 'var(--dim)' }}>
                          Les informations envoyées servent uniquement à préparer ton retour de diagnostic.
                          Détails dans la{' '}
                          <Link
                            href="/politique-confidentialite"
                            className="underline decoration-[rgba(200,82,50,0.5)] underline-offset-4 hover:text-accent"
                          >
                            politique de confidentialité
                          </Link>
                          .
                        </p>
                      </div>
                    </form>
                  )}

                </motion.div>
              ) : (
                <motion.div key="success" {...slideIn} className="text-center py-12">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8"
                    style={{ background: 'rgba(200,82,50,0.12)', border: '1px solid rgba(200,82,50,0.3)' }}
                  >
                    <span className="text-2xl" style={{ color: 'var(--accent)' }}>✓</span>
                  </div>
                  <h2
                    className="font-cond font-black uppercase leading-[0.9] tracking-[-0.03em] mb-6"
                    style={{ fontSize: 'var(--fs-h2)', color: 'var(--black)' }}
                  >
                    Reçu, {answers.prenom}.
                  </h2>
                  <p className="font-body text-[1rem] leading-[1.75] mb-2" style={{ color: 'var(--soft)' }}>
                    Je reviens vers toi sous 48h avec un retour personnalisé sur le potentiel<br />de financement de ton projet.
                  </p>
                  <p className="font-mono text-[0.5625rem] tracking-[0.14em] uppercase mt-8" style={{ color: 'var(--dim)' }}>
                    Réponse envoyée à · {answers.email}
                  </p>
                  <button
                    type="button"
                    onClick={openDiagnosticCal}
                    className="mt-8 px-10 py-4 rounded-xl font-cond font-black uppercase tracking-[0.06em] text-[0.9rem] transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent), #d86a47)',
                      color: '#fff',
                      boxShadow: '0 18px 40px rgba(200,82,50,0.2)',
                    }}
                  >
                    Réserver mon appel →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Back button */}
            {step > 0 && !submitted && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="mt-10 font-mono text-[0.5625rem] tracking-[0.14em] uppercase transition-colors hover:opacity-100"
                style={{ color: 'var(--dim)', opacity: 0.7 }}
              >
                ← Retour
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
