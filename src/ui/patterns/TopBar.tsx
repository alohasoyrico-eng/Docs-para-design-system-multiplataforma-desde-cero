import type { ReactNode, CSSProperties } from 'react'
import { useIntl } from 'react-intl'
import { IconButton } from '../primitives/IconButton'
import { Badge } from '../primitives/Badge'
import { Input } from '../primitives/Input'
import { Popover } from '../primitives/shells/Popover'
import css from './TopBar.module.css'

export interface TopBarNavItem {
  id: string
  label: string
  href?: string
  active?: boolean
}

export interface TopBarEntity {
  id: string
  label: string
}

export interface TopBarBreadcrumb {
  label: string
  href?: string
}

export interface TopBarProps {
  variant?: 'standard' | 'minimal' | 'admin' | 'multientity' | 'mobile' | 'fullscreen'
  logo?: ReactNode
  navItems?: TopBarNavItem[]
  breadcrumb?: TopBarBreadcrumb[]
  searchValue?: string
  onSearchChange?: (value: string) => void
  avatar?: ReactNode
  notificationCount?: number
  onNotifications?: () => void
  entities?: TopBarEntity[]
  currentEntity?: string
  onEntityChange?: (id: string) => void
  onToggleSidebar?: () => void
  leading?: ReactNode
  trailing?: ReactNode
  surface?: 'card' | 'inverse'
  navSize?: 'md' | 'sm'
  style?: CSSProperties
}

export function TopBar({
  variant = 'standard',
  logo,
  navItems = [],
  breadcrumb = [],
  searchValue = '',
  onSearchChange,
  avatar,
  notificationCount = 0,
  onNotifications,
  entities = [],
  currentEntity = '',
  onEntityChange,
  onToggleSidebar,
  leading,
  trailing,
  surface = 'card',
  navSize = 'md',
  style,
}: TopBarProps) {
  const intl = useIntl()

  if (variant === 'fullscreen') return null

  const currentEntityObj = entities.find(e => e.id === currentEntity)
  const tail = trailing || avatar

  const renderStandard = () => (
    <>
      {onToggleSidebar && (
        <div className={css.menuBtn}>
          <IconButton icon="menu" ariaLabel="Abrir navegación" onClick={onToggleSidebar} />
        </div>
      )}
      {leading || (logo && <div className={css.logoWrap}>{logo}</div>)}
      <nav aria-label="Secciones" className={css.navWrap}>
        {navItems.map(n => (
          <a
            key={n.id}
            href={n.href || '#'}
            className={css.navLink}
            data-active={n.active || undefined}
            data-size={navSize !== 'md' ? navSize : undefined}
            aria-current={n.active ? 'page' : undefined}
          >
            {n.label}
          </a>
        ))}
      </nav>
      {tail}
    </>
  )

  const renderMinimal = () => (
    <>
      {leading}
      {breadcrumb.length > 0 && (
        <nav aria-label="Ruta" className={css.breadcrumbNav}>
          {breadcrumb.map((c, i) => {
            const isLast = i === breadcrumb.length - 1
            return (
              <span key={i}>
                {i > 0 && <span className={css.breadcrumbSep} aria-hidden="true">/</span>}
                {isLast ? (
                  <span className={css.breadcrumbCurrent} aria-current="page">{c.label}</span>
                ) : (
                  <a href={c.href || '#'} className={css.breadcrumbLink}>{c.label}</a>
                )}
              </span>
            )
          })}
        </nav>
      )}
      <div className={css.spacer} />
      {tail}
    </>
  )

  const renderAdmin = () => (
    <>
      {leading || (
        <Input
          filled
          value={searchValue}
          onChange={onSearchChange}
          placeholder={intl.formatMessage({ id: 'topbar.search', defaultMessage: 'Buscar unidades, conductores…' })}
          icon="search"
          style={{ flex: 1 }}
        />
      )}
      {notificationCount > 0 && (
        <div className={css.notifWrap}>
          <IconButton
            icon="notifications"
            ariaLabel={`${notificationCount} notificaciones sin leer`}
            onClick={onNotifications}
          />
          <span className={css.notifCount}>
            <Badge tone="danger">{notificationCount > 9 ? '9+' : notificationCount}</Badge>
          </span>
        </div>
      )}
      {tail}
    </>
  )

  const renderMultientity = () => (
    <>
      {leading || (
        <Popover
          trigger={
            <button type="button" className={css.entityBtn}>
              {currentEntityObj?.label || intl.formatMessage({ id: 'common.selectEntity', defaultMessage: 'Selecciona…' })}
              <span className="flow-icon" aria-hidden="true">expand_more</span>
            </button>
          }
        >
          {({ close }) => (
            <div role="menu">
              {entities.map(e => (
                <button
                  key={e.id}
                  type="button"
                  role="menuitem"
                  className={css.entityOption}
                  data-active={e.id === currentEntity || undefined}
                  aria-current={e.id === currentEntity ? 'true' : undefined}
                  onClick={() => { onEntityChange?.(e.id); close() }}
                >
                  {e.label}
                </button>
              ))}
            </div>
          )}
        </Popover>
      )}
      <div className={css.spacer} />
      {tail}
    </>
  )

  const renderMobile = () => (
    <>
      {leading || (
        <IconButton icon="menu" ariaLabel="Abrir navegación" onClick={onToggleSidebar} />
      )}
      {logo && <div className={css.logoCenter}>{logo}</div>}
      {tail}
    </>
  )

  const variants: Record<string, () => ReactNode> = {
    standard: renderStandard,
    minimal: renderMinimal,
    admin: renderAdmin,
    multientity: renderMultientity,
    mobile: renderMobile,
  }

  return (
    <header className={css.root} data-surface={surface} style={style}>
      {(variants[variant] || renderStandard)()}
    </header>
  )
}
