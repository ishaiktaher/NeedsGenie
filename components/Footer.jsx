import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f2f2f5] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6">

        <div className="flex flex-col sm:flex-row sm:items-center">

          {/* LEFT */}
          <div className="sm:flex-1 text-sm font-semibold text-gray-900">
            NeedsGenie
          </div>

          {/* CENTER */}
          <div className="sm:flex-1 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} NeedsGenie. All rights reserved.
          </div>

          {/* RIGHT */}
          <nav className="sm:flex-1 flex sm:justify-end gap-4 text-sm text-gray-600">
            <Link
              href="/how-it-works"
              className="hover:text-gray-900 transition"
            >
              How it works
            </Link>

            <Link
              href="/post-requirement"
              className="hover:text-gray-900 transition"
            >
              Post Requirement
            </Link>

            <Link
              href="/specialist/register"
              className="hover:text-gray-900 transition"
            >
              For Specialists
            </Link>
          </nav>

        </div>

      </div>
    </footer>
  );
}
