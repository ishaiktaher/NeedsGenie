import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f2f2f5] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* MOBILE FOOTER */}
        <div className="flex flex-col items-center text-center gap-4 sm:hidden">
          <div className="text-sm font-semibold text-gray-900">
            NeedsGenie
          </div>

          <nav className="flex gap-4 text-sm text-gray-600">
            <Link href="/how-it-works" className="hover:text-gray-900">
              How it works
            </Link>
            <Link href="/post-requirement" className="hover:text-gray-900">
              Post Requirement
            </Link>
            <Link href="/specialist/register" className="hover:text-gray-900">
              For Specialists
            </Link>
          </nav>

          <div className="text-xs text-gray-400">
            © {new Date().getFullYear()} NeedsGenie
          </div>
        </div>

        {/* DESKTOP FOOTER */}
        <div className="hidden sm:flex sm:items-center">
          {/* Left */}
          <div className="flex-1 text-sm font-semibold text-gray-900">
            NeedsGenie
          </div>

          {/* Center */}
          <div className="flex-1 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} NeedsGenie. All rights reserved.
          </div>

          {/* Right */}
          <nav className="flex-1 flex justify-end gap-6 text-sm text-gray-600">
            <Link href="/how-it-works" className="hover:text-gray-900">
              How it works
            </Link>
            <Link href="/post-requirement" className="hover:text-gray-900">
              Post Requirement
            </Link>
            <Link href="/specialist/register" className="hover:text-gray-900">
              For Specialists
            </Link>
          </nav>
        </div>

      </div>
    </footer>
  );
}
