'use client'

import Link from 'next/link'
import Track from '@/components/daw/Track'
import RollingText from '@/components/motion/RollingText'

const signals = [
  {
    value: 'Diagnostic gratuit',
    label: 'Premier tri du potentiel et des échéances',
  },
  {
    value: 'À partir de 390 €',
    label: 'Montage dossier standard',
  },
  {
    value: '10% standard',
    label: 'Commission uniquement si aide encaissée',
  },
]

export default function PricingSignal() {
  return (
    <section style={{ borderBottom: '2px solid var(--black)' }}>
      <Track name="Budget" type="Tarifs clés" armed contentClassName="!p-0 !gap-0">
        <div className="grid w-full lg:grid-cols-[repeat(3,minmax(0,1fr))_220px]">
          {signals.map((signal, index) => (
            <div
              key={signal.value}
              className={`px-8 py-6 ${index < signals.length - 1 ? 'border-r border-rule' : ''}`}
            >
              <p className="font-cond text-[1.25rem] font-black uppercase leading-none tracking-[-0.02em] text-black">
                {signal.value}
              </p>
              <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-dim">
                {signal.label}
              </p>
            </div>
          ))}
          <Link
            href="/offres"
            className="flex items-center justify-center border-l border-rule bg-[var(--surface-2)] px-6 py-6 font-cond text-[0.625rem] font-bold uppercase tracking-[0.16em] text-accent transition-colors hover:bg-[rgba(200,82,50,0.08)]"
          >
            <RollingText text="Voir les tarifs →" animateOnHover={false} />
          </Link>
        </div>
      </Track>
    </section>
  )
}
