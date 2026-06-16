'use client'

import { useEffect, useRef, useState, useCallback } from "react"

interface ExpenseItem {
  _id: string
  title: string
  amount: number
  category: string
  userId: string
  userName: string
  expenseDate: string
}

interface HistoryModalProps {
  onClose: () => void
}

export function HistoryModal({ onClose }: HistoryModalProps) {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const loadingRef = useRef(false)

  const loadPage = useCallback(async (pageToLoad: number) => {
    if (loadingRef.current) return
    loadingRef.current = true
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/expense/history?page=${pageToLoad}&limit=20`)
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to load history")
      }

      setExpenses((prev) =>
        pageToLoad === 1 ? data.expenses : [...prev, ...data.expenses]
      )
      setHasMore(data.hasMore)
      setCurrentUserId(data.currentUserId)
      setPage(pageToLoad)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      loadingRef.current = false
      setLoading(false)
    }
  }, [])

  // Initial load
  useEffect(() => {
    loadPage(1)
  }, [loadPage])

  // Infinite scroll observer
  useEffect(() => {
    if (!hasMore) return

    const sentinel = sentinelRef.current
    const root = scrollContainerRef.current
    if (!sentinel || !root) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current && hasMore) {
          loadPage(page + 1)
        }
      },
      { root, rootMargin: "200px" }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, page, loadPage])

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

      {/* Modal wrapper */}
      <div className="k-modal-wrapper">
        <div className="k-modal-box k-history-box">

          {/* Header */}
          <div className="k-modal-header">
            <span className="k-modal-title">Expense history</span>
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
          <div className="k-history-body" ref={scrollContainerRef}>
            {expenses.length === 0 && !loading && !error ? (
              <div className="k-empty">
                <div className="k-empty-icon">💸</div>
                <p>No expenses yet.</p>
              </div>
            ) : (
              expenses.map((e) => (
                <div key={e._id} className="k-expense-item">
                  <div className="k-exp-info" style={{ flex: 1 }}>
                    <div className="k-exp-name">{e.title}</div>
                    <div className="k-exp-meta">
                      <span>{e.userName}</span>
                      <span>·</span>
                      <span>
                        {new Date(e.expenseDate).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="k-badge k-badge-gray">{e.category}</span>
                      {currentUserId && e.userId === currentUserId && (
                        <span className="k-badge k-badge-green">you</span>
                      )}
                    </div>
                  </div>
                  <div
                    className={`k-exp-amount ${
                      currentUserId && e.userId === currentUserId ? 'k-exp-mine' : ''
                    }`}
                  >
                    ৳{e.amount.toLocaleString('en-IN')}
                  </div>
                </div>
              ))
            )}

            {error && (
              <div className="k-history-error">
                <p>{error}</p>
                <button
                  className="k-btn k-btn-ghost"
                  onClick={() => loadPage(page)}
                >
                  Retry
                </button>
              </div>
            )}

            {loading && (
              <div className="k-history-loading">Loading…</div>
            )}

            {/* Sentinel for infinite scroll */}
            {hasMore && !error && <div ref={sentinelRef} style={{ height: 1 }} />}

            {!hasMore && expenses.length > 0 && (
              <div className="k-history-end">You've reached the end.</div>
            )}
          </div>

        </div>
      </div>

      {/* ── Styles ── */}
      <style>{`
        .k-modal-wrapper {
          position: fixed;
          inset: 0;
          z-index: 101;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          pointer-events: none;
        }

        .k-modal-box {
          background: var(--surface);
          border-radius: 20px;
          width: 100%;
          max-width: 520px;
          max-height: calc(100vh - 2rem);
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px rgba(28,25,23,0.2);
          animation: k-slideUp 0.25s ease both;
          pointer-events: auto;
          overflow: hidden;
        }

        .k-history-box {
          max-width: 600px;
        }

        .k-history-body {
          overflow-y: auto;
          flex: 1;
          min-height: 0;
          padding: 0.5rem 1.5rem 1rem;
        }

        .k-history-loading,
        .k-history-end {
          text-align: center;
          padding: 1rem 0;
          font-size: 0.85rem;
          color: var(--ink3);
        }

        .k-history-error {
          text-align: center;
          padding: 1rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--ink3);
          font-size: 0.85rem;
        }

        /* Small laptops / tablets */
        @media (max-width: 1024px) {
          .k-modal-wrapper {
            padding: 0.75rem;
          }

          .k-modal-box {
            max-height: calc(100vh - 1.5rem);
          }
        }

        /* Phones */
        @media (max-width: 640px) {
          .k-modal-wrapper {
            padding: 0;
            align-items: flex-end;
          }

          .k-modal-box {
            max-width: 100%;
            width: 100%;
            border-radius: 20px 20px 0 0;
            max-height: 92vh;
          }

          .k-history-body {
            padding: 0.5rem 1rem 1rem;
          }
        }
      `}</style>
    </>
  )
}