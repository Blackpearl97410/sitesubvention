import Track from '@/components/daw/Track'
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton'

export default function AidesOuvertesCTA() {
  return (
    <section style={{ borderBottom: '2px solid var(--black)' }}>
      <Track
        name="Aides"
        type="Veille ouverte"
        armed
        contentClassName="!flex-col !items-start !py-8 !px-12 !gap-8 sm:!flex-row sm:!items-center"
      >
        <div className="flex-1">
          <p className="mb-2 font-cond text-[1.35rem] font-black uppercase leading-[0.95] tracking-[-0.02em] text-black">
            Voir les aides actuellement ouvertes
          </p>
          <p className="max-w-[760px] font-body text-[0.98rem] leading-[1.8] text-soft">
            Production, clip, documentaire, tournée, structuration, association, label ou éditeur :
            la page Dispositifs centralise les pistes à surveiller avec filtres et liens sources.
          </p>
        </div>
        <LiquidGlassButton
          href="/dispositifs#aides-ouvertes"
          warm
          size="lg"
          className="flex-shrink-0"
          contentClassName="text-white"
        >
          Explorer les aides →
        </LiquidGlassButton>
      </Track>
    </section>
  )
}

