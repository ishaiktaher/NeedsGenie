"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold tracking-tight text-blue-600 whitespace-nowrap"
        >
          NeedsGenie<span className="text-yellow-400"> ✨</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/how-it-works"
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
          >
            How it works
          </Link>

          <Link
            href="/post-requirement"
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
          >
            Post Requirement
          </Link>

          <Link
            href="/specialist/register"
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
          >
            For Specialists
          </Link>
        </nav>

        {/* MOBILE ACTIONS */}
        <div className="md:hidden flex items-center gap-3">
          {/* Primary CTA */}
          <Link
            href="/how-it-works"
            className="text-sm font-medium
              text-gray-600
              hover:text-blue-600
              transition
              whitespace-nowrap"
          >
            How it Works
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="px-4 py-4 flex flex-col gap-4">
            <Link
              href="/how-it-works"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              How it works
            </Link>

            <Link
              href="/post-requirement"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Post Requirement
            </Link>

            <Link
              href="/specialist/register"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              For Specialists
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
