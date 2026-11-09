import { useLayoutEffect } from 'react'

const MIN_BUTTON_GAP = 60
const MIN_BOTTOM_GAP = 30
const PREFERRED_BOTTOM_GAP = 120

export function useHeroFactsBottom(heroRef, buttonSelector = '.enterprise-hero__cta', factsSelector = '.enterprise-hero__facts') {
  useLayoutEffect(() => {
    const hero = heroRef.current
    const button = hero?.querySelector(buttonSelector)
    const facts = hero?.querySelector(factsSelector)
    if (!hero || !button || !facts) return undefined

    const positionFacts = () => {
      // Mobile compositions can place the facts after the illustration in normal flow.
      if (getComputedStyle(facts).position !== 'absolute') {
        hero.style.removeProperty('--hero-content-min-height')
        hero.style.removeProperty('--hero-facts-bottom')
        return
      }
      const heroRect = hero.getBoundingClientRect()
      const scale = heroRect.width / hero.offsetWidth
      if (!scale) return

      // Measure in layout pixels so all gaps scale together with the design.
      const buttonBottom = (button.getBoundingClientRect().bottom - heroRect.top) / scale
      const factsHeight = facts.getBoundingClientRect().height / scale
      const contentHeight = buttonBottom + MIN_BUTTON_GAP + factsHeight
      const minHeight = Math.ceil(contentHeight + MIN_BOTTOM_GAP)
      const bottomGap = Math.max(MIN_BOTTOM_GAP,
        Math.min(PREFERRED_BOTTOM_GAP, heroRect.height / scale - contentHeight))

      hero.style.setProperty('--hero-content-min-height', `${minHeight}px`)
      hero.style.setProperty('--hero-facts-bottom', `${bottomGap}px`)
    }

    const observer = new ResizeObserver(positionFacts)
    observer.observe(hero)
    observer.observe(facts)
    for (let element = button; element && element !== hero; element = element.parentElement) {
      observer.observe(element)
    }
    window.addEventListener('resize', positionFacts)
    positionFacts()

    let isMounted = true
    document.fonts?.ready.then(() => {
      if (isMounted) positionFacts()
    })

    return () => {
      isMounted = false
      observer.disconnect()
      window.removeEventListener('resize', positionFacts)
      hero.style.removeProperty('--hero-content-min-height')
      hero.style.removeProperty('--hero-facts-bottom')
    }
  }, [heroRef, buttonSelector, factsSelector])
}
