import type { ReactNode, CSSProperties } from 'react'
import css from './ToggleControl.module.css'

export interface ToggleControlProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
  children: ReactNode
  style?: CSSProperties
}

export function ToggleControl({ checked, onChange, disabled, label, children, style }: ToggleControlProps) {
  return (
    <label className={css.root} data-disabled={disabled || undefined} style={style}>
      <span className={css.visual}>
        <input
          type="checkbox"
          className={css.input}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
        />
        {children}
      </span>
      {label && <span className={css.label}>{label}</span>}
    </label>
  )
}
