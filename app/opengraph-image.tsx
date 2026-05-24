import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/seo'

export const runtime = 'edge'
export const alt = "Dossier Studio - De l'idée artistique au dossier finançable"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#111111',
          color: '#F3F1EA',
          fontFamily: 'Arial, Helvetica, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 86% 18%, rgba(200,82,50,0.48), transparent 26%), radial-gradient(circle at 14% 88%, rgba(243,241,234,0.13), transparent 24%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 34,
            border: '1px solid rgba(243,241,234,0.22)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 34,
            top: 34,
            bottom: 34,
            width: 116,
            borderRight: '1px solid rgba(243,241,234,0.22)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              transform: 'rotate(-90deg)',
              color: '#A39E95',
              fontSize: 22,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              fontWeight: 700,
            }}
          >
            Aides musicales
          </div>
        </div>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '74px 76px 70px 196px',
            width: '100%',
            height: '100%',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 18, height: 18, borderRadius: 999, background: '#C85232' }} />
              <div style={{ fontSize: 28, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 900 }}>
                Dossier.Studio
              </div>
            </div>
            <div style={{ color: '#A39E95', fontSize: 20 }}>France · La Réunion · Francophonie</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ color: '#C85232', fontSize: 24, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 800 }}>
              {siteConfig.tagline}
            </div>
            <div
              style={{
                fontSize: 82,
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                fontWeight: 900,
                maxWidth: 860,
              }}
            >
              Montage de dossiers d'aides pour projets musicaux
            </div>
            <div style={{ color: '#D7D2C8', fontSize: 26, lineHeight: 1.42, maxWidth: 820 }}>
              CNM · SACEM · ADAMI · SPEDIDAM · Régions · DAC · appels à projets culturels.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, color: '#F3F1EA', fontSize: 20 }}>
            {['Diagnostic', 'Budget', 'Argumentaire', 'Dépôt'].map((item) => (
              <div
                key={item}
                style={{
                  border: '1px solid rgba(243,241,234,0.2)',
                  padding: '11px 16px',
                  background: 'rgba(255,255,255,0.045)',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  )
}
