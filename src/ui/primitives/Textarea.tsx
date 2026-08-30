import type { CSSProperties } from 'react'
import { ControlShell } from './shells/ControlShell'
import css from './Textarea.module.css'

export interface TextareaProps {
  id?: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  rows?: number
  maxLength?: number
  disabled?: boolean
  invalid?: boolean
  style?: CSSProperties
}

export function Textarea({
  id,
  value,
  onChange,
  placeholder,
  rows = 3,
  maxLength,
  disabled,
  invalid,
  style,
}: TextareaProps) {
  return (
    <ControlShell disabled={disabled} error={invalid} style={style}>
      <textarea
        id={id}
        className={css.textarea}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        aria-invalid={invalid || undefined}
      />
    </ControlShell>
  )
}
