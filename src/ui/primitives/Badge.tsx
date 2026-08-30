import type { ReactNode, CSSProperties } from 'react'
import css from './Badge.module.css'

export type BadgeTone = 'default' | 'success' | 'warning' | 'danger' | 'info'

export interface BadgeProps {
  tone?: BadgeTone
  icon?: string
  live?: boolean
  as?: 'span' | 'kbd'
  children?: ReactNode
  style?: CSSProperties
}

export function Badge({ tone = 'default', icon, live, as: Tag = 'span', children, style }: BadgeProps) {
  return (
    <Tag className={css.root} data-tone={tone} style={style}>
      {live && <span className={css.dot} />}
      {icon && <span className={`flow-icon ${css.icon}`} aria-hidden="true">{icon}</span>}
      {children}
    </Tag>
  )
}
