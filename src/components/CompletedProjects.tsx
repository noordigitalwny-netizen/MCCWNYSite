"use client";

import React, { useState, useEffect } from "react";
import { supabase, type Project } from "@/lib/supabase";

const fallbackCompletedProjects: Project[] = [
  {
    id: "c1",
    title: "Main Prayer Hall Carpet & Acoustic Sound System",
    category: "Renovation",
    description:
      "Installed high-density antimicrobial plush prayer carpeting with woven saf lines, along with a state-of-the-art wireless microphone audio system.",
    status: "Completed",
    goal_amount: 55000,
    raised_amount: 55000,
    completed_date: "Spring 2026",
    impact_note: "Serves 500+ daily worshippers with crystal clear sermon sound quality.",
  },
  {
    id: "c2",
    title: "Community Food Pantry & Cold Storage Unit",
    category: "Social Welfare",
    description:
      "Purchased commercial walk-in refrigeration units to store fresh produce and halal meats for weekly food distribution to local families.",
    status: "Completed",
    goal_amount: 25000,
    raised_amount: 25000,
    completed_date: "Winter 2025",
    impact_note: "Distributes over 400+ fresh meal boxes to WNY families every month.",
  },
  {
    id: "c3",
    title: "Parking Lot Repaving & LED Security Floodlights",
    category: "Facility Upgrades",
    description:
      "Resurfaced the entire parking facility with eco-friendly asphalt, added marked spots, and installed high-efficiency dusk-to-dawn LED security lighting.",
    status: "Completed",
    goal_amount: 40000,
    raised_amount: 40000,
    completed_date: "Autumn 2025",
    impact_note: "Ensures safety and smooth traffic flow during Friday Jummah & Isha prayers.",
  },
];

export default function CompletedProjects() {
  const [completedProjects, setCompletedProjects] = useState<Project[]>(fallbackCompletedProjects);
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

        if (data && data.length > 0) {
          setCompletedProjects(data);
        }
      } catch (err) {
        console.warn("Using default completed projects fallback:", err);
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

      {loading && completedProjects.length === 0 ? (
        <div className="p-8 text-center text-xs text-slate-500 font-medium">
          Loading past completed projects...
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
