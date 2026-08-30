import type { CSSProperties } from 'react'
import css from './Skeleton.module.css'

export type SkeletonVariant = 'text' | 'title' | 'card' | 'circle'

export interface SkeletonProps {
  variant?: SkeletonVariant
  width?: number | string
  height?: number | string
  style?: CSSProperties
}

export function Skeleton({ variant = 'text', width, height, style }: SkeletonProps) {
  return (
    <div
      className={css.root}
      data-variant={variant}
      aria-hidden="true"
      style={{
        ...(width != null ? { width } : {}),
        ...(height != null ? { height } : {}),
        ...style,
      }}
    />
  )
}
