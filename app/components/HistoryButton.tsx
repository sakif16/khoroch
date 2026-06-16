'use client'

import { useState } from "react"
import { HistoryModal } from "./HistoryModal"


export function HistoryButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="k-btn k-btn-ghost k-history-btn"
      >
        View all
      </button>

      {open && <HistoryModal onClose={() => setOpen(false)} />}

      <style>{`
        .k-history-btn {
          font-size: 0.85rem;
          padding: 0.4rem 0.85rem;
        }
      `}</style>
    </>
  )
}