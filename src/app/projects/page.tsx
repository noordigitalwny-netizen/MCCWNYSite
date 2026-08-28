import React from "react";
import ActiveCampaigns from "@/components/ActiveCampaigns";
import CompletedProjects from "@/components/CompletedProjects";

export default function ProjectsPage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Projects Header Section */}
      <section className="bg-gradient-to-b from-[#047857] via-emerald-800 to-emerald-950 text-white py-12 sm:py-16 px-4 border-b border-amber-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
            Community Building & Growth
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            MCC WNY <span className="text-amber-300">Community Projects</span>
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto leading-relaxed font-light">
            Explore ongoing fundraising campaigns and celebrate completed developments that strengthen our mosque and serve families across Western New York.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Active Campaigns Component */}
        <ActiveCampaigns />

        {/* Completed Projects Gratitude Gallery Component */}
        <CompletedProjects />
      </div>
    </div>
  );
}
