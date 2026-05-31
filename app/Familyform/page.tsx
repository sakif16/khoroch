'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const FamilyForm = () => {
  const [name, setName] = useState('')
  const router = useRouter()

  async function handleSubmit(e: any) {
    e.preventDefault()
    // TODO: call server action here
  }

  return (
    <div className="k-auth-wrap">
      <div className="k-auth-card">

        {/* Header */}
        <div className="k-logo">Kha<span>roch</span></div>
        <p style={{ fontSize: 13, color: 'var(--ink3)', marginBottom: '2rem' }}>
          Name your family group.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="k-field">
            <label htmlFor="family-name">Family name</label>
            <input
              id="family-name"
              type="text"
              className="k-input"
              placeholder="e.g. Rahman family"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <p style={{ fontSize: 12, color: 'var(--ink3)', marginBottom: '1.25rem' }}>
            A unique 10-digit code will be generated automatically. Share it with your family members so they can join.
          </p>

          <button
            type="submit"
            className="k-btn k-btn-primary"
            style={{ marginTop: '0.25rem' }}
          >
            Create family →
          </button>
        </form>

        <div className="k-divider">or</div>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink3)' }}>
          Have a family code?{''}
        <Link
            href="/Joinfamily"
            style={{ color: 'var(--accent)', fontWeight: 500, cursor: 'pointer' }}
            >
            Join instead
        </Link>
        </p>

      </div>
    </div>
  )
}

export default FamilyForm