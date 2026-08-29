"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Islamic School", href: "/islamic-school" },
    { name: "Community", href: "/community" },
    { name: "Projects", href: "/projects" },
    { name: "Admin", href: "/admin" },
    { name: "Prayer Times", href: "/#prayer-times" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#047857] shadow-lg border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-md p-1">
            {/* Mosque Crescent / Dome Logo SVG */}
            <div className="w-11 h-11 rounded-full bg-emerald-900 border-2 border-amber-400/80 flex items-center justify-center shadow-md group-hover:border-amber-300 transition-colors">
              <svg
                className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Crescent & Mosque Arch icon */}
                <path d="M12 2a5 5 0 0 0-5 5c0 2.2 1.4 4.1 3.4 4.7A7 7 0 0 1 12 2z" fill="currentColor" opacity="0.3" />
                <path d="M4 21v-4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4" />
                <path d="M12 7v6" />
                <path d="M9 10h6" />
                <circle cx="12" cy="4" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl text-amber-300 tracking-wide group-hover:text-amber-200 transition-colors">
                MCC WNY
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-emerald-100/80 tracking-wider uppercase">
                Muslim Community Center
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-emerald-50 hover:text-amber-300 hover:bg-emerald-800/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/donate"
              className="ml-3 px-4 py-2 rounded-lg text-sm font-semibold bg-amber-400 text-emerald-950 hover:bg-amber-300 hover:shadow-md hover:shadow-amber-400/20 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-emerald-900"
            >
              Donate
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-amber-300 hover:text-amber-200 hover:bg-emerald-800/80 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-emerald-900 border-t border-amber-500/20" id="mobile-menu">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-md text-base font-medium text-emerald-50 hover:text-amber-300 hover:bg-emerald-800/80 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/donate"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-4 py-3 rounded-lg text-base font-bold bg-amber-400 text-emerald-950 hover:bg-amber-300 transition-colors shadow-sm"
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
