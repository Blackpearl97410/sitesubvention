'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'

const fieldClass =
  'w-full border-0 border-b border-rule bg-transparent px-0 py-3 font-body text-[1rem] text-ink outline-none placeholder:text-dim focus:border-accent'

export default function ContactForm() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'contact',
          firstName,
          email,
          phone,
          message,
          website,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'Envoi impossible')
      }

      setStatus('sent')
      setFirstName('')
      setEmail('')
      setPhone('')
      setMessage('')
      setWebsite('')
    } catch (submitError) {
      setStatus('error')
      setError(
        submitError instanceof Error
          ? submitError.message
          : "L'envoi n'a pas abouti. Réessaie dans un instant."
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="hidden" aria-hidden="true">
        <label>
          Site web
          <input
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </label>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim">
            Prénom
          </span>
          <input
            required
            name="firstName"
            autoComplete="given-name"
            maxLength={80}
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="Ton prénom"
            className={fieldClass}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim">
            Email
          </span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="ton@email.com"
            className={fieldClass}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim">
          WhatsApp / téléphone facultatif
        </span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={40}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+262..., +33..., WhatsApp..."
          className={fieldClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim">
          Message
        </span>
        <textarea
          required
          name="message"
          maxLength={3000}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Type de structure, projet, dispositif visé, blocage actuel..."
          className={`${fieldClass} min-h-[120px] resize-y`}
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex justify-center px-8 py-4 font-cond text-[0.625rem] font-bold uppercase tracking-[0.16em] text-white transition-opacity disabled:opacity-60"
          style={{
            background: 'linear-gradient(135deg, var(--accent), #d86a47)',
            boxShadow: '0 18px 40px rgba(200,82,50,0.18)',
          }}
        >
          {status === 'sending' ? 'Envoi en cours...' : 'Envoyer ma demande →'}
        </button>
        {status === 'sent' ? (
          <p role="status" aria-live="polite" className="font-body text-[0.93rem] leading-[1.6] text-soft">
            Message envoyé. Réponse sous 48h ouvrées.
          </p>
        ) : null}
        {status === 'error' ? (
          <p role="alert" className="font-body text-[0.93rem] leading-[1.6] text-accent">{error}</p>
        ) : null}
      </div>

      <p className="font-body text-[0.78rem] leading-[1.7] text-dim">
        En envoyant ce formulaire, tu acceptes que Dossier Studio utilise ces informations pour répondre
        à ta demande. Détails dans la{' '}
        <Link href="/politique-confidentialite" className="underline decoration-accent/50 underline-offset-4 hover:text-accent">
          politique de confidentialité
        </Link>
        .
      </p>
    </form>
  )
}
