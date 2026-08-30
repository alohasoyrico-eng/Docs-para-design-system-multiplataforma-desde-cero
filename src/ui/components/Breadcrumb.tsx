import css from './Breadcrumb.module.css'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: string
}

export interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  variant?: 'default' | 'subtle'
  homeIcon?: string
}

export function Breadcrumb({ items = [], variant = 'default', homeIcon = 'home' }: BreadcrumbProps) {
  const isSubtle = variant === 'subtle'

  return (
    <nav aria-label="Breadcrumb" data-variant={variant}>
      <ol className={css.list} data-variant={variant}>
        {items.map((item, i) => {
          const isFirst = i === 0
          const isLast = i === items.length - 1
          const showIcon = item.icon || (isSubtle && isFirst)

          const content = showIcon
            ? <span className={`flow-icon ${css.homeIcon}`} aria-hidden="true">{item.icon || homeIcon}</span>
            : item.label

          return (
            <li key={i} className={css.item}>
              {i > 0 && (
                isSubtle
                  ? <span className={css.separator} aria-hidden="true">/</span>
                  : <span className={`flow-icon ${css.separator}`} aria-hidden="true">chevron_right</span>
              )}
              {item.href ? (
                <a
                  href={item.href}
                  className={css.link}
                  aria-label={showIcon ? item.label : undefined}
                >
                  {content}
                </a>
              ) : (
                <span className={css.text} data-current={isLast || undefined}>
                  {content}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
