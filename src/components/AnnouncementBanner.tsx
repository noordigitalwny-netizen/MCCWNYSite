"use client";

import React, { useState, useEffect } from "react";
import { supabase, type Announcement } from "@/lib/supabase";

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [announcement, setAnnouncement] = useState<Announcement>({
    message: "Welcome to MCC WNY – Muslim Community Center of Western New York",
    badge: "Announcement",
    action_url: "#prayer-times",
    action_text: "View Prayer Times",
    is_active: true,
  });

  useEffect(() => {
    async function fetchLiveAnnouncement() {
      try {
        const { data, error } = await supabase
          .from("announcements")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false })
          .limit(1);

        if (error) throw error;

        if (data && data.length > 0) {
          setAnnouncement(data[0]);
          setIsVisible(true);
        } else {
          // If no active announcement exists, hide banner
          setIsVisible(false);
        }
      } catch (err) {
        console.warn("Using fallback announcement:", err);
      }
    }

    fetchLiveAnnouncement();
  }, []);

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Announcement Banner"
      className="w-full bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-amber-100 text-xs sm:text-sm py-2 px-4 border-b border-amber-500/30 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          {announcement.badge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">
              {announcement.badge}
            </span>
          )}
          <span className="font-medium text-amber-50">{announcement.message}</span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {announcement.action_url && announcement.action_text && (
            <a
              href={announcement.action_url}
              className="inline-flex items-center text-xs font-semibold text-amber-300 hover:text-amber-200 underline underline-offset-2 transition-colors"
            >
              {announcement.action_text} &rarr;
            </a>
          )}

          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-md text-amber-300/70 hover:text-amber-200 hover:bg-emerald-800/50 transition-colors focus:outline-none focus:ring-1 focus:ring-amber-400"
            aria-label="Dismiss banner"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
