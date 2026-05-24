# CLAUDE.md — Dossier Studio
> Contexte projet complet. À lire en début de session avant toute intervention.

---

## 1. Identité du projet

**Nom du site :** Dossier Studio
**Porteur :** Alexandre PAVIEL
**Email :** lablackbox974@gmail.com
**Localisation :** Paris & La Réunion
**Activité :** Accompagnement au montage de dossiers d'aides et de subventions pour le secteur musical francophone.

### Cibles
Labels · Éditeurs musicaux · Producteurs · Studios d'enregistrement · Artistes francophones · Managers · Associations culturelles · Collectifs artistiques

### Dispositifs couverts
CNM · SPEDIDAM · ADAMI · SCPP · SPPF · SACEM · Région · État · DAC · Collectivités · Fondations · Appels à projets

---

## 2. Stats réelles (à utiliser dans le site)

- **13 dossiers** lancés depuis janvier 2026
- **4 artistes et labels** différents accompagnés
- **70% de taux de réussite**
- Secteur : musique francophone, Paris + La Réunion

---

## 3. Messaging validé

### Message fil rouge
> "De l'idée artistique au dossier finançable."

### Hero — Version retenue (V1)
**Headline :** Tu es éligible à des aides que tu ne demandes plus.
**Chiffre clé :** Une demande CNM non déposée, c'est entre 5 000 et 30 000 € qui restent dans l'enveloppe. Multipliés par 2, 3, 4 ans d'absence.
**Repositionnement :** Je prends la partie chronophage, technique et rédactionnelle. Tu restes sur ce que tu sais faire.

