import type { CSSProperties } from 'react'
import { Card } from '../components/Card'
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
      <Card surface="outlined" hover="fill" interactive>
        <div className={css.inner} data-direction={direction}>
          <span className={css.label}>{label}</span>
          <span className={css.name}>
            {direction === 'prev' && <span className="flow-icon" aria-hidden="true">arrow_back</span>}
            {name}
            {direction === 'next' && <span className="flow-icon" aria-hidden="true">arrow_forward</span>}
          </span>
        </div>
      </Card>
    </a>
  )
}
