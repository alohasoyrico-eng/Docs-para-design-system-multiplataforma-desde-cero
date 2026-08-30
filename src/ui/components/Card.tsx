import type { ReactNode, CSSProperties, MouseEventHandler } from 'react'
import css from './Card.module.css'

export interface CardProps {
  padding?: string | number
  surface?: 'elevated' | 'outlined' | 'inverse'
  hover?: 'lift' | 'fill' | 'none'
  interactive?: boolean
  children: ReactNode
  onClick?: MouseEventHandler<HTMLDivElement>
  style?: CSSProperties
}

export function Card({ padding, surface = 'elevated', hover, interactive, children, onClick, style }: CardProps) {
  const effectiveHover = hover ?? (interactive ? 'lift' : 'none')
  return (
    <div
      className={css.root}
      data-surface={surface}
      data-hover={effectiveHover !== 'none' ? effectiveHover : undefined}
      data-interactive={interactive || undefined}
      onClick={onClick}
      style={{
        ...(padding != null ? { padding } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  )
}
