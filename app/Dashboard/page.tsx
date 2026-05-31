import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function monthLabel(m: string) {
  const [y, mo] = m.split('-')
  return MONTHS[parseInt(mo) - 1] + ' ' + y
}

const Dashboard = async () => {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) redirect('/Signin')

  // TODO: replace with real DB queries
  const familyId = null         // null = user has no family yet
  const viewMonth = '2026-05'
  const myTotal = 0
  const famTotal = 0
  const myExpenseCount = 0
  const famExpenseCount = 0
  const mySharePct = 0

  // If no family, redirect to family page to create/join one
  if (!session.user.familyId) redirect('/Family')

  return (
    <div className="k-main" style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── Page header ── */}
      <div className="k-page-header">
        <div>
          <div className="k-page-title">
            <small>Dashboard</small>
            Family name
          </div>
        </div>


      </div>

      {/* ── Stat cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.75rem' }}>

        <div className="k-stat-card accent">
          <div className="k-stat-label">Your spending</div>
          <div className="k-stat-value">
            <span className="k-currency">৳</span>{myTotal.toLocaleString('en-IN')}
          </div>
          <div className="k-stat-sub">{myExpenseCount} expenses logged</div>
        </div>

        <div className="k-stat-card">
          <div className="k-stat-label">Family total</div>
          <div className="k-stat-value">
            <span className="k-currency">৳</span>{famTotal.toLocaleString('en-IN')}
          </div>
          <div className="k-stat-sub">{famExpenseCount} total expenses</div>
        </div>

        <div className="k-stat-card">
          <div className="k-stat-label">Your share</div>
          <div className="k-stat-value">
            {mySharePct}<span className="k-currency">%</span>
          </div>
          <div className="k-stat-sub">of family total</div>
        </div>

      </div>

      {/* ── Two col ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem', alignItems: 'start' }}>

        {/* Recent expenses */}
        <div className="k-card">
          <div className="k-card-header">
            <span>Recent expenses</span>
            <button
              className="k-btn k-btn-ghost"
              style={{ fontSize: 12, padding: '6px 12px' }}
              disabled
              title="Join or create a family first"
            >
              + Add
            </button>
          </div>
          <div className="k-card-body">
            <div className="k-empty">
              <div className="k-empty-icon">💸</div>
              <p>No expenses yet.</p>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Member breakdown */}
          <div className="k-card">
            <div className="k-card-header">Member breakdown</div>
            <div className="k-card-body">
              <div className="k-empty" style={{ padding: '1.5rem' }}>
                <div className="k-empty-icon">👥</div>
                <p>No members yet.</p>
              </div>
            </div>
          </div>

          {/* By category */}
          <div className="k-card">
            <div className="k-card-header">By category</div>
            <div className="k-card-body">
              <div className="k-empty" style={{ padding: '1.5rem' }}>
                <div className="k-empty-icon">📊</div>
                <p>No data yet.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Dashboard