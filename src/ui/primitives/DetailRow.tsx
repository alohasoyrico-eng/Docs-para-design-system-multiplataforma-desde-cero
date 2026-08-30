import type { CSSProperties, ReactNode } from 'react'
import css from './DetailRow.module.css'

export interface DetailRowProps {
  label: ReactNode
  value: ReactNode
  mono?: boolean
  style?: CSSProperties
}

export function DetailRow({ label, value, mono, style }: DetailRowProps) {
  return (
    <div className={css.root} style={style}>
      <span className={css.label}>{label}</span>
      <span className={css.value} data-mono={mono || undefined}>{value}</span>
    </div>
  )
}
