'use client'

import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type LiquidGlassButtonProps = {
  children: ReactNode
  href?: string
  className?: string
  contentClassName?: string
  active?: boolean
  warm?: boolean
  size?: 'sm' | 'md' | 'lg'
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>

const sizeClasses = {
  sm: 'min-h-[34px] px-4 text-[0.6875rem]',
  md: 'min-h-[42px] px-5 text-[0.75rem]',
  lg: 'min-h-[46px] px-7 text-[0.8125rem]',
} as const

export function LiquidGlassButton({
  children,
  href,
  className,
  contentClassName,
  active = false,
  warm = false,
  size = 'md',
  ...props
}: LiquidGlassButtonProps) {
  const rootClassName = cn(
    'group relative inline-flex items-center justify-center overflow-hidden rounded-full transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    sizeClasses[size],
    className
  )

  const chromeClassName = warm
    ? cn(
        'absolute inset-0 rounded-full',
        active
          ? 'bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.05))]'
          : 'bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))]'
      )
    : cn(
        'absolute inset-0 rounded-full',
        active
          ? 'bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.05))]'
          : 'bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))]'
      )

  const edgeClassName = warm
    ? 'absolute inset-0 rounded-full border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(0,0,0,0.18),0_16px_34px_rgba(200,82,50,0.2),0_0_0_1px_rgba(255,255,255,0.04)]'
    : 'absolute inset-0 rounded-full border border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.18),0_14px_30px_rgba(0,0,0,0.18),0_0_0_1px_rgba(255,255,255,0.03)]'

  const glowClassName = warm
    ? 'absolute inset-[1px] rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_56%),linear-gradient(135deg,rgba(200,82,50,0.9),rgba(216,106,71,0.8))]'
    : cn(
        'absolute inset-[1px] rounded-full',
        active
          ? 'bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(200,82,50,0.08))]'
          : 'bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]'
      )

  const labelClassName = cn(
    'relative z-10 font-cond font-semibold uppercase tracking-[0.14em] transition-colors',
    warm ? 'text-white' : active ? 'text-white' : 'text-white/82',
    contentClassName
  )

  const inner = (
    <>
      <span className={chromeClassName} />
      <span className={edgeClassName} />
      <span className={glowClassName} style={{ backdropFilter: 'blur(18px) saturate(140%)' }} />
      <span className="pointer-events-none absolute inset-[2px] -translate-x-[120%] rounded-full opacity-0 transition-all duration-700 ease-out group-hover:translate-x-[120%] group-hover:opacity-100 bg-[linear-gradient(105deg,transparent_18%,rgba(255,255,255,0.16)_46%,transparent_74%)]" />
      <span className="pointer-events-none absolute inset-[1px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.18),transparent_32%),radial-gradient(circle_at_75%_78%,rgba(255,255,255,0.1),transparent_30%)]" />
      <span className={labelClassName}>{children}</span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={rootClassName}>
        {inner}
      </Link>
    )
  }

  return (
    <button className={rootClassName} {...props}>
      {inner}
    </button>
  )
}
