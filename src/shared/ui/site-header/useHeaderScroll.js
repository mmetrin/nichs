import { useEffect, useState } from 'react'

export function useHeaderScroll(headerRef, keepVisible, enabled) {
  const [isHidden, setIsHidden] = useState(true)

  useEffect(() => {
    if (!enabled) return
    const scrollPosition = () => Math.max(0, Math.min(
      window.scrollY,
      document.documentElement.scrollHeight - window.innerHeight,
    ))
    let previousY = scrollPosition()
    let direction = 0
    let directionStart = previousY
    let frame = 0

    const update = () => {
      frame = 0
      const y = scrollPosition()
      const nextDirection = Math.sign(y - previousY)
      if (nextDirection && nextDirection !== direction) {
        directionStart = previousY
        direction = nextDirection
      }
      previousY = y

      const nearTop = y <= (headerRef.current?.getBoundingClientRect().height ?? 88)
      const hasFocus = headerRef.current?.contains(document.activeElement)
      const passedTolerance = Math.abs(y - directionStart) >= (direction > 0 ? 12 : 8)
      setIsHidden((previous) => {
        if (nearTop) return true
        if (!previous && (keepVisible || hasFocus)) return false
        return passedTolerance ? direction > 0 : previous
      })
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [headerRef, keepVisible, enabled])

  return { isHidden }
}
