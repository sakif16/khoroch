// components/AddExpenseButton.tsx
'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AddExpenseModal } from "./Addexpensemodal"

export function AddExpenseButton() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  async function handleSubmit(data: {
    title: string
    amount: number
    category: string
    expenseDate: string
  }) {
    const res = await fetch('/api/expense/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const err = await res.json()
      alert(err.error)
      return
    }

    setOpen(false)
    router.refresh() // re-runs the server component to reflect new data
  }

  return (
    <>
      <button
        className="k-btn k-btn-ghost"
        style={{ fontSize: 12, padding: '6px 12px' }}
        onClick={() => setOpen(true)}
      >
        + Add
      </button>

      {open && (
        <AddExpenseModal
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  )
}