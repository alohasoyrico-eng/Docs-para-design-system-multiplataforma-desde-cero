import type { CSSProperties, MouseEventHandler } from 'react'
import css from './IconButton.module.css'

export type IconButtonVariant = 'ghost' | 'tonal' | 'primary' | 'secondary'
export type IconButtonSize = 'sm' | 'md' | 'lg'

export interface IconButtonProps {
  icon: string
  ariaLabel: string
  variant?: IconButtonVariant
  size?: IconButtonSize
  selected?: boolean
  badge?: number | boolean
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  style?: CSSProperties
}

export function IconButton({
  icon,
  ariaLabel,
  variant = 'ghost',
  size = 'md',
  selected,
  badge,
  disabled,
  onClick,
  style,
}: IconButtonProps) {
  return (
    <button
      className={css.root}
      data-variant={variant}
      data-size={size}
      data-selected={selected || undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      <span className={`flow-icon${selected ? ' flow-icon--fill' : ''} ${css.icon}`}>{icon}</span>
      {badge != null && <span className={css.badge} />}
    </button>
  )
}
