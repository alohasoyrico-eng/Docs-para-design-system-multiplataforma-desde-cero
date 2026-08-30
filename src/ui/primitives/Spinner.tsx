import type { CSSProperties } from 'react'
import { useIntl } from 'react-intl'
import css from './Spinner.module.css'

export interface SpinnerProps {
  size?: number
  color?: string
  label?: string
  style?: CSSProperties
}

export function Spinner({ size = 20, color, label, style }: SpinnerProps) {
  const intl = useIntl()
  const resolvedLabel = label ?? intl.formatMessage({ id: 'common.loading', defaultMessage: 'Cargando' })
  const borderWidth = Math.max(2, size / 9)

  return (
    <span
      role="status"
      aria-label={resolvedLabel}
      className={css.root}
      style={{
        width: size,
        height: size,
        borderWidth,
        borderTopColor: color || 'var(--action-accent)',
        ...style,
      }}
    />
  )
}
