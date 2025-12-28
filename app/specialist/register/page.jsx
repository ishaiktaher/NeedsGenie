"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import ChipInput from "@/components/ChipInput";
import SearchableSelect from "@/components/SearchableSelect";
import CreatableMultiSelect from "@/components/CreatableMultiSelect";
import { INDIAN_STATES } from "@/lib/indianStates";
import { INDUSTRIES } from "@/lib/industries";
import { LANGUAGES } from "@/lib/languages";
import useScrollIntoView from "@/hooks/useScrollIntoView";

export default function SpecialistRegister() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const cityScroll = useScrollIntoView();

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    whatsapp: "",
    state: "",
    city: [],
    localities: [],
    industries: [],
    languages: [],
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
    if (!form.state.trim()) e.state = "State is required";
    if (!/^\d{10}$/.test(form.mobile))
      e.mobile = "Enter a valid 10-digit mobile number";
    if (!Array.isArray(form.city) || form.city.length === 0)
      e.city = "Please add at least one city";
    if (!Array.isArray(form.localities) || form.localities.length === 0)
      e.localities = "Please add at least one locality";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!Array.isArray(form.industries) || form.industries.length === 0)
      e.industries = "Please select at least one area of expertise";
    if (!Array.isArray(form.languages) || form.languages.length === 0)
      e.languages = "Please select at least one language";
    if (!form.payPerLead) e.payPerLead = "Please select an option";
    if (!form.bestTime.trim()) e.bestTime = "Best time is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ---------------- Submit ---------------- */

  const submit = async () => {
    if (!validateStep2()) return;

    try {
      setLoading(true);

      const normalizedForm = {
        ...form,
        industries: [...new Set(form.industries.map((i) => i.trim()))],
        languages: [...new Set(form.languages.map((l) => l.trim()))],
        city: [...new Set(form.city.map((c) => c.trim()))],
        localities: [...new Set(form.localities.map((a) => a.trim()))],
      };

      const res = await fetch("/api/register-specialist", {
        method: "POST",
        body: JSON.stringify(normalizedForm),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error();

      window.location.href = "/specialist/thank-you";
    } catch {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-center">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Join NeedsGenie as a Verified Specialist
        </h1>

        <p className="text-gray-600 mb-6">
          Get genuine, high-intent client requirements — without cold calling or public listings.
          <br />
          <span className="text-sm text-gray-500">
            Free to join · No obligation · Takes ~2 minutes
          </span>
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
              label="Your Full Name *"
              value={form.fullName}
              onChange={(v) => setField("fullName", v)}
              error={errors.fullName}
            />

            <Input
              label="Primary Contact Number *"
              value={form.mobile}
              numeric
              onChange={(v) =>
                setField("mobile", v.replace(/\D/g, "").slice(0, 10))
              }
              error={errors.mobile}
            />
            <p className="text-xs text-gray-500">
              Shared only after you choose to respond to a requirement.
            </p>

            <Input
              label="WhatsApp Number (optional)"
              value={form.whatsapp}
              numeric
              onChange={(v) =>
                setField("whatsapp", v.replace(/\D/g, "").slice(0, 10))
              }
            />

            <SearchableSelect
              label="Primary State You Operate In *"
              value={form.state}
              options={INDIAN_STATES}
              placeholder="Select state"
              onChange={(v) => {
                setField("state", v);
                setField("city", []);
                setField("localities", []);
              }}
              error={errors.state}
            />

            <ChipInput
              ref={cityScroll.ref}
              onFocus={cityScroll.onFocus}
              label="Cities You Serve *"
              value={form.city}
              onChange={(v) => setField("city", v)}
              placeholder="Type city and press comma"
              error={errors.city}
            />

            <ChipInput
              label="Preferred Localities / Areas *"
              value={form.localities}
              onChange={(v) => setField("localities", v)}
              placeholder="Type area and press comma"
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

            <CreatableMultiSelect
              label="Your Area(s) of Expertise *"
              value={form.industries}
              options={INDUSTRIES}
              placeholder="Select or type what you work on"
              onChange={(v) => setField("industries", v)}
              error={errors.industries}
            />

            <CreatableMultiSelect
              label="Languages You Can Communicate In *"
              value={form.languages}
              options={LANGUAGES}
              placeholder="Select or type languages"
              onChange={(v) => setField("languages", v)}
              error={errors.languages}
            />

            <Select
              label="If we send you 2–3 real requirements per week, would you actively follow up? *"
              value={form.payPerLead}
              options={[
                "Yes, immediately",
                "Depends on the requirement",
                "No, just exploring",
              ]}
              onChange={(v) => setField("payPerLead", v)}
              error={errors.payPerLead}
            />

            <Select
              label="Best Time to Receive Client Calls *"
              value={form.bestTime}
              options={["Morning", "Afternoon", "Evening", "Anytime"]}
              onChange={(v) => setField("bestTime", v)}
              error={errors.bestTime}
            />

            {/* TRUST BLOCK */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
              <p className="font-medium text-gray-800 mb-2">
                How NeedsGenie works
              </p>
              <ul className="space-y-1 list-disc list-inside">
                <li>You receive verified client requirements</li>
                <li>Your number is never publicly listed</li>
                <li>You choose which enquiries to respond to</li>
                <li>No spam · No cold leads</li>
              </ul>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button
                disabled={loading}
                className={`text-gray-500 ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:underline"
                }`}
                onClick={() => setStep(1)}
              >
                ← Back
              </button>

              <Button
                onClick={submit}
                disabled={loading}
                className="px-6 py-3 min-w-[240px] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    Submitting…
                  </>
                ) : (
                  "Register as a Verified Specialist"
                )}
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              We review every application and usually respond within 24–48 hours.
            </p>
          </div>
        )}
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
