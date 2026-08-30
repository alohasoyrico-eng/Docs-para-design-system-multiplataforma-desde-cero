import { useState, type CSSProperties, type ReactNode } from 'react'
import { SegmentedControl } from '../components/SegmentedControl'
import { CodeBlock } from '../components/CodeBlock'
import css from './PlaygroundCanvas.module.css'

export interface PlaygroundOption {
  value: string
  label: string
}

export interface SpecLabels {
  top?: string
  right?: string
  bottom?: string
}

export interface PlaygroundCanvasProps {
  variants?: PlaygroundOption[]
  sizes?: string[]
  densities?: string[]
  snippet?: string | ((state: { variant: string; size: string }) => string)
  specLabels?: (state: { variant: string; size: string; density: string }) => SpecLabels
  children: (state: { variant: string; size: string; density: string }) => ReactNode
  style?: CSSProperties
}

export function PlaygroundCanvas({
  variants = [],
  sizes = [],
  densities = [],
  snippet,
  specLabels,
  children,
  style,
}: PlaygroundCanvasProps) {
  const [variant, setVariant] = useState(variants[0]?.value ?? '')
  const [size, setSize] = useState(sizes.includes('md') ? 'md' : sizes[0] ?? 'md')
  const [density, setDensity] = useState('default')
  const [spec, setSpec] = useState(false)
  const [dark, setDark] = useState(false)

  const resolvedSnippet = typeof snippet === 'function'
    ? snippet({ variant, size })
    : snippet

  const labels = spec && specLabels
    ? specLabels({ variant, size, density })
    : null

  return (
    <div className={css.root} style={style}>
      <div className={css.surface}>
        {(variants.length > 0 || sizes.length > 0) && (
          <div className={css.controls}>
            {variants.length > 0 && (
              <SegmentedControl
                size="sm"
                items={variants}
                value={variant}
                onChange={setVariant}
              />
            )}
            {sizes.length > 0 && (
              <SegmentedControl
                size="sm"
                items={sizes.map(s => ({ value: s, label: s }))}
                value={size}
                onChange={setSize}
              />
            )}
            {densities.length > 0 && (
              <SegmentedControl
                size="sm"
                items={densities.map(d => ({ value: d, label: d }))}
                value={density}
                onChange={setDensity}
              />
            )}
            <div className={css.toggles}>
              <button
                type="button"
                className={css.toggle}
                data-active={spec || undefined}
                onClick={() => setSpec(s => !s)}
                aria-pressed={spec}
              >
                Spec
              </button>
              <button
                type="button"
                className={css.toggle}
                data-active={dark || undefined}
                onClick={() => setDark(d => !d)}
                aria-pressed={dark}
              >
                Dark
              </button>
            </div>
          </div>
        )}

        <div className={css.canvas} data-dark={dark || undefined}>
          <div
            className={css.specimen}
            data-density={density !== 'default' ? density : undefined}
            data-mode={dark ? 'dark' : undefined}
          >
            {children({ variant, size, density })}
            {spec && (
              <>
                <div className={css.specDash} />
                {labels?.top && (
                  <span className={`${css.specLabel} ${css.specTop}`}>{labels.top}</span>
                )}
                {labels?.right && (
                  <span className={`${css.specLabel} ${css.specRight}`}>{labels.right}</span>
                )}
                {labels?.bottom && (
                  <span className={`${css.specLabel} ${css.specBottom}`}>{labels.bottom}</span>
                )}
              </>
            )}
          </div>
        </div>

        {resolvedSnippet && (
          <div className={css.snippetBar}>
            <CodeBlock code={resolvedSnippet} variant="inline" />
          </div>
        )}
      </div>
    </div>
  )
}
