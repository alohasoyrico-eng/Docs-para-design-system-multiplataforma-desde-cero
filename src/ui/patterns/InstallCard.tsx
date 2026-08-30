import type { CSSProperties } from 'react'
import { Card } from '../components/Card'
import { CodeBlock } from '../components/CodeBlock'
import { Badge, type BadgeTone } from '../primitives/Badge'
import css from './InstallCard.module.css'

export interface InstallCardProps {
  platform: string
  command: string
  status?: string
  statusTone?: BadgeTone
  style?: CSSProperties
}

export function InstallCard({ platform, command, status, statusTone = 'success', style }: InstallCardProps) {
  return (
    <Card surface="inverse" style={style} padding={0}>
      <div className={css.root}>
        <div className={css.header}>
          <span className={css.platform}>{platform}</span>
          {status && <Badge tone={statusTone}>{status}</Badge>}
        </div>
        <CodeBlock code={command} copyable />
      </div>
    </Card>
  )
}
