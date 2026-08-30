import { useState, useRef, useEffect, useMemo, useCallback, type ReactNode, type CSSProperties, type KeyboardEvent } from 'react'
import { useIntl } from 'react-intl'
import { Badge } from '../primitives/Badge'
import { IconButton } from '../primitives/IconButton'
import { Spinner } from '../primitives/Spinner'
import { EmptyState } from '../components/EmptyState'
import css from './GlobalSearch.module.css'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)
const shortcutLabel = isMac ? '⌘K' : 'Ctrl+K'

export interface SearchResult {
  id: string
  label: string
  group?: string
  hint?: string
  icon?: string
  meta?: string
  mono?: boolean
  trailing?: ReactNode
}

export interface GlobalSearchProps {
  mode?: 'palette' | 'inline'
  open?: boolean
  onOpenChange?: (open: boolean) => void
  value?: string
  onValueChange?: (value: string) => void
  results?: SearchResult[]
  groupOrder?: string[]
  loading?: boolean
  recents?: SearchResult[]
  suggestions?: string[]
  onSelect?: (item: SearchResult) => void
  onClearRecents?: () => void
  placeholder?: string
  style?: CSSProperties
}

export function GlobalSearch({
  mode = 'palette',
  open = false,
  onOpenChange,
  value = '',
  onValueChange,
  results = [],
  groupOrder = [],
  loading = false,
  recents = [],
  suggestions = [],
  onSelect,
  onClearRecents,
  placeholder,
  style,
}: GlobalSearchProps) {
  const intl = useIntl()
  const resolvedPlaceholder = placeholder ?? intl.formatMessage({ id: 'common.search', defaultMessage: 'Busca unidades, conductores, viajes…' })
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  const minChars = 1
  const showRecents = value.length < minChars && recents.length > 0
  const items = showRecents ? recents : results

  const groups = useMemo(() => {
    const by = new Map<string, SearchResult[]>()
    items.forEach((r) => {
      const g = showRecents ? 'Recientes' : (r.group || 'Otros')
      if (!by.has(g)) by.set(g, [])
      by.get(g)!.push(r)
    })
    const names = Array.from(by.keys()).sort((a, b) => {
      const ia = groupOrder.indexOf(a)
      const ib = groupOrder.indexOf(b)
      if (ia === -1 && ib === -1) return a.localeCompare(b)
      if (ia === -1) return 1
      if (ib === -1) return -1
      return ia - ib
    })
    return names.map((name) => ({ name, items: by.get(name)! }))
  }, [items, groupOrder, showRecents])

  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups])

  useEffect(() => { setActiveIndex(0) }, [value, showRecents])

  useEffect(() => {
    if (mode !== 'palette') return
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpenChange?.(!open)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mode, open, onOpenChange])

  useEffect(() => {
    if (mode === 'palette' && open && inputRef.current) inputRef.current.focus()
  }, [mode, open])

  useEffect(() => {
    if (mode !== 'inline' || !open) return
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) onOpenChange?.(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [mode, open, onOpenChange])

  const commit = useCallback((item: SearchResult | undefined) => {
    if (!item) return
    onSelect?.(item)
    onOpenChange?.(false)
  }, [onSelect, onOpenChange])

  const onInputKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!flat.length) return
      const dir = e.key === 'ArrowDown' ? 1 : -1
      const next = (activeIndex + dir + flat.length) % flat.length
      setActiveIndex(next)
      const node = listRef.current?.querySelector(`[data-idx="${next}"]`) as HTMLElement | null
      if (node) node.scrollIntoView({ block: 'nearest' })
    } else if (e.key === 'Enter') {
      e.preventDefault()
      commit(flat[activeIndex])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onOpenChange?.(false)
    }
  }, [flat, activeIndex, commit, onOpenChange])

  const highlight = (text: string): ReactNode => {
    if (!value || showRecents) return text
    const i = text.toLowerCase().indexOf(value.toLowerCase())
    if (i === -1) return text
    return (
      <>
        {text.slice(0, i)}
        <mark className={css.highlight}>{text.slice(i, i + value.length)}</mark>
        {text.slice(i + value.length)}
      </>
    )
  }

  const searchField = (
    <div className={css.searchBar} data-mode={mode}>
      <span className={`flow-icon ${css.searchIcon}`} aria-hidden="true">search</span>
      <input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-expanded={true}
        aria-controls="flow-search-list"
        aria-activedescendant={flat[activeIndex] ? `flow-search-opt-${activeIndex}` : undefined}
        aria-label={resolvedPlaceholder}
        autoComplete="off"
        placeholder={resolvedPlaceholder}
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        onKeyDown={onInputKeyDown}
        className={css.input}
        data-mode={mode}
      />
      {value ? (
        <IconButton
          icon="close"
          ariaLabel="Limpiar búsqueda"
          size="sm"
          onClick={() => { onValueChange?.(''); inputRef.current?.focus() }}
        />
      ) : (
        mode === 'palette' && <Badge as="kbd" aria-hidden="true">{shortcutLabel}</Badge>
      )}
    </div>
  )

  const suggestionChips = suggestions.length > 0 && value.length < minChars ? (
    <div className={css.suggestions}>
      {suggestions.map((s) => (
        <button
          key={s}
          type="button"
          className={css.suggestionPill}
          onClick={() => onValueChange?.(s)}
        >
          {s}
        </button>
      ))}
    </div>
  ) : null

  let body: ReactNode
  if (loading) {
    body = (
      <div className={css.loadingState} aria-live="polite">
        <Spinner size={14} label="Buscando" />
        Buscando…
      </div>
    )
  } else if (!flat.length) {
    body = (
      <EmptyState
        icon={value.length >= minChars ? 'search_off' : 'search'}
        title={value.length >= minChars ? `Sin resultados para "${value}"` : 'Busca en toda la plataforma'}
        description="Prueba con una placa, un nombre o un ID de viaje."
      />
    )
  } else {
    let idx = -1
    body = (
      <div id="flow-search-list" role="listbox" ref={listRef} className={css.list} data-mode={mode}>
        {groups.map((g) => (
          <div key={g.name} role="group" aria-labelledby={`flow-sg-${g.name}`}>
            <div id={`flow-sg-${g.name}`} className={css.groupLabel}>
              {g.name}
              {showRecents && onClearRecents && (
                <button type="button" className={css.clearRecentsBtn} onClick={onClearRecents}>
                  Limpiar
                </button>
              )}
            </div>
            {g.items.map((r) => {
              idx += 1
              const i = idx
              const active = i === activeIndex
              return (
                <div
                  key={r.id}
                  id={`flow-search-opt-${i}`}
                  data-idx={i}
                  role="option"
                  aria-selected={active}
                  className={css.option}
                  data-active={active || undefined}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => commit(r)}
                >
                  {r.icon && (
                    <span className={`flow-icon ${css.optionIcon}`} aria-hidden="true" data-active={active || undefined}>
                      {r.icon}
                    </span>
                  )}
                  <div className={css.optionBody}>
                    <div className={css.optionLabel} data-mono={r.mono || undefined}>
                      {highlight(r.label)}
                    </div>
                    {r.meta && <div className={css.optionMeta}>{r.meta}</div>}
                  </div>
                  {r.trailing && <div className={css.optionTrailing}>{r.trailing}</div>}
                  {active && (
                    <span className={`flow-icon ${css.optionReturn}`} aria-hidden="true">
                      keyboard_return
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    )
  }

  const footer = mode === 'palette' && (
    <div className={css.footer}>
      <span>up/down navegar</span>
      <span>enter abrir</span>
      <span>esc cerrar</span>
    </div>
  )

  if (mode === 'inline') {
    return (
      <div ref={rootRef} className={css.inlineRoot} style={style}>
        <div className={css.inlineField} onFocus={() => onOpenChange?.(true)}>
          {searchField}
        </div>
        {open && <div className={css.inlineDrop}>{body}</div>}
      </div>
    )
  }

  if (!open) return null

  return (
    <div
      className={css.backdrop}
      style={style}
      onClick={(e) => { if (e.target === e.currentTarget) onOpenChange?.(false) }}
    >
      <div className={css.paletteCard}>
        {searchField}
        {suggestionChips}
        {body}
        {footer}
      </div>
    </div>
  )
}
