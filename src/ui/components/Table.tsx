import { DataGrid, type DataGridProps, type Density } from '../primitives/shells/DataGrid'

export interface TableProps<T = Record<string, unknown>> extends DataGridProps<T> {
  density?: Density
  zebra?: boolean
}

export function Table<T extends Record<string, unknown> = Record<string, unknown>>({
  columns,
  rows,
  rowKey,
  selectedKey,
  onRowClick,
  density,
  zebra,
  style,
}: TableProps<T>) {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      rowKey={rowKey}
      selectedKey={selectedKey}
      onRowClick={onRowClick}
      density={density}
      style={style}
    />
  )
}
