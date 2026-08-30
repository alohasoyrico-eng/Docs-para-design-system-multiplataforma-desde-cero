import type { CSSProperties } from 'react'
import css from './Progress.module.css'

export interface ProgressProps {
  value?: number
  max?: number
  label?: string
  showValue?: boolean
  tone?: 'accent' | 'warning'
  style?: CSSProperties
}

export function Progress({ value = 0, max = 100, label, showValue, tone = 'accent', style }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={css.root} style={style}>
      {(label || showValue) && (
        <div className={css.header}>
          {label && <span className={css.label}>{label}</span>}
          {showValue && <span className={css.value}>{value}/{max}</span>}
        </div>
      )}
      <div
        className={css.track}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div className={css.bar} data-tone={tone} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
