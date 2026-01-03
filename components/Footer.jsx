import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300">
      {/* Desktop visual anchor */}
      {/* <div className="hidden sm:block h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" /> */}

      <div className="max-w-7xl mx-auto px-6 pt-10 pb-3">

        {/* MOBILE */}
        <div className="flex flex-col items-center text-center gap-6 sm:hidden">
          <div className="text-base font-semibold text-gray-900">
            NeedsGenie
          </div>

          <nav className="flex gap-6 text-sm text-gray-600">
            <Link href="/how-it-works" className="hover:text-gray-900">
              How it works
            </Link>
            <Link href="/post-requirement" className="hover:text-gray-900">
              Post Requirement
            </Link>
            <Link href="/specialist/register" className="hover:text-gray-900">
              For Specialists
            </Link>
            <Link href="/privacy-policy" className="hover:text-gray-900">
              Privacy
            </Link>
          </nav>

          <div className="text-sm text-gray-500 leading-relaxed">
            <p className="font-medium text-gray-700">Questions?</p>
            <p>📧 needsgenieapp@gmail.com</p>
            <p>📱 WhatsApp 9052555510</p>
          </div>

          <div className="text-xs text-gray-400">
            © {new Date().getFullYear()} NeedsGenie
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden sm:grid grid-cols-3 gap-8 items-start">

          {/* Brand */}
          <div>
            <p className="text-sm font-semibold text-gray-900">
              NeedsGenie
            </p>
            <p className="text-xs text-gray-500 mt-2 max-w-xs">
              Verified requirements platform connecting customers with trusted specialists.
            </p>
          </div>

          {/* Links */}
          <nav className="flex justify-center gap-8 text-sm text-gray-600">
            <Link href="/how-it-works" className="hover:text-gray-900">
              How it works
            </Link>
            <Link href="/post-requirement" className="hover:text-gray-900">
              Post Requirement
            </Link>
            <Link href="/specialist/register" className="hover:text-gray-900">
              For Specialists
            </Link>
            <Link href="/privacy-policy" className="hover:text-gray-900">
              Privacy Policy
            </Link>
          </nav>

          {/* Contact */}
          <div className="text-sm text-gray-500 text-right leading-relaxed">
            <p className="font-medium text-gray-700">Questions?</p>
            <p>
              📧{" "}
              <a
                href="mailto:needsgenieapp@gmail.com"
                className="hover:underline"
              >
                needsgenieapp@gmail.com
              </a>
            </p>

            <p>
              📱{" "}
              <a
                href="https://wa.me/919052555510"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                WhatsApp 9052555510
              </a>
            </p>

          </div>
        </div>

        {/* Desktop copyright */}
        <div className="hidden sm:block mt-8 pt-6 border-t border-gray-300 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} NeedsGenie. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
