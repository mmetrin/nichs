import { createPortal } from 'react-dom'
import { useRef } from 'react'
import logo from '../../../assets/figma/header-menu/logo.svg'
import { useHeaderScroll } from './useHeaderScroll.js'
import '../action-button/ActionButton.css'
import './SiteHeader.css'

export function SiteHeader(props) {
  return <><PageHeader {...props} /><PageHeader {...props} floating /></>
}

function PageHeader({ navigationItems = [], actionHref = '#connection', className = '', floating = false }) {
  const headerRef = useRef(null)
  const { isHidden } = useHeaderScroll(headerRef, false, floating)
  return createPortal(
    <header ref={headerRef} inert={floating && isHidden} aria-hidden={floating && isHidden ? true : undefined}
      className={`site-header site-header--updated${floating ? ' site-header--floating site-header--fixed-on' : ' site-header--static'}${floating && isHidden ? ' site-header--hidden' : ''} ${className}`}>
      <div className="site-header__frame" aria-hidden="true" />
      <div className="site-header__content">
        <a className="site-header__logo" href="#top" aria-label="МТС Маркетолог 2.0 — начало страницы"><img src={logo} alt="МТС ADS" /></a>
        <nav className="site-header__navigation" aria-label="Основная навигация">
          {navigationItems.map(item => <a className="site-header__navigation-link" href={item.href} key={item.id}>{item.label}</a>)}
        </nav>
        <a className="action-button action-button--medium site-header__action" href={actionHref}><span className="action-button__label">Запустить рекламу</span></a>
      </div>
    </header>, document.body,
  )
}
