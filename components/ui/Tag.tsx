import { cn } from '@/lib/cn'

interface TagProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'dim'
  className?: string
}

export function Tag({ children, variant = 'default', className }: TagProps) {
  const variants = {
    default: 'text-dim',
    accent:  'text-accent',
    dim:     'text-[var(--rule-dark)]',
  }
  return (
    <span
      className={cn(
        'font-mono text-[0.4375rem] tracking-[0.12em] uppercase whitespace-nowrap',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
