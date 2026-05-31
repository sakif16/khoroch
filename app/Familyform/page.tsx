'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"

const FamilyForm = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)

    try {
      const session = await authClient.getSession()

      const res = await fetch("/api/family/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error)
      }

      console.log("Family created:", data)

      // optional user update (ONLY if you still want frontend-driven update)
      await fetch("/api/user/update-family", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          familyId: data.familyId,
        }),
      })

      router.push("/Dashboard")

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="k-auth-wrap">
      <div className="k-auth-card">

        <div className="k-logo">Kha<span>roch</span></div>

        <p style={{ fontSize: 13, color: 'var(--ink3)', marginBottom: '2rem' }}>
          Name your family group.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="k-field">
            <label>Family name</label>
            <input
              type="text"
              className="k-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="k-btn k-btn-primary"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create family →"}
          </button>
        </form>

        <div className="k-divider">or</div>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink3)' }}>
          Have a family code?{" "}
          <Link href="/Joinfamily" style={{ color: 'var(--accent)' }}>
            Join instead
          </Link>
        </p>

      </div>
    </div>
  )
}

export default FamilyForm