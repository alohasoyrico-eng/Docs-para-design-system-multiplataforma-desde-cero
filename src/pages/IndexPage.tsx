import { Link } from '@tanstack/react-router'
import { getAllContracts } from '../data/contracts'
import { SectionHeader } from '../ui/primitives/SectionHeader'
import { Badge } from '../ui/primitives/Badge'
import { Card } from '../ui/components/Card'
import css from './IndexPage.module.css'

export function IndexPage() {
  const allContracts = getAllContracts()
  const contracts = Object.entries(allContracts).map(([id, c]) => ({ ...c, id }))

  const byLayer: Record<string, typeof contracts> = {}
  for (const c of contracts) {
    const layer = c.layer
    if (!byLayer[layer]) byLayer[layer] = []
    byLayer[layer]!.push(c)
  }

  const layers = ['primitives', 'components', 'patterns']

  return (
    <div className={css.page}>
      <div className={css.hero}>
        <SectionHeader size="display">
          <span>Flow Components</span>
          <span className={css.sub}>142 components across 3 layers</span>
        </SectionHeader>
      </div>

      {layers.map(layer => {
        const items = byLayer[layer]
        if (!items?.length) return null
        return (
          <section key={layer} className={css.section}>
            <div className={css.layerHeader}>
              <h2 className={css.layerTitle}>{layer}</h2>
              <Badge tone="info">{items.length}</Badge>
            </div>
            <div className={css.grid}>
              {items.map(c => (
                <Link key={c.id} to="/docs/$componentId" params={{ componentId: c.id }} className={css.cardLink}>
                  <Card interactive hover="lift">
                    <div className={css.cardContent}>
                      <span className={css.componentName}>{c.name}</span>
                      <span className={css.componentSummary}>{c.summary}</span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
