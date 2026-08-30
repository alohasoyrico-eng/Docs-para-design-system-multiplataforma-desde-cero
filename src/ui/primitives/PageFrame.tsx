import type { CSSProperties, ReactNode, ElementType } from 'react'
import css from './PageFrame.module.css'

export interface PageFrameProps {
  maxWidth?: string | number
  children: ReactNode
  as?: 'div' | 'main' | 'section'
  style?: CSSProperties
}

export function PageFrame({ maxWidth, children, as: Tag = 'div', style }: PageFrameProps) {
  const combined: CSSProperties = {
    ...(maxWidth != null ? { maxWidth } : {}),
    ...style,
  }
  return (
    <Tag className={css.root} style={combined}>
      {children}
    </Tag>
  )
}
