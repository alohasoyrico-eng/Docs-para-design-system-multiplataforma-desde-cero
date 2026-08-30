import { useId, type ReactNode, type CSSProperties } from 'react'
import css from './Field.module.css'

export interface FieldProps {
  label: string
  htmlFor?: string
  required?: boolean
  help?: string
  error?: string
  valid?: boolean
  validMessage?: string
  children: ReactNode
  style?: CSSProperties
}

export function Field({ label, htmlFor, required, help, error, valid, validMessage, children, style }: FieldProps) {
  const autoId = useId()
  const messageId = `${htmlFor ?? autoId}-msg`

  if (import.meta.env.DEV && !htmlFor) {
    console.warn('[Field] htmlFor is missing — label will not be associated with a control.')
  }

  const messageText = error ?? (valid && validMessage ? validMessage : help)
  const messageState = error ? 'error' : valid ? 'valid' : undefined

  return (
    <div className={css.root} data-error={error ? '' : undefined} data-valid={valid || undefined} style={style}>
      <label className={css.label} htmlFor={htmlFor}>
        {label}
        {required && <span className={css.required} aria-hidden="true"> *</span>}
      </label>
      <div className={css.control}>{children}</div>
      <div
        className={css.message}
        id={messageId}
        role={error ? 'alert' : undefined}
        data-state={messageState}
      >
        {messageState === 'valid' && (
          <span className={`flow-icon ${css.validIcon}`} aria-hidden="true">check_circle</span>
        )}
        {messageState === 'error' && (
          <span className={`flow-icon ${css.errorIcon}`} aria-hidden="true">error</span>
        )}
        {messageText}
      </div>
    </div>
  )
}
