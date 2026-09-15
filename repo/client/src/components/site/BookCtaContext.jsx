import { createContext, useContext, useMemo, useState } from 'react'

/**
 * Coordinates the "Book a session" CTA so it can be a single shared element:
 * it renders in the hero, then hands off to the navbar once the hero scrolls
 * past. `framer-motion` animates between the two slots via a shared layoutId.
 */
const BookCtaContext = createContext({
  passed: false,
  hasHero: false,
  setPassed: () => {},
  setHasHero: () => {},
})

export function BookCtaProvider({ children }) {
  const [passed, setPassed] = useState(false)
  const [hasHero, setHasHero] = useState(false)

  const value = useMemo(
    () => ({ passed, hasHero, setPassed, setHasHero }),
    [passed, hasHero],
  )

  return <BookCtaContext.Provider value={value}>{children}</BookCtaContext.Provider>
}

export const useBookCta = () => useContext(BookCtaContext)

export const BOOK_CTA_TRANSITION = { type: 'spring', stiffness: 340, damping: 30, mass: 0.6 }
