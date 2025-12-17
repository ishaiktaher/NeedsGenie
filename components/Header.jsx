import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-blue-600">
          NeedsGenie<span className="text-yellow-400"> ✨</span>
        </Link>

        {/* SIDE DOOR */}
        <Link
          href="/specialist/register"
          className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
        >
          For Specialists
        </Link>

      </div>
    </header>
  );
}
