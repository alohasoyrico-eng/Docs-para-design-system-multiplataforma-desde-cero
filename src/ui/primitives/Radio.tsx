import { useId, type CSSProperties } from 'react'
import css from './Radio.module.css'

export interface RadioProps {
  name?: string
  value?: string
  checked?: boolean
  onChange?: (value: string) => void
  label?: string
  description?: string
  disabled?: boolean
  style?: CSSProperties
}

export function Radio({ name, value, checked = false, onChange, label, description, disabled, style }: RadioProps) {
  const descId = useId()

  return (
    <label className={css.root} data-disabled={disabled || undefined} style={style}>
      <span className={css.visual}>
        <input
          type="radio"
          className={css.input}
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange?.(value ?? '')}
          disabled={disabled}
          aria-describedby={description ? descId : undefined}
        />
        <span className={css.indicator} data-checked={checked || undefined} aria-hidden="true">
          <span className={css.dot} />
        </span>
      </span>
      {(label || description) && (
        <span className={css.content}>
          {label && <span className={css.label}>{label}</span>}
          {description && <span className={css.description} id={descId}>{description}</span>}
        </span>
      )}
    </label>
  )
}
