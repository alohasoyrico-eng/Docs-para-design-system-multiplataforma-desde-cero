import type { CSSProperties, ReactNode } from 'react'
import css from './Specimen.module.css'

export interface SpecimenProps {
  grid?: boolean
  centered?: boolean
  children?: ReactNode
  style?: CSSProperties
}

export function Specimen({ grid, centered = true, children, style }: SpecimenProps) {
  return (
    <div
      className={css.root}
      data-grid={grid || undefined}
      data-centered={centered || undefined}
      style={style}
    >
      {children}
    </div>
  )
}
