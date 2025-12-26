import Link from "next/link";

export default function Header() {
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

        {/* NAV LINKS */}
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

        {/* MOBILE CTA */}
        <div className="md:hidden">
          <Link
            href="/post-requirement"
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition whitespace-nowrap"
          >
            Post Requirement
          </Link>
        </div>
      </div>
    </header>
  );
}
