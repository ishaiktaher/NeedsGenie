"use client";

import Link from "next/link";

export default function WIPPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center border border-gray-100">

        <div className="text-5xl mb-4">🚧</div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Feature Under Development
        </h1>

        <p className="text-gray-600 mb-6">
          We're working hard to bring this feature to you soon.
          You’ll be able to view and track all your requirements here.
        </p>

        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>

        <p className="text-xs text-gray-400 mt-6">
          Thank you for your patience 🙏
        </p>
      </div>
    </div>
  );
}
