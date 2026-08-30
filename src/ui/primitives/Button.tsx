import type { ReactNode, CSSProperties, MouseEventHandler } from 'react'
import css from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: string
  iconTrailing?: string
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  children?: ReactNode
  style?: CSSProperties
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconTrailing,
  loading,
  disabled,
  fullWidth,
  onClick,
  children,
  style,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={css.root}
      data-variant={variant}
      data-size={size}
      data-full-width={fullWidth || undefined}
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
      {...rest}
    >
      {loading && <span className={`flow-icon ${css.spinner}`} aria-hidden="true">progress_activity</span>}
      {!loading && icon && <span className={`flow-icon ${css.icon}`} aria-hidden="true">{icon}</span>}
      {children}
      {iconTrailing && <span className={`flow-icon ${css.icon}`} aria-hidden="true">{iconTrailing}</span>}
    </button>
  )
}
