import Hero from '@/components/sections/Hero'
import AidesOuvertesCTA from '@/components/sections/AidesOuvertesCTA'
import Pain from '@/components/sections/Pain'
import Credibilite from '@/components/sections/Credibilite'
import Resultats from '@/components/sections/Resultats'
import OffresApercu from '@/components/sections/OffresApercu'
import FAQ from '@/components/sections/FAQ'
import CTAFinal from '@/components/sections/CTAFinal'

export default function Home() {
  return (
    <>
      <Hero />
      <AidesOuvertesCTA />
      <Pain />
      <Credibilite />
      <Resultats />
      <OffresApercu />
      <FAQ />
      <CTAFinal />
    </>
  )
}
