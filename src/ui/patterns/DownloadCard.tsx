import type { CSSProperties } from 'react'
import { Card } from '../components/Card'
import css from './DownloadCard.module.css'

export interface DownloadCardProps {
  filename: string
  description?: string
  icon?: string
  href?: string
  style?: CSSProperties
}

export function DownloadCard({ filename, description, icon = 'description', href, style }: DownloadCardProps) {
  return (
    <Card surface="outlined" style={style}>
      <div className={css.root}>
        <span className={`flow-icon ${css.icon}`} aria-hidden="true">{icon}</span>
        <div className={css.info}>
          <span className={css.filename}>{filename}</span>
          {description && <span className={css.desc}>{description}</span>}
        </div>
        {href && (
          <a href={href} className={css.action}>
            <span className="flow-icon" aria-hidden="true">download</span>
          </a>
        )}
      </div>
    </Card>
  )
}
