"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";

export default function SpecialistRegister() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    whatsapp: "",
    city: "",
    localities: "",
    industries: "",
    languages: "",
    payPerLead: "",
    bestTime: "",
  });

  const setField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/register-specialist", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        window.location.href = "/specialist/thank-you";
      } else {
        alert("Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      alert("Network error. Please try again.");
      setLoading(false);
    }
  };


  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Join as an Industry Specialist
        </h1>
        <p className="text-gray-600 mb-8">
          Get access to verified, high-intent customer requirements.
        </p>

        {/* PROGRESS */}
        <div className="flex items-center gap-2 mb-8">
          <div className={`h-2 flex-1 rounded ${step >= 1 ? "bg-blue-600" : "bg-gray-200"}`} />
          <div className={`h-2 flex-1 rounded ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`} />
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <Input label="Full Name" onChange={(v) => setField("fullName", v)} />
            <Input label="Mobile Number" onChange={(v) => setField("mobile", v)} />
            <Input label="WhatsApp Number (optional)" onChange={(v) => setField("whatsapp", v)} />
            <Input label="City" onChange={(v) => setField("city", v)} />
            <Input label="Localities / Areas you serve" onChange={(v) => setField("localities", v)} />

            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => setStep(2)}
                className="px-8 py-3 text-lg min-w-[200px]"
              >
                Continue
              </Button>
            </div>

          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <Input
              label="Industries you work in"
              placeholder="Real Estate, Loans, Cars..."
              onChange={(v) => setField("industries", v)}
            />
            <Input
              label="Languages you speak"
              placeholder="English, Hindi, Telugu..."
              onChange={(v) => setField("languages", v)}
            />

            <Select
              label="Are you willing to pay a small fee per verified lead?"
              options={["Yes", "No"]}
              onChange={(v) => setField("payPerLead", v)}
            />

            <Input
              label="Best time to contact you"
              placeholder="Morning / Afternoon / Evening"
              onChange={(v) => setField("bestTime", v)}
            />

            <div className="mt-6 flex justify-between">
              <button
                disabled={loading}
                className={`text-gray-500 ${loading ? "opacity-50 cursor-not-allowed" : "hover:underline"
                  }`}
                onClick={() => setStep(1)}
              >
                ← Back
              </button>

              <Button
                onClick={submit}
                disabled={loading}
                className={`px-6 py-3 min-w-[220px] flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Submit Registration"
                )}
              </Button>


            </div>
          </div>
        )}

        {/* TRUST FOOTER */}
        <p className="text-xs text-gray-400 mt-10 text-center">
          Your information is kept confidential and used only to connect you with relevant customer requirements.
        </p>
      </div>
    </main>
  );
}

/* ---------- Reusable UI Components ---------- */

function Input({ label, placeholder, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}

function Select({ label, options, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
