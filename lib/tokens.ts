// Design tokens — Dossier Studio
// Source de vérité pour les animations GSAP/Framer qui ne passent pas par Tailwind

export const colors = {
  white:      '#111111',
  paper:      '#151515',
  trackBg:    '#171717',
  surface:    'rgba(17,17,17,0.96)',
  surface2:   'rgba(28,28,26,0.98)',
  black:      '#F3F1EA',
  ink:        '#F3F1EA',
  soft:       '#D7D2C8',
  dim:        '#A39E95',
  rule:       'rgba(243,241,234,0.14)',
  ruleDark:   'rgba(243,241,234,0.24)',
  accent:     '#C85232',
  accentDim:  'rgba(200,82,50,0.09)',
  accentGlow: 'rgba(200,82,50,0.22)',
} as const

export const layout = {
  labelW:  160,  // px
  navH:    68,   // px
  rulerH:  28,   // px
} as const

export const motionTiming = {
  ease:         [0.25, 0.1, 0.25, 1] as const,
  baseDuration: 0.7,
  fastDuration: 0.45,
  slowDuration: 0.95,
  cinematic:    1.15,
  stagger:      0.12,
} as const

export const motionViewport = {
  margin: '-56px',
} as const

export const motionVariants = {
  revealUp: {
    hidden:  { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  },
  revealSoft: {
    hidden:  { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  },
  revealLeft: {
    hidden:  { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0 },
  },
  revealRight: {
    hidden:  { opacity: 0, x: 12 },
    visible: { opacity: 1, x: 0 },
  },
  revealScale: {
    hidden:  { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 },
  },
  fadeOnly: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1 },
  },
} as const

// Presets Framer Motion réutilisables
// Importé sous le nom motionPresets pour éviter le conflit avec `motion` de framer-motion
export const motionPresets = {
  trackEnter: {
    initial:    motionVariants.revealUp.hidden,
    animate:    motionVariants.revealUp.visible,
    transition: { duration: motionTiming.baseDuration, ease: motionTiming.ease },
  },
  stagger: {
    animate: { transition: { staggerChildren: motionTiming.stagger } },
  },
  fadeIn: {
    initial:    motionVariants.fadeOnly.hidden,
    animate:    motionVariants.fadeOnly.visible,
    transition: { duration: motionTiming.fastDuration, ease: 'easeOut' },
  },
} as const

// Presets GSAP
export const gsapPresets = {
  playheadDuration: 16,   // secondes
  countUpDuration:  2,    // secondes
  splitWordStagger: 0.08, // secondes
} as const
