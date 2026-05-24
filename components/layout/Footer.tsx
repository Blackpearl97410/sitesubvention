import Link from 'next/link'
import { contactEmail } from '@/lib/site'

const links = [
  { label: 'Offres',      href: '/offres' },
  { label: 'Méthode',     href: '/comment-ca-fonctionne' },
  { label: 'Dispositifs', href: '/dispositifs' },
  { label: 'À propos',    href: '/a-propos' },
  { label: 'Contact',     href: '/contact' },
]

const legalLinks = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Confidentialité', href: '/politique-confidentialite' },
  { label: 'Cookies', href: '/cookies' },
  { label: 'Conditions', href: '/conditions-generales' },
]

export default function Footer() {
  return (
    <footer className="border-t-2 border-black">
      {/* Ligne principale */}
      <div
        className="flex items-stretch"
        style={{
          borderBottom: '1px solid var(--rule)',
          background: 'rgba(16, 16, 16, 0.84)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Logo colonne */}
        <div
          className="flex-shrink-0 flex flex-col justify-center px-5 border-r border-rule-dark py-6"
          style={{ width: 'var(--label-w)' }}
        >
          <span className="font-cond font-extrabold tracking-[0.08em] uppercase text-black text-base leading-none">
            Dossier<span className="text-accent">.</span>Studio
          </span>
          <span className="font-mono text-[0.5625rem] tracking-[0.1em] uppercase text-dim mt-2">
            Secteur musical francophone
          </span>
        </div>
        {/* Nav links */}
        <nav className="flex-1 flex items-center px-10 gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-[0.625rem] tracking-[0.14em] uppercase text-soft hover:text-black transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        {/* CTA colonne droite */}
        <Link
          href="/diagnostic"
          className="flex items-center px-7 border-l border-rule-dark group transition-colors"
          style={{ background: 'rgba(22, 22, 20, 0.78)' }}
        >
          <span className="font-cond font-bold text-[0.6875rem] tracking-[0.14em] uppercase text-soft group-hover:text-white transition-colors whitespace-nowrap">
            Diagnostic gratuit →
          </span>
        </Link>
      </div>
      {/* Bas de footer */}
      <div
        className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-10"
        style={{ background: 'rgba(12, 12, 12, 0.92)' }}
      >
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[0.5625rem] tracking-[0.12em] uppercase text-dim">
            © 2026 Dossier Studio · France & La Réunion
          </span>
          <nav className="flex flex-wrap gap-x-4 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-dim underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <a
          href={`mailto:${contactEmail}?subject=Demande%20de%20contact%20%E2%80%94%20Dossier%20Studio`}
          aria-label={`Envoyer un email à ${contactEmail}`}
          className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/18 px-3.5 py-2 font-mono text-[0.5625rem] tracking-[0.12em] uppercase text-soft transition-all hover:border-accent hover:bg-accent/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent font-mono text-[0.55rem] text-white transition-transform group-hover:scale-105">
            @
          </span>
          <span className="underline decoration-accent/50 underline-offset-4">{contactEmail}</span>
          <span className="text-accent" aria-hidden="true">→</span>
        </a>
      </div>
    </footer>
  )
}
