'use client'

import { useState } from "react"

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        className="k-btn k-btn-ghost"
        style={{ fontSize: 12, padding: '6px 12px' }}
        onClick={handleCopy}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>

      {copied && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 8px)',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--ink)',
          color: '#fff',
          fontSize: 12,
          fontWeight: 500,
          padding: '5px 10px',
          borderRadius: 6,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          animation: 'k-fadeIn 0.15s ease both',
        }}>
          Copied to clipboard!
          {/* Arrow */}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid var(--ink)',
          }} />
        </div>
      )}
    </div>
  )
}