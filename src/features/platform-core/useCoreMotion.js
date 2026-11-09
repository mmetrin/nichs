import { useEffect, useRef, useState } from 'react'

export function useCoreMotion() {
  const container = useRef(null)
  const pointer = useRef({ x: 0, y: 0 })
  const [visible, setVisible] = useState(() => !document.hidden)
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  // DesignViewport keeps the 1920px desktop composition at every display scale.
  const compact = false
  const desktop = true

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => { setReduced(motion.matches); pointer.current = { x: 0, y: 0 } }
    let inView = true
    const updateVisibility = () => setVisible(inView && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; updateVisibility() }, { threshold: 0.01 })
    observer.observe(container.current)
    motion.addEventListener('change', updateMotion)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => {
      observer.disconnect()
      motion.removeEventListener('change', updateMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  const onPointerMove = (event) => {
    if (reduced || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width * 2 - 1
    const y = (event.clientY - rect.top) / rect.height * 2 - 1
    pointer.current.x = desktop ? Math.max(-1, Math.min(1, x)) : x
    pointer.current.y = desktop ? Math.max(-1, Math.min(1, y)) : y
  }
  const onPointerLeave = () => { pointer.current = { x: 0, y: 0 } }

  return { container, pointer, reduced, compact, desktop, visible, running: visible && !reduced, onPointerMove, onPointerLeave }
}
