import type { CSSProperties, ReactNode } from 'react'
import { Card } from '../components/Card'
import { Specimen } from '../primitives/Specimen'
import css from './GuidanceCard.module.css'

export interface GuidanceCardProps {
  tone: 'success' | 'danger'
  rules: string[]
  specimen?: ReactNode
  style?: CSSProperties
}

export function GuidanceCard({ tone, rules, specimen, style }: GuidanceCardProps) {
  return (
    <Card style={style} padding={0}>
      <div className={css.root} data-tone={tone}>
        {specimen && (
          <div className={css.specimen}>
            <Specimen centered>{specimen}</Specimen>
          </div>
        )}
        <div className={css.body}>
          <span className={css.label}>{tone === 'success' ? 'Do' : "Don't"}</span>
          <ul className={css.rules}>
            {rules.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      </div>
    </Card>
  )
}
