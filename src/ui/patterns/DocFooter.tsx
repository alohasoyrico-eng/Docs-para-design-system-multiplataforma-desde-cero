import type { CSSProperties } from 'react'
import css from './DocFooter.module.css'

export interface DocFooterProps {
  lastUpdated?: string
  version?: string
  maintainer?: string
  style?: CSSProperties
}

export function DocFooter({ lastUpdated, version, maintainer, style }: DocFooterProps) {
  return (
    <footer className={css.root} style={style}>
      {lastUpdated && <span className={css.item}>Updated {lastUpdated}</span>}
      {version && <span className={css.item}><span className={css.mono}>{version}</span></span>}
      {maintainer && <span className={css.item}>{maintainer}</span>}
    </footer>
  )
}
