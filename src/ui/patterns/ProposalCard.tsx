import type { CSSProperties, ReactNode } from 'react'
import { Card } from '../components/Card'
import css from './ProposalCard.module.css'

export interface ProposalCardProps {
  before: ReactNode
  after: ReactNode
  beforeLabel?: string
  afterLabel?: string
  footer?: ReactNode
  style?: CSSProperties
}

export function ProposalCard({ before, after, beforeLabel = 'Before', afterLabel = 'After', footer, style }: ProposalCardProps) {
  return (
    <Card surface="outlined" style={style} padding={0}>
      <div className={css.root}>
        <div className={css.panel} data-tone="danger">
          <span className={css.label}>{beforeLabel}</span>
          <div className={css.content}>{before}</div>
        </div>
        <div className={css.panel} data-tone="success">
          <span className={css.label}>{afterLabel}</span>
          <div className={css.content}>{after}</div>
        </div>
      </div>
      {footer && (
        <div className={css.footer}>{footer}</div>
      )}
    </Card>
  )
}
