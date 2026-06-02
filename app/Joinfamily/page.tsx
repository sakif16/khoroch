'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { redirect } from "next/navigation"
import { authClient } from "@/lib/auth-client"

const JoinFamily = () => {
  const [code, setCode] = useState('')
  const router = useRouter()

  async function handleSubmit(e: any) {
    e.preventDefault()
    try {
    const res = await fetch("/api/family/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    router.push("/Dashboard");
  } catch (err) {
    console.error(err);
    alert("Invalid family code");
  }
  }

  return (
    <div className="k-auth-wrap">
      <div className="k-auth-card">

        {/* Header */}
        <div className="k-logo">Kho<span>roch</span></div>
        <p style={{ fontSize: 13, color: 'var(--ink3)', marginBottom: '2rem' }}>
          Enter your family code to join.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="k-field">
            <label htmlFor="family-code">Family code</label>
            <input
              id="family-code"
              type="text"
              className="k-input"
              placeholder="e.g. A1B2C3D4E5"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              maxLength={10}
              required
            />
          </div>

          <button
            type="submit"
            className="k-btn k-btn-primary"
            style={{ marginTop: '0.25rem' }}
          >
            Join family →
          </button>
        </form>

        <div className="k-divider">or</div>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink3)' }}>
          Don't have a code?{' '}
          <Link
            href="/Familyform"
            style={{ color: 'var(--accent)', fontWeight: 500 }}
          >
            Create a family
          </Link>
        </p>

      </div>
    </div>
  )
}

export default JoinFamily