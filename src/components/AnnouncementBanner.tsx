"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface AnnouncementBannerProps {
  message?: string;
  badge?: string;
  actionUrl?: string;
  actionText?: string;
  dismissible?: boolean;
}

export default function AnnouncementBanner({
  message: initialMessage = "Welcome to MCC WNY – Muslim Community Center of Western New York",
  badge: initialBadge = "Announcement",
  actionUrl: initialActionUrl = "#prayer-times",
  actionText: initialActionText = "View Prayer Times",
  dismissible = true,
}: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [announcement, setAnnouncement] = useState({
    message: initialMessage,
    badge: initialBadge,
    actionUrl: initialActionUrl,
    actionText: initialActionText,
  });

  useEffect(() => {
    async function fetchLiveAnnouncement() {
      try {
        const { data, error } = await supabase
          .from("announcements")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(1);

        if (error) return;

        if (data && data.length > 0) {
          const live = data[0];
          if (live.is_active === false) {
            setIsVisible(false);
            return;
          }
          setAnnouncement({
            message: live.message || initialMessage,
            badge: live.badge || initialBadge,
            actionUrl: live.action_url || initialActionUrl,
            actionText: live.action_text || initialActionText,
          });
        }
      } catch (err) {
        console.warn("Using fallback announcement:", err);
      }
    }

    fetchLiveAnnouncement();
  }, [initialMessage, initialBadge, initialActionUrl, initialActionText]);

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
          {announcement.actionUrl && announcement.actionText && (
            <a
              href={announcement.actionUrl}
              className="inline-flex items-center text-xs font-semibold text-amber-300 hover:text-amber-200 underline underline-offset-2 transition-colors"
            >
              {announcement.actionText} &rarr;
            </a>
          )}

          {dismissible && (
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
          )}
        </div>
      </div>
    </div>
  );
}
