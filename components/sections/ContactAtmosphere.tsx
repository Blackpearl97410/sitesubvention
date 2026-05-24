'use client'

import clsx from 'clsx'

const bars = [34, 58, 42, 72, 46, 88, 54, 68, 38, 76, 48, 62]

export default function ContactAtmosphere({
  className,
  compact = false,
}: {
  className?: string
  compact?: boolean
}) {
  return (
    <div
      aria-hidden="true"
      className={clsx('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <span className="contact-grid absolute inset-0 opacity-[0.18]" />
      <span className="contact-scan absolute left-0 top-8 h-px w-full bg-accent/40" />
      <span className="contact-plate absolute right-8 top-8 hidden h-28 w-28 border border-white/10 md:block" />
      <span className="contact-plate absolute right-16 top-16 hidden h-20 w-20 border border-accent/20 md:block" />

      <div
        className={clsx(
          'absolute right-7 flex items-end gap-1.5 opacity-35',
          compact ? 'bottom-7 h-20' : 'bottom-9 h-28'
        )}
      >
        {bars.map((height, index) => (
          <span
            key={`${height}-${index}`}
            className="contact-eq-bar block w-[3px] rounded-full bg-accent"
            style={{
              height: `${height}%`,
              animationDelay: `${index * 0.16}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
