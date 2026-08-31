import type { CSSProperties, MouseEventHandler } from 'react'
import css from './Chip.module.css'

export interface ChipProps {
  label: string
  size?: 'sm' | 'md'
  variant?: 'default' | 'ghost'
  mono?: boolean
  selected?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  onRemove?: () => void
  icon?: string
  disabled?: boolean
  style?: CSSProperties
}

export function Chip({
  label,
  size = 'md',
  variant = 'default',
  mono = false,
  selected = false,
  onClick,
  onRemove,
  icon,
  disabled = false,
  style,
}: ChipProps) {
  const clickable = !!onClick
  const glyph = icon && (
    <span className={`flow-icon${selected ? ' flow-icon--fill' : ''} ${css.icon}`} aria-hidden="true">{icon}</span>
  )

  const remove = onRemove && (
    <button
      type="button"
      aria-label={`Quitar ${label}`}
      disabled={disabled}
      onClick={e => { e.stopPropagation(); onRemove() }}
      className={css.remove}
    >
      <span className="flow-icon" aria-hidden="true" style={{ fontSize: 16 }}>close</span>
    </button>
  )

  if (!onRemove) {
    const Tag = clickable ? 'button' : 'span'
    return (
      <Tag
        type={clickable ? 'button' : undefined}
        className={css.root}
        data-size={size}
        data-variant={variant !== 'default' ? variant : undefined}
        data-mono={mono || undefined}
        data-selected={selected || undefined}
        data-disabled={disabled || undefined}
        onClick={disabled ? undefined : (onClick as MouseEventHandler<HTMLElement>)}
        aria-pressed={clickable ? selected : undefined}
        disabled={clickable ? disabled : undefined}
        style={style}
      >
        {glyph}
        {label}
      </Tag>
    )
  }

  return (
    <span
      className={`${css.root} ${css.compound}`}
      data-size={size}
      data-variant={variant !== 'default' ? variant : undefined}
      data-mono={mono || undefined}
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
      style={style}
    >
      {clickable ? (
        <button
          type="button"
          disabled={disabled}
          aria-pressed={selected}
          onClick={disabled ? undefined : (onClick as MouseEventHandler<HTMLButtonElement>)}
          className={css.action}
        >
          {glyph}
          {label}
        </button>
      ) : (
        <>{glyph}{label}</>
      )}
      {remove}
    </span>
  )
}
