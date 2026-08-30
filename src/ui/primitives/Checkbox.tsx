import type { CSSProperties } from 'react'
import { ToggleControl } from './shells/ToggleControl'
import css from './Checkbox.module.css'

export interface CheckboxProps {
  checked?: boolean
  indeterminate?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  style?: CSSProperties
}

export function Checkbox({ checked, indeterminate, onChange, label, description, disabled, style }: CheckboxProps) {
  return (
    <ToggleControl
      checked={checked}
      onChange={onChange}
      label={label}
      disabled={disabled}
      style={style}
    >
      <span
        className={css.visual}
        data-checked={checked || indeterminate || undefined}
        aria-hidden="true"
      >
        {(checked || indeterminate) && (
          <span className={`flow-icon ${css.icon}`}>
            {indeterminate ? 'remove' : 'check'}
          </span>
        )}
      </span>
    </ToggleControl>
  )
}
