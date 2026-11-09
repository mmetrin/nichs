import { useEffect, useRef, useState } from 'react'

// The DSP hero's single clock drives both slide changes and indicator fill.
const SLIDE_DURATION = 4000

export function useInterfaceCarousel(slides) {
  const sectionRef = useRef(null)
  const progressRef = useRef(null)
  const elapsedRef = useRef(0)
  const [slide, setSlide] = useState({ active: 0, previous: null })
  const [ready, setReady] = useState(false)
  const [available, setAvailable] = useState(false)
  const [focused, setFocused] = useState(false)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const cycling = ready && available && !focused && !paused && !reducedMotion

  function selectSlide(index) {
    setSlide(current => {
      const next = (index + slides.length) % slides.length
      return current.active === next ? current : { active: next, previous: current.active }
    })
  }

  useEffect(() => {
    let cancelled = false
    Promise.allSettled(slides.map(item => {
      const image = new Image()
      image.src = item.cover
      return image.decode()
    })).then(() => { if (!cancelled) setReady(true) })
    return () => { cancelled = true }
  }, [slides])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setReducedMotion(query.matches)
    let inView = false
    const syncVisibility = () => setAvailable(inView && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.25
      syncVisibility()
    }, { threshold: 0.25 })
    observer.observe(sectionRef.current)
    syncMotion()
    query.addEventListener('change', syncMotion)
    document.addEventListener('visibilitychange', syncVisibility)
    return () => {
      observer.disconnect()
      query.removeEventListener('change', syncMotion)
      document.removeEventListener('visibilitychange', syncVisibility)
    }
  }, [])

  useEffect(() => {
    elapsedRef.current = 0
    progressRef.current?.style.setProperty('--slide-progress', '0')
  }, [slide.active])

  useEffect(() => {
    if (!cycling) return
    let frame
    let previousTime = performance.now()
    const tick = now => {
      elapsedRef.current += now - previousTime
      previousTime = now
      const progress = Math.min(1, elapsedRef.current / SLIDE_DURATION)
      progressRef.current?.style.setProperty('--slide-progress', String(progress))
      if (progress === 1) {
        setSlide(current => ({ active: (current.active + 1) % slides.length, previous: current.active }))
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [cycling, slide.active, slides.length])

  return { sectionRef, progressRef, slide, cycling, available, selectSlide, setFocused, setPaused }
}
