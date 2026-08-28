import React from "react";
import ActiveCampaigns from "@/components/ActiveCampaigns";

export default function DonatePage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Donate Header Section */}
      <section className="bg-gradient-to-b from-[#047857] via-emerald-800 to-emerald-950 text-white py-12 sm:py-16 px-4 border-b border-amber-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <span className="text-base">﷽</span> Sadaqah & Zakat Contributions
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Donate to <span className="text-amber-300">MCC WNY</span>
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto leading-relaxed font-light">
            Your generous contributions directly support daily mosque operations, youth programs, community assistance, and facility expansions in Western New York.
          </p>

          {/* Prominent External Portal Direct Link */}
          <div className="pt-2">
            <a
              href="https://mcc-wny.org/donations/donate-online"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-extrabold bg-amber-400 text-emerald-950 hover:bg-amber-300 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              <span>Open Secure Donation Portal in New Tab</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Embedded Online Payment Portal Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-emerald-950 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-amber-400/30">
            <div className="flex items-center gap-2.5">
              <span className="text-amber-400 text-lg">🔒</span>
              <h2 className="text-base font-bold text-amber-200">MCC WNY Official Online Payment Portal</h2>
            </div>
            <a
              href="https://mcc-wny.org/donations/donate-online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-amber-300 hover:text-amber-200 underline"
            >
              https://mcc-wny.org/donations/donate-online &rarr;
            </a>
          </div>

          {/* Responsive Iframe Container */}
          <div className="relative w-full bg-slate-50 min-h-[600px] sm:min-h-[750px] overflow-hidden">
            <iframe
              src="https://mcc-wny.org/donations/donate-online"
              title="MCC WNY Online Donation Portal"
              className="w-full h-full min-h-[600px] sm:min-h-[750px] border-0"
              loading="lazy"
              allow="payment; autoplay"
            />
          </div>
        </div>
      </section>

      {/* Active Campaigns List on Donate Page */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <ActiveCampaigns />
      </section>
    </div>
  );
}
