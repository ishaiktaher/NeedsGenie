"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";

export default function SpecialistRegister() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

  /* ---------------- Helpers ---------------- */

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const validateStep1 = () => {
    const e = {};

    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!/^\d{10}$/.test(form.mobile))
      e.mobile = "Enter a valid 10-digit mobile number";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.localities.trim())
      e.localities = "Localities are required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};

    if (!form.industries.trim())
      e.industries = "Please specify industries";
    if (!form.languages.trim())
      e.languages = "Please specify languages";
    if (!form.payPerLead)
      e.payPerLead = "Please select an option";
    if (!form.bestTime.trim())
      e.bestTime = "Best time is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ---------------- Submit ---------------- */

  const submit = async () => {
    if (!validateStep2()) return;

    try {
      setLoading(true);

      const res = await fetch("/api/register-specialist", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error();

      window.location.href = "/specialist/thank-you";
    } catch (err) {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

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
            <Input
              label="Full Name *"
              value={form.fullName}
              onChange={(v) => setField("fullName", v)}
              error={errors.fullName}
            />

            <Input
              label="Mobile Number *"
              value={form.mobile}
              numeric
              onChange={(v) =>
                setField("mobile", v.replace(/\D/g, "").slice(0, 10))
              }
              error={errors.mobile}
            />

            <Input
              label="WhatsApp Number (optional)"
              value={form.whatsapp}
              numeric
              onChange={(v) =>
                setField("whatsapp", v.replace(/\D/g, "").slice(0, 10))
              }
            />

            <Input
              label="City *"
              value={form.city}
              onChange={(v) => setField("city", v)}
              error={errors.city}
            />

            <Input
              label="Localities / Areas you serve *"
              value={form.localities}
              onChange={(v) => setField("localities", v)}
              error={errors.localities}
            />

            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => validateStep1() && setStep(2)}
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
              label="Industries you work in *"
              placeholder="Real Estate, Loans, Cars..."
              value={form.industries}
              onChange={(v) => setField("industries", v)}
              error={errors.industries}
            />

            <Input
              label="Languages you speak *"
              placeholder="English, Hindi, Telugu..."
              value={form.languages}
              onChange={(v) => setField("languages", v)}
              error={errors.languages}
            />

            <Select
              label="Are you willing to pay a small fee per verified lead? *"
              value={form.payPerLead}
              options={["Yes", "No"]}
              onChange={(v) => setField("payPerLead", v)}
              error={errors.payPerLead}
            />

            <Input
              label="Best time to contact you *"
              placeholder="Morning / Afternoon / Evening"
              value={form.bestTime}
              onChange={(v) => setField("bestTime", v)}
              error={errors.bestTime}
            />

            <div className="mt-6 flex justify-between">
              <button
                disabled={loading}
                className={`text-gray-500 ${loading ? "opacity-50 cursor-not-allowed" : "hover:underline"}`}
                onClick={() => setStep(1)}
              >
                ← Back
              </button>

              <Button
                onClick={submit}
                disabled={loading}
                className="px-6 py-3 min-w-[220px] flex items-center justify-center gap-2"
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

/* ---------------- UI Components ---------------- */

function Input({ label, placeholder, value, onChange, error, numeric }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        value={value}
        placeholder={placeholder}
        inputMode={numeric ? "numeric" : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

function Select({ label, options, value, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
