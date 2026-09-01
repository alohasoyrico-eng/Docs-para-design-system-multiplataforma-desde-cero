import { TopBar, GlobalSearch, type SearchResult, IconButton, FlowLogo } from '@alohasoyrico-eng/flow-react'
import { useState, useMemo, useCallback } from 'react'
import { Outlet, useNavigate } from '@tanstack/react-router'
import { getAllContracts } from '../data/contracts'
import css from './DocsLayout.module.css'

const DOCS_NAV = [
  { id: 'foundations', label: 'Foundations' },
  { id: 'primitives', label: 'Primitives' },
  { id: 'components', label: 'Components', active: true },
  { id: 'patterns', label: 'Patterns' },
  { id: 'templates', label: 'Templates' },
]

const LAYER_ICONS: Record<string, string> = {
  primitives: 'category',
  components: 'widgets',
  patterns: 'dashboard',
}

export function DocsLayout() {
  const navigate = useNavigate()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const allItems = useMemo(() => {
    const contracts = getAllContracts()
    return Object.entries(contracts).map(([id, item]) => ({
      id,
      label: item.name,
      group: item.layer,
      icon: LAYER_ICONS[item.layer] || 'article',
      meta: item.summary,
    }))
  }, [])

  const results: SearchResult[] = useMemo(() => {
    if (searchValue.length < 1) return []
    const q = searchValue.toLowerCase()
    return allItems
      .filter(item => item.label.toLowerCase().includes(q) || item.meta?.toLowerCase().includes(q))
      .slice(0, 20)
  }, [searchValue, allItems])

  const handleSelect = useCallback((item: SearchResult) => {
    navigate({ to: '/docs/$componentId', params: { componentId: item.id } })
    setSearchOpen(false)
    setSearchValue('')
  }, [navigate])

  const searchTrigger = (
    <div className={css.searchWrap}>
      <IconButton
        icon="search"
        ariaLabel="Search components (⌘K)"
        variant="ghost"
        size="lg"
        onClick={() => setSearchOpen(true)}
      />
      <kbd className={css.searchKbd}>⌘K</kbd>
    </div>
  )

  return (
    <div className={css.layout}>
      <TopBar
        surface="glass"
        logo={<FlowLogo height={44} />}
        navItems={DOCS_NAV}
        sticky
        trailing={searchTrigger}
      />
      <main className={css.main}>
        <Outlet />
      </main>
      <GlobalSearch
        mode="palette"
        open={searchOpen}
        onOpenChange={setSearchOpen}
        value={searchValue}
        onValueChange={setSearchValue}
        results={results}
        groupOrder={['primitives', 'components', 'patterns']}
        placeholder="Search components, patterns, tokens…"
        emptyTitle="Search the design system"
        emptyDescription="Find components, patterns, and tokens by name."
        noResultsTitle={(q) => `No results for "${q}"`}
        onSelect={handleSelect}
      />
    </div>
  )
}
