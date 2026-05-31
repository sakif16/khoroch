// components/AddExpenseButton.tsx
'use client'

import { useState } from "react"
import { AddExpenseModal } from "./Addexpensemodal"

export function AddExpenseButton() {
  const [open, setOpen] = useState(false)

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
          onSubmit={(data) => {
            // TODO: your backend call here
            console.log(data)
            setOpen(false)
          }}
        />
      )}
    </>
  )
}