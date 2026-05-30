import Link from "next/link";

export default function HomePage() {
  return (
    <div className="k-auth-wrap" style={{ flexDirection: "column", gap: "0" }}>

      {/* Background blobs — already in k-auth-wrap via ::before ::after */}

      {/* Hero */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "1.25rem",
        position: "relative",
        zIndex: 1,
      }}>

        {/* Eyebrow */}
        <span className="k-label" style={{ letterSpacing: "0.1em" }}>
          Family expense tracker
        </span>

        {/* Headline */}
        <h1 className="k-serif" style={{
          fontSize: "clamp(2.2rem, 5vw, 4rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: "var(--ink)",
          maxWidth: "640px",
        }}>
          One solution to your<br />
          <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
            many expenses.
          </span>
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: "1rem",
          color: "var(--ink3)",
          maxWidth: "420px",
          lineHeight: 1.7,
        }}>
          Track, share, and understand your family's spending — together, every month.
        </p>

        {/* CTA */}
        <Link
          href="/Signup"
          className="k-btn k-btn-primary"
          style={{
            width: "auto",
            marginTop: "0.5rem",
            padding: "13px 36px",
            fontSize: "15px",
            borderRadius: "var(--r-sm)",
          }}
        >
          Start now →
        </Link>

        {/* Sign in nudge */}
        <p style={{ fontSize: 13, color: "var(--ink3)" }}>
          Already have an account?{" "}
          <Link
            href="/Signin"
            style={{ color: "var(--accent)", fontWeight: 500 }}
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}