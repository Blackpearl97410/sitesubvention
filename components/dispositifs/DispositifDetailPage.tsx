import Ruler from '@/components/daw/Ruler'
import Track from '@/components/daw/Track'
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton'
import type { DispositifRecord } from '@/lib/dispositifs'

export default function DispositifDetailPage({ dispositif }: { dispositif: DispositifRecord }) {
  return (
    <section style={{ paddingTop: 'var(--nav-h)', borderBottom: '2px solid var(--black)' }}>
      <Ruler label={dispositif.short} playheadDuration={18} />

      <Track name="Dispositif" type={dispositif.short} armed contentClassName="!py-16 !px-12 !items-start">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col gap-6">
            <span className="font-mono text-[0.75rem] tracking-[0.18em] uppercase text-accent">
              Guichet ciblé
            </span>
            <h1
              className="font-cond font-black uppercase leading-[0.88] tracking-[-0.04em] text-black max-w-[920px]"
              style={{ fontSize: 'var(--fs-hero)' }}
            >
              {dispositif.short}
              <br />
              {dispositif.title}
            </h1>
            <p className="font-body text-[1.04rem] leading-[1.9] text-soft max-w-[760px]">
              {dispositif.summary}
            </p>
          </div>
          <div className="border-l border-rule-dark pl-8 pt-1">
            <p className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim mb-3">Pour qui</p>
            <p className="font-body text-[0.95rem] leading-[1.8] text-soft">{dispositif.audience}</p>
          </div>
        </div>
      </Track>

      <Track name="Enjeu" type="Pourquoi se faire accompagner" contentClassName="!py-10 !px-12 !items-start">
        <div className="max-w-[860px]">
          <p className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-accent mb-3">
            Pourquoi se faire accompagner
          </p>
          <p className="font-body text-[0.98rem] leading-[1.9] text-soft">{dispositif.why}</p>
        </div>
      </Track>

      <Track name="Périmètre" type="Ce que ça peut couvrir" contentClassName="!px-0 !py-0 !gap-0 !items-stretch">
        <div className="grid w-full lg:grid-cols-3">
          <div className="border-r border-rule px-10 py-10">
            <p className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim mb-4">
              Ce que ça peut couvrir
            </p>
            <div className="space-y-3">
              {dispositif.includes.map((item) => (
                <p key={item} className="font-body text-[0.95rem] leading-[1.75] text-soft">
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="border-r border-rule px-10 py-10">
            <p className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim mb-4">
              Points de vigilance
            </p>
            <div className="space-y-3">
              {dispositif.watchouts.map((item) => (
                <p key={item} className="font-body text-[0.95rem] leading-[1.75] text-soft">
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="px-10 py-10" style={{ background: 'var(--surface-2)' }}>
            <p className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim mb-4">
              Cas où c&apos;est pertinent
            </p>
            <div className="space-y-3">
              {dispositif.fit.map((item) => (
                <p key={item} className="font-body text-[0.95rem] leading-[1.75] text-soft">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Track>

      <Track name="Diagnostic" type="Vérifier ton cas" contentClassName="!py-8 !px-12 !gap-6">
        <div className="flex-1">
          <p className="font-cond font-bold uppercase tracking-[0.08em] text-black text-[0.95rem] mb-2">
            Tu veux savoir si ce guichet est pertinent pour ton projet ?
          </p>
          <p className="font-body text-[0.96rem] leading-[1.8] text-soft max-w-[700px]">
            Le diagnostic sert à éviter les faux bons choix, à hiérarchiser les dispositifs et à
            cadrer l&apos;ordre de priorité des demandes.
          </p>
        </div>
        <LiquidGlassButton href="/diagnostic" warm size="lg" contentClassName="text-white">
          Demander un diagnostic →
        </LiquidGlassButton>
      </Track>
    </section>
  )
}
