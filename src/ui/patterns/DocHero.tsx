import type { CSSProperties } from 'react'
import { StatusPill } from '../primitives/StatusPill'
import { Badge } from '../primitives/Badge'
import css from './DocHero.module.css'

export interface DocHeroPlatform {
  label: string
  tone: 'success' | 'warning' | 'danger' | 'info'
}

export interface DocHeroProps {
  name: string
  summary: string
  platforms?: DocHeroPlatform[]
  a11yLevel?: string
  style?: CSSProperties
}

const SHY = '­'

function splitCamel(str: string) {
  return str.replace(/([a-z])([A-Z])/g, `$1${SHY}$2`)
}

export function DocHero({ name, summary, platforms = [], a11yLevel, style }: DocHeroProps) {
  const hasPills = platforms.length > 0 || a11yLevel
  return (
    <section className={css.root} style={style}>
      <div className={css.main}>
        <h1 className={css.headline}>{splitCamel(name)}</h1>
      </div>
      <div className={css.meta}>
        <p className={css.desc}>{summary}</p>
        {hasPills && (
          <div className={css.pills}>
            {platforms.map(p => (
              <StatusPill key={p.label} label={p.label} tone={p.tone} />
            ))}
            {a11yLevel && <Badge tone="info">{a11yLevel}</Badge>}
          </div>
        )}
      </div>
    </section>
  )
}
