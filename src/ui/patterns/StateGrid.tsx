import type { CSSProperties, ReactNode } from 'react'
import { Card } from '../components/Card'
import { Specimen } from '../primitives/Specimen'
import css from './StateGrid.module.css'

export interface StateGridItem {
  label: string
  specimen: ReactNode
}

export interface StateGridProps {
  states: StateGridItem[]
  columns?: number
  style?: CSSProperties
}

export function StateGrid({ states, columns, style }: StateGridProps) {
  const gridStyle: CSSProperties = {
    ...(columns ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : {}),
    ...style,
  }
  return (
    <div className={css.root} style={gridStyle}>
      {states.map((state, i) => (
        <Card key={i} surface="outlined" padding={0}>
          <div className={css.cell}>
            <Specimen centered>{state.specimen}</Specimen>
            <span className={css.label}>{state.label}</span>
          </div>
        </Card>
      ))}
    </div>
  )
}
