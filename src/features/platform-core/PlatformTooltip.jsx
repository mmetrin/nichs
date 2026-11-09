import { useEffect, useId, useRef, useState } from 'react'
import arrow from '../../assets/platform-core/tooltip-arrow.svg'
import './PlatformTooltip.css'

export function PlatformTooltip({ icon, label, children, className = '' }) {
  const id = useId()
  const triggerRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [offset, setOffset] = useState(-6)

  useEffect(() => {
    if (!open) return undefined
    const dismiss = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', dismiss)
    return () => document.removeEventListener('keydown', dismiss)
  }, [open])

  const positionTooltip = () => {
    const trigger = triggerRef.current
    const bounds = trigger.getBoundingClientRect()
    const scale = bounds.width / trigger.offsetWidth
    // Keep the same placement in both the scaled canvas and the responsive page.
    setOffset(Math.max((8 - bounds.left) / scale,
      Math.min(-6, (window.innerWidth - 8 - bounds.left) / scale - 200)))
  }

  return <span className={`platform-tooltip ${className}`} onPointerEnter={(event) => {
    if (event.pointerType !== 'mouse') return
    positionTooltip()
    setOpen(true)
  }} onPointerLeave={(event) => {
    if (event.pointerType === 'mouse') setOpen(false)
  }}>
    <button ref={triggerRef} className="platform-tooltip__trigger" type="button" aria-label={label} aria-describedby={open ? id : undefined}
      onFocus={(event) => {
        if (!event.currentTarget.matches(':focus-visible')) return
        positionTooltip()
        setOpen(true)
      }} onBlur={() => setOpen(false)} onClick={() => {
        positionTooltip()
        setOpen(value => !value)
      }} onKeyDown={(event) => {
        if (event.key === 'Escape') { setOpen(false); event.stopPropagation() }
      }}><img src={icon} width="24" height="24" alt="" /></button>
    <span className="platform-tooltip__bubble" id={id} role="tooltip" hidden={!open} style={{ left: offset }}>
      <span className="platform-tooltip__message">{children}</span>
      <span className="platform-tooltip__arrow" style={{ left: -6 - offset }}><img src={arrow} alt="" /></span>
    </span>
  </span>
}
