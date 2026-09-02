import { Button, Breadcrumb, Tabs, SectionBar, SectionRule, CodeBlock, Table, StatusPill, Badge, SectionHeader, InlineCode, AutoGrid, DocHero, DocFooter, PlaygroundCanvas, GuidanceCard, InstallCard, NavCard, AnatomyView, type AnatomyPart, StateGrid, DownloadCard, ProposalCard, type GridColumn, useReveal } from '@alohasoyrico-eng/flow-react'
import { useState, useEffect, useRef, type ReactNode } from 'react'
import { useParams } from '@tanstack/react-router'
import { getContract, getContractNeighbors } from '../data/contracts'
import type { ContractItem } from '../data/contracts'
import { getSpecimen } from '../data/specimens'
import css from './ComponentDetailPage.module.css'

const TABS = [
  { value: 'overview', label: 'Overview', icon: 'dashboard' },
  { value: 'design', label: 'Design', icon: 'palette' },
  { value: 'build', label: 'Build', icon: 'code' },
  { value: 'miel', label: 'MIEL', icon: 'hub' },
]

const INTERACTION_STATES = ['default', 'hover', 'focus', 'active', 'disabled', 'loading']

/* Ejemplo ilustrativo del flujo MIEL — no es el historial real del componente. */
const DEMO_CHANGELOG = [
  { version: '1.112', note: 'Tighten compact padding from 16px to 14px', by: 'agent', status: 'signed' },
  { version: '1.108', note: 'Add danger variant with accessible contrast on light and dark', by: 'agent', status: 'signed' },
  { version: '1.96', note: 'Fix focus ring in forced-colors mode', by: 'human', status: 'signed' },
  { version: '1.90', note: 'Initial release — 4 variants, 3 sizes', by: 'human', status: 'signed' },
]

const PLATFORM_LABELS: Record<string, string> = {
  web: 'React',
  angular: 'Angular',
  flutter: 'Flutter',
}

/* Escala oficial de madurez (contract-truth la valida en CI):
   stable | beta | planned | spec | n/a | deprecated.
   spec = receta aplicable sin implementación propia. */
const STATUS_LABELS: Record<string, string> = {
  stable: 'stable',
  beta: 'beta',
  planned: 'planned',
  spec: 'spec',
  proposed: 'proposed',
  deprecated: 'deprecated',
  'n/a': 'n/a',
}

function platformTone(status: string): 'success' | 'warning' | 'danger' | 'info' | undefined {
  if (status === 'stable') return 'success' as const
  if (status === 'beta') return 'warning' as const
  if (status === 'planned' || status === 'spec' || status === 'proposed') return 'info' as const
  if (status === 'deprecated') return 'danger' as const
  return undefined
}

function parseAnatomyParts(anatomy: string): AnatomyPart[] {
  const firstSentence = anatomy.split('.')[0] ?? ''
  return firstSentence
    .split('+')
    .map(s => s.trim())
    .filter(Boolean)
    .map(label => ({ label }))
}

function parseNotWhen(rule: string): { body: string; instead?: string } {
  const match = rule.match(/^(.+?)\s*—\s*usa\s+(.+)$/i)
  if (match) return { body: match[1]!.trim(), instead: match[2]!.trim() }
  return { body: rule }
}

function generateSnippet(name: string, hasSpecimen: boolean, layer: string) {
  return ({ variant, size }: { variant: string; size: string }) => {
    if (hasSpecimen)
      return `<${name} variant="${variant}" size="${size}">${name === 'Button' ? 'Confirmar carga' : ''}</${name}>`
    if (layer === 'foundations')
      return `// ${name} es un foundation — no renderiza UI. Ver el tab Build.`
    return `// ${name}: contrato sin implementación web todavía`
  }
}

