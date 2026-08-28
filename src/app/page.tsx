import React from "react";
import Link from "next/link";
import ActiveCampaigns from "@/components/ActiveCampaigns";
import CompletedProjects from "@/components/CompletedProjects";

export default function Home() {
  const newsArticles = [
    {
      id: "1",
      date: "August 28, 2026",
      category: "Jumu'ah",
      title: "Friday Jumu'ah Prayer Schedule & Khateeb Announcement",
      summary:
        "Join us for Friday Jummah prayers. 1st Shift Khutbah starts at 1:15 PM, 2nd Shift Khutbah starts at 2:15 PM. Please arrive early for parking.",
    },
    {
      id: "2",
      date: "August 25, 2026",
      category: "Education",
      title: "MCC WNY Sunday Islamic School Fall Registration",
      summary:
        "Registration for the 2026–2027 Sunday Islamic School is now open for students ages 5 to 16. Classes cover Quran recitation, Islamic studies, and Arabic.",
    },
    {
      id: "3",
      date: "August 18, 2026",
      category: "Community Event",
      title: "Monthly Community Dinner & Family Night",
      summary:
        "All community members and families are invited to our monthly gathering after Maghrib prayer. Food will be served followed by a short reminder.",
    },
    {
      id: "4",
      date: "August 10, 2026",
      category: "Volunteer",
      title: "Youth Committee & Mosque Volunteer Opportunities",
      summary:
        "We are looking for dedicated youth volunteers to assist with event coordination, facility maintenance, and weekend school activities.",
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. LiveMosque Widget (Top of page content, directly under navbar) */}
      <section className="w-full bg-[#022c22] border-b border-amber-500/20 py-4 sm:py-6 px-3 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-emerald-950/90 rounded-2xl overflow-hidden shadow-2xl border border-amber-500/30">
            {/* Header bar for LiveMosque widget */}
            <div className="bg-gradient-to-r from-emerald-900 via-[#047857] to-emerald-900 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-amber-500/20">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
                </span>
                <h2 className="text-sm font-bold text-amber-200 uppercase tracking-wide">
                  Live Mosque Prayer Times & Broadcast
                </h2>
              </div>
              <span className="text-xs text-emerald-100/90 bg-emerald-900/80 px-2.5 py-1 rounded-md border border-amber-400/20">
                MCC WNY Official Feed
              </span>
            </div>

            {/* Responsive Container for LiveMosque Iframe */}
            <div className="relative w-full overflow-hidden bg-emerald-950 min-h-[380px] sm:min-h-[480px]">
              <iframe
                src="https://www.livemosque.live/mosque.html?mosque=MUSLIM+COMMUNITY+CENTER+OF+WNY+"
                title="MCC WNY Live Mosque Widget"
                className="w-full h-full min-h-[380px] sm:min-h-[480px] border-0"
                loading="lazy"
                allow="autoplay; fullscreen"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Welcoming Hero Section */}
      <section className="relative bg-gradient-to-b from-[#047857] via-emerald-800 to-emerald-950 text-white overflow-hidden py-16 sm:py-24 border-b border-amber-500/20">
        {/* Subtle Arch Pattern Background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <span className="text-base">﷽</span> In the name of Allah, Most Gracious, Most Merciful
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Welcome to <span className="text-amber-300">MCC WNY</span>
          </h1>

          <p className="text-base sm:text-xl text-emerald-100/90 max-w-2xl mx-auto font-light leading-relaxed">
            Muslim Community Center of Western New York — dedicated to fostering faith, community service, Islamic education, and spiritual growth in Buffalo and WNY.
          </p>

          {/* Prominent Gold Call-To-Action Button linking to /donate */}
          <div className="pt-4 flex justify-center">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-lg font-extrabold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-emerald-950 shadow-xl shadow-amber-500/25 hover:scale-105 hover:shadow-amber-400/40 active:scale-95 transition-all duration-200 border border-amber-200"
            >
              <svg className="w-5 h-5 mr-2 text-emerald-950" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              Donate & Support MCC WNY
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Two-Column Grid: Recent News (Left) & Facebook Feed (Right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Recent News (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
              <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-[#047857] rounded-full inline-block"></span>
                Recent News & Announcements
              </h2>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-md">
                Latest Updates
              </span>
            </div>

            <div className="space-y-4">
              {newsArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center gap-3 text-xs font-semibold text-emerald-800 mb-2">
                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-300/60">
                      {article.category}
                    </span>
                    <span className="text-slate-400">•</span>
                    <time className="text-slate-500">{article.date}</time>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#047857] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {article.summary}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Right Column: Facebook Feed Embed (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
              <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-amber-500 rounded-full inline-block"></span>
                Community Facebook Feed
              </h2>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden p-4 space-y-4">
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    f
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Muslim Community Center of WNY</h4>
                    <p className="text-[11px] text-slate-500">Official Facebook Updates</p>
                  </div>
                </div>
                <a
                  href="https://www.facebook.com/p/Muslim-Community-Center-of-WNY-61579871451329/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Visit Page &rarr;
                </a>
              </div>

              {/* Responsive Container for Facebook Feed Iframe */}
              <div className="w-full flex justify-center bg-slate-50 rounded-lg overflow-hidden border border-slate-200 min-h-[500px]">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fp%2FMuslim-Community-Center-of-WNY-61579871451329%2F&tabs=timeline&width=380&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
                  width="100%"
                  height="500"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="MCC WNY Facebook Page Feed"
                  className="w-full max-w-[380px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Community Projects Section (Active Campaigns + Completed Projects Gallery) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pt-4">
        {/* Active Campaigns Preview */}
        <ActiveCampaigns limit={3} />

        {/* Completed Projects Preview */}
        <CompletedProjects />
      </section>
    </div>
  );
}
