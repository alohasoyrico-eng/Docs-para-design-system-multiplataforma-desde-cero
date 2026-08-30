import { useRef, useEffect, useState, useCallback, type CSSProperties, type KeyboardEvent } from 'react'
import css from './Tabs.module.css'

export interface TabItem {
  value: string
  label: string
  icon?: string
  count?: number
}

export interface TabsProps {
  items?: TabItem[]
  value?: string
  onChange?: (value: string) => void
  variant?: 'pill' | 'underline' | 'bar'
  style?: CSSProperties
}

export function Tabs({ items = [], value, onChange, variant = 'pill', style }: TabsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  useEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current.querySelector<HTMLElement>('[data-active]')
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth })
    }
  }, [value, items])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const idx = items.findIndex(i => i.value === value)
      let next = idx
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        next = (idx + 1) % items.length
        e.preventDefault()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        next = (idx - 1 + items.length) % items.length
        e.preventDefault()
      } else if (e.key === 'Home') {
        next = 0
        e.preventDefault()
      } else if (e.key === 'End') {
        next = items.length - 1
        e.preventDefault()
      } else {
        return
      }
      const nextValue = items[next].value
      onChange?.(nextValue)
      buttonRefs.current[nextValue]?.focus()
    },
    [items, value, onChange],
  )

  return (
    <div
      ref={containerRef}
      role="tablist"
      className={css.root}
      data-variant={variant}
      style={style}
      onKeyDown={handleKeyDown}
    >
      <div
        className={css.indicator}
        aria-hidden="true"
        data-variant={variant}
        style={{ left: indicator.left, width: indicator.width }}
      />
      {items.map((item) => {
        const active = item.value === value
        return (
          <button
            key={item.value}
            ref={el => { buttonRefs.current[item.value] = el }}
            role="tab"
            type="button"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            data-active={active || undefined}
            className={css.tab}
            onClick={() => onChange?.(item.value)}
          >
            {item.icon && <span className={`flow-icon ${css.tabIcon}`} aria-hidden="true">{item.icon}</span>}
            {item.label}
            {item.count != null && <span className={css.tabCount}>{item.count}</span>}
          </button>
        )
      })}
    </div>
  )
}
