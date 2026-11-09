import { useRef } from 'react'
import { useHeroFactsBottom } from '../../shared/lib/useHeroFactsBottom.js'
import { CoreVisual } from './CoreVisual.jsx'
import { OrbitalHeroFacts } from './OrbitalHeroFacts.jsx'
import infoIcon from '../../assets/platform-core/audience-info.svg'
import '../../shared/ui/action-button/ActionButton.css'
import './PlatformCoreHero.css'

const platformFacts = [
  {
    id: 'audience',
    value: <>65+<span>млн</span></>,
    description: <>достижимых абонентов МТС<br />с согласием на рекламу</>,
  },
  {
    id: 'mau',
    value: <>120<span>млн</span></>,
    description: <>пользователей в месяц<br />на площадках <button className="platform-core-hero__mau-info" type="button" aria-label="Площадки: VK, Avito и Telegram."><img src={infoIcon} width="24" height="24" alt="" /><span className="platform-core-hero__mau-tooltip" aria-hidden="true">Площадки: VK, Avito и Telegram.</span></button></>,
  },
  {
    id: 'account',
    value: <>1<span>кабинет</span></>,
    description: <>для управления рекламой<br />на всех площадках сразу</>,
  },
]

export function PlatformCoreHero() {
  const heroRef = useRef(null)
  useHeroFactsBottom(heroRef, '.platform-core-hero__cta', '.orbital-hero__facts')

  return <section ref={heroRef} className="platform-core-hero" id="top" aria-labelledby="platform-core-title">
    <div className="platform-core-hero__main">
      <div className="platform-core-hero__copy">
        <h1 id="platform-core-title">Объединяем ведущие площадки в <span className="platform-core-hero__accent">единую</span> систему управления рекламой</h1>
        <p className="platform-core-hero__description">VK, Avito и Telegram: аудитория, автоматическое управление ставками, контроль охватов и частоты на всех площадках</p>
        <div className="platform-core-hero__actions">
          <a className="action-button action-button--large platform-core-hero__cta" href="#connection"><span className="action-button__label">Оставить заявку</span></a>
        </div>
      </div>
      <CoreVisual />
      <OrbitalHeroFacts facts={platformFacts} />
    </div>
  </section>
}
