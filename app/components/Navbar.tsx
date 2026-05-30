import Link from 'next/link'
import React from 'react'
import LogoutButton from './LogoutButton'

const Navbar = () => {
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

      {/* Logo */}
      <div className="k-logo" style={{ fontSize: '1.25rem', marginBottom: 0 }}>
        Kha<span>roch</span>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        <Link href="/" className="k-nav-item" style={{ borderRadius: 'var(--r-sm)' }}>
          Home
        </Link>
        <Link href="/Dashboard" className="k-nav-item" style={{ borderRadius: 'var(--r-sm)' }}>
          Dashboard
        </Link>
      </div>

      {/* Auth */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Link
          href="/Signin"
          className="k-btn k-btn-ghost"
          style={{ padding: '7px 14px', fontSize: 13 }}
        >
          Sign in
        </Link>
        <Link
          href="/Signup"
          className="k-btn k-btn-primary"
          style={{ width: 'auto', padding: '7px 14px', fontSize: 13, marginTop: 0 }}
        >
          Sign up
        </Link>
        <LogoutButton />
      </div>

    </nav>
  )
}

export default Navbar