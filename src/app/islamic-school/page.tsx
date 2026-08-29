import React from "react";
import Link from "next/link";

export default function IslamicSchoolPage() {
  const feeStructure = [
    { label: "One Student", price: "$60.00", badge: "Per Month" },
    { label: "Two Students", price: "$100.00", badge: "Family Discount" },
    { label: "Three Students", price: "$150.00", badge: "Family Discount" },
  ];

  const curriculumHighlights = [
    {
      title: "Core Fundamentals",
      desc: "Comprehensive lessons on Islamic pillars, faith essentials, and noble character (Akhlaq).",
      icon: "📖",
    },
    {
      title: "Hadith Studies",
      desc: "Age-appropriate study of authentic prophetic traditions and practical moral guidance.",
      icon: "✨",
    },
    {
      title: "Healthy Competition & Quizzes",
      desc: "Interactive educational quizzes, trivia games, and recognition rewards for active learning.",
      icon: "🏆",
    },
    {
      title: "Engaging Activities",
      desc: "Hands-on projects, group discussions, and fun activities designed to build lasting brotherhood & sisterhood.",
      icon: "🎨",
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. Header Section */}
      <section className="bg-gradient-to-b from-[#047857] via-emerald-800 to-emerald-950 text-white py-12 sm:py-16 px-4 border-b border-amber-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
            MCC WNY Youth & Education
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Weekend Islamic Education Program: <br className="hidden sm:inline" />
            <span className="text-amber-300">Nurturing Faith, Knowledge, and Community</span>
          </h1>

          <p className="text-sm sm:text-lg text-emerald-100/90 max-w-3xl mx-auto leading-relaxed font-light pt-2">
            Join us every weekend for an engaging and supportive learning environment designed to help our students grow in their deen while having fun!
          </p>

          <div className="pt-4 flex justify-center">
            <a
              href="#registration-form"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-extrabold bg-amber-400 text-emerald-950 hover:bg-amber-300 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg border border-amber-300"
            >
              Register Online Below ↓
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* 2. Schedule & Details Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#047857] flex items-center justify-center text-2xl font-bold">
              📅
            </div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">
              Days & Class Time
            </h3>
            <p className="text-sm text-slate-700 font-semibold">
              Every Saturday & Sunday
            </p>
            <p className="text-xs text-slate-500">
              12:30 PM – 3:00 PM
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl font-bold">
              🚀
            </div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">
              Program Start Date
            </h3>
            <p className="text-sm text-slate-700 font-semibold">
              Saturday, October 4, 2025
            </p>
            <p className="text-xs text-slate-500">
              Classes run throughout the academic year.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#047857] flex items-center justify-center text-2xl font-bold">
              📍
            </div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">
              Location & Drop-Off
            </h3>
            <p className="text-sm text-slate-700 font-semibold">
              94 Meridian St, Depew, NY 14043
            </p>
            <p className="text-xs text-slate-500">
              Student drop-off and pick-up is at the main lobby.
            </p>
          </div>
        </section>

        {/* 3. Curriculum & Environment Section */}
        <section className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-xl space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider">
              Academic & Spiritual Development
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-200">
              Curriculum & Learning Environment
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-light">
              Our structured curriculum provides a well-rounded Islamic education while ensuring every student feels valued, encouraged, and inspired.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {curriculumHighlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-emerald-900/60 p-5 rounded-2xl border border-emerald-700/60 space-y-3"
              >
                <span className="text-3xl block">{item.icon}</span>
                <h4 className="text-base font-bold text-amber-300">{item.title}</h4>
                <p className="text-xs text-emerald-100/80 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Dedicated Sisters' Environment Highlight */}
          <div className="bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 p-6 rounded-2xl border border-amber-400/40 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center text-2xl font-extrabold shrink-0">
              🧕
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-amber-300 uppercase tracking-wider">
                Comfortable & Private Environment
              </h4>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Featuring a separate sisters&apos; section and dedicated female instruction for female students, ensuring maximum comfort, privacy, and tailored guidance.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Fees & Materials Section */}
        <section className="space-y-6">
          <div className="border-b border-emerald-900/10 pb-3">
            <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
              <span className="w-2.5 h-6 bg-amber-500 rounded-full inline-block"></span>
              Fees & Study Materials
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Affordable monthly tuition fees designed to keep Islamic education accessible for all families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {feeStructure.map((fee, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-sm hover:border-[#047857] transition-all text-center space-y-3 relative overflow-hidden"
              >
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 uppercase tracking-wider">
                  {fee.badge}
                </span>
                <h3 className="text-lg font-bold text-slate-800">{fee.label}</h3>
                <div className="text-3xl font-extrabold text-[#047857]">{fee.price}</div>
                <p className="text-xs text-slate-500">Due by the 3rd of each month</p>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 text-xs text-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <div>
                <strong className="font-bold text-emerald-950">Textbooks & Learning Books:</strong> Books can be purchased directly from the Mosque Library upon enrollment.
              </div>
            </div>
            <Link
              href="/donate"
              className="inline-flex items-center px-4 py-2 text-xs font-bold bg-[#047857] text-white hover:bg-emerald-800 rounded-xl transition-colors shrink-0"
            >
              Financial Assistance Available
            </Link>
          </div>
        </section>

        {/* 5. Google Registration Form Embed */}
        <section id="registration-form" className="space-y-6 pt-4">
          <div className="border-b border-emerald-900/10 pb-3">
            <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#047857] rounded-full inline-block"></span>
              Online Student Registration Form
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Please complete the official Google registration form below to enroll your child for the upcoming term.
            </p>
          </div>

          <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden p-2 sm:p-4">
            <div className="relative w-full overflow-hidden min-h-[800px] rounded-2xl bg-slate-50">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSeMNAK4Ov8U3UxJAbhqCDDUbKYJD48_e6aQcOZIih9rxa_oCQ/viewform"
                width="100%"
                height="800"
                title="MCC WNY Weekend Islamic School Registration Form"
                className="w-full h-full min-h-[800px] border-0"
                loading="lazy"
              >
                Loading registration form...
              </iframe>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
