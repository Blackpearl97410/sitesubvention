import { ReactNode } from 'react'
import TrackLabel from './TrackLabel'
import clsx from 'clsx'

interface TrackProps {
  name: string
  type?: string
  armed?: boolean
  children: ReactNode
  className?: string
  contentClassName?: string
  hideLabel?: boolean
}

export default function Track({ name, type, armed, children, className, contentClassName, hideLabel }: TrackProps) {
  return (
    <div className={clsx('flex border-b border-rule', className)}>
      {hideLabel ? null : <TrackLabel name={name} type={type} armed={armed} />}
      <div
        className={clsx('flex-1 flex items-center px-10 py-3 gap-4', contentClassName)}
        style={{
          background: 'var(--surface)',
          backdropFilter: 'blur(8px)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.58)',
        }}
      >
        {children}
      </div>
    </div>
  )
}
