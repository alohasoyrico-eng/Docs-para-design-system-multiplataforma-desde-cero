import type { ReactNode, CSSProperties } from 'react'
import css from './EmptyState.module.css'

export interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  action?: ReactNode
  style?: CSSProperties
}

export function EmptyState({ icon = 'inbox', title, description, action, style }: EmptyStateProps) {
  return (
    <div className={css.root} style={style}>
      <div className={css.iconWrap}>
        <span className={`flow-icon ${css.icon}`} aria-hidden="true">{icon}</span>
      </div>
      <div className={css.title}>{title}</div>
      {description && <div className={css.description}>{description}</div>}
      {action && <div className={css.action}>{action}</div>}
    </div>
  )
}
