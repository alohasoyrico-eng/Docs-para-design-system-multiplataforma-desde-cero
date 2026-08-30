import type { CSSProperties, ReactNode } from 'react'
import css from './AutoGrid.module.css'

export interface AutoGridProps {
  minWidth?: string
  gap?: string
  children: ReactNode
  style?: CSSProperties
}

export function AutoGrid({ minWidth = '320px', gap, children, style }: AutoGridProps) {
  const vars: CSSProperties = {
    '--ag-min': minWidth,
    ...(gap ? { '--ag-gap': gap } : {}),
    ...style,
  } as CSSProperties
  return (
    <div className={css.root} style={vars}>
      {children}
    </div>
  )
}
