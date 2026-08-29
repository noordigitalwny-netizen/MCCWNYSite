"use client";

import React, { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin, type LoginResult } from "../actions";

export default function AdminLoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<LoginResult | null, FormData>(
    loginAdmin,
    null
  );

  useEffect(() => {
    if (state?.success) {
      router.push("/admin");
    }
  }, [state, router]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-amber-500/30 relative overflow-hidden">
        {/* Background Decorative Gold Light Flare */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Card Header */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-16 h-16 rounded-full bg-emerald-950 border-2 border-amber-400 flex items-center justify-center shadow-lg">
            <span className="text-amber-400 font-bold text-2xl">🔒</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-amber-400/20 text-amber-800 border border-amber-400/40 uppercase tracking-wider">
            Protected Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
            MCC WNY <span className="text-amber-500">Admin Login</span>
          </h1>
          <p className="text-xs text-slate-500">
            Please enter your administrator credentials to manage announcements & community projects.
          </p>
        </div>

        {/* Login Form */}
        <form action={formAction} className="mt-8 space-y-6">
          {state?.error && (
            <div className="p-3.5 rounded-xl text-xs font-semibold bg-red-50 text-red-900 border border-red-200 flex items-center gap-2">
              <span className="text-red-500 text-sm">⚠️</span>
              <span>{state.error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                autoComplete="username"
                placeholder="Enter admin username"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 px-4 rounded-xl text-sm font-extrabold bg-gradient-to-r from-[#047857] via-emerald-700 to-[#047857] text-white hover:bg-emerald-800 shadow-lg shadow-emerald-900/20 active:scale-95 transition-all border border-amber-400/40 disabled:opacity-50"
          >
            {isPending ? "Authenticating..." : "Sign In to Admin Portal"}
          </button>
        </form>
      </div>
    </div>
  );
}
