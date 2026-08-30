import type { CSSProperties } from 'react'
import css from './StatusPill.module.css'

export interface StatusPillProps {
  label: string
  tone?: 'success' | 'warning' | 'danger' | 'info'
  style?: CSSProperties
}

export function StatusPill({ label, tone = 'success', style }: StatusPillProps) {
  return (
    <span className={css.root} data-tone={tone} style={style}>
      <span className={css.dot} />
      {label}
    </span>
  )
}
