# Dossier Studio — Démarrage local

## 1. Prérequis
- Node.js >= 18 ([nodejs.org](https://nodejs.org))
- npm >= 9

## 2. Installation

```bash
cd dossier-studio
npm install
```

## 3. Lancer le serveur local avec preview temps réel

```bash
npm run dev
```

→ Ouvrir [http://localhost:3000](http://localhost:3000)

Le serveur Hot Reload met à jour le navigateur à chaque sauvegarde de fichier — pas besoin de recharger.

## 4. Structure des fichiers clés

```
dossier-studio/
├── app/
│   ├── layout.tsx          ← Structure globale + meta SEO
│   ├── page.tsx            ← Home (assemble les sections)
│   ├── globals.css         ← Tokens CSS + imports Google Fonts
│   ├── offres/page.tsx
│   ├── methode/page.tsx
│   ├── dispositifs/page.tsx
│   └── contact/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx         ← Navigation fixe
│   │   └── Footer.tsx
│   ├── daw/
│   │   ├── Track.tsx       ← Composant track réutilisable
│   │   ├── TrackLabel.tsx  ← Label gauche du track
│   │   └── Ruler.tsx       ← Ruler avec playhead animé
│   └── sections/
│       ├── Hero.tsx        ← Section hero complète
│       └── Pain.tsx        ← Section douleurs
│
└── lib/
    └── tokens.ts           ← Tokens design + presets Framer/GSAP
```

## 5. Ajouter une section

1. Créer `components/sections/MaSection.tsx`
2. L'importer dans `app/page.tsx`
3. Utiliser le composant `<Track>` pour la structure

## 6. Déployer sur Vercel

```bash
npx vercel
```

Ou connecter le repo GitHub à [vercel.com](https://vercel.com) pour le déploiement automatique.

## 7. Stack
- Next.js 14 (App Router)
- Tailwind CSS (tokens dans `tailwind.config.ts`)
- Framer Motion (animations composants)
- GSAP (scroll + playhead — à intégrer dans les composants)
- Spline (élément 3D — à intégrer dans Hero)

## 8. Configuration Vercel (important)

Sur Vercel, quand tu connectes ton repo GitHub :

1. "Framework Preset" → **Next.js** (détecté automatiquement)
2. "Root Directory" → si ton repo contient d'autres dossiers, spécifie `dossier-studio`
3. Les variables d'environnement → ajouter dans Settings > Environment Variables si besoin

**Recommandation** : créer un repo Git dédié dont la racine = `dossier-studio/`.
C'est la structure la plus simple pour Vercel.

```bash
# Depuis le dossier dossier-studio/
git init
git add .
git commit -m "init: scaffold dossier-studio"
# Puis connecter à GitHub + importer sur Vercel
```
