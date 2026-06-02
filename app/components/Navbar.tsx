import Link from 'next/link'
import React from 'react'
import LogoutButton from './LogoutButton'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <nav style={{
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      padding: '0 2rem',
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>

      {/* Left — Logo (always) */}
      <div className="k-logo" style={{ fontSize: '1.25rem', marginBottom: 0 }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Kho<span>roch</span>
        </Link>
      </div>

      {/* Middle — page links when logged in */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        {session && (
          <>
            <Link href="/Dashboard" className="k-nav-item" style={{ borderRadius: 'var(--r-sm)' }}>
              Dashboard
            </Link>
            <Link href="/Family" className="k-nav-item" style={{ borderRadius: 'var(--r-sm)' }}>
              Family
            </Link>
          </>
        )}
      </div>

      {/* Right — auth actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {!session ? (
          <>
            <Link href="/Signin" className="k-btn k-btn-ghost" style={{ padding: '7px 14px', fontSize: 13 }}>
              Sign in
            </Link>
            <Link href="/Signup" className="k-btn k-btn-primary" style={{ width: 'auto', padding: '7px 14px', fontSize: 13, marginTop: 0 }}>
              Sign up
            </Link>
          </>
        ) : (
          <>
            <span className="k-label" style={{ color: 'var(--ink2)', letterSpacing: 0 }}>
              {session.user.name}
            </span>
            <LogoutButton />
          </>
        )}
      </div>

    </nav>
  )
}

export default Navbar