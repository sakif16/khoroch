import { auth, db } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { AddExpenseButton } from "../components/AddExpenseButton"
import Expense from "@/models/Expense"
import Family from "@/models/Family"
import mongoose from "mongoose"

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) redirect('/Signin')

  await mongoose.connect(process.env.MONGODB_URI as string)

  // Get user from DB
  const user = await db.collection("user").findOne({
    _id: new mongoose.Types.ObjectId(session.user.id)
  })

  if (!user?.familyId) redirect('/Family')

  const familyId = user.familyId

  // Get family
  const family = await Family.findById(familyId).lean() as any
  if (!family) redirect('/Family')

  // Month range
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)

  // Expenses this month
  const expenses = await Expense.find({
    familyId,
    expenseDate: { $gte: startOfMonth, $lte: endOfMonth },
  }).lean()

  // Stats
  const famTotal = expenses.reduce((sum, e) => sum + e.amount, 0)
  const famExpenseCount = expenses.length

  const myExpenses = expenses.filter((e) => e.userId === session.user.id)
  const myTotal = myExpenses.reduce((sum, e) => sum + e.amount, 0)
  const myExpenseCount = myExpenses.length
  const mySharePct = famTotal === 0 ? 0 : Math.round((myTotal / famTotal) * 100)

  // Category breakdown
  const categoryMap: Record<string, number> = {}
  expenses.forEach((e) => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount
  })
  const categories = Object.entries(categoryMap)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)

  // Member breakdown
  const memberMap: Record<string, number> = {}
  expenses.forEach((e) => {
    memberMap[e.userName] = (memberMap[e.userName] || 0) + e.amount
  })
  const members = Object.entries(memberMap)
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount)

  // Recent expenses — all time, latest 10
  const recentExpenses = await Expense.find({ familyId })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean()

  // Max for bar width
  const maxMemberAmount = members[0]?.amount || 1
  const maxCategoryAmount = categories[0]?.amount || 1

  const monthLabel = now.toLocaleString('default', { month: 'long', year: 'numeric' })

  return (
    <div className="k-main" style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── Header ── */}
      <div className="k-page-header">
        <div className="k-page-title">
          <small>Dashboard · {monthLabel}</small>
          {family.name}
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        marginBottom: '1.75rem',
      }}>
        <div className="k-stat-card accent">
          <div className="k-stat-label">Your spending</div>
          <div className="k-stat-value">
            <span className="k-currency">৳</span>
            {myTotal.toLocaleString('en-IN')}
          </div>
          <div className="k-stat-sub">{myExpenseCount} expense{myExpenseCount !== 1 ? 's' : ''} logged</div>
        </div>

        <div className="k-stat-card">
          <div className="k-stat-label">Family total</div>
          <div className="k-stat-value">
            <span className="k-currency">৳</span>
            {famTotal.toLocaleString('en-IN')}
          </div>
          <div className="k-stat-sub">{famExpenseCount} total expense{famExpenseCount !== 1 ? 's' : ''}</div>
        </div>

        <div className="k-stat-card">
          <div className="k-stat-label">Your share</div>
          <div className="k-stat-value">
            {mySharePct}<span className="k-currency">%</span>
          </div>
          <div className="k-stat-sub">of family total</div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: '1.5rem',
        alignItems: 'start',
      }}>

        {/* Recent expenses */}
        <div className="k-card">
          <div className="k-card-header">
            <span>Recent expenses</span>
            <AddExpenseButton />
          </div>

          <div className="k-card-body" style={{ paddingTop: 0, paddingBottom: '0.5rem' }}>
            {recentExpenses.length === 0 ? (
              <div className="k-empty">
                <div className="k-empty-icon">💸</div>
                <p>No expenses yet.</p>
              </div>
            ) : (
              recentExpenses.map((e) => (
                <div key={e._id.toString()} className="k-expense-item">
                  <div className="k-exp-info" style={{ flex: 1 }}>
                    <div className="k-exp-name">{e.title}</div>
                    <div className="k-exp-meta">
                      <span>{e.userName}</span>
                      <span>·</span>
                      <span>{new Date(e.expenseDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                      <span className="k-badge k-badge-gray">{e.category}</span>
                      {e.userId === session.user.id && (
                        <span className="k-badge k-badge-green">you</span>
                      )}
                    </div>
                  </div>
                  <div className={`k-exp-amount ${e.userId === session.user.id ? 'k-exp-mine' : ''}`}>
                    ৳{e.amount.toLocaleString('en-IN')}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Member breakdown */}
          <div className="k-card">
            <div className="k-card-header">Member breakdown</div>
            <div className="k-card-body">
              {members.length === 0 ? (
                <div className="k-empty" style={{ padding: '1rem' }}>
                  <div className="k-empty-icon">👥</div>
                  <p>No data yet.</p>
                </div>
              ) : (
                members.map((m) => {
                  const pct = Math.round((m.amount / maxMemberAmount) * 100)
                  return (
                    <div key={m.name} className="k-bar-row">
                      <div className="k-bar-label">
                        <span className="k-bar-label-left">{m.name}</span>
                        <span className="k-bar-label-right">৳{m.amount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="k-bar-track">
                        <div className="k-bar-fill" style={{ width: `${pct}%`, background: 'var(--accent)' }} />
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Category breakdown */}
          <div className="k-card">
            <div className="k-card-header">By category</div>
            <div className="k-card-body">
              {categories.length === 0 ? (
                <div className="k-empty" style={{ padding: '1rem' }}>
                  <div className="k-empty-icon">📊</div>
                  <p>No data yet.</p>
                </div>
              ) : (
                categories.map((c) => {
                  const pct = Math.round((c.amount / maxCategoryAmount) * 100)
                  return (
                    <div key={c.category} className="k-bar-row">
                      <div className="k-bar-label">
                        <span className="k-bar-label-left">{c.category}</span>
                        <span className="k-bar-label-right">৳{c.amount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="k-bar-track">
                        <div className="k-bar-fill" style={{ width: `${pct}%`, background: 'var(--accent-mid)' }} />
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Dashboard