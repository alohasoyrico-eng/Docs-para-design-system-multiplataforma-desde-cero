import type { CSSProperties, ReactNode } from 'react'
import { Specimen } from '../primitives/Specimen'
import css from './AnatomyView.module.css'

export interface AnatomyPart {
  label: string
  description?: string
}

export interface AnatomyViewProps {
  parts: AnatomyPart[]
  children?: ReactNode
  style?: CSSProperties
}

export function AnatomyView({ parts, children, style }: AnatomyViewProps) {
  return (
    <div className={css.root} style={style}>
      {children && (
        <Specimen centered grid>
          {children}
        </Specimen>
      )}
      <ol className={css.legend}>
        {parts.map((part, i) => (
          <li key={i} className={css.part}>
            <span className={css.number}>{i + 1}</span>
            <div>
              <span className={css.partLabel}>{part.label}</span>
              {part.description && <span className={css.partDesc}>{part.description}</span>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
