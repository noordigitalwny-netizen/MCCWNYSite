"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-amber-500/30">
      {/* Top Gold Decorative Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-900 border border-amber-400 flex items-center justify-center">
                <span className="text-amber-400 font-bold text-lg">☪</span>
              </div>
              <span className="font-bold text-xl text-amber-300">MCC WNY</span>
            </div>
            <p className="text-sm text-emerald-200/80 leading-relaxed">
              Muslim Community Center of WNY is dedicated to serving the spiritual, educational, and social needs of Muslims and the wider community in Western New York.
            </p>
            <div className="pt-2">
              <span className="text-xs text-amber-400 font-medium tracking-wide uppercase block">
                Serving Depew & WNY Community
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-amber-300 uppercase tracking-wider border-b border-amber-500/20 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#prayer-times" className="text-emerald-200 hover:text-amber-300 transition-colors">
                  Prayer & Iqamah Times
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-emerald-200 hover:text-amber-300 transition-colors">
                  Community Initiatives
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-emerald-200 hover:text-amber-300 transition-colors font-medium">
                  Active Projects
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-emerald-200 hover:text-amber-300 transition-colors font-medium">
                  Support & Donations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-amber-300 uppercase tracking-wider border-b border-amber-500/20 pb-2 inline-block">
              Contact & Location
            </h3>
            <ul className="space-y-3 text-sm text-emerald-200/90">
              <li className="flex items-start gap-2.5">
                <svg className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>94 Meridian St, Depew, NY 14043</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1.1 1.1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:716-327-5286" className="hover:text-amber-300 transition-colors">
                  716-327-5286
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:muslimcommunitycenterofwny@gmail.com" className="hover:text-amber-300 transition-colors break-all">
                  muslimcommunitycenterofwny@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Links (Completely Removed Newsletter Form) */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-amber-300 uppercase tracking-wider border-b border-amber-500/20 pb-2 inline-block">
              Connect With Us
            </h3>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Follow our official Facebook page and community channels for upcoming events, announcements, and prayer schedules.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              {/* Facebook Icon */}
              <a
                href="https://www.facebook.com/p/Muslim-Community-Center-of-WNY-61579871451329/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-emerald-900 border border-amber-400/40 text-amber-300 hover:text-amber-200 hover:border-amber-300 flex items-center justify-center transition-colors"
              >
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Divider & Copyright */}
        <div className="mt-12 pt-6 border-t border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/70 gap-3">
          <p>© {new Date().getFullYear()} Muslim Community Center of WNY. All rights reserved.</p>
          <div className="flex space-x-4">
            <span>94 Meridian St, Depew, NY 14043</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
