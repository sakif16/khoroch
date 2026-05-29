'use client'


import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const Signin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e:any)  {
    e.preventDefault()

    const { data, error } = await authClient.signIn.email({
    email: email, // required
    password: password, // required
    rememberMe: false,
    callbackURL: "/Dashboard",
});


  }



  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8"
      style={{
        background: "radial-gradient(circle at top left, rgba(34,197,94,0.12), transparent 18%), radial-gradient(circle at bottom right, rgba(16,185,129,0.08), transparent 20%), rgb(247,244,237)",
      }}
    >
      <div className="w-full max-w-md rounded-3xl border border-slate-200/70 bg-white/95 px-7 py-10 shadow-xl shadow-slate-900/5 backdrop-blur-sm">
        <div className="space-y-2 text-center">
          <p className="text-3xl font-semibold tracking-tight text-slate-900">Kharoch</p>
          <p className="text-sm text-slate-500">Welcome back. Sign in to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Sign in
          </button>

          <button
            type="button"
            className="mt-2 flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Sign in with Google
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{' '}
          <Link href="/Signup" className="font-semibold text-slate-950 hover:text-slate-700">
            Create new account
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Signin;