const SIZE_SPECS: Record<string, Record<string, { h: string; pad: string }>> = {
  sm: {
    compact:     { h: '36px', pad: '8px 16px' },
    default:     { h: '36px', pad: '8px 16px' },
    comfortable: { h: '36px', pad: '8px 16px' },
  },
  md: {
    compact:     { h: '44px', pad: '8px 16px' },
    default:     { h: '44px', pad: '12px 20px' },
    comfortable: { h: '44px', pad: '16px 24px' },
  },
  lg: {
    compact:     { h: '52px', pad: '8px 16px' },
    default:     { h: '52px', pad: '12px 24px' },
    comfortable: { h: '56px', pad: '16px 24px' },
  },
}

const VARIANT_TOKENS: Record<string, string> = {
  primary: '--comp-button-bg-primary → --sys-action-high',
  secondary: '--comp-button-border → --sys-border-control',
  ghost: '--comp-button-bg-ghost → transparent',
  danger: '--comp-button-bg-danger → --sys-action-destructive',
}

function generateSpecLabels({ variant, size, density }: { variant: string; size: string; density: string }) {
  const d = density || 'default'
  const s = SIZE_SPECS[size]?.[d] ?? SIZE_SPECS.md!.default!
  return {
    top: `padding ${s.pad} · gap 8px`,
    right: `${s.h} · r12`,
    bottom: VARIANT_TOKENS[variant] ?? '',
  }
}

function generateReactUsage(name: string, _layer: string): string {
  return [
    `import { ${name} } from '@alohasoyrico-eng/flow-react';`,
    '',
    `<${name}`,
    `  variant="primary"`,
    `  size="md"`,
    `  onClick={handleClick}`,
    `>`,
    `  Confirmar`,
    `</${name}>`,
  ].join('\n')
}

function generateFlutterUsage(name: string): string {
  return [
    `import 'package:flow_ds/flow_ds.dart';`,
    '',
    `Flow${name}(`,
    `  variant: Flow${name}Variant.primary,`,
    `  size: Flow${name}Size.md,`,
    `  onPressed: handlePress,`,
    `  child: Text('Confirmar'),`,
    `)`,
  ].join('\n')
}

function RevealSection({ children, className }: { children: ReactNode; className?: string }) {
  const reveal = useReveal()
  return (
    <section ref={reveal.ref} className={`${reveal.className} ${className ?? ''}`}>
      {children}
    </section>
  )
}

