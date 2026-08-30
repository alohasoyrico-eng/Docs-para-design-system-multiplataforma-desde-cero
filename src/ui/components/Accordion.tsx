import { useState, type ReactNode } from 'react'
import css from './Accordion.module.css'

export interface AccordionItem {
  id: string
  title: string
  icon?: string
  meta?: string
  content: ReactNode
}

export interface AccordionProps {
  items?: AccordionItem[]
  defaultOpen?: string
}

export function Accordion({ items = [], defaultOpen }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen || null)

  return (
    <div className={css.root}>
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div key={item.id} className={css.item}>
            <button
              className={css.trigger}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
            >
              {item.icon && <span className={`flow-icon ${css.triggerIcon}`} aria-hidden="true">{item.icon}</span>}
              <span className={css.triggerTitle}>{item.title}</span>
              {item.meta && <span className={css.triggerMeta}>{item.meta}</span>}
              <span className={`flow-icon ${css.chevron}`} data-open={isOpen || undefined} aria-hidden="true">
                expand_more
              </span>
            </button>
            {isOpen && <div className={css.panel}>{item.content}</div>}
          </div>
        )
      })}
    </div>
  )
}
