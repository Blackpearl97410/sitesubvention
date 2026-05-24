# Point de restauration Codex - 2026-05-23

Ce fichier documente la version valide du site apres restauration Codex.

Objectif de cette version :
- La home ne doit afficher qu'un CTA clair vers les aides ouvertes.
- Le bloc complet "Aides ouvertes" doit vivre dans `/dispositifs#aides-ouvertes`.
- La page Dispositifs doit afficher la veille dynamique, les filtres, les cartes, les liens sources et le CTA diagnostic.
- L'API `/api/aides-ouvertes` doit recuperer les aides depuis Mon Projet Musique avec cache 24h et fallback.
- Le serveur local doit repartir avec un cache `.next` propre si l'affichage semble incoherent.
- Il ne doit exister qu'une seule page `/diagnostic` : `app/(main)/diagnostic/page.tsx`.

## Etat fonctionnel attendu

Home `/` :
- `Hero`
- `PricingSignal`
- `AidesOuvertesCTA`
- `Pain`
- `Credibilite`
- `Resultats`
- `OffresApercu`
- `FAQ`
- `CTAFinal`

Important :
- La home ne doit pas importer directement `AidesOuvertes`.
- La home doit avoir le bouton `Explorer les aides ->` vers `/dispositifs#aides-ouvertes`.
- La home ne doit pas afficher les filtres `Toutes`, `Clip / vidéo`, `Éditeur`, etc.

Page `/dispositifs` :
- Intro Dispositifs.
- Bloc `<AidesOuvertes />` juste apres l'intro.
- Liste des guichets `CNM`, `SPEDIDAM`, `ADAMI`, `SACEM`, `Régions / DAC`.
- CTA final vers `/diagnostic`.

Bloc `/dispositifs#aides-ouvertes` :
- Section avec `id="aides-ouvertes"`.
- `scrollMarginTop: 'var(--nav-h)'`.
- Filtres projet : `Toutes`, `Production`, `Clip / vidéo`, `Documentaire`, `Tournée`, `Structuration`.
- Filtres profil : `Tous profils`, `Association`, `Label`, `Éditeur`, `Artiste`.
- Chaque carte doit afficher : titre, organisme, type de projet, date limite, lien source, bouton diagnostic.

## Fichiers de reference

Ces fichiers constituent le coeur de cette version :

```text
app/(main)/page.tsx
app/(main)/dispositifs/page.tsx
app/(main)/diagnostic/page.tsx
components/sections/AidesOuvertesCTA.tsx
components/sections/AidesOuvertes.tsx
components/motion/TextRotate.tsx
lib/aides-ouvertes.ts
app/api/aides-ouvertes/route.ts
package.json
scripts/fetch-aides-ouvertes.mjs
```

## Hashes SHA-256 de cette version

Pour verifier que les fichiers correspondent toujours a cette version :

```bash
shasum -a 256 app/'(main)'/page.tsx app/'(main)'/dispositifs/page.tsx app/'(main)'/diagnostic/page.tsx components/sections/AidesOuvertesCTA.tsx components/sections/AidesOuvertes.tsx components/motion/TextRotate.tsx lib/aides-ouvertes.ts app/api/aides-ouvertes/route.ts package.json scripts/fetch-aides-ouvertes.mjs
```

Resultat attendu :

```text
ebfa66b8fc56d62ebdb1f44868f78a19e42254823aca289c30d7b3282dc5c6d5  app/(main)/page.tsx
ca32c612b6362a3878223eec8a317019ea9cbabc0b6094b849d28dda7f093945  app/(main)/dispositifs/page.tsx
0f784cb886c4d75f52bd9b3e93af2346a29bf2dfa0dd113b9dcb80bcf6914b39  app/(main)/diagnostic/page.tsx
f304ac54506a710dfdd6cfe8d89e586e12e8e7ab43bf15bde25318b62a438df8  components/sections/AidesOuvertesCTA.tsx
72f93bb11779707e988dbff3a92442182ae532e95e4c2e83e6c30ba080d9685f  components/sections/AidesOuvertes.tsx
b83a8b0fd39b0bebe5f7564db66a737a2b6adcc064a0f860a6f73bcc82d19206  components/motion/TextRotate.tsx
e2c308877e9f2797e9d8ca1392294798b179887f62ad587229b43339d57f42e3  lib/aides-ouvertes.ts
b7c45fa9c5f6f5dfd99c25da7941d3b665f18c21de27b284798fbb598538859e  app/api/aides-ouvertes/route.ts
6424fc8c5d631a399b3702c917c35f69cf5ade0ccadff8a11a34d760e597cbb7  package.json
973b2bdf7d293e70f813be42028e1d020bc8f490ecb9529e020143fa23544cef  scripts/fetch-aides-ouvertes.mjs
```

