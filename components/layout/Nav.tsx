'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton'
import { motionTiming } from '@/lib/tokens'

const links = [
  { label: 'Offres',      href: '/offres' },
  { label: 'Méthode',     href: '/comment-ca-fonctionne' },
  { label: 'Dispositifs', href: '/dispositifs' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const navBg = 'rgba(16, 16, 16, 0.88)'
  const navBorder = 'rgba(243, 241, 234, 0.14)'
  const navBorderStrong = 'rgba(243, 241, 234, 0.24)'
  const navText = 'text-white'
  const navTextSoft = 'text-white/70 hover:text-white'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
    <nav
      className="fixed top-0 left-0 right-0 z-[500] isolate flex items-stretch overflow-hidden transition-colors"
      style={{
        height: 'var(--nav-h)',
        background: navBg,
        backdropFilter: 'blur(14px)',
        borderBottom: scrolled ? `1px solid ${navBorderStrong}` : `1px solid ${navBorder}`,
        boxShadow: scrolled
          ? '0 14px 32px rgba(0, 0, 0, 0.28)'
          : '0 8px 22px rgba(0, 0, 0, 0.16)',
      }}
    >
      {/* Logo */}
      <div
        className="flex w-[136px] flex-shrink-0 items-center border-r px-3 md:w-[var(--label-w)] md:px-5"
        style={{ borderColor: navBorderStrong }}
      >
        <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.18 }}>
          <Link
            href="/"
            className={`group relative inline-flex items-center overflow-visible font-cond text-base font-extrabold uppercase tracking-[0.08em] ${navText} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black`}
          >
            <span className="pointer-events-none absolute -inset-x-3 -inset-y-2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.16),rgba(200,82,50,0.14)_38%,transparent_72%)] opacity-45 blur-md transition-all duration-500 group-hover:scale-110 group-hover:opacity-95" />
            <span className="pointer-events-none absolute -inset-x-4 -inset-y-3 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(200,82,50,0.28),transparent_68%)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-80" />
            <span className="relative z-10 inline-flex items-center drop-shadow-[0_0_12px_rgba(243,241,234,0.28)] transition-[filter,color] duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_18px_rgba(243,241,234,0.55)]">
              <span>Dossier</span>
              <span className="text-accent">.</span>
              <span>Studio</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 -left-8 w-7 -skew-x-12 bg-white/18 opacity-0 blur-[1px] transition-all duration-700 ease-out group-hover:left-[110%] group-hover:opacity-100" />
          </Link>
        </motion.div>
      </div>

      {/* Links */}
      <ul className="mobile-no-scrollbar m-0 flex min-w-0 flex-1 list-none items-center gap-1 overflow-x-auto px-2 py-0 md:gap-3 md:overflow-visible md:px-10">
        {links.map((l) => (
          <motion.li key={l.href} whileHover={{ y: -1 }} transition={{ duration: 0.18 }}>
            {(() => {
              const isActive = pathname === l.href || pathname.startsWith(`${l.href}/`)
              return (
                <LiquidGlassButton
                  href={l.href}
                  active={isActive}
                  size="sm"
                  className={isActive ? `${navText} px-3 text-[0.64rem] md:px-5 md:text-[0.75rem]` : `${navTextSoft} px-3 text-[0.64rem] md:px-5 md:text-[0.75rem]`}
                  contentClassName={isActive ? navText : navTextSoft}
                >
                  <span className="inline-flex items-center gap-2 whitespace-nowrap">
                    {isActive ? <span className="h-1.5 w-1.5 rounded-full bg-accent" /> : null}
                    <span className="leading-none">{l.label}</span>
                  </span>
                </LiquidGlassButton>
              )
            })()}
          </motion.li>
        ))}
      </ul>

      {/* Espace client */}
      <motion.div
        className="flex flex-shrink-0 items-center"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.22, ease: motionTiming.ease }}
      >
        <LiquidGlassButton
          href="/espace-client"
          active={pathname === '/espace-client'}
          size="sm"
          className="mr-2 px-3 md:mr-3 md:px-4"
          contentClassName="text-white/88"
        >
          <span className="whitespace-nowrap leading-none">Espace client</span>
        </LiquidGlassButton>
      </motion.div>
    </nav>
    {pathname !== '/diagnostic' ? (
      <Link
        href="/diagnostic"
        className="fixed bottom-4 left-4 right-4 z-[520] inline-flex h-12 items-center justify-center rounded-full border border-[rgba(243,241,234,0.28)] bg-[linear-gradient(135deg,#c85232,#dc7551)] font-cond text-[0.76rem] font-bold uppercase tracking-[0.14em] text-white shadow-[0_18px_44px_rgba(0,0,0,0.26),0_14px_36px_rgba(200,82,50,0.28)] md:hidden"
      >
        Diagnostic gratuit
      </Link>
    ) : null}
    </>
  )
}
