import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"

const FamilyPage = async () => {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) redirect('/Signin')

  // TODO: replace with real DB query
  const familyId = null

  return (
    <div className="k-main" style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Page header */}
      <div className="k-page-header">
        <div className="k-page-title">
          <small>Your group</small>
          Family
        </div>
      </div>

      {familyId === null ? (

        /* ── No family state ── */
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: '1.25rem',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '3rem' }}>🏡</div>

          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.4rem' }}>
              You're not in a family yet
            </div>
            <p style={{ fontSize: 14, color: 'var(--ink3)', maxWidth: 320 }}>
              Create a family group to start tracking expenses together. Share the code with your family members so they can join.
            </p>
          </div>

          <Link
            href="/Familyform"
            className="k-btn k-btn-primary"
            style={{ width: 'auto', padding: '12px 32px', marginTop: '0.5rem' }}
          >
            Create a family →
          </Link>
        </div>

      ) : (

        /* ── Has family state — fill in later ── */
        <div>
          <p className="k-ink3">Family details go here.</p>
        </div>

      )}

    </div>
  )
}

export default FamilyPage