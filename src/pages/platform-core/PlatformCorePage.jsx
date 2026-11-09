import { SiteHeader } from '../../shared/ui/site-header/SiteHeader.jsx'
import { SiteFooter } from '../../shared/ui/site-sections/SiteFooter.jsx'
import { PlatformCoreHero, PlatformAudienceSection, PlatformCoreSections } from '../../features/platform-core/index.js'
import '../../shared/styles/tokens.css'
import './PlatformCorePage.css'

const platformNavigation = [
  { id: 'how-it-works', label: 'Как работает', href: '#how-it-works' },
  { id: 'who-it-is-for', label: 'Кому подходит', href: '#who-it-is-for' },
  { id: 'platforms', label: 'Площадки', href: '#platforms' },
  { id: 'budget', label: 'Расчет бюджета', href: '#budget' },
  { id: 'interface', label: 'Интерфейс', href: '#interface' },
]

export function PlatformCorePage({ pageNavigation = false }) {
  return <main className="enterprise-hero-page platform-core-page">
    <SiteHeader actionHref="#connection" navigationItems={pageNavigation ? platformNavigation : undefined} className={pageNavigation ? 'platform-page-navigation' : ''} />
    <PlatformCoreHero />
    <PlatformAudienceSection />
    <PlatformCoreSections />
    <SiteFooter />
  </main>
}
