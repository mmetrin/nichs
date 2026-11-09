import mtsLogo from '../../../assets/figma/footer/logo-mts-ads.svg'
import vkIcon from '../../../assets/figma/footer/vk.svg'
import telegramIcon from '../../../assets/figma/footer/telegram.svg'
import { footerLinkColumns, footerLegalLinks, footerSocialLinks } from './footerLinks.js'
import './SiteFooter.css'

function FooterLink({ href, children, ...props }) {
  return href ? <a href={href} {...props}>{children}</a> : <span {...props}>{children}</span>
}

export function SiteFooter({ className = '', id }) {
  return (
    <footer className={`site-footer ${className}`.trim()} id={id} aria-label="МТС ADS — разделы сайта и документы">
      <div className="site-footer__brand-card">
        <div className="site-footer__brand">
          <a className="site-footer__logo" href="#top" aria-label="МТС ADS — главная">
            <img src={mtsLogo} alt="МТС ADS" />
          </a>
          <p>Комплексное платформенное решение для продвижения бизнеса любого масштаба</p>
        </div>
        <div className="site-footer__contacts">
          <a className="site-footer__pill" href="https://mmetrin.github.io/test-oct/media/">Медиа МТС ADS: кейсы, новости</a>
          <div className="site-footer__contact-row">
            <a className="site-footer__pill" href="https://mmetrin.github.io/test-oct/contacts/">Контакты</a>
            <div className="site-footer__socials" aria-label="Социальные сети">
              <FooterLink className="site-footer__social" href={footerSocialLinks.vk} aria-label="МТС ADS во ВКонтакте"><img src={vkIcon} alt="" width="32" height="32" /></FooterLink>
              <FooterLink className="site-footer__social" href={footerSocialLinks.telegram} aria-label="МТС ADS в Telegram"><img src={telegramIcon} alt="" width="32" height="32" /></FooterLink>
            </div>
          </div>
        </div>
      </div>
      <div className="site-footer__body">
        <div className="site-footer__inner">
          <nav className="site-footer__services" aria-label="Рекламные решения">
            {footerLinkColumns.map((links) => (
              <ul className="site-footer__column" key={links[0].label}>
                {links.map(({ label, href }) => <li key={label}><FooterLink href={href}>{label}</FooterLink></li>)}
              </ul>
            ))}
          </nav>
          <div className="site-footer__legal">
            <nav className="site-footer__documents" aria-label="Правовая информация">
              {footerLegalLinks.map(({ label, href }) => <FooterLink key={label} href={href}>{label}</FooterLink>)}
            </nav>
            <div className="site-footer__copyright">
              <p>© 2026 АО «МТС Рекламные технологии». Все права защищены</p>
              <span>18+</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
