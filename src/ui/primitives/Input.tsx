import { useState, type CSSProperties } from 'react'
import { useIntl } from 'react-intl'
import { ControlShell } from './shells/ControlShell'
import css from './Input.module.css'

export interface InputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  icon?: string
  size?: 'sm' | 'md' | 'lg'
  filled?: boolean
  disabled?: boolean
  error?: boolean
  type?: string
  revealable?: boolean
  mono?: boolean
  style?: CSSProperties
  id?: string
}

export function Input({
  value,
  onChange,
  placeholder,
  icon,
  size = 'md',
  filled,
  disabled,
  error,
  type = 'text',
  revealable,
  mono,
  style,
  ...rest
}: InputProps) {
  const intl = useIntl()
  const [shown, setShown] = useState(false)

  const reveal = revealable ? (
    <button
      type="button"
      tabIndex={0}
      aria-label={shown ? intl.formatMessage({ id: 'common.hide', defaultMessage: 'Ocultar' }) : intl.formatMessage({ id: 'common.show', defaultMessage: 'Mostrar' })}
      aria-pressed={shown}
      onClick={() => setShown(v => !v)}
      className={css.reveal}
    >
      <span className="flow-icon" aria-hidden="true" style={{ fontSize: 20 }}>
        {shown ? 'visibility_off' : 'visibility'}
      </span>
    </button>
  ) : undefined

  return (
    <ControlShell
      size={size}
      filled={filled}
      disabled={disabled}
      error={error}
      leading={icon && <span className="flow-icon" style={{ fontSize: 18 }} aria-hidden="true">{icon}</span>}
      trailing={reveal}
      style={style}
    >
      <input
        type={revealable ? (shown ? 'text' : 'password') : type}
        className={css.input}
        data-mono={mono || undefined}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        {...rest}
      />
    </ControlShell>
  )
}
