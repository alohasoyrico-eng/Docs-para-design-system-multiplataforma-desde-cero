import type { CSSProperties, ReactNode } from 'react'
import css from './InlineCode.module.css'

export interface InlineCodeProps {
  children: ReactNode
  style?: CSSProperties
}

export function InlineCode({ children, style }: InlineCodeProps) {
  return (
    <code className={css.root} style={style}>
      {children}
    </code>
  )
}
