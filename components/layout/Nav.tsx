'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Magnetic from '@/components/motion/Magnetic'
import RollingText from '@/components/motion/RollingText'
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
    <nav
      className="fixed top-0 left-0 right-0 z-[500] isolate flex items-stretch transition-colors"
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
        className="flex-shrink-0 flex items-center px-5 border-r"
        style={{ width: 'var(--label-w)', borderColor: navBorderStrong }}
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
      <ul className="flex items-center gap-3 flex-1 px-10 list-none m-0 p-0">
        {links.map((l) => (
          <motion.li key={l.href} whileHover={{ y: -1 }} transition={{ duration: 0.18 }}>
            {(() => {
              const isActive = pathname === l.href || pathname.startsWith(`${l.href}/`)
              return (
                <LiquidGlassButton
                  href={l.href}
                  active={isActive}
                  size="md"
                  className={isActive ? navText : navTextSoft}
                  contentClassName={isActive ? navText : navTextSoft}
                >
                  <span className="inline-flex items-center gap-2">
                    {isActive ? <span className="h-1.5 w-1.5 rounded-full bg-accent" /> : null}
                    <span className="leading-none">{l.label}</span>
                  </span>
                </LiquidGlassButton>
              )
            })()}
          </motion.li>
        ))}
      </ul>

      {/* CTA */}
      <Magnetic strength={10}>
        <motion.div
          whileHover={{ y: -1.5, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={{ duration: 0.24, ease: motionTiming.ease }}
        >
          <LiquidGlassButton
            href="/diagnostic"
            warm
            size="lg"
            className="mr-4"
            contentClassName="text-white"
          >
            <span className="font-cond font-bold text-[0.6875rem] tracking-[0.14em] uppercase text-white whitespace-nowrap">
              <span className="leading-none">Diagnostic gratuit</span>
            </span>
          </LiquidGlassButton>
        </motion.div>
      </Magnetic>
    </nav>
  )
}
