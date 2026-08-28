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
              Muslim Community Center of Western New York is dedicated to serving the spiritual, educational, and social needs of Muslims and the wider community in Western New York.
            </p>
            <div className="pt-2">
              <span className="text-xs text-amber-400 font-medium tracking-wide uppercase block">
                Serving Buffalo & WNY Community
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
                <Link href="#prayer-times" className="text-emerald-200 hover:text-amber-300 transition-colors">
                  Prayer & Iqamah Times
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-emerald-200 hover:text-amber-300 transition-colors">
                  Community Services
                </Link>
              </li>
              <li>
                <Link href="#events" className="text-emerald-200 hover:text-amber-300 transition-colors font-medium">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="#school" className="text-emerald-200 hover:text-amber-300 transition-colors">
                  Weekend Islamic School
                </Link>
              </li>
              <li>
                <Link href="#donate" className="text-emerald-200 hover:text-amber-300 transition-colors font-medium">
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
                <span>520 French Road, Depew / Williamsville, NY 14043</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1.1 1.1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>(716) 555-0199</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@mccwny.org</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Community Newsletter & Social Links */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-amber-300 uppercase tracking-wider border-b border-amber-500/20 pb-2 inline-block">
              Connect With Us
            </h3>
            <p className="text-xs text-emerald-200/80">
              Stay informed about Friday khutbahs, community events, and prayer schedule updates.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 text-xs rounded-l-md bg-emerald-900 border border-emerald-700 text-white placeholder-emerald-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  className="px-3 py-2 text-xs font-semibold bg-amber-400 text-emerald-950 rounded-r-md hover:bg-amber-300 transition-colors"
                >
                  Join
                </button>
              </div>
            </form>

            <div className="flex items-center space-x-3 pt-2">
              {/* Facebook Icon */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-emerald-900 border border-amber-400/40 text-amber-300 hover:text-amber-200 hover:border-amber-300 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              {/* YouTube Icon */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-emerald-900 border border-amber-400/40 text-amber-300 hover:text-amber-200 hover:border-amber-300 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              {/* Instagram Icon */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-emerald-900 border border-amber-400/40 text-amber-300 hover:text-amber-200 hover:border-amber-300 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Divider & Copyright */}
        <div className="mt-12 pt-6 border-t border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/70 gap-3">
          <p>© {new Date().getFullYear()} Muslim Community Center of WNY. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="#privacy" className="hover:text-amber-300 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="#terms" className="hover:text-amber-300 transition-colors font-sans">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
