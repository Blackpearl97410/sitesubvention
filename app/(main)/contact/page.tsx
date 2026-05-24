import type { Metadata } from 'next'
import Link from 'next/link'
import Ruler from '@/components/daw/Ruler'
import Track from '@/components/daw/Track'
import ContactAtmosphere from '@/components/sections/ContactAtmosphere'
import ContactForm from '@/components/sections/ContactForm'
import { contactEmail } from '@/lib/site'
import { pageSeo } from '@/lib/seo'

export const metadata: Metadata = pageSeo({
  title: 'Contact consultant subventions musique et projets culturels',
  description:
    "Contactez Dossier Studio pour un dossier CNM, SACEM, ADAMI, SPEDIDAM, une relecture de demande ou un premier échange sur votre projet musical.",
  path: '/contact',
  keywords: ['contact consultant subvention musique', 'aide dossier CNM contact', 'accompagnement dossier culturel'],
})

export default function Page() {
  return (
    <section className="relative overflow-hidden" style={{ paddingTop: 'var(--nav-h)', borderBottom: '2px solid var(--black)' }}>
      <Ruler label="Contact" playheadDuration={18} hideLabel />

      <Track
        name="Contact"
        type="Écrire ou diagnostiquer"
        armed
        hideLabel
        contentClassName="!relative !overflow-hidden !py-16 !px-8 sm:!px-12 !items-start"
      >
        <ContactAtmosphere />
        <div className="relative z-10 grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col gap-6">
            <span className="font-mono text-[0.4375rem] tracking-[0.18em] uppercase text-accent">
              Premier échange
            </span>
            <h1
              className="font-cond font-black uppercase leading-[0.88] text-black max-w-[920px]"
              style={{
                fontFamily: 'var(--font-barlow-condensed), sans-serif',
                fontSize: 'clamp(4rem, 8.2vw, 9rem)',
                letterSpacing: 0,
              }}
            >
              Une question simple,
              <br />
              un projet précis,
              <br />
              ou un dossier à reprendre.
            </h1>
            <p className="font-body text-[1.04rem] leading-[1.9] text-soft max-w-[760px]">
              Si tu sais déjà pourquoi tu viens, tu peux écrire directement. Si tu veux d&apos;abord clarifier
              ton éligibilité, les bons dispositifs ou le niveau d&apos;accompagnement utile, le diagnostic
              reste le meilleur point d&apos;entrée.
            </p>
            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              {[
                ['01', 'Message direct'],
                ['02', 'Diagnostic'],
                ['03', 'Appel court'],
              ].map(([step, label]) => (
                <div
                  key={step}
                  className="group border border-white/10 bg-white/[0.04] px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-accent/70 hover:bg-white/[0.07]"
                >
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                    {step}
                  </span>
                  <p className="mt-3 font-cond text-[0.95rem] font-bold uppercase tracking-[0.08em] text-black">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden border-l border-rule-dark pl-8 pt-1">
            <ContactAtmosphere compact className="opacity-50" />
            <div className="relative z-10">
            <p className="font-mono text-[0.4rem] tracking-[0.16em] uppercase text-dim mb-3">Repères</p>
            <div className="space-y-3">
              {[
                'Réponse sous 48h ouvrées',
                'France & La Réunion',
                'Secteur musical francophone',
              ].map((item) => (
                <p key={item} className="font-body text-[0.95rem] leading-[1.8] text-soft">
                  {item}
                </p>
              ))}
            </div>
            </div>
          </div>
        </div>
      </Track>

      <Track
        name="Message"
        type="Contact direct"
        hideLabel
        contentClassName="!relative !overflow-hidden !px-0 !py-0 !gap-0 !items-stretch"
      >
        <ContactAtmosphere compact className="opacity-60" />
        <div className="relative z-10 grid w-full lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="px-8 py-10 sm:px-12">
            <p className="font-mono text-[0.4rem] tracking-[0.16em] uppercase text-accent mb-4">
              Envoyer une demande
            </p>
            <p className="font-body text-[0.98rem] leading-[1.9] text-soft max-w-[760px] mb-6">
              Pour une demande claire et rapide, laisse ton contexte ici :
              type de structure, projet, dispositif visé et ce qui bloque aujourd&apos;hui.
            </p>
            <ContactForm />
          </div>
          <div className="relative overflow-hidden border-l border-rule px-8 py-10 sm:px-10" style={{ background: 'rgba(18,18,18,0.92)' }}>
            <ContactAtmosphere compact className="opacity-35" />
            <div className="relative z-10">
            <p className="font-mono text-[0.375rem] tracking-[0.16em] uppercase text-dim mb-4">
              À inclure dans ton message
            </p>
            <div className="space-y-3">
              {[
                'Qui tu es et quelle structure tu portes',
                'Quel projet tu veux financer',
                'Quel dispositif tu envisages, si tu en as un',
                'Ce qui te manque aujourd’hui : temps, méthode, budget, relecture',
              ].map((item) => (
                <p key={item} className="font-body text-[0.95rem] leading-[1.75] text-soft">
                  {item}
                </p>
              ))}
            </div>
            <div className="mt-8 border-t border-rule pt-6">
              <p className="font-mono text-[0.375rem] tracking-[0.16em] uppercase text-dim mb-3">
                Email direct
              </p>
              <a
                href={`mailto:${contactEmail}?subject=Demande%20de%20contact%20%E2%80%94%20Dossier%20Studio`}
                aria-label={`Envoyer un email à ${contactEmail}`}
                className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-4 py-3 font-cond text-[0.82rem] font-bold uppercase tracking-[0.08em] text-black shadow-[0_12px_28px_rgba(0,0,0,0.16)] transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-[0_18px_34px_rgba(197,76,76,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent font-mono text-[0.72rem] text-white transition-transform group-hover:scale-105">
                  @
                </span>
                <span className="flex flex-col items-start gap-1">
                  <span>{contactEmail}</span>
                  <span className="font-mono text-[0.48rem] tracking-[0.14em] text-dim transition-colors group-hover:text-accent">
                    Ouvrir ma messagerie
                  </span>
                </span>
              </a>
              <p className="mt-3 font-body text-[0.9rem] leading-[1.7] text-soft">
                Utile si tu préfères envoyer tes pièces ou ton contexte depuis ta messagerie.
              </p>
            </div>
            </div>
          </div>
        </div>
      </Track>

      <Track
        name="Orientation"
        type="Diagnostic gratuit"
        hideLabel
        contentClassName="!relative !overflow-hidden !py-8 !px-8 sm:!px-12 !gap-6"
      >
        <ContactAtmosphere compact className="opacity-45" />
        <div className="relative z-10 flex-1">
          <p className="font-cond font-bold uppercase tracking-[0.08em] text-black text-[0.95rem] mb-2">
            Besoin d&apos;un tri plus structuré avant de contacter ?
          </p>
          <p className="font-body text-[0.96rem] leading-[1.8] text-soft max-w-[700px]">
            Le diagnostic est plus adapté si tu hésites encore sur les dispositifs, le périmètre ou
            le type d&apos;accompagnement dont tu as réellement besoin.
          </p>
        </div>
        <Link
          href="/diagnostic"
          className="relative z-10 font-cond font-bold text-[0.625rem] tracking-[0.16em] uppercase text-soft border border-rule-dark px-8 py-4 transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          style={{ background: 'var(--surface-2)' }}
        >
          Aller au diagnostic →
        </Link>
      </Track>
    </section>
  )
}
