import type { CSSProperties } from 'react'
import css from './Divider.module.css'

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  label?: string
  style?: CSSProperties
}

export function Divider({ orientation = 'horizontal', label, style }: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        className={css.vertical}
        style={style}
      />
    )
  }

  if (!label) {
    return (
      <hr
        role="separator"
        className={css.horizontal}
        style={style}
      />
    )
  }

  return (
    <div
      role="separator"
      aria-label={label}
      className={css.labeled}
      style={style}
    >
      <span className={css.line} />
      <span className={css.text}>{label}</span>
      <span className={css.line} />
    </div>
  )
}
