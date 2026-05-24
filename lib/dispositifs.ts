export type DispositifKey = 'cnm' | 'spedidam' | 'adami' | 'sacem' | 'regions'

export type DispositifRecord = {
  slug: DispositifKey
  short: string
  title: string
  audience: string
  summary: string
  why: string
  includes: string[]
  watchouts: string[]
  fit: string[]
}

export const dispositifs: Record<DispositifKey, DispositifRecord> = {
  cnm: {
    slug: 'cnm',
    short: 'CNM',
    title: 'Centre national de la musique',
    audience:
      'Labels, producteurs, éditeurs, tourneurs, structures de diffusion et porteurs de projets musicaux.',
    summary:
      "Le CNM couvre de nombreux besoins du secteur musical : production phonographique, développement, export, diffusion, structuration ou transition.",
    why:
      "C'est souvent le guichet le plus stratégique, mais aussi l'un des plus exigeants sur la cohérence globale du dossier, du budget et du calendrier.",
    includes: [
      "Aide à la production phonographique",
      'Aides au développement et à la structuration',
      'Aides à la diffusion, à la tournée ou à l’export',
    ],
    watchouts: [
      'Budget déséquilibré ou mal justifié',
      'Projet intéressant artistiquement mais mal formulé pour un instructeur',
      'Pièces administratives ou calendrier insuffisamment sécurisés',
    ],
    fit: [
      'Structures qui déposent pour la première fois',
      'Structures qui ont déjà connu un refus et veulent repartir proprement',
      'Équipes qui gèrent plusieurs demandes dans l’année',
    ],
  },
  spedidam: {
    slug: 'spedidam',
    short: 'SPEDIDAM',
    title: 'Aides SPEDIDAM',
    audience:
      'Artistes-interprètes, producteurs, managers ou porteurs de projets liés à la diffusion et au spectacle vivant.',
    summary:
      'La SPEDIDAM est souvent mobilisée sur des projets de diffusion, de tournée, de captation ou de soutien à certains formats live.',
    why:
      'Le potentiel est réel, mais les dossiers demandent une lecture précise des conditions, des statuts concernés et des justificatifs attendus.',
    includes: [
      'Aides à la diffusion live',
      'Aides aux tournées ou événements',
      'Soutiens ciblés selon appels et sessions',
    ],
    watchouts: [
      'Statuts ou bénéficiaires mal identifiés',
      'Pièces et justificatifs incomplets',
      'Dossier déposé trop tard par rapport au calendrier du projet',
    ],
    fit: [
      'Producteurs ou managers qui structurent une tournée',
      'Structures réunionnaises ou ultramarines avec contraintes logistiques fortes',
      'Équipes qui n’ont jamais déposé auprès de la SPEDIDAM',
    ],
  },
  adami: {
    slug: 'adami',
    short: 'ADAMI',
    title: 'Aides ADAMI',
    audience:
      'Artistes-interprètes et projets qui nécessitent un accompagnement autour de la création, du rayonnement ou de la circulation des œuvres.',
    summary:
      "L'ADAMI peut être pertinente sur des projets d'artistes, de création ou de développement, selon la nature du projet et les dispositifs ouverts.",
    why:
      'Le défi est souvent de présenter un projet artistique fort dans un cadre lisible, tout en respectant précisément les critères du dispositif visé.',
    includes: [
      'Soutiens à des projets artistiques ou de diffusion',
      'Aides ponctuelles selon programmes ouverts',
      'Cadres spécifiques à lire finement avant dépôt',
    ],
    watchouts: [
      'Dossier trop narratif sans structure claire',
      'Confusion entre intention artistique et critères de recevabilité',
      'Budget insuffisamment relié au projet présenté',
    ],
    fit: [
      'Artistes ou équipes qui ont une matière forte mais un dossier peu lisible',
      'Projets à forte dimension créative',
      'Demandes qui nécessitent une reformulation stratégique',
    ],
  },
  sacem: {
    slug: 'sacem',
    short: 'SACEM',
    title: 'Aides SACEM',
    audience:
      'Auteurs, compositeurs, éditeurs et structures portant des projets de création ou de développement musical.',
    summary:
      'La SACEM intervient sur différents volets liés à la création, à la production ou au développement de projets musicaux.',
    why:
      'Ce sont souvent de bonnes opportunités pour des structures qui ont cessé de déposer par manque de temps ou faute de traduction institutionnelle du projet.',
    includes: [
      'Aides à la création musicale',
      'Soutiens à des projets portés par auteurs, compositeurs ou éditeurs',
      'Dispositifs à articuler avec d’autres financeurs si besoin',
    ],
    watchouts: [
      'Projet convaincant artistiquement mais argumentaire trop flou',
      'Retour au dépôt après plusieurs années sans veille',
      'Mauvaise articulation entre SACEM et autres aides envisagées',
    ],
    fit: [
      'Éditeurs musicaux ou auteurs-compositeurs',
      'Structures qui veulent relancer une stratégie d’aides',
      'Projets de création nécessitant un cadre plus solide',
    ],
  },
  regions: {
    slug: 'regions',
    short: 'Régions · DAC',
    title: 'Régions, DAC et collectivités',
    audience:
      'Associations, collectifs, structures culturelles, artistes et opérateurs territoriaux avec enjeux de création, diffusion ou structuration.',
    summary:
      'Les aides régionales, DAC, collectivités et appels à projets territoriaux sont souvent décisifs, mais très hétérogènes selon les territoires.',
    why:
      'Ici, le travail consiste surtout à cibler juste, comprendre les logiques locales et adapter le dossier à des cahiers des charges très variables.',
    includes: [
      'Appels à projets culturels territoriaux',
      'Aides à la création ou à la diffusion locale',
      'Soutiens à la structuration selon le territoire',
    ],
    watchouts: [
      'Veille chronophage et peu lisible',
      'Dossier trop générique pour un guichet local',
      'Mauvaise lecture des attendus politiques ou territoriaux',
    ],
    fit: [
      'Structures implantées localement ou en Outre-mer',
      'Associations culturelles et collectifs artistiques',
      'Projets qui combinent création, diffusion et impact territorial',
    ],
  },
}

export const dispositifList = Object.values(dispositifs)
