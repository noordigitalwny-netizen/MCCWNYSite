"use client";

import React, { useState, useEffect } from "react";
import { supabase, type Program } from "@/lib/supabase";

export default function CommunityPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivePrograms() {
      try {
        const { data, error } = await supabase
          .from("programs")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) {
          setPrograms(data);
        }
      } catch (err) {
        console.warn("Could not fetch programs from Supabase:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchActivePrograms();
  }, []);

  const acceptedItems = [
    "Clean, gently used clothing (all ages & sizes)",
    "Winter coats, jackets, sweaters, and hoodies",
    "Shoes, boots, and footwear (paired)",
    "Hats, scarves, gloves, and mittens",
    "Bed sheets, blankets, towels, and pillowcases",
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. Header Section: Inclusion & Openness */}
      <section className="bg-gradient-to-b from-[#047857] via-emerald-800 to-emerald-950 text-white py-12 sm:py-16 px-4 border-b border-amber-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
            Open to All WNY Neighbors
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our <span className="text-amber-300">Community</span> Initiatives
          </h1>

          <p className="text-sm sm:text-lg text-emerald-100/90 max-w-3xl mx-auto leading-relaxed font-light">
            MCC WNY is an all-inclusive community center dedicated to building strong bridges, helping neighbors, and serving the broader Western New York public regardless of faith or background.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 2. Permanent HEARTs Clothing Donation Box Section */}
        <section className="bg-gradient-to-r from-amber-500/10 via-emerald-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 border-2 border-amber-400/40 shadow-2xl relative overflow-hidden">
          {/* Background Decorative Gold Light Flare */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/30 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center text-3xl font-extrabold shadow-lg shrink-0">
                  🧥
                </div>
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 uppercase tracking-wider mb-1">
                    On-Site Drop Box
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-200">
                    HEARTs Clothing Donation Box
                  </h2>
                </div>
              </div>

              <div className="bg-emerald-900/80 border border-amber-400/30 px-4 py-2 rounded-xl text-xs text-amber-300 flex items-center gap-2 self-start md:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Available 24/7 Drop-Off</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Location Details */}
              <div className="lg:col-span-5 bg-emerald-900/60 p-6 rounded-2xl border border-emerald-700/60 space-y-4">
                <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Drop-Off Location on Property
                </h3>
                <p className="text-sm text-emerald-100/90 leading-relaxed">
                  The official <strong>HEARTs Clothing Donation Box</strong> is located in the <strong>main parking lot next to the South Entrance</strong> (520 French Road). It is easily accessible by vehicle anytime day or night.
                </p>
                <div className="pt-2 text-xs text-amber-300/80 flex items-center gap-2">
                  <span>📍 Drive up & drop off your donation bag anytime.</span>
                </div>
              </div>

              {/* Accepted Items List */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  What Items You Can Donate
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-emerald-100">
                  {acceptedItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-emerald-900/40 p-3 rounded-xl border border-emerald-800/80">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Dynamic Community Programs Grid from Supabase */}
        <section className="space-y-6">
          <div className="border-b border-emerald-900/10 pb-3">
            <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#047857] rounded-full inline-block"></span>
              More Community Programs & Drives
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Explore how we serve Western New York and find opportunities to volunteer or participate.
            </p>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs text-slate-500 font-medium">
              Loading active community programs from database...
            </div>
          ) : programs.length === 0 ? (
            <div className="p-10 text-center bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <span className="text-3xl">🤝</span>
              <h3 className="text-sm font-bold text-slate-800">Check back soon for upcoming initiatives!</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No additional community drives are currently listed. Please check back later or contact the office.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programs.map((item) => (
                <div
                  key={item.id || item.title}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between space-y-5 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">🤝</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-200">
                        {item.category || "General"}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#047857] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    {item.schedule && (
                      <div className="text-xs text-slate-500 flex items-center gap-1.5">
                        <span className="text-amber-500 font-bold">📅</span>
                        <span>{item.schedule}</span>
                      </div>
                    )}

                    <button
                      onClick={() =>
                        alert(`Thank you for your interest in ${item.title}! Sign-up or contact details will be published soon.`)
                      }
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#047857] text-white hover:bg-emerald-800 hover:shadow-sm active:scale-95 transition-all border border-amber-400/30"
                    >
                      Learn More / Volunteer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
