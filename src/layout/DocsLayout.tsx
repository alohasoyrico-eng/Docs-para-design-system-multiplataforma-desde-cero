import { useState, useCallback } from 'react'
import { Outlet, useNavigate } from '@tanstack/react-router'
import { TopBar } from '../ui/patterns/TopBar'
import { GlobalSearch, type SearchResult } from '../ui/patterns/GlobalSearch'
import { IconButton } from '../ui/primitives/IconButton'
import { FlowLogo } from '../ui/primitives/FlowLogo'
import { getAllContracts } from '../data/contracts'
import css from './DocsLayout.module.css'

const DOCS_NAV = [
  { id: 'foundations', label: 'Foundations' },
  { id: 'components', label: 'Components', active: true },
  { id: 'patterns', label: 'Patterns' },
  { id: 'templates', label: 'Templates' },
  { id: 'registry', label: 'Registry' },
  { id: 'doc-primitives', label: 'Doc primitives' },
  { id: 'miel', label: 'MIEL' },
]

export function DocsLayout() {
  const navigate = useNavigate()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const allContracts = getAllContracts()
  const searchResults: SearchResult[] = searchValue.length >= 1
    ? Object.entries(allContracts)
        .filter(([, c]) => c.name.toLowerCase().includes(searchValue.toLowerCase()))
        .slice(0, 12)
        .map(([id, c]) => ({
          id,
          label: c.name,
          group: c.layer,
          icon: 'widgets',
          meta: c.summary.slice(0, 60),
        }))
    : []

  const handleSelect = useCallback((item: SearchResult) => {
    navigate({ to: '/docs/$componentId', params: { componentId: item.id } })
    setSearchValue('')
  }, [navigate])

  return (
    <div className={css.layout}>
      <TopBar
        surface="inverse"
        logo={<FlowLogo />}
        navItems={DOCS_NAV}
        navSize="sm"
        trailing={
          <IconButton
            icon="search"
            ariaLabel="Search components (⌘K)"
            variant="ghost"
            onClick={() => setSearchOpen(true)}
          />
        }
      />
      <GlobalSearch
        mode="palette"
        open={searchOpen}
        onOpenChange={setSearchOpen}
        value={searchValue}
        onValueChange={setSearchValue}
        results={searchResults}
        groupOrder={['primitives', 'components', 'patterns']}
        onSelect={handleSelect}
        placeholder="Search components…"
      />
      <main className={css.main}>
        <Outlet />
      </main>
    </div>
  )
}
