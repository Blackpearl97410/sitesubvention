import Link from 'next/link'
import Ruler from '@/components/daw/Ruler'
import Track from '@/components/daw/Track'
import { legalDetails } from '@/lib/legal'

export type LegalBlock = {
  title: string
  body?: string[]
  items?: string[]
}

type LegalDocumentProps = {
  label: string
  title: string
  intro: string
  blocks: LegalBlock[]
  notice?: string
}

export default function LegalDocument({ label, title, intro, blocks, notice }: LegalDocumentProps) {
  return (
    <section style={{ paddingTop: 'var(--nav-h)', borderBottom: '2px solid var(--black)' }}>
      <Ruler label={label} playheadDuration={18} />

      <Track name="Cadre légal" type={label} armed contentClassName="!py-14 !px-12 !items-start">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex max-w-[920px] flex-col gap-6">
            <span className="font-mono text-[0.48rem] tracking-[0.18em] uppercase text-accent">
              Dossier Studio
            </span>
            <h1
              className="font-cond font-black uppercase leading-[0.9] tracking-[-0.03em] text-black"
              style={{ fontSize: 'clamp(3.1rem, 8vw, 7.5rem)' }}
            >
              {title}
            </h1>
            <p className="font-body text-[1.02rem] leading-[1.9] text-soft">{intro}</p>
          </div>

          <aside className="border-l border-rule-dark pl-8 pt-1">
            <p className="mb-4 font-mono text-[0.4rem] uppercase tracking-[0.16em] text-dim">
              Repères
            </p>
            <div className="space-y-3 font-body text-[0.95rem] leading-[1.75] text-soft">
              <p>Dernière mise à jour : {legalDetails.lastUpdated}</p>
              <p>Contact légal : {legalDetails.contactEmail}</p>
              <p>Document en vigueur pour le site Dossier Studio.</p>
            </div>
          </aside>
        </div>
      </Track>

      <Track name="Document" type="Informations" contentClassName="!px-0 !py-0 !gap-0 !items-stretch">
        <div className="grid w-full lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="divide-y divide-rule">
            {notice ? (
              <div className="px-8 py-7 sm:px-12" style={{ background: 'rgba(200,82,50,0.08)' }}>
                <p className="font-cond text-[1rem] font-bold uppercase tracking-[0.08em] text-black">
                  {notice}
                </p>
              </div>
            ) : null}

            {blocks.map((block) => (
              <section key={block.title} className="px-8 py-8 sm:px-12">
                <h2 className="mb-5 font-cond text-[1.3rem] font-black uppercase tracking-[0.04em] text-black">
                  {block.title}
                </h2>
                <div className="space-y-4 font-body text-[0.98rem] leading-[1.85] text-soft">
                  {block.body?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {block.items ? (
                    <ul className="space-y-3">
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </article>

          <aside className="border-l border-rule px-8 py-8 sm:px-10" style={{ background: 'var(--surface-2)' }}>
            <p className="mb-4 font-mono text-[0.4rem] uppercase tracking-[0.16em] text-dim">
              Pages légales
            </p>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/mentions-legales', label: 'Mentions légales' },
                { href: '/politique-confidentialite', label: 'Confidentialité' },
                { href: '/cookies', label: 'Cookies' },
                { href: '/conditions-generales', label: 'Conditions générales' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border-b border-rule pb-3 font-cond text-[0.92rem] font-bold uppercase tracking-[0.08em] text-black transition-colors hover:text-accent"
                >
                  {link.label} →
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      </Track>
    </section>
  )
}
