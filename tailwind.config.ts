import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white:        '#F8F8F5',
        paper:        '#F1F2EE',
        track:        '#F5F6F1',
        black:        '#0C0C0C',
        ink:          '#161614',
        soft:         '#565650',
        dim:          '#85857E',
        rule:         '#D0D2CA',
        'rule-dark':  '#BABDB4',
        accent:       '#C85232',
        'accent-dim': 'rgba(200,82,50,0.05)',
      },
      fontFamily: {
        cond: ['var(--font-barlow-condensed)', 'sans-serif'],
        body: ['var(--font-barlow)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      // Les tailles fluides (clamp) restent dans globals.css en tant que variables CSS
      // Tailwind gère les valeurs fixes uniquement
    },
  },
  plugins: [],
}

export default config
