import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'ghost' | 'outline'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  asChild?: boolean
}

const base =
  'inline-flex items-center justify-center font-cond font-bold tracking-[0.14em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-[#b01a0a]',
  ghost:   'bg-transparent text-soft border border-rule-dark hover:border-black hover:text-black',
  outline: 'bg-transparent text-black border border-black hover:bg-[rgba(243,241,234,0.08)] hover:text-black',
}

const sizes: Record<Size, string> = {
  sm: 'text-[0.5rem] px-5 py-2.5',
  md: 'text-[0.625rem] px-7 py-3',
  lg: 'text-[0.6875rem] px-9 py-4',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
)

Button.displayName = 'Button'
export { Button }
