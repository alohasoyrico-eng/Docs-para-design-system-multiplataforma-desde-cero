import type { CSSProperties, ReactNode } from 'react'
import css from './SectionHeader.module.css'

export interface SectionHeaderProps {
  children: ReactNode
  trailing?: ReactNode
  size?: 'sm' | 'md' | 'display'
  style?: CSSProperties
}

export function SectionHeader({ children, trailing, size = 'md', style }: SectionHeaderProps) {
  return (
    <div className={css.root} data-size={size} style={style}>
      <span className={css.title}>{children}</span>
      {trailing && <span className={css.trailing}>{trailing}</span>}
    </div>
  )
}
