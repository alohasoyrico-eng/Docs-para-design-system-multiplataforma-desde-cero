import type { CSSProperties, ReactNode } from 'react'
import css from './SectionBar.module.css'

export interface SectionBarProps {
  children: ReactNode
  trailing?: ReactNode
  sticky?: boolean
  style?: CSSProperties
}

export function SectionBar({ children, trailing, sticky = true, style }: SectionBarProps) {
  return (
    <div className={css.root} data-sticky={sticky || undefined} style={style}>
      <div className={css.inner}>
        {children}
        <span className={css.spacer} />
        {trailing && <div className={css.trailing}>{trailing}</div>}
      </div>
    </div>
  )
}
