import type { CSSProperties, ReactNode } from 'react'
import { Divider } from '../primitives/Divider'
import css from './SectionRule.module.css'

export interface SectionRuleProps {
  label: string
  meta?: ReactNode
  style?: CSSProperties
}

export function SectionRule({ label, meta, style }: SectionRuleProps) {
  return (
    <div className={css.root} style={style}>
      <span className={css.label}>{label}</span>
      <Divider />
      {meta && <span className={css.meta}>{meta}</span>}
    </div>
  )
}
