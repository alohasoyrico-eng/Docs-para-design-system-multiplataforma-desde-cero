import { Breadcrumb } from '../ui/components/Breadcrumb'
import { SectionRule } from '../ui/components/SectionRule'
import { Table } from '../ui/components/Table'
import { CodeBlock } from '../ui/components/CodeBlock'
import { StatusPill } from '../ui/primitives/StatusPill'
import { InlineCode } from '../ui/primitives/InlineCode'
import { SectionHeader } from '../ui/primitives/SectionHeader'
import { DocHero } from '../ui/patterns/DocHero'
import { DocFooter } from '../ui/patterns/DocFooter'
import dictionary from '../data/growth-events.json'
import css from './GrowthPage.module.css'

interface EventDef {
  description: string
  props: string[]
  status: string
  surfaces: string[]
}

const events = dictionary.events as Record<string, EventDef>
const owner = dictionary.owner as string

const STATUS_TONE: Record<string, 'success' | 'warning' | 'info'> = {
  approved: 'success',
  proposed: 'warning',
  deprecated: 'info',
}

const ADAPTER_EXAMPLE = [
  `import type { GrowthAdapter } from '@alohasoyrico-eng/flow-react'`,
  '',
  `// Mixpanel, Firebase o lo que venga: ~15 líneas y una sola puerta.`,
  `export const mixpanelAdapter: GrowthAdapter = {`,
  `  track: (event, props) => mixpanel.track(event, props),`,
  `  identify: (id, traits) => { mixpanel.identify(id); mixpanel.people.set(traits) },`,
  `  variant: (experiment) => undefined,`,
  `}`,
].join('\n')

export function GrowthPage() {
  const rows = Object.entries(events).map(([name, def]) => ({
    name,
    description: def.description,
    props: def.props.join(', '),
    surfaces: def.surfaces.join(', '),
    status: def.status,
  }))
  const approved = rows.filter(r => r.status === 'approved').length

  return (
    <>
      <div className={css.heroZone}>
        <div className={css.heroInner}>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/', icon: 'home' },
              { label: 'Foundations', href: '#' },
              { label: 'Growth' },
            ]}
          />
          <DocHero
            name="Growth"
            summary="El diccionario de eventos de Flow. Todo lo que se mide vive aquí antes de dispararse; research aprueba cada entrada."
          />
        </div>
      </div>

      <div className={css.content}>
        <section className={css.section}>
          <SectionRule
            label="Diccionario de eventos"
            meta={`${rows.length} eventos · ${approved} aprobados · owner: ${owner}`}
          />
          <div className={css.sectionHeading}>
            <SectionHeader size="display">
              <span>Un vocabulario,</span>
              <span className={css.headingSub}>cero eventos ad-hoc</span>
            </SectionHeader>
          </div>
          <Table
            columns={[
              {
                key: 'name',
                label: 'Evento',
                mono: true,
                render: (row: Record<string, unknown>) => <InlineCode>{String(row.name)}</InlineCode>,
              },
              { key: 'description', label: 'Qué significa' },
              { key: 'props', label: 'Props', mono: true },
              { key: 'surfaces', label: 'Superficies' },
              {
                key: 'status',
                label: 'Status',
                render: (row: Record<string, unknown>) => (
                  <StatusPill
                    label={String(row.status)}
                    tone={STATUS_TONE[String(row.status)] ?? 'info'}
                  />
                ),
              },
            ]}
            rows={rows}
            rowKey="name"
            sortable={false}
          />
        </section>

        <section className={css.section}>
          <SectionRule label="Cómo se propone un evento" meta="proposed → approved" />
          <ol className={css.processList}>
            <li>
              Agrega la entrada a <InlineCode>src/growth/events.json</InlineCode> en el repo del DS
              con <InlineCode>status: &quot;proposed&quot;</InlineCode> — nombre{' '}
              <InlineCode>objeto_accion</InlineCode> en snake_case, con descripción, props y superficies.
            </li>
            <li>
              Abre el PR. CODEOWNERS exige el review de research; CI valida el schema y la convención de nombres.
            </li>
            <li>
              Research lo aprueba flipeando a <InlineCode>status: &quot;approved&quot;</InlineCode>.
              Mientras esté <InlineCode>proposed</InlineCode>, dispararlo avisa en consola en dev.
            </li>
          </ol>
        </section>

        <section className={css.section}>
          <SectionRule label="Conectar un proveedor" meta="El adapter es la única puerta" />
          <CodeBlock code={ADAPTER_EXAMPLE} filename="adapters/mixpanel.ts" />
        </section>

        <DocFooter version="src/growth/events.json" />
      </div>
    </>
  )
}
