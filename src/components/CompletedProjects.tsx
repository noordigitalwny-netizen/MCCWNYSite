"use client";

import React, { useState, useEffect } from "react";
import { supabase, type Project } from "@/lib/supabase";

export default function CompletedProjects() {
  const [completedProjects, setCompletedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompletedProjects() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("status", "Completed")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) {
          setCompletedProjects(data);
        }
      } catch (err) {
        console.warn("Could not fetch completed projects from Supabase:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCompletedProjects();
  }, []);

  return (
    <div className="space-y-6">
      <div className="border-b border-emerald-900/10 pb-3">
        <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
          <span className="w-2.5 h-6 bg-amber-500 rounded-full inline-block"></span>
          Completed Projects & Gratitude Gallery
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Alhamdulillah! Thanks to the generosity of our donors, these community initiatives are 100% funded and completed.
        </p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-xs text-slate-500 font-medium">
          Loading past completed projects from database...
        </div>
      ) : completedProjects.length === 0 ? (
        <div className="p-10 text-center bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
          <span className="text-3xl">✨</span>
          <h3 className="text-sm font-bold text-slate-800">Check back soon for upcoming initiatives!</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Our completed project gallery will display here as active campaigns finish funding.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {completedProjects.map((item) => {
            const funded = Number(item.raised_amount || item.goal_amount || 0);

            return (
              <div
                key={item.id || item.title}
                className="bg-gradient-to-b from-emerald-900 to-emerald-950 text-white rounded-2xl p-6 shadow-md border border-amber-500/30 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Background Decorative Gold Accent Arc */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-400/10 rounded-full blur-xl pointer-events-none"></div>

                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
                      <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Completed {item.completed_date || "Successfully"}
                    </span>
                    <span className="text-xs font-semibold text-emerald-200">
                      ${funded.toLocaleString()}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-amber-200 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-emerald-100/80 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-800/80 text-[11px] text-amber-300/90 font-medium flex items-center gap-1.5 relative z-10">
                  <span className="text-amber-400">✨</span>
                  <span>Impact: {item.impact_note || "Generously funded by the WNY community."}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
