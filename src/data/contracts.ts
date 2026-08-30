import itemsData from './items.json'

export interface ContractMember {
  n: string
  k: string
  t: string
  d: string
  r: boolean
  rw: string
  note: string
}

export interface ContractVariant {
  v: string
  use: string
}

export interface ContractPlatforms {
  web?: string
  angular?: string
  flutter?: string
}

export interface ContractItem {
  name: string
  layer: string
  status: string
  summary: string
  fn: string[]
  domain: string
  shell: boolean
  stub: boolean
  stubNote: string
  shellOf: string[]
  src: string | string[]
  platforms: ContractPlatforms
  anatomy: string
  tokens: string[]
  variants: ContractVariant[]
  members: ContractMember[]
  dos: string[]
  donts: string[]
  when: string[]
  notWhen: string[]
  a11y: string[]
  nonGoals: string[]
}

const items = itemsData as Record<string, ContractItem>

export function getContract(id: string): ContractItem | undefined {
  return items[id]
}

export function getAllContracts(): Record<string, ContractItem> {
  return items
}

export function getContractIds(): string[] {
  return Object.keys(items)
}

export function getContractNeighbors(id: string): { prev?: { id: string; name: string }; next?: { id: string; name: string } } {
  const ids = Object.keys(items)
  const idx = ids.indexOf(id)
  if (idx === -1) return {}
  const prevId = idx > 0 ? ids[idx - 1] : undefined
  const nextId = idx < ids.length - 1 ? ids[idx + 1] : undefined
  return {
    prev: prevId ? { id: prevId, name: items[prevId]!.name } : undefined,
    next: nextId ? { id: nextId, name: items[nextId]!.name } : undefined,
  }
}
