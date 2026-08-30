import { useState, useRef, useCallback, useEffect, type ReactNode, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import css from './Listbox.module.css'

export interface ListboxItem {
  value: string | number
  label: string
  group?: string
  disabled?: boolean
  [key: string]: unknown
}

export interface ListboxProps<T extends ListboxItem = ListboxItem> {
  items?: T[]
  value?: string | number
  onChange?: (item: T) => void
  renderItem?: (item: T, state: { selected: boolean; active: boolean }) => ReactNode
  id?: string
}

export function Listbox<T extends ListboxItem = ListboxItem>({ items = [], value, onChange, renderItem, id }: ListboxProps<T>) {
  const [active, setActive] = useState(-1)
  const listRef = useRef<HTMLUListElement>(null)

  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent) => {
      const len = items.length
      if (!len) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((p) => (p + 1) % len)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((p) => (p <= 0 ? len - 1 : p - 1))
      } else if (e.key === 'Enter' && active >= 0) {
        e.preventDefault()
        onChange?.(items[active])
      }
    },
    [items, active, onChange],
  )

  useEffect(() => {
    if (active >= 0 && listRef.current) {
      const el = listRef.current.children[active] as HTMLElement | undefined
      el?.scrollIntoView?.({ block: 'nearest' })
    }
  }, [active])

  return (
    <ul ref={listRef} role="listbox" id={id} tabIndex={-1} onKeyDown={handleKeyDown} className={css.root}>
      {items.map((item, i) => {
        const selected = value != null && item.value === value
        return (
          <li
            key={item.value ?? i}
            role="option"
            aria-selected={selected}
            className={css.option}
            data-active={i === active || undefined}
            data-selected={selected || undefined}
            onClick={() => onChange?.(item)}
            onMouseEnter={() => setActive(i)}
          >
            {renderItem ? renderItem(item, { selected, active: i === active }) : item.label}
          </li>
        )
      })}
    </ul>
  )
}
