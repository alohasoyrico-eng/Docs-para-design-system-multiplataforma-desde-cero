import type { ReactNode, CSSProperties } from 'react'
import { Popover } from '../primitives/shells/Popover'
import css from './Menu.module.css'

export interface MenuItem {
  label: string
  icon?: string
  danger?: boolean
  onClick?: () => void
}

export type MenuItemOrDivider = MenuItem | 'divider'

export interface MenuProps {
  trigger: ReactNode
  items?: MenuItemOrDivider[]
  align?: 'left' | 'right'
  style?: CSSProperties
}

export function Menu({ trigger, items = [], align = 'left', style }: MenuProps) {
  return (
    <Popover trigger={trigger} align={align}>
      {({ close }) => (
        <div role="menu" style={{ minWidth: 180, ...style }}>
          {items.map((item, i) => {
            if (item === 'divider') {
              return <div key={'d' + i} role="separator" className={css.divider} />
            }
            return (
              <button
                key={item.label}
                role="menuitem"
                className={css.menuItem}
                data-danger={item.danger || undefined}
                onClick={() => { item.onClick?.(); close() }}
              >
                {item.icon && <span className={`flow-icon ${css.menuItemIcon}`} aria-hidden="true">{item.icon}</span>}
                {item.label}
              </button>
            )
          })}
        </div>
      )}
    </Popover>
  )
}
