import type { CSSProperties } from 'react'

export interface SparklineProps {
  values?: number[]
  width?: number
  height?: number
  color?: string
  showDot?: boolean
  style?: CSSProperties
}

export function Sparkline({ values = [], width = 120, height = 40, color, showDot = true, style }: SparklineProps) {
  if (!values.length) return null
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width
    const y = height - ((v - min) / range) * (height - 4) - 2
    return `${x},${y}`
  })
  const last = values[values.length - 1]
  const lastX = width
  const lastY = height - ((last - min) / range) * (height - 4) - 2
  const fill = color || 'var(--viz-1)'

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: 'block', ...style }}
      aria-hidden="true"
    >
      <polyline
        points={pts.join(' ')}
        fill="none"
        stroke={fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {showDot && (
        <circle cx={lastX} cy={lastY} r={3} fill={fill} />
      )}
    </svg>
  )
}
