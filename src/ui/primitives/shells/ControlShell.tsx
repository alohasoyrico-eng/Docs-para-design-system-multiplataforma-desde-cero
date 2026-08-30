import { forwardRef, type ReactNode, type CSSProperties, type MouseEventHandler } from 'react'
import css from './ControlShell.module.css'

export interface ControlShellProps {
  size?: 'sm' | 'md' | 'lg'
  filled?: boolean
  disabled?: boolean
  error?: boolean
  leading?: ReactNode
  trailing?: ReactNode
  footer?: ReactNode
  children: ReactNode
  style?: CSSProperties
  onClick?: MouseEventHandler<HTMLDivElement>
}

export const ControlShell = forwardRef<HTMLDivElement, ControlShellProps>(function ControlShell(
  { size = 'md', filled, disabled, error, leading, trailing, footer, children, style, onClick, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={css.root}
      data-control-shell=""
      data-size={size}
      data-filled={filled || undefined}
      data-error={error || undefined}
      data-disabled={disabled || undefined}
      onClick={onClick}
      style={style}
      {...rest}
    >
      {leading && <span className={css.slot}>{leading}</span>}
      <div className={css.content}>{children}</div>
      {trailing && <span className={css.slot}>{trailing}</span>}
    </div>
  )
})