## Contenu exact de `app/(main)/page.tsx`

```tsx
import Hero from '@/components/sections/Hero'
import PricingSignal from '@/components/sections/PricingSignal'
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
      <PricingSignal />
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
```

## Contenu exact de `components/sections/AidesOuvertesCTA.tsx`

```tsx
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
```

## Points de code critiques a conserver

Dans `app/(main)/dispositifs/page.tsx` :

```tsx
import AidesOuvertes from '@/components/sections/AidesOuvertes'
```

Le paragraphe d'intro doit inclure :

```tsx
La veille des aides ouvertes est centralisée ici pour comparer rapidement les pistes utiles.
```

Et le composant doit etre rendu juste apres le track d'intro :

```tsx
<AidesOuvertes />
```

Dans `components/sections/AidesOuvertes.tsx`, la section racine doit etre :

```tsx
<section
  id="aides-ouvertes"
  style={{ borderBottom: '2px solid var(--black)', scrollMarginTop: 'var(--nav-h)' }}
>
```

Dans `components/motion/TextRotate.tsx`, l'import doit etre :

```tsx
import { cn } from "@/lib/cn"
```

Et jamais :

```tsx
import { cn } from "@/lib/utils"
```

Pour eviter l'erreur Next.js "two parallel pages that resolve to the same path", ce fichier ne doit pas exister :

```text
app/(standalone)/diagnostic/page.tsx
```

Verification :

```bash
find app -path '*diagnostic/page.tsx' -print
```

Resultat attendu :

```text
app/(main)/diagnostic/page.tsx
```

## Commandes de restauration locale

Si le navigateur affiche une ancienne version, des chunks en 404, ou un comportement incoherent :

```bash
rm -rf .next
npm run dev
```

Verification TypeScript :

```bash
npx tsc --noEmit
```

Verification du script aides :

```bash
npm run fetch:aides
```

Verification API :

```bash
curl http://localhost:3000/api/aides-ouvertes
```

## Checklist navigateur

Apres restauration, verifier :

```text
http://localhost:3000/
```

- Le CTA `Voir les aides actuellement ouvertes` est visible.
- Le bouton `Explorer les aides ->` pointe vers `/dispositifs#aides-ouvertes`.
- Les filtres complets ne sont pas sur la home.

Puis verifier :

```text
http://localhost:3000/dispositifs#aides-ouvertes
```

- Le titre `Aides ouvertes à surveiller.` est visible.
- Les filtres `Clip / vidéo`, `Documentaire`, `Éditeur` sont visibles.
- Les cartes affichent `Voir la source ->`.
- Les cartes affichent `Vérifier mon éligibilité`.
- La console navigateur ne doit pas afficher d'erreur.

## Prompt de restauration a donner a Codex

Si une autre IA ou un autre outil casse cette version, utiliser ce prompt :

```text
Restaure la version documentee dans VERSION_RESTAURATION_CODEX_2026-05-23.md.
Respecte exactement le comportement suivant :
- Home avec uniquement AidesOuvertesCTA, pas le bloc complet AidesOuvertes.
- Page /dispositifs avec AidesOuvertes rendu juste apres l'intro.
- Section aides avec id="aides-ouvertes" et scrollMarginTop var(--nav-h).
- API /api/aides-ouvertes active avec cache 24h.
- TextRotate importe cn depuis "@/lib/cn".
Puis lance npx tsc --noEmit, redemarre le serveur avec rm -rf .next && npm run dev si besoin, et verifie / puis /dispositifs#aides-ouvertes dans le navigateur.
```

## Note importante

Ce dossier n'etait pas un depot git au moment de ce point de restauration.
Ce fichier documente donc un retour manuel.
Pour un retour automatique parfait, la prochaine action recommandee est d'initialiser git puis de creer un commit de cette version.
