'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

type BackgroundGradientAnimationProps = {
  gradientBackgroundStart?: string
  gradientBackgroundEnd?: string
  firstColor?: string
  secondColor?: string
  thirdColor?: string
  fourthColor?: string
  fifthColor?: string
  pointerColor?: string
  size?: string
  blendingValue?: CSSProperties['mixBlendMode']
  children?: ReactNode
  className?: string
  interactive?: boolean
  containerClassName?: string
}

export function BackgroundGradientAnimation({
  gradientBackgroundStart = 'rgb(18, 18, 18)',
  gradientBackgroundEnd = 'rgb(34, 28, 24)',
  firstColor = '200, 82, 50',
  secondColor = '243, 241, 234',
  thirdColor = '122, 68, 52',
  fourthColor = '88, 54, 46',
  fifthColor = '214, 145, 119',
  pointerColor = '200, 82, 50',
  size = '80%',
  blendingValue = 'soft-light',
  children,
  className,
  interactive = true,
  containerClassName,
}: BackgroundGradientAnimationProps) {
  const interactiveRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number>()
  const current = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
  }, [])

  useEffect(() => {
    if (!interactive) return

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) / 18
      current.current.y += (target.current.y - current.current.y) / 18

      if (interactiveRef.current) {
        interactiveRef.current.style.transform = `translate(${Math.round(current.current.x)}px, ${Math.round(current.current.y)}px)`
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [interactive])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactiveRef.current || !interactive) return
    const rect = event.currentTarget.getBoundingClientRect()
    target.current.x = event.clientX - rect.left
    target.current.y = event.clientY - rect.top
  }

  const variables = {
    '--gradient-background-start': gradientBackgroundStart,
    '--gradient-background-end': gradientBackgroundEnd,
    '--first-color': firstColor,
    '--second-color': secondColor,
    '--third-color': thirdColor,
    '--fourth-color': fourthColor,
    '--fifth-color': fifthColor,
    '--pointer-color': pointerColor,
    '--gradient-size': size,
    '--gradient-blend': blendingValue,
  } as CSSProperties

  return (
    <div
      className={cn(
        'absolute inset-0 overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]',
        containerClassName
      )}
      style={variables}
      onMouseMove={handleMouseMove}
      aria-hidden="true"
    >
      <svg className="hidden">
        <defs>
          <filter id="siteGradientBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {children ? <div className={cn('relative z-[2]', className)}>{children}</div> : null}

      <div
        className={cn(
          'absolute inset-0 h-full w-full blur-lg',
          isSafari ? 'blur-2xl' : '[filter:url(#siteGradientBlur)_blur(44px)]'
        )}
      >
        <div className="absolute left-[calc(50%-var(--gradient-size)/2)] top-[calc(50%-var(--gradient-size)/2)] h-[var(--gradient-size)] w-[var(--gradient-size)] animate-first [background:radial-gradient(circle_at_center,rgba(var(--first-color),0.85)_0,rgba(var(--first-color),0)_52%)_no-repeat] [mix-blend-mode:var(--gradient-blend)] [transform-origin:center_center]" />
        <div className="absolute left-[calc(50%-var(--gradient-size)/2)] top-[calc(50%-var(--gradient-size)/2)] h-[var(--gradient-size)] w-[var(--gradient-size)] animate-second [background:radial-gradient(circle_at_center,rgba(var(--second-color),0.45)_0,rgba(var(--second-color),0)_52%)_no-repeat] [mix-blend-mode:var(--gradient-blend)] [transform-origin:calc(50%-360px)]" />
        <div className="absolute left-[calc(50%-var(--gradient-size)/2)] top-[calc(50%-var(--gradient-size)/2)] h-[var(--gradient-size)] w-[var(--gradient-size)] animate-third [background:radial-gradient(circle_at_center,rgba(var(--third-color),0.7)_0,rgba(var(--third-color),0)_52%)_no-repeat] [mix-blend-mode:var(--gradient-blend)] [transform-origin:calc(50%+320px)]" />
        <div className="absolute left-[calc(50%-var(--gradient-size)/2)] top-[calc(50%-var(--gradient-size)/2)] h-[var(--gradient-size)] w-[var(--gradient-size)] animate-fourth opacity-75 [background:radial-gradient(circle_at_center,rgba(var(--fourth-color),0.6)_0,rgba(var(--fourth-color),0)_52%)_no-repeat] [mix-blend-mode:var(--gradient-blend)] [transform-origin:calc(50%-180px)]" />
        <div className="absolute left-[calc(50%-var(--gradient-size)/2)] top-[calc(50%-var(--gradient-size)/2)] h-[var(--gradient-size)] w-[var(--gradient-size)] animate-fifth [background:radial-gradient(circle_at_center,rgba(var(--fifth-color),0.55)_0,rgba(var(--fifth-color),0)_52%)_no-repeat] [mix-blend-mode:var(--gradient-blend)] [transform-origin:calc(50%-640px)_calc(50%+640px)]" />

        {interactive ? (
          <div
            ref={interactiveRef}
            className="absolute -left-1/2 -top-1/2 h-full w-full opacity-60 [background:radial-gradient(circle_at_center,rgba(var(--pointer-color),0.32)_0,rgba(var(--pointer-color),0)_50%)_no-repeat] [mix-blend-mode:var(--gradient-blend)]"
          />
        ) : null}
      </div>
    </div>
  )
}
