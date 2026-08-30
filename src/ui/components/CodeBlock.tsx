import { useState, type CSSProperties, type ReactNode } from 'react'
import { IconButton } from '../primitives/IconButton'
import css from './CodeBlock.module.css'

export interface CodeBlockProps {
  code?: string
  filename?: string
  heading?: ReactNode
  trailing?: ReactNode
  copyable?: boolean
  variant?: 'default' | 'inline'
  children?: ReactNode
  style?: CSSProperties
}

export function CodeBlock({ code, filename, heading, trailing, copyable = true, variant = 'default', children, style }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const text = code ?? ''
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (variant === 'inline') {
    return (
      <div className={css.root} data-variant="inline" style={style}>
        <span className={css.snippetText}>{children ?? code}</span>
        {copyable && code && (
          <IconButton
            icon={copied ? 'check' : 'content_copy'}
            ariaLabel="Copy code"
            variant="ghost"
            size="sm"
            onClick={handleCopy}
          />
        )}
      </div>
    )
  }

  return (
    <div className={css.root} style={style}>
      {(filename || heading || trailing || copyable) && (
        <div className={css.header}>
          {filename && <span className={css.filename}>{filename}</span>}
          {heading && <span className={css.heading}>{heading}</span>}
          <span className={css.spacer} />
          {trailing}
          {copyable && code && (
            <IconButton
              icon={copied ? 'check' : 'content_copy'}
              ariaLabel="Copy code"
              variant="ghost"
              size="sm"
              onClick={handleCopy}
            />
          )}
        </div>
      )}
      <pre className={css.pre}>
        <code className={css.code}>{children ?? code}</code>
      </pre>
    </div>
  )
}
