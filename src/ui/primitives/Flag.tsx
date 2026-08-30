import { type CSSProperties } from 'react'
import 'flag-icons/css/flag-icons.min.css'
import css from './Flag.module.css'

const RADIUS: Record<string, string> = {
  circle: '50%',
  rounded: 'var(--radius-xs)',
  square: '0',
}

export interface FlagProps {
  country: string
  size?: number
  shape?: 'circle' | 'rounded' | 'square'
  label?: string
  ring?: boolean
  style?: CSSProperties
}

export function Flag({ country, size = 20, shape = 'circle', label, ring = true, style }: FlagProps) {
  const cc = String(country || '').toLowerCase()

  return (
    <span
      className={`fi fi-${cc} fis ${css.root}`}
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      style={{
        width: size,
        height: size,
        borderRadius: RADIUS[shape] || RADIUS.circle,
        boxShadow: ring ? 'inset 0 0 0 1px rgba(15,23,42,.12)' : 'none',
        ...style,
      }}
    />
  )
}