### 4 douleurs terrain (validées)
1. Tu as arrêté de candidater (coût d'opportunité)
2. Le langage des financeurs n'est pas le tien (traduction institutionnelle)
3. La charge de veille est invisible mais réelle
4. Un dossier insuffisant coûte plus qu'un refus

### Ton
- S'adresse à des professionnels qui connaissent déjà le système
- Entre pairs, pas en surplomb
- Pas d'explication du système — nommer la frustration

---

## 4. Charte graphique validée

**Direction :** Rapport annuel culturel premium × Séquenceur DAW
**Références :** Centre Pompidou digital, Palais de Tokyo, Fondation Cartier

### Tokens couleurs
```
--white:      #FFFFFF
--paper:      #F4F4F2
--track-bg:   #F8F8F6
--black:      #0C0C0C
--ink:        #1A1A1A
--soft:       #787878
--dim:        #ADADAD
--rule:       #E0E0DE
--rule-dark:  #C8C8C6
--accent:     #CC1F0E   ← Rouge institutionnel, seul accent
```

### Typographie
- **Display/Titres :** Barlow Condensed 900 — uppercase, très condensé
- **Corps :** Barlow 300/400 — léger, aéré
- **Technique :** Space Mono — labels tracks, chiffres, tags

### Tailles fluides (CSS vars)
```
--fs-hero: clamp(4rem, 8.5vw, 9rem)
--fs-h2:   clamp(1.75rem, 3.5vw, 3.5rem)
--fs-h3:   clamp(1.25rem, 2.2vw, 1.875rem)
--fs-stat: clamp(3.5rem, 5.5vw, 6rem)
```

### Structure visuelle DAW
- Ruler sticky en haut de chaque section (playhead rouge animé)
- Tracks avec label à gauche (172px, `--label-w`)
- Contenu dans les tracks (pas de boîtes imbriquées)
- Grille de fond : supprimée

---

## 5. Stack technique

```
Next.js 14 (App Router)
TypeScript
Tailwind CSS (tokens dans tailwind.config.ts)
Framer Motion — animations composants + scroll
GSAP + ScrollTrigger — playhead, count-up, split text
Spline — 1 élément 3D discret (section stat clé)
Vercel — déploiement
```

### Règles importantes
- `next.config.js` (pas .ts — Next.js 14)
- Fonts via `next/font/google` uniquement (pas @import CSS)
- Tailles fluides via `style={{ fontSize: 'var(--fs-hero)' }}`, pas en Tailwind config
- Spline : `dynamic(() => import(...), { ssr: false })` — client uniquement
- `motionPresets` (pas `motion`) dans lib/tokens.ts pour éviter conflit Framer

---

## 6. Architecture des pages

### Arborescence Next.js
```
app/
├── page.tsx                    ← Home (funnel complet)
├── offres/page.tsx             ← Par situation client
├── methode/page.tsx            ← Process en 5 étapes
├── resultats/page.tsx          ← Cas clients anonymisés + stats
├── dispositifs/
│   ├── page.tsx                ← Hub SEO
│   ├── cnm/page.tsx
│   ├── spedidam/page.tsx
│   ├── adami/page.tsx
│   ├── sacem/page.tsx
│   └── regions/page.tsx
├── a-propos/page.tsx
└── diagnostic/page.tsx         ← Page conversion dédiée (sans nav/footer)
```

### Ordre sections Home (optimisé conversion)
1. Hero — douleur + chiffre clé
2. Barre de crédibilité — types de clients + stats (13 dossiers, 70%)
3. Pain — 4 douleurs terrain
4. Repositionnement — citation + argumentaire
5. Résultats — 3 cas anonymisés avec montants
6. Offres aperçu — par situation client
7. Méthode — 3 étapes résumées
8. FAQ — 4-5 objections levées
9. CTA final → /diagnostic

### Page /diagnostic (conversion pure)
- Pas de Nav ni Footer classiques
- Headline : "Parlons de ton projet"
- 3 questions max : type de structure / dispositif visé / stade du projet
- CTA : "Envoyer ma demande"

### Page /offres (par situation client)
- "Je ne sais pas par où commencer" → Diagnostic
- "Je veux monter un dossier de A à Z" → Montage complet
- "J'ai un dossier, je veux l'améliorer" → Relecture stratégique
- "Je veux savoir à quelles aides j'ai droit" → Recherche d'aides
- "Mon budget ne tient pas" → Structuration budgétaire
- "Je dois répondre à un appel à projets" → Accompagnement AAP

---

## 7. Composants DAW réutilisables

```
components/daw/
├── Track.tsx        ← Wrapper track (label + content)
├── TrackLabel.tsx   ← Colonne gauche 172px
└── Ruler.tsx        ← Ruler sticky avec playhead animé
```

**Usage type :**
```tsx
<Track name="Headline" type="Text · Display" armed>
  {/* contenu libre */}
</Track>
```

---

## 8. Décisions validées (ne pas revenir dessus)

| Décision | Choix retenu |
|---|---|
| 3D | Spline (pas R3F) — 1 seul endroit |
| Couleur accent | Rouge #CC1F0E uniquement (pas de violet) |
| Fond | Blanc pur (pas sombre, pas ivoire) |
| Typo display | Barlow Condensed 900 |
| Typo mono | Space Mono (labels techniques) |
| Config Next | next.config.js (Next.js 14) |
| Fonts | next/font/google uniquement |
| CTA principal | "Diagnostic gratuit" → /diagnostic |
| Offres | Organisées par situation client |

---

## 9. Points de vigilance

- Ne pas ajouter de violet (trop générique, site IA)
- Ne pas imbriquer clip dans track dans section (trop de rectangles)
- La grille de fond verticale est supprimée
- Spline : fallback SVG si timeout > 3s
- Page /diagnostic : pas de Nav/Footer standard
- SEO : pages individuelles par dispositif (/dispositifs/cnm etc.)
- Social proof : indispensable — 76% des B2B ne convertissent pas sans

---

## 10. Sections restantes à construire (V1)

### Home
- [x] Hero
- [x] Pain
- [ ] Repositionnement
- [ ] Barre crédibilité (stats réelles)
- [ ] Résultats (cas anonymisés)
- [ ] Offres aperçu
- [ ] Méthode (3 étapes)
- [ ] FAQ
- [ ] CTA final

### Pages
- [ ] /offres
- [ ] /methode
- [ ] /resultats
- [ ] /diagnostic
- [ ] /dispositifs (hub + sous-pages)
- [ ] /a-propos
