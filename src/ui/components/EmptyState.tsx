import type { ReactNode } from 'react'
import css from './EmptyState.module.css'

export interface EmptyStateProps {
  icon?: string
  title?: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className={css.root}>
      {icon && <span className={`flow-icon ${css.icon}`} aria-hidden="true">{icon}</span>}
      {title && <div className={css.title}>{title}</div>}
      {description && <div className={css.description}>{description}</div>}
      {action && <div className={css.action}>{action}</div>}
    </div>
  )
}
