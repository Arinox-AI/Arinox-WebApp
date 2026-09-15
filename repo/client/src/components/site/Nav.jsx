import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from './Button'
import { nav } from '../../data/site'
import { useBookCta, BOOK_CTA_TRANSITION } from './BookCtaContext'

const links = nav

function navCls({ isActive }) {
  return `text-[12.5px] transition-colors duration-150 pb-1 ${
    isActive ? 'text-ink shadow-[inset_0_-2px_0_var(--color-ember)]' : 'text-ink-soft hover:text-ink'
  }`
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { passed, hasHero } = useBookCta()
  const showNavCta = !hasHero || passed

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-[10px]">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-7">
        <Link to="/" aria-label="Arinox home" className="shrink-0">
          <img src="/images/brand/logo-orange.png" alt="Arinox" className="h-[26px] w-auto" />
        </Link>

        <nav className="chip hidden items-center lg:flex" aria-label="Main">
          {links.map((l, i) => (
            <span key={l.to} className="flex items-center">
              {i > 0 && <span className="px-2.5 text-ink-faint" aria-hidden>·</span>}
              <NavLink to={l.to} className={navCls} end={l.to === '/'}>
                {l.label}
              </NavLink>
            </span>
          ))}
        </nav>

        <div className="hidden lg:block">
          <motion.div
            initial={false}
            animate={{
              opacity: showNavCta ? 1 : 0,
              y: showNavCta ? 0 : -10,
              scale: showNavCta ? 1 : 0.9,
            }}
            transition={BOOK_CTA_TRANSITION}
            style={{ pointerEvents: showNavCta ? 'auto' : 'none' }}
            aria-hidden={!showNavCta}
          >
            <Button to="/contact" variant="ember" size="sm">Book a session</Button>
          </motion.div>
        </div>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-px w-6 bg-ink" />
          <span className="h-px w-6 bg-ink" />
          <span className="h-px w-6 bg-ink" />
        </button>
      </div>

      {open && (
        <>
          <button
            className="fixed inset-0 top-[68px] z-40 cursor-default bg-ink/40 backdrop-blur-[2px] lg:hidden"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-x-0 top-[68px] z-50 border-b border-line bg-paper p-7 pb-10 shadow-[0_30px_60px_-30px_rgba(11,11,13,0.45)] lg:hidden">
            <nav className="flex flex-col" aria-label="Mobile">
              {[...links, { label: 'Contact', to: '/contact' }].map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `border-b border-line py-4 font-display text-2xl tracking-[-0.01em] transition-colors ${
                      isActive ? 'text-ember' : 'text-ink'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-7">
              <Button to="/contact" variant="ember" className="w-full" onClick={() => setOpen(false)}>
                Book a session
              </Button>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
