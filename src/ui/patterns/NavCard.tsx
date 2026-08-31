import type { CSSProperties } from 'react'
import css from './NavCard.module.css'

export interface NavCardProps {
  label: string
  name: string
  href: string
  direction?: 'prev' | 'next'
  style?: CSSProperties
}

export function NavCard({ label, name, href, direction = 'next', style }: NavCardProps) {
  return (
    <a href={href} className={css.link} style={style}>
      <div className={css.card}>
        <div className={css.inner} data-direction={direction}>
          <span className={css.label}>{label}</span>
          <span className={css.name}>
            {direction === 'prev' && <span className="flow-icon" aria-hidden="true">arrow_back</span>}
            {name}
            {direction === 'next' && <span className="flow-icon" aria-hidden="true">arrow_forward</span>}
          </span>
        </div>
      </div>
    </a>
  )
}
