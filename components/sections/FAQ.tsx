'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Ruler from '@/components/daw/Ruler'
import Track from '@/components/daw/Track'
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton'
import ContactAtmosphere from '@/components/sections/ContactAtmosphere'
import { cn } from '@/lib/cn'
import { faqItems } from '@/lib/faq'

function FAQItem({ item, isOpen, onToggle }: {
  item: typeof faqItems[0]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <Track
      name={`Question ${item.id}`}
      type={isOpen ? 'Réponse ouverte' : 'Question fréquente'}
      armed={isOpen}
      hideLabel
      contentClassName="!relative !overflow-hidden !p-0 cursor-pointer"
      className={cn('transition-colors', isOpen ? 'bg-paper' : 'hover:bg-paper')}
    >
      <ContactAtmosphere compact className={cn('opacity-0 transition-opacity duration-500', isOpen ? 'opacity-45' : 'group-hover:opacity-25')} />
      <button onClick={onToggle} className="relative z-10 w-full flex items-start gap-8 px-8 py-6 text-left sm:px-12">
        <span
          className={cn('font-cond font-black leading-none tracking-[-0.03em] flex-shrink-0 transition-colors', isOpen ? 'text-accent' : 'text-rule-dark')}
          style={{ fontSize: 'var(--fs-h3)' }}
        >
          {item.id}
        </span>
        <div className="flex-1">
          <h3
            className={cn('font-cond font-extrabold uppercase leading-[1.1] tracking-[-0.01em] transition-colors', isOpen ? 'text-black' : 'text-ink')}
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.5rem)' }}
          >
            {item.question}
          </h3>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <p className="font-body font-light text-soft text-sm leading-[1.8] max-w-xl mt-4">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span className={cn('font-mono text-base flex-shrink-0 transition-transform mt-0.5', isOpen ? 'rotate-45 text-accent' : 'text-dim')}>
          +
        </span>
      </button>
    </Track>
  )
}

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section className="relative overflow-hidden" style={{ borderBottom: '2px solid var(--black)' }}>
      <Ruler label="Questions" playheadDuration={18} playheadDelay={-4} hideLabel />

      <Track
        name="Questions"
        type="Objections fréquentes"
        armed
        hideLabel
        contentClassName="!relative !overflow-hidden !py-10 !px-8 sm:!px-12 !items-start"
      >
        <ContactAtmosphere />
        <div className="relative z-10 grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <span className="font-mono text-[0.4375rem] tracking-[0.18em] uppercase text-accent">
              À vérifier avant de se lancer
            </span>
            <h2
              className="mt-5 font-cond font-black uppercase leading-[0.92] tracking-[-0.01em] text-black"
              style={{ fontSize: 'var(--fs-h2)' }}
            >
              Les objections normales<br />avant de déposer.
            </h2>
          </div>
          <div className="relative overflow-hidden border border-white/10 bg-white/[0.04] px-6 py-6">
            <ContactAtmosphere compact className="opacity-35" />
            <div className="relative z-10 space-y-4">
              <p className="font-cond text-[1rem] font-bold uppercase tracking-[0.08em] text-black">
                Le bon dossier commence souvent par une bonne hésitation.
              </p>
              <p className="font-body text-[0.95rem] leading-[1.75] text-soft">
                Éligibilité, budget, timing, coût d’accompagnement : on clarifie ces points avant
                de promettre quoi que ce soit.
              </p>
            </div>
          </div>
        </div>
      </Track>

      {faqItems.map((item) => (
        <FAQItem
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
        />
      ))}

      <Track
        name="Besoin d'avis"
        type="Diagnostic"
        hideLabel
        contentClassName="!relative !overflow-hidden !py-8 !px-8 sm:!px-12 !gap-6"
      >
        <ContactAtmosphere compact className="opacity-45" />
        <div className="relative z-10 flex flex-1 flex-col gap-2">
          <span className="font-mono text-[0.4375rem] uppercase tracking-[0.16em] text-accent">
            Vérifier ton cas
          </span>
          <p className="font-body text-soft text-[1rem] leading-[1.75] max-w-[760px]">
            Le plus simple reste de vérifier ton projet concret en 20 minutes : statut, budget,
            guichets possibles et niveau d’accompagnement utile.
          </p>
        </div>
        <div className="relative z-10 flex flex-col gap-3 sm:flex-row">
          <LiquidGlassButton href="/diagnostic" warm size="lg" className="flex-shrink-0" contentClassName="text-white">
            Diagnostic gratuit →
          </LiquidGlassButton>
          <LiquidGlassButton href="/offres" size="lg" className="flex-shrink-0">
            Voir les offres →
          </LiquidGlassButton>
        </div>
      </Track>
    </section>
  )
}
