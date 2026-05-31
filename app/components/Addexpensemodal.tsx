'use client'

import { useState } from "react"

const CATEGORIES = [
  { id: 'food',      label: 'Food',      emoji: '🛒' },
  { id: 'utils',     label: 'Utilities', emoji: '⚡' },
  { id: 'transport', label: 'Transport', emoji: '🚌' },
  { id: 'health',    label: 'Health',    emoji: '💊' },
  { id: 'education', label: 'Education', emoji: '📚' },
  { id: 'other',     label: 'Other',     emoji: '📦' },
]

interface AddExpenseModalProps {
  onClose: () => void
  onSubmit: (data: {
    amount: number
    description: string
    category: string
    date: string
  }) => void
}

export function AddExpenseModal({ onClose, onSubmit }: AddExpenseModalProps) {
  const [amount, setAmount]           = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory]       = useState('')
  const [date, setDate]               = useState(new Date().toISOString().split('T')[0])

  function handleSubmit(e: any) {
    e.preventDefault()
    // TODO: wire up onSubmit with your backend logic
    onSubmit({ amount: parseFloat(amount), description, category, date })
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(28,25,23,0.4)',
          zIndex: 100,
          animation: 'k-fadeIn 0.2s ease both',
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 101,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        pointerEvents: 'none',
      }}>
        <div style={{
          background: 'var(--surface)',
          borderRadius: 20,
          width: '100%',
          maxWidth: 520,
          boxShadow: '0 20px 60px rgba(28,25,23,0.2)',
          animation: 'k-slideUp 0.25s ease both',
          pointerEvents: 'auto',
          overflow: 'hidden',
        }}>

          {/* Header */}
          <div className="k-modal-header">
            <span className="k-modal-title">Quick add expense</span>
            <button
              onClick={onClose}
              style={{
                background: 'none', border: 'none',
                cursor: 'pointer', fontSize: 20,
                color: 'var(--ink3)', lineHeight: 1,
                padding: 2,
              }}
            >
              ×
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit}>
            <div className="k-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {/* Amount */}
              <div className="k-field" style={{ marginBottom: 0 }}>
                <label htmlFor="amount">Amount (৳)</label>
                <input
                  id="amount"
                  type="number"
                  min="0"
                  className="k-input"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div className="k-field" style={{ marginBottom: 0 }}>
                <label htmlFor="description">Description</label>
                <input
                  id="description"
                  type="text"
                  className="k-input"
                  placeholder="What did you spend on?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              {/* Category */}
              <div className="k-field" style={{ marginBottom: 0 }}>
                <label>Category</label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 8,
                  marginTop: 6,
                }}>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      style={{
                        padding: '10px 8px',
                        border: category === cat.id
                          ? '1.5px solid var(--ink)'
                          : '1px solid var(--border)',
                        borderRadius: 'var(--r-sm)',
                        background: category === cat.id ? 'var(--ink)' : 'var(--bg)',
                        color: category === cat.id ? '#fff' : 'var(--ink2)',
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.12s',
                        fontFamily: 'var(--sans)',
                      }}
                    >
                      <span style={{ display: 'block', fontSize: 18, marginBottom: 4 }}>
                        {cat.emoji}
                      </span>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div className="k-field" style={{ marginBottom: 0 }}>
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  type="date"
                  className="k-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

            </div>

            {/* Footer */}
            <div className="k-modal-footer">
              <button
                type="button"
                className="k-btn k-btn-ghost"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="k-btn k-btn-primary"
                style={{ width: 'auto', padding: '10px 28px', marginTop: 0 }}
              >
                Add →
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}