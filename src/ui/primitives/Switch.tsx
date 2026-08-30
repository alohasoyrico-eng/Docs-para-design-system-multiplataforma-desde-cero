import type { CSSProperties } from 'react'
import { ToggleControl } from './shells/ToggleControl'
import css from './Switch.module.css'

export interface SwitchProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  disabled?: boolean
  style?: CSSProperties
}

export function Switch({ checked, onChange, label, disabled, style }: SwitchProps) {
  return (
    <ToggleControl
      checked={checked}
      onChange={onChange}
      label={label}
      disabled={disabled}
      style={style}
    >
      <span
        className={css.track}
        data-checked={checked || undefined}
        aria-hidden="true"
      >
        <span className={css.thumb} />
      </span>
    </ToggleControl>
  )
}
