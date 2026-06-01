'use client'

import { useState } from "react"

const CATEGORIES = [
  { id: 'food', label: 'Food', emoji: '🛒' },
  { id: 'acc', label: 'Accessories', emoji: '💄' },
  { id: 'transport', label: 'Transportation', emoji: '🚌' },
  { id: 'health', label: 'Health', emoji: '💊' },
  { id: 'education', label: 'Education', emoji: '📚' },
  { id: 'other', label: 'Other', emoji: '📦' },
]

const CATEGORY_MAP: Record<string, string> = {
  food: "Food",
  acc: "Accessories",
  transport: "Transportation",
  health: "Health",
  education: "Education",
  other: "Other",
}

interface AddExpenseModalProps {
  onClose: () => void
  onSubmit: (data: {
    title: string
    amount: number
    category: string
    expenseDate: string
  }) => void
}

export function AddExpenseModal({ onClose, onSubmit }: AddExpenseModalProps) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0]
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!category) return

    const payload = {
      title,
      amount: Number(amount),
      category: CATEGORY_MAP[category],
      expenseDate: date,
    }

    onSubmit(payload)
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
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
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 20,
                color: 'var(--ink3)',
              }}
            >
              ×
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit}>
            <div className="k-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {/* Title */}
              <div className="k-field">
                <label>Title</label>
                <input
                  type="text"
                  className="k-input"
                  placeholder="e.g. Grocery, Uber, Tuition"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Amount */}
              <div className="k-field">
                <label>Amount (৳)</label>
                <input
                  type="number"
                  min="0"
                  className="k-input"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              {/* Category */}
              <div className="k-field">
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
                        borderRadius: 10,
                        background: category === cat.id ? 'var(--ink)' : 'var(--bg)',
                        color: category === cat.id ? '#fff' : 'var(--ink2)',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ fontSize: 18 }}>{cat.emoji}</div>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div className="k-field">
                <label>Date</label>
                <input
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
              <button type="button" onClick={onClose} className="k-btn k-btn-ghost">
                Cancel
              </button>

              <button type="submit" className="k-btn k-btn-primary">
                Add →
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}