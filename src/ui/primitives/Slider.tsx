import { useState, type CSSProperties } from 'react'
import css from './Slider.module.css'

export interface SliderProps {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  format?: (value: number) => string
  disabled?: boolean
  style?: CSSProperties
}

export function Slider({ value = 0, onChange, min = 0, max = 100, step = 1, label, format, disabled, style }: SliderProps) {
  const [drag, setDrag] = useState(false)
  const [focus, setFocus] = useState(false)
  const pct = ((value - min) / (max - min)) * 100
  const fmt = format ? format(value) : String(value)

  return (
    <div className={css.root} style={style}>
      {label != null && (
        <div className={css.header}>
          <span className={css.label}>{label}</span>
          <span className={css.value} data-drag={drag || undefined}>{fmt}</span>
        </div>
      )}
      <div className={css.track} data-disabled={disabled || undefined}>
        <div className={css.rail} />
        <div className={css.fill} style={{ width: `${pct}%` }} />
        <div
          className={css.thumb}
          data-drag={drag || undefined}
          data-focus={focus || undefined}
          aria-hidden="true"
          style={{ left: `calc(${pct}% - 11px)` }}
        />
        <input
          type="range"
          className={css.input}
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          aria-label={typeof label === 'string' ? label : undefined}
          aria-valuetext={format ? fmt : undefined}
          onChange={(e) => onChange?.(Number(e.target.value))}
          onMouseDown={() => setDrag(true)}
          onMouseUp={() => setDrag(false)}
          onTouchStart={() => setDrag(true)}
          onTouchEnd={() => setDrag(false)}
          onFocus={() => setFocus(true)}
          onBlur={() => { setFocus(false); setDrag(false) }}
        />
      </div>
    </div>
  )
}
