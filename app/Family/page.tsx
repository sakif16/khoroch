import { auth, db } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import Family from "@/models/Family"
import dbConnect from "@/lib/mongodb"
import { CopyButton } from "../components/Copybutton"

const FamilyPage = async () => {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) redirect('/Signin')

  const familyId = session.user.familyId as string | null

  if (familyId === null) {
    return (
      <div className="k-main" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <div className="k-page-header">
          <div className="k-page-title">
            <small>Your group</small>
            Family
          </div>
        </div>

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
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link href="/Familyform" className="k-btn k-btn-primary" style={{ width: 'auto', padding: '12px 32px' }}>
              Create a family →
            </Link>
            <Link href="/Joinfamily" className="k-btn k-btn-ghost" style={{ padding: '12px 32px' }}>
              Join with a code
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Fetch family details
  await dbConnect()
  const family = await Family.findById(familyId).lean() as any
  if (!family) redirect('/Familyform')

  // Fetch all members with same familyId from BetterAuth user collection
  const members = await db.collection("user").find({ familyId: familyId }).toArray()

  const initials = (name: string) =>
    name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()

  const avatarColors = ['k-av-green', 'k-av-amber', 'k-av-blue', 'k-av-rose']

  return (
    <div className="k-main" style={{ background: 'var(--bg)', minHeight: '100vh' }}>


      {/* Family name + code — centered */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: '2.5rem',
        gap: '1rem',
      }}>
        <h2 className="k-serif" style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          letterSpacing: '-0.02em',
          color: 'var(--ink)',
        }}>
          {family.name}
        </h2>

        {/* Copyable code */}
        <div className="k-code-box" style={{ maxWidth: 320, width: '100%' }}>
          <div>
            <div className="k-label" style={{ marginBottom: 4 }}>Family code — share to invite</div>
            <div className="k-family-code">{family.code}</div>
          </div>
          <CopyButton code={family.code} />
        </div>
      </div>

      {/* Members */}
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div className="k-card">
          <div className="k-card-header">
            Members <span className="k-badge k-badge-gray" style={{ marginLeft: 8 }}>{members.length}</span>
          </div>
          <div className="k-card-body" style={{ padding: 0 }}>
            {members.map((member: any, i: number) => (
              <div key={member._id.toString()} className="k-member-row" style={{ padding: '14px 1.5rem' }}>
                <div className={`k-avatar ${avatarColors[i % avatarColors.length]}`}>
                  {initials(member.name)}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="k-member-name">
                    {member.name}
                    {member._id.toString() === session.user.id && (
                      <span className="k-badge k-badge-green" style={{ marginLeft: 8 }}>you</span>
                    )}
                  </div>
                  <div className="k-member-count">{member.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default FamilyPage