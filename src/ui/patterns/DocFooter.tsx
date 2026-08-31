import type { CSSProperties, ReactNode } from 'react'
import css from './DocFooter.module.css'

export interface DocFooterLink {
  label: string
  href: string
}

export interface DocFooterProps {
  lastUpdated?: string
  version?: string
  links?: DocFooterLink[]
  children?: ReactNode
  style?: CSSProperties
}

export function DocFooter({ lastUpdated, version, links, children, style }: DocFooterProps) {
  return (
    <footer className={css.root} style={style}>
      <div className={css.info}>
        {lastUpdated && <span className={css.item}>Last updated {lastUpdated}</span>}
        {version && <span className={css.item}><span className={css.mono}>{version}</span></span>}
        {children}
      </div>
      {links && links.length > 0 && (
        <nav className={css.links}>
          {links.map((link, i) => (
            <span key={link.label}>
              {i > 0 && <span className={css.dot}>·</span>}
              <a href={link.href} className={css.link}>{link.label}</a>
            </span>
          ))}
        </nav>
      )}
    </footer>
  )
}
