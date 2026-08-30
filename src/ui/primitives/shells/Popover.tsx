import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react'
import css from './Popover.module.css'

export interface PopoverProps {
  trigger: ReactNode
  align?: 'left' | 'right'
  children: ReactNode | ((helpers: { close: () => void }) => ReactNode)
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Popover({ trigger, align = 'left', children, open: controlledOpen, onOpenChange }: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = controlledOpen !== undefined ? onOpenChange : setInternalOpen
  const trigRef = useRef<HTMLSpanElement>(null)
  const popRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setOpen?.(false), [setOpen])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (trigRef.current?.contains(e.target as Node)) return
      if (popRef.current?.contains(e.target as Node)) return
      close()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, close])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); close() } }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, close])

  return (
    <div className={css.root}>
      <span ref={trigRef} className={css.trigger} onClick={() => setOpen?.(!open)}>
        {trigger}
      </span>
      {open && (
        <div ref={popRef} className={css.drop} data-align={align}>
          {typeof children === 'function' ? children({ close }) : children}
        </div>
      )}
    </div>
  )
}
