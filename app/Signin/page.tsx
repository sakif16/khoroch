'use client'

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


const Signin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  async function handleSubmit(e: any) {
    e.preventDefault()
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: false,
    },{
      onSuccess: () => {
        router.push('/Dashboard')
        router.refresh()
      },
      onError: (ctx) => { alert(ctx.error.message) },
    })
  }

  return (
    <div className="k-auth-wrap">
      <div className="k-auth-card">

        {/* Logo */}
        <div className="k-logo">Kho<span>roch</span></div>
        <p style={{ fontSize: 13, color: 'var(--ink3)', marginBottom: '2rem' }}>
          Welcome back. Sign in to continue.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="k-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="k-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="k-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="k-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="k-btn k-btn-primary" style={{ marginTop: '0.5rem' }}>
            Sign in →
          </button>

          {/* <button
            type="button"
            className="k-btn k-btn-ghost"
            style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}
          >
            Sign in with Google
          </button> */}

        </form>

        <div className="k-divider">or</div>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink3)' }}>
          Don&apos;t have an account?{' '}
          <Link href="/Signup" style={{ color: 'var(--accent)', fontWeight: 500 }}>
            Create new account
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Signin