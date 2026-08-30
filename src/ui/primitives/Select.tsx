import { useState, useRef, useCallback, useId, type CSSProperties, type ReactNode } from 'react'
import { useIntl } from 'react-intl'
import { ControlShell } from './shells/ControlShell'
import { Popover } from './shells/Popover'
import { Listbox, type ListboxItem } from './shells/Listbox'
import css from './Select.module.css'

export interface SelectOption {
  value: string
  label: string
  icon?: string
  group?: string
}

export interface SelectProps {
  options: Array<string | SelectOption>
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  multiple?: boolean
  searchable?: boolean
  creatable?: boolean
  clearable?: boolean
  renderOption?: (o: SelectOption) => ReactNode
  placeholder?: string
  icon?: string
  disabled?: boolean
  invalid?: boolean
  style?: CSSProperties
}

function normalize(o: string | SelectOption): SelectOption {
  return typeof o === 'string' ? { value: o, label: o } : o
}

export function Select({
  options,
  value,
  onChange,
  multiple,
  searchable,
  clearable,
  renderOption,
  placeholder,
  icon,
  disabled,
  invalid,
  style,
}: SelectProps) {
  const intl = useIntl()
  const resolvedPlaceholder = placeholder ?? intl.formatMessage({ id: 'common.select', defaultMessage: 'Seleccionar…' })
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const listboxId = useId()

  const items = options.map(normalize)
  const filtered = search
    ? items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase()))
    : items

  const selectedValues = Array.isArray(value) ? value : value != null ? [value] : []
  const selectedLabels = selectedValues
    .map((v) => items.find((i) => i.value === v)?.label ?? v)
    .join(', ')

  const handleSelect = useCallback(
    (item: ListboxItem) => {
      if (multiple) {
        const vals = Array.isArray(value) ? value : []
        const next = vals.includes(String(item.value))
          ? vals.filter((v) => v !== String(item.value))
          : [...vals, String(item.value)]
        onChange?.(next)
      } else {
        onChange?.(String(item.value))
        setOpen(false)
      }
      setSearch('')
    },
    [value, multiple, onChange],
  )

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onChange?.(multiple ? [] : '')
    },
    [multiple, onChange],
  )

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (disabled) return
      setOpen(next)
      if (next && searchable) {
        setTimeout(() => searchRef.current?.focus(), 0)
      }
      if (!next) setSearch('')
    },
    [disabled, searchable],
  )

  const listboxItems: ListboxItem[] = filtered.map((i) => ({
    value: i.value,
    label: i.label,
  }))

  const trigger = (
    <ControlShell
      disabled={disabled}
      error={invalid}
      leading={icon && <span className="flow-icon" style={{ fontSize: 18 }} aria-hidden="true">{icon}</span>}
      trailing={
        <>
          {clearable && selectedValues.length > 0 && !open && (
            <button className={css.clear} onClick={handleClear} aria-label="Limpiar" type="button">
              <span className="flow-icon" aria-hidden="true">close</span>
            </button>
          )}
          <span className={`flow-icon ${css.chevron}`} data-open={open || undefined} aria-hidden="true">
            expand_more
          </span>
        </>
      }
      style={style}
    >
      <span
        className={css.trigger}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listboxId : undefined}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault()
            handleOpenChange(true)
          }
        }}
      >
        <span className={css.triggerText} data-empty={!selectedLabels || undefined}>
          {selectedLabels || resolvedPlaceholder}
        </span>
      </span>
    </ControlShell>
  )

  return (
    <Popover trigger={trigger} open={open} onOpenChange={handleOpenChange}>
      {searchable && (
        <div className={css.search}>
          <input
            ref={searchRef}
            className={css.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar…"
            autoComplete="off"
          />
        </div>
      )}
      {filtered.length > 0 ? (
        <Listbox
          id={listboxId}
          items={listboxItems}
          value={multiple ? undefined : (value as string)}
          onChange={handleSelect}
          renderItem={
            renderOption
              ? (item, state) => renderOption(items.find((i) => i.value === item.value) ?? { value: String(item.value), label: item.label })
              : undefined
          }
        />
      ) : (
        <div className={css.empty}>Sin resultados</div>
      )}
    </Popover>
  )
}