function ScrollArc() {
  const [pct, setPct] = useState(0)
  const raf = useRef(0)

  useEffect(() => {
    function onScroll() {
      if (raf.current) return
      raf.current = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight
        setPct(h > 0 ? Math.round((window.scrollY / h) * 100) : 0)
        raf.current = 0
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const arcStart = 0
  const arcEnd = (pct / 100) * 180
  const r = 33.5
  const cx = 116.7
  const cy = 55.06
  const startRad = ((arcStart - 90) * Math.PI) / 180
  const endRad = ((arcEnd + 90) * Math.PI) / 180
  const x1 = cx + r * Math.cos(startRad)
  const y1 = cy + r * Math.sin(startRad)
  const x2 = cx + r * Math.cos(endRad)
  const y2 = cy + r * Math.sin(endRad)
  const largeArc = arcEnd > 180 ? 1 : 0
  const d = pct > 0
    ? `M${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2}`
    : ''

  return (
    <div className={css.scrollArc}>
      <svg viewBox="82 21 69 68" width="22" height="22" className={css.arcSvg}>
        <path
          d="M116.763 21.2508C136.763 21.3758 150.763 34.5008 150.888 55.1258H142.013C141.888 39.0008 131.138 29.0008 116.763 28.8758C103.263 28.7508 91.3877 38.8758 91.3877 55.1258C91.3878 71.3757 102.263 81.2508 116.763 81.2508V88.8758C96.8878 88.8758 82.5128 75.8757 82.5127 55.1258C82.5127 34.3758 98.2627 21.1258 116.763 21.2508Z"
          fill="currentColor"
        />
        {d && (
          <path
            d={d}
            fill="none"
            stroke="var(--flow-red-500)"
            strokeWidth="9"
            strokeLinecap="round"
          />
        )}
      </svg>
      <span className={css.arcPct}>{pct}%</span>
    </div>
  )
}

export function ComponentDetailPage() {
  const { componentId } = useParams({ strict: false })
  const [tab, setTab] = useState('overview')

  const contract = getContract(componentId ?? '')
  const neighbors = getContractNeighbors(componentId ?? '')

  if (!contract) {
    return (
      <div className={css.content}>
        <p className={css.notFound}>
          Component <strong>{componentId}</strong> not found.
        </p>
      </div>
    )
  }

  const platforms = Object.entries(contract.platforms)
  const heroPlatforms = platforms
    .map(([p, s]) => ({
      label: `${PLATFORM_LABELS[p] ?? p} ${STATUS_LABELS[s] ?? s}`,
      tone: platformTone(s) ?? ('info' as const),
    }))

  const fnLabel = contract.fn?.[0]
    ? contract.fn[0].charAt(0).toUpperCase() + contract.fn[0].slice(1)
    : contract.layer
  const crumbs = [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'Components', href: '#' },
    { label: fnLabel, href: '#' },
    { label: contract.name },
  ]

  return (
    <>
      <div className={css.heroZone}>
        <div className={css.heroInner}>
          <Breadcrumb items={crumbs} />
          <DocHero
            name={contract.name}
            summary={contract.summary}
          />
        </div>
      </div>

      <SectionBar sticky contained>
        <Tabs value={tab} onChange={setTab} items={TABS} variant="bar" />
      </SectionBar>

      <div className={css.content}>
        {tab === 'overview' && <OverviewTab contract={contract} componentId={componentId ?? ''} platforms={heroPlatforms} />}
        {tab === 'design' && <DesignTab contract={contract} componentId={componentId ?? ''} />}
        {tab === 'build' && <BuildTab contract={contract} />}
        {tab === 'miel' && <MielTab contract={contract} />}

        <nav className={css.navFooter}>
          {neighbors.prev && (
            <NavCard
              label="Previous"
              name={neighbors.prev.name}
              href={`/docs/${neighbors.prev.id}`}
              direction="prev"
            />
          )}
          {neighbors.next && (
            <NavCard
              label="Next"
              name={neighbors.next.name}
              href={`/docs/${neighbors.next.id}`}
              direction="next"
            />
          )}
        </nav>

        <DocFooter version={contract.src ? `src/ui/${contract.src}` : `${contract.layer} · sin implementación`} />
      </div>

      <ScrollArc />
    </>
  )
}

/* ── Overview Tab ── */

function OverviewTab({ contract, componentId, platforms }: { contract: ContractItem; componentId: string; platforms: { label: string; tone: 'success' | 'warning' | 'danger' | 'info' }[] }) {
  const variants = contract.variants.map(v => ({ value: v.v, label: v.v }))
  const sizes = ['sm', 'md', 'lg']
  const specimenFn = getSpecimen(componentId)

  return (
    <div>
      <RevealSection className={css.section}>
        <SectionRule
          label="Playground"
          meta={`${contract.variants.length} variants · ${sizes.length} sizes`}
        />
        <div className={css.sectionHeading}>
          <SectionHeader size="display">
            <span>Every variant</span>
            <span className={css.headingSub}>in every size</span>
          </SectionHeader>
          <div className={css.platformRow}>
            {contract.status && (
              <StatusPill
                label={STATUS_LABELS[contract.status] ?? contract.status}
                tone={platformTone(contract.status) ?? 'info'}
              />
            )}
            {platforms.map(p => (
              <StatusPill key={p.label} label={p.label} tone={p.tone} />
            ))}
            {contract.a11y.length > 0 && <Badge tone="info">{contract.a11y.length} reglas a11y</Badge>}
          </div>
        </div>
        <PlaygroundCanvas
          variants={variants}
          sizes={sizes}
          densities={['compact', 'default', 'comfortable']}
          snippet={generateSnippet(contract.name, Boolean(specimenFn), contract.layer)}
          specLabels={generateSpecLabels}
        >
          {({ variant, size }) =>
            specimenFn ? (
              specimenFn({ variant, size })
            ) : (
              <div className={css.specimenPlaceholder}>
                <span className={css.specimenName}>{contract.name}</span>
                <span className={css.specimenMeta}>
                  {contract.layer === 'foundations'
                    ? `${contract.status || 'foundation'} · foundation sin specimen visual`
                    : `${contract.status || 'contrato'} · sin implementación web todavía`}
                </span>
              </div>
            )
          }
        </PlaygroundCanvas>
      </RevealSection>

      {(contract.when.length > 0 || contract.notWhen.length > 0) && (
        <RevealSection className={css.section}>
          <SectionRule
            label="Guidance"
            meta={`${contract.when.length + contract.notWhen.length} rules`}
          />
          <div className={css.sectionHeading}>
            <SectionHeader size="display">
              <span>When to use</span>
              <span className={css.headingSub}>and when not to</span>
            </SectionHeader>
          </div>
          <div className={css.guidanceColumns}>
            {contract.when.length > 0 && (
              <div>
                <div className={css.ruleHeader}>
                  <span className={css.ruleDot} data-tone="success" />
                  <span className={css.ruleLabel} data-tone="success">Use when</span>
                  <span className={css.ruleSource}>usage.when</span>
                </div>
                {contract.when.map((rule, i) => (
                  <div key={i} className={css.ruleItem}>{rule}</div>
                ))}
              </div>
            )}
            {contract.notWhen.length > 0 && (
              <div>
                <div className={css.ruleHeader}>
                  <span className={css.ruleDot} data-tone="danger" />
                  <span className={css.ruleLabel} data-tone="danger">Don&apos;t use when</span>
                  <span className={css.ruleSource}>usage.notWhen</span>
                </div>
                {contract.notWhen.map((raw, i) => {
                  const { body, instead } = parseNotWhen(raw)
                  return (
                    <div key={i} className={css.ruleItemRow}>
                      <span className={css.ruleItem}>{body}</span>
                      {instead && (
                        <span className={css.ruleInstead}>{instead}</span>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </RevealSection>
      )}

      {contract.variants.length > 0 && (
        <RevealSection className={css.section}>
          <SectionRule
            label="Platform support"
            meta="Directo del contrato"
          />
          <Table
            columns={[
              {
                key: 'variant',
                label: 'Variant',
                render: (row: Record<string, unknown>) => (
                  <span className={css.variantName}>{String(row.variant)}</span>
                ),
              },
              { key: 'react', label: 'React' },
              { key: 'angular', label: 'Angular' },
              { key: 'flutter', label: 'Flutter' },
            ]}
            rows={contract.variants.map(v => ({
              variant: v.v,
              react: STATUS_LABELS[contract.platforms.web ?? ''] ?? contract.platforms.web ?? '—',
              angular: STATUS_LABELS[contract.platforms.angular ?? ''] ?? contract.platforms.angular ?? '—',
              flutter: STATUS_LABELS[contract.platforms.flutter ?? ''] ?? contract.platforms.flutter ?? '—',
            }))}
            rowKey="variant"
            sortable={false}
          />
        </RevealSection>
      )}

    </div>
  )
}

/* ── Design Tab ── */

function DesignTab({ contract, componentId }: { contract: ContractItem; componentId: string }) {
  const anatomyParts = parseAnatomyParts(contract.anatomy)
  const specimenFn = getSpecimen(componentId)

  return (
    <div>
      {contract.anatomy && (
        <RevealSection className={css.section}>
          <SectionRule
            label="Anatomy"
            meta={`${anatomyParts.length} parts`}
          />
          <div className={css.sectionHeading}>
            <SectionHeader size="display">
              <span>{anatomyParts.length} parts</span>
              <span className={css.headingSub}>no more</span>
            </SectionHeader>
          </div>
          <AnatomyView parts={anatomyParts} />
        </RevealSection>
      )}

      <RevealSection className={css.section}>
        <SectionRule
          label="States"
          meta={`${INTERACTION_STATES.length} states · identity preserved`}
        />
        <StateGrid
          states={INTERACTION_STATES.map(s => ({
            label: s,
            specimen: specimenFn ? (
              specimenFn({ variant: 'primary', size: 'md' })
            ) : (
              <div className={css.specimenPlaceholder}>
                <span className={css.specimenName}>{contract.name}</span>
                <span className={css.specimenMeta}>{s}</span>
              </div>
            ),
          }))}
        />
      </RevealSection>

      {(contract.dos.length > 0 || contract.donts.length > 0) && (
        <RevealSection className={css.section}>
          <SectionRule
            label="Do and don't"
            meta={`${contract.dos.length + contract.donts.length} examples`}
          />
          <AutoGrid minWidth="320px">
            {contract.dos.length > 0 && (
              <GuidanceCard tone="success" rules={contract.dos} />
            )}
            {contract.donts.length > 0 && (
              <GuidanceCard tone="danger" rules={contract.donts} />
            )}
          </AutoGrid>
        </RevealSection>
      )}

      {contract.tokens.length > 0 && (
        <RevealSection className={css.section}>
          <SectionRule
            label="Tokens"
            meta={`${contract.tokens.length} tokens · sys only, never ref`}
          />
          <Table
            columns={[{ key: 'token', label: 'Token', mono: true }]}
            rows={contract.tokens.map(t => ({ token: t }))}
            rowKey="token"
            sortable={false}
          />
        </RevealSection>
      )}
    </div>
  )
}

/* ── Build Tab ── */

function BuildTab({ contract }: { contract: ContractItem }) {
  const platforms = Object.entries(contract.platforms)

  const memberColumns: GridColumn[] = [
    {
      key: 'n',
      label: 'Member',
      mono: true,
      render: (row: Record<string, unknown>) => (
        <>
          {String(row.n)}
          {row.r && <span className={css.required}>*</span>}
        </>
      ),
    },
    { key: 'k', label: 'Kind', mono: true },
    { key: 't', label: 'Type', mono: true },
    { key: 'd', label: 'Default', mono: true },
    { key: 'note', label: 'Notes' },
  ]

  const propCount = contract.members.filter(m => m.k === 'prop').length
  const eventCount = contract.members.filter(m => m.k === 'event').length
  const apiMeta = [
    propCount > 0 ? `${propCount} props` : '',
    eventCount > 0 ? `${eventCount} events` : '',
  ].filter(Boolean).join(' · ')

  return (
    <div>
      <RevealSection className={css.section}>
        <SectionRule
          label="Install"
          meta={platforms.map(([p, s]) => `${p} ${s}`).join(' · ')}
        />
        <AutoGrid minWidth="300px">
          {platforms.map(([platform, status]) => (
            <InstallCard
              key={platform}
              platform={platform}
              command={
                platform === 'flutter'
                  ? 'flutter pub add flow_ds --git-url=https://github.com/alohasoyrico-eng/Design-system-multiplataforma-desde-cero.git --git-path=flutter'
                  : platform === 'web'
                    ? 'npm install @alohasoyrico-eng/flow-react'
                    : 'sin paquete todavía'
              }
              status={STATUS_LABELS[status] ?? status}
              statusTone={platformTone(status)}
            />
          ))}
        </AutoGrid>
      </RevealSection>

      <RevealSection className={css.section}>
        <SectionRule label="Usage" meta="Both platforms" />
        <div className={css.sectionHeading}>
          <SectionHeader size="display">
            <span>Same example</span>
            <span className={css.headingSub}>both platforms</span>
          </SectionHeader>
        </div>
        <div className={css.usagePair}>
          <div className={css.usagePane}>
            <CodeBlock
              code={generateReactUsage(contract.name, contract.layer)}
              filename={`${contract.name.toLowerCase()}.tsx`}
            />
          </div>
          {contract.platforms.flutter && (
            <div className={css.usagePane}>
              <CodeBlock
                code={generateFlutterUsage(contract.name)}
                filename={`${contract.name.toLowerCase()}.dart`}
              />
            </div>
          )}
        </div>
      </RevealSection>

      {contract.members.length > 0 && (
        <RevealSection className={css.section}>
          <SectionRule label="API" meta={apiMeta} />
          <Table
            columns={memberColumns}
            rows={contract.members as unknown as Record<string, unknown>[]}
            rowKey="n"
            sortable={false}
          />
        </RevealSection>
      )}

      {contract.a11y.length > 0 && (
        <RevealSection className={css.section}>
          <SectionRule label="Accessibility" meta={`${contract.a11y.length} reglas del contrato`} />
          {contract.a11y.map((rule, i) => (
            <div key={i} className={css.a11yItem}>
              {rule}
            </div>
          ))}
        </RevealSection>
      )}
    </div>
  )
}

/* ── MIEL Tab ── */

function MielTab({ contract }: { contract: ContractItem }) {
  const kebab = contract.name.toLowerCase().replace(/\s+/g, '-')

  return (
    <div>
      <RevealSection className={css.section}>
        <SectionRule
          label="Context for agents"
          meta={
            <span className={css.syncStatus}>
              Vista previa del flujo MIEL — contenido de ejemplo
            </span>
          }
        />
        <div className={css.sectionHeading}>
          <SectionHeader size="display">
            <span>Agents propose</span>
            <span className={css.headingSub}>humans sign</span>
          </SectionHeader>
        </div>
        <div className={css.mielColumns}>
          <div>
            <p className={css.mielDesc}>
              Así se verá el contexto de {contract.name} para agentes:
              un archivo y un endpoint por componente. Este flujo aún no está en producción.
            </p>
            <div className={css.mielDownloads}>
              <DownloadCard
                filename={`${kebab}.DESIGN.md`}
                icon="description"
                href="#"
              />
              <DownloadCard
                filename={`/components/${kebab}.json`}
                icon="dns"
                href="#"
              />
            </div>
          </div>
          <div>
            <div className={css.ruleHeader}>
              <span className={css.ruleLabel}>Rules an agent must follow</span>
            </div>
            {contract.nonGoals.length > 0 ? (
              contract.nonGoals.map((rule, i) => (
                <div key={i} className={css.ruleItem}>{rule}</div>
              ))
            ) : (
              <>
                <div className={css.ruleItem}>
                  Read sys tokens. Never write a hex value into component code.
                </div>
                <div className={css.ruleItem}>
                  Follow the cascade: foundations → primitives → components → patterns.
                </div>
                <div className={css.ruleItem}>
                  Any token rename opens a proposal — it never ships inside a feature PR.
                </div>
              </>
            )}
          </div>
        </div>
      </RevealSection>

      <RevealSection className={css.section}>
        <SectionRule label="Proposal — ejemplo" meta="Demo del flujo de firmas" />
        <div className={css.sectionHeading}>
          <SectionHeader size="display">
            <span>Tighten compact padding</span>
            <span className={css.headingSub}>opened by agent</span>
          </SectionHeader>
        </div>
        <ProposalCard
          before={<InlineCode>--sys-pad-control: 16px</InlineCode>}
          after={<InlineCode>--sys-pad-control: 14px</InlineCode>}
          footer={
            <>
              <span className={css.proposalDesc}>
                Affects 11 screens across 2 products. Contrast and hit-target checks passed automatically.
              </span>
              <Button variant="secondary" size="sm">Request changes</Button>
              <Button variant="primary" size="sm">Approve</Button>
            </>
          }
        />
      </RevealSection>

      <RevealSection className={css.section}>
        <SectionRule label="Change log — ejemplo" meta="Ilustrativo; no es el historial real" />
        <Table
          columns={[
            { key: 'version', label: 'Version', mono: true },
            { key: 'note', label: 'Note' },
            { key: 'by', label: 'By', mono: true },
            {
              key: 'status',
              label: 'Status',
              mono: true,
              render: (row: Record<string, unknown>) => (
                <span className={css.changelogStatus}>{String(row.status)}</span>
              ),
            },
          ]}
          rows={DEMO_CHANGELOG}
          rowKey="version"
          sortable={false}
        />
      </RevealSection>
    </div>
  )
}
