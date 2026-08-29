"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase, type Project } from "@/lib/supabase";

const fallbackActiveCampaigns: Project[] = [
  {
    id: "1",
    title: "Masjid Expansion & Sister's Community Lounge",
    category: "Expansion",
    description:
      "Expanding our main prayer hall capacity by 300+ worshippers and constructing a modern, multi-purpose sister's lounge & youth center.",
    status: "Active",
    goal_amount: 150000,
    raised_amount: 98500,
  },
  {
    id: "2",
    title: "Solar Energy & Eco-Masjid Green Initiative",
    category: "Sustainability",
    description:
      "Installing rooftop solar panel arrays to cut annual utility costs and transition MCC WNY to clean, renewable energy.",
    status: "Active",
    goal_amount: 45000,
    raised_amount: 32000,
  },
  {
    id: "3",
    title: "Youth Center & Gymnasium Upgrade",
    category: "Youth & Sports",
    description:
      "Upgrading indoor sports equipment, carpeting, audio-visual systems, and study spaces for our weekend Islamic school students.",
    status: "Active",
    goal_amount: 30000,
    raised_amount: 12400,
  },
];

export default function ActiveCampaigns({ limit }: { limit?: number }) {
  const [campaigns, setCampaigns] = useState<Project[]>(fallbackActiveCampaigns);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActiveProjects() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("status", "Active")
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setCampaigns(data);
        }
      } catch (err) {
        console.warn("Using default active campaigns fallback:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchActiveProjects();
  }, []);

  const displayCampaigns = limit ? campaigns.slice(0, limit) : campaigns;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-900/10 pb-3">
        <div>
          <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-[#047857] rounded-full inline-block"></span>
            Active Projects & Campaigns
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Invest in the future of our community. Every dollar makes a lasting impact (Sadaqah Jariyah).
          </p>
        </div>
        {limit && (
          <Link
            href="/projects"
            className="inline-flex items-center text-xs font-bold text-[#047857] hover:text-emerald-700 underline underline-offset-2 shrink-0"
          >
            View All Projects &rarr;
          </Link>
        )}
      </div>

      {loading && campaigns.length === 0 ? (
        <div className="p-8 text-center text-xs text-slate-500 font-medium">
          Loading live active campaigns...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCampaigns.map((campaign) => {
            const goal = Number(campaign.goal_amount || 0);
            const raised = Number(campaign.raised_amount || 0);
            const percent = goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;

            return (
              <div
                key={campaign.id || campaign.title}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Header & Category Badge */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100/80 text-emerald-900 border border-emerald-300/40 uppercase tracking-wider">
                      {campaign.category || "Community"}
                    </span>
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {percent}% Funded
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#047857] transition-colors leading-snug">
                    {campaign.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {campaign.description}
                  </p>
                </div>

                {/* Progress Bar & Donation CTA Footer */}
                <div className="p-6 pt-0 space-y-4">
                  {/* Visual Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                      <div
                        className="h-full bg-gradient-to-r from-[#047857] via-emerald-500 to-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs font-medium text-slate-600 pt-1">
                      <span>
                        Raised: <strong className="text-emerald-950 font-bold">${raised.toLocaleString()}</strong>
                      </span>
                      <span>
                        Goal: <strong className="text-slate-800 font-bold">${goal.toLocaleString()}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Donate to this project button */}
                  <Link
                    href={`/donate?project=${encodeURIComponent(campaign.title)}`}
                    className="block w-full text-center px-4 py-2.5 rounded-xl text-xs font-extrabold bg-[#047857] text-white hover:bg-emerald-800 hover:shadow-md active:scale-95 transition-all border border-amber-400/30"
                  >
                    Donate to this project
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
