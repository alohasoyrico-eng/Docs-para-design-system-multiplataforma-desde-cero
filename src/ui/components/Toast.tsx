import type { ReactNode } from 'react'
import css from './Toast.module.css'

export type ToastTone = 'success' | 'warning' | 'danger' | 'info'

export interface ToastProps {
  message: string
  tone?: ToastTone
  onDismiss?: () => void
}

export interface ToastStackProps {
  children: ReactNode
}

const TONES: Record<ToastTone, { icon: string; color: string }> = {
  success: { icon: 'check_circle', color: 'var(--status-success-text)' },
  warning: { icon: 'warning', color: 'var(--status-warning-text)' },
  danger: { icon: 'error', color: 'var(--status-danger-text)' },
  info: { icon: 'info', color: 'var(--status-info-text)' },
}

export function Toast({ message, tone = 'success', onDismiss }: ToastProps) {
  const t = TONES[tone]
  return (
    <div role="alert" className={css.root}>
      <span className={`flow-icon flow-icon--fill ${css.icon}`} style={{ color: t.color }} aria-hidden="true">
        {t.icon}
      </span>
      <span className={css.message}>{message}</span>
      {onDismiss && (
        <button onClick={onDismiss} aria-label="Cerrar" className={css.dismiss}>
          <span className="flow-icon" style={{ fontSize: 18 }}>close</span>
        </button>
      )}
    </div>
  )
}

export function ToastStack({ children }: ToastStackProps) {
  return (
    <div aria-live="polite" className={css.stack}>
      {children}
    </div>
  )
}
