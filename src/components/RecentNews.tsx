"use client";

import React, { useState, useEffect } from "react";
import { supabase, type NewsItem } from "@/lib/supabase";

export default function RecentNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLiveNews() {
      try {
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .eq("is_active", true)
          .order("date", { ascending: false });

        if (error) throw error;
        if (data) {
          setNews(data);
        }
      } catch (err) {
        console.warn("Could not fetch news from Supabase:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLiveNews();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
        <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
          <span className="w-2.5 h-6 bg-[#047857] rounded-full inline-block"></span>
          Recent News & Announcements
        </h2>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-md">
          Latest Updates
        </span>
      </div>

      {loading ? (
        <div className="p-8 text-center text-xs text-slate-500 font-medium bg-white rounded-xl border border-slate-200">
          Loading latest news & announcements...
        </div>
      ) : news.length === 0 ? (
        <div className="p-10 text-center bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
          <span className="text-3xl">📰</span>
          <h3 className="text-sm font-bold text-slate-800">Check back soon for recent news & announcements!</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            We regularly post Friday Khutbah topics, community event updates, and educational announcements.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {news.map((item) => (
            <article
              key={item.id || item.title}
              className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow group space-y-2"
            >
              <div className="flex items-center justify-between gap-3 text-xs font-semibold text-emerald-800">
                <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded border border-amber-300/60 font-bold">
                  Announcement
                </span>
                <time className="text-slate-500 font-medium">{item.date}</time>
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#047857] transition-colors leading-snug">
                {item.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {item.content}
              </p>

              {item.image_url && (
                <div className="pt-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="max-h-60 w-full object-cover rounded-lg border border-slate-200"
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
