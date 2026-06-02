'use client'

import Link from "next/link";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";


const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleSubmit(e: any) {
    e.preventDefault()
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
    }, {
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
          Create your account.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="k-field">
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              type="text"
              className="k-input"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder="Min 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="k-btn k-btn-primary" style={{ marginTop: '0.5rem' }}>
            Create account →
          </button>

        </form>

        <div className="k-divider">or</div>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink3)' }}>
          Already have an account?{' '}
          <Link href="/Signin" style={{ color: 'var(--accent)', fontWeight: 500 }}>
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Signup