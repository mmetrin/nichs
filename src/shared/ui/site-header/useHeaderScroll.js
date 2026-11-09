import { useEffect, useRef, useState } from 'react'
import { createHeaderScrollState } from './headerScrollState.js'

export function useHeaderScroll(headerRef, keepVisible, enabled) {
  const [isHidden, setIsHidden] = useState(true)
  const keepVisibleRef = useRef(keepVisible)

  useEffect(() => { keepVisibleRef.current = keepVisible }, [keepVisible])

  useEffect(() => {
    if (!enabled) return
    const scrollPosition = () => Math.max(0, Math.min(
      window.scrollY,
      document.documentElement.scrollHeight - window.innerHeight,
    ))
    const nextHidden = createHeaderScrollState(scrollPosition())
    let hidden = true
    let topBoundary = 88
    let frame = 0

    const measureHeader = () => {
      topBoundary = headerRef.current?.getBoundingClientRect().height ?? 88
    }
    measureHeader()

    const update = () => {
      frame = 0
      const hasFocus = headerRef.current?.contains(document.activeElement)
      const next = nextHidden(scrollPosition(), {
        topBoundary,
        keepVisible: keepVisibleRef.current || hasFocus,
      })
      if (next !== hidden) {
        hidden = next
        setIsHidden(next)
      }
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    const onResize = () => { measureHeader(); onScroll() }
    const observer = new ResizeObserver(onResize)
    if (headerRef.current) observer.observe(headerRef.current)

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
    }
  }, [headerRef, enabled])

  return { isHidden }
}
