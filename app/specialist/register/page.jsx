"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import AutocompleteInput from "@/components/AutocompleteInput";
import {
  searchCities,
  searchLocalities,
} from "@/lib/locationSearch";
import ChipInput from "@/components/ChipInput";

import { INDIAN_STATES } from "@/lib/indianStates";
import SearchableSelect from "@/components/SearchableSelect";
import CreatableMultiSelect from "@/components/CreatableMultiSelect";
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
    if (!Array.isArray(form.city) || form.city.length === 0) {
      e.city = "Please add at least one city";
    }
    if (!Array.isArray(form.localities) || form.localities.length === 0) {
      e.localities = "Please add at least one locality";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!Array.isArray(form.industries) || form.industries.length === 0) {
      e.industries = "Please select at least one industry";
    }
    if (!Array.isArray(form.languages) || form.languages.length === 0) {
      e.languages = "Please select at least one language";
    }
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

      const normalizedForm = {
        ...form,
        industries: [
          ...new Set(
            form.industries.map((i) =>
              i.trim().replace(/\s+/g, " ")
            )
          ),
        ],
        languages: [
          ...new Set(
            form.languages.map((l) =>
              l.trim().replace(/\s+/g, " ")
            )
          ),
        ],
        city: [
          ...new Set(
            form.city.map((c) =>
              c.trim().replace(/\s+/g, " ")
            )
          ),
        ],
        localities: [
          ...new Set(
            form.localities.map((a) =>
              a.trim().replace(/\s+/g, " ")
            )
          ),
        ],
      };

      const res = await fetch("/api/register-specialist", {
        method: "POST",
        body: JSON.stringify(normalizedForm),
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
    // <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-10">
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:pb-0 sm:flex sm:items-center sm:justify-center">

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
              tabIndex={1}
              label="Full Name *"
              value={form.fullName}
              onChange={(v) => setField("fullName", v)}
              error={errors.fullName}
            />

            <Input
              tabIndex={2}
              label="Mobile Number *"
              value={form.mobile}
              numeric
              onChange={(v) =>
                setField("mobile", v.replace(/\D/g, "").slice(0, 10))
              }
              error={errors.mobile}
            />

            <Input
              tabIndex={3}
              label="WhatsApp Number (optional)"
              value={form.whatsapp}
              numeric
              onChange={(v) =>
                setField("whatsapp", v.replace(/\D/g, "").slice(0, 10))
              }
            />

            <SearchableSelect
              tabIndex={4}
              label="State *"
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

            {/* <AutocompleteInput
              label="City *"
              value={form.city}
              disabled={!form.state}
              fetchOptions={(q) => searchCities(q, form.state)}
              onChange={(v) => {
                setField("city", v);
                setSelectedCity(null);
                setField("localities", "");
              }}
              onSelect={(city) => {
                setField("city", city.label);
                setSelectedCity(city);
                setField("localities", "");
              }}
              error={errors.city}
            /> */}

            <ChipInput
              tabIndex={5}
              ref={cityScroll.ref}
              onFocus={cityScroll.onFocus}
              label="Cities you serve *"
              value={form.city}
              onChange={(v) => setField("city", v)}
              placeholder="Type city and press comma"
              error={errors.city}
            />

            {/* <AutocompleteInput
              label="Localities / Areas you serve *"
              value={form.localities}
              disabled={!selectedCity}
              fetchOptions={(q) => searchLocalities(q, selectedCity)}
              onChange={(v) => setField("localities", v)}
              error={errors.localities}
            /> */}
            <ChipInput
              tabIndex={6}
              label="Localities / Areas you serve *"
              value={form.localities}
              onChange={(v) => setField("localities", v)}
              placeholder="Type area and press comma or click outside"
              error={errors.localities}
            />

            <div className="mt-8 flex justify-center">
              <Button
                tabIndex={7}
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
              label="Industries you work in *"
              value={form.industries}
              options={INDUSTRIES}
              placeholder="Type or select industry"
              onChange={(v) => setField("industries", v)}
              error={errors.industries}
            />


            <CreatableMultiSelect
              label="Languages you speak *"
              value={form.languages}
              options={LANGUAGES}
              placeholder="Type or select languages"
              onChange={(v) => setField("languages", v)}
              error={errors.languages}
            />


            {/* <Select
              label="Are you willing to pay a small fee per verified lead? *"
              value={form.payPerLead}
              options={["Yes", "No"]}
              onChange={(v) => setField("payPerLead", v)}
              error={errors.payPerLead}
            /> */}
            <Select
              label="If we send you 2–3 real requirements per week, would you actively follow up?"
              value={form.payPerLead}
              options={["Yes, immediately", "Depends on requirement", "No, Just exploring"]}
              onChange={(v) => setField("payPerLead", v)}
              error={errors.payPerLead}
            />
            {/* 
            <Input
              label="Best time to contact you *"
              placeholder="Morning / Afternoon / Evening"
              value={form.bestTime}
              onChange={(v) => setField("bestTime", v)}
              error={errors.bestTime}
            /> */}

            <Select
              label="Best time to contact you *"
              value={form.bestTime}
              options={[
                "Morning",
                "Afternoon",
                "Evening",
                "Anytime",
              ]}
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
        className={`w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none ${error ? "border-red-500" : "border-gray-300"
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
        className={`w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none ${error ? "border-red-500" : "border-gray-300"
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
