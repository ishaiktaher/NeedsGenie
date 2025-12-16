"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-10 bg-gradient-to-b from-white to-gray-50">

      <div className="max-w-lg w-full bg-white shadow-xl rounded-3xl p-10 text-center animate-fadeIn border border-gray-100">

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl font-bold">
            ✓
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Requirement Submitted!
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          Thank you for sharing your requirement.  
          Our verified specialists will review it and contact you shortly.
        </p>

        {/* Next Step Box */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-left mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            What happens next?
          </h2>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>• We verify your requirement.</li>
            <li>• Genuine specialists receive your request.</li>
            <li>• Only qualified experts will contact you.</li>
            <li>• Your phone number stays private & secure.</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">

          <Link
            href="/post-requirement"
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
          >
            Post Another Requirement
          </Link>

          <Link
            href="/wip"
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl text-lg font-medium hover:bg-gray-100 transition"
          >
            View My Requirements
          </Link>
        </div>

      </div>
    </main>
  );
}
