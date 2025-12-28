"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function SpecialistThankYou() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-gray-100 p-10 text-center animate-fadeIn">

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-4xl font-bold">
            ✓
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Registration Received
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Thank you for registering as an <strong>Industry Specialist</strong> on NeedsGenie.
        </p>

        {/* NEXT STEPS */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-left mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            What happens next?
          </h2>

          <ul className="space-y-3 text-gray-600 text-sm">
            <li>• Our team will review and verify your details.</li>
            <li>• Once approved, you’ll start receiving relevant customer requirements.</li>
            <li>• You only get leads that match your industry and location.</li>
            <li>• No spam. No fake enquiries.</li>
          </ul>
        </div>

        {/* TRUST MESSAGE */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
          <p className="text-sm text-blue-700 leading-relaxed">
            NeedsGenie focuses on <strong>quality over quantity</strong>.  
            We connect you only with <strong>genuine users</strong> who are actively looking for services you provide.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
          >
            Go to Home
          </Link>

          <p className="text-sm text-gray-500">
            We’ll contact you once your profile is verified.
          </p>

          <p className="text-sm text-gray-500">
            Our team will review your details.
            If you need anything in the meantime:
            📧 needsgenieapp@gmail.com
            📱 WhatsApp: 9052555510

          </p>
        </div>

      </div>
    </main>
  );
}
