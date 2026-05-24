'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Magnetic from '@/components/motion/Magnetic'
import MaskedLines from '@/components/motion/MaskedLines'
import RollingText from '@/components/motion/RollingText'
import { Reveal } from '@/components/motion/Reveal'
import Track from '@/components/daw/Track'
import { motionTiming } from '@/lib/tokens'

export default function CTAFinal() {
  return (
    <section style={{ borderBottom: '2px solid var(--black)' }}>

      {/* Headline track */}
      <Reveal transition={{ duration: 0.6 }}>
        <Track
          name="Prochaine étape"
          type="Diagnostic"
          armed
          contentClassName="!min-h-[280px] !items-end !py-16 !px-12 !flex-col !items-start !gap-6"
        >
          <p className="font-mono text-[0.4375rem] tracking-[0.2em] uppercase text-accent">
            Prochaine étape
          </p>
          <MaskedLines
            as="h2"
            className="font-cond font-black uppercase text-black leading-[0.88] tracking-[-0.03em] max-w-[840px]"
            lineClassName="pb-[0.06em]"
            delay={0.1}
            style={{ fontSize: 'var(--fs-h2)' }}
            lines={[
              "De l'idée artistique",
              <>au dossier <span className="text-accent">finançable.</span></>,
            ]}
          />
          <p className="font-body font-light text-soft text-[1.05rem] leading-[1.9] max-w-[720px]">
            Un diagnostic gratuit de 20 min pour cartographier ta situation et identifier les dispositifs
            auxquels tu es éligible. Tu repars avec une lecture claire : aides crédibles, priorités et prochaines actions.
          </p>
        </Track>
      </Reveal>

      {/* CTA track */}
      <Reveal delay={0.15} variant="fadeOnly" transition={{ duration: 0.5 }}>
        <Track name="Contact" type="Projet à financer" contentClassName="!py-6 !px-12 !gap-5">
          <Magnetic strength={12}>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: motionTiming.fastDuration, ease: motionTiming.ease }}>
              <Link
                href="/diagnostic"
                className="font-cond font-bold text-[0.6875rem] tracking-[0.16em] uppercase text-white px-9 py-4 transition-colors inline-flex"
                style={{ background: 'linear-gradient(135deg, var(--accent), #d86a47)', boxShadow: '0 16px 34px rgba(200,82,50,0.18)' }}
              >
                <RollingText text="Démarrer le diagnostic →" animateOnHover={false} />
              </Link>
            </motion.div>
          </Magnetic>
          <p className="font-body text-soft text-[0.92rem] leading-[1.8] max-w-[420px]">
            Pas besoin d'avoir déjà choisi le bon guichet : le diagnostic sert à faire le tri.
          </p>
          <div className="ml-auto flex items-center gap-2">
            <span
              className="w-[6px] h-[6px] rounded-full bg-accent"
              style={{ animation: 'pulse-soft 2.5s ease-in-out infinite' }}
            />
            <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-dim">
              Réponse sous 48h · France & La Réunion
            </span>
          </div>
        </Track>
      </Reveal>

    </section>
  )
}
