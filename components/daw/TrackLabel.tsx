import clsx from 'clsx'

interface TrackLabelProps {
  name: string
  type?: string
  armed?: boolean
}

export default function TrackLabel({ name, type, armed }: TrackLabelProps) {
  return (
    <div
      className="hidden flex-col justify-center gap-1 flex-shrink-0 border-r border-rule-dark px-5 py-3 md:flex"
      style={{ width: 'var(--label-w)', background: 'var(--track-bg)' }}
    >
      <span className="font-mono text-[0.625rem] font-bold tracking-[0.14em] uppercase text-soft">
        {name}
      </span>
      {type && (
        <span className="font-mono text-[0.5625rem] tracking-[0.1em] uppercase text-dim">
          {type}
        </span>
      )}
      <div
        className={clsx(
          'w-2 h-2 rounded-full mt-1 transition-all',
          armed ? 'bg-accent shadow-[0_0_10px_var(--accent-glow)]' : 'bg-rule'
        )}
      />
    </div>
  )
}
