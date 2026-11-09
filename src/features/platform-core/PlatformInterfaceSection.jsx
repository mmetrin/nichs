import { useEffect, useRef, useState } from 'react'
import playIcon from '../../assets/platform-core/videos/play.svg'
import { platformInterfaceSlides as slides } from './platformInterfaceSlides.js'
import { useInterfaceCarousel } from './useInterfaceCarousel.js'
import './PlatformInterfaceSection.css'

export function PlatformInterfaceSection() {
  const { sectionRef, progressRef, slide, cycling, available, selectSlide, setFocused, setPaused } = useInterfaceCarousel(slides)
  const videosRef = useRef([])
  const touchStart = useRef(null)
  const [playing, setPlaying] = useState(null)
  const [error, setError] = useState(null)
  const stateClass = index => index === slide.active ? ' is-active' : index === slide.previous ? ' is-previous' : ''

  useEffect(() => {
    videosRef.current.forEach((video, index) => {
      if (video && (!available || index !== slide.active)) video.pause()
    })
  }, [available, slide.active])

  function changeSlide(index) {
    const next = (index + slides.length) % slides.length
    if (next === slide.active) return
    videosRef.current[slide.active]?.pause()
    setPlaying(null)
    setError(null)
    selectSlide(next)
  }

  function startVideo(index) {
    const video = videosRef.current[index]
    if (!video) return
    setPaused(true)
    setError(null)
    setPlaying(index)
    video.play().catch(() => {
      setPlaying(current => current === index ? null : current)
      setError(index)
    })
  }

  return <section className="platform-interface" id="interface" ref={sectionRef}
    aria-label="Возможности интерфейса" aria-roledescription="карусель"
    onPointerDownCapture={() => setFocused(false)}
    onFocusCapture={event => setFocused(event.target.matches(':focus-visible'))}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}
    onKeyDown={event => {
      if (event.target.tagName === 'VIDEO' || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return
      event.preventDefault()
      changeSlide(slide.active + (event.key === 'ArrowRight' ? 1 : -1))
    }}
    onTouchStart={event => {
      if (event.target.tagName === 'VIDEO') return
      touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }
    }}
    onTouchCancel={() => { touchStart.current = null }}
    onTouchEnd={event => {
      if (!touchStart.current) return
      const dx = event.changedTouches[0].clientX - touchStart.current.x
      const dy = event.changedTouches[0].clientY - touchStart.current.y
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) changeSlide(slide.active + (dx < 0 ? 1 : -1))
      touchStart.current = null
    }}>
    <div className="platform-interface__copy">
      <div className="platform-interface__texts">
        {slides.map((item, index) => <article key={item.id}
          className={`platform-interface__text${stateClass(index)}`} aria-hidden={index !== slide.active}>
          <h2>{item.titleLines[0]}<br />{item.titleLines[1]}</h2>
          <p>{item.description}</p>
        </article>)}
      </div>
      <div className="platform-interface__actions">
        <a className="platform-sections__cta" href="#budget">Посчитать бюджет</a>
        <div className="platform-interface__navigation" role="group" aria-label="Слайды">
          {slides.map((item, index) => <button key={item.id} type="button" className="platform-interface__dot"
            aria-label={`Слайд ${index + 1}: ${item.label}`} aria-pressed={index === slide.active}
            onClick={() => changeSlide(index)}><span ref={index === slide.active ? progressRef : null} /></button>)}
        </div>
      </div>
    </div>
    <div className="platform-interface__media">
      {slides.map((item, index) => <div key={item.id}
        className={`platform-interface__screen${stateClass(index)}${playing === index ? ' is-playing' : ''}`}
        aria-hidden={index !== slide.active} inert={index !== slide.active}>
        <video ref={element => { videosRef.current[index] = element }} src={item.video} controls={playing === index}
          playsInline preload="none" aria-label={`Видео: ${item.label}`}
          onPlay={() => setPaused(true)}
          onEnded={() => {
            videosRef.current[index].currentTime = 0
            setPlaying(null)
            setPaused(false)
          }} />
        {playing !== index && <>
          <img className={`platform-interface__poster platform-interface__poster--${item.id}`} src={item.cover} alt="" />
          <button className="platform-interface__playback" type="button" onClick={() => startVideo(index)}
            aria-label={`Воспроизвести видео «${item.label}»`}><img src={playIcon} alt="" /></button>
        </>}
        {error === index && <p className="platform-interface__error" role="alert">Не удалось запустить видео. Попробуйте ещё раз.</p>}
      </div>)}
    </div>
    <span className="platform-sections__sr-only" aria-live={cycling ? 'off' : 'polite'} aria-atomic="true">{slides[slide.active].title}</span>
  </section>
}
