"use client";

import { useState } from "react";
import CategoryDropdown from "@/components/CategoryDropdown";
import DynamicForm from "@/components/DynamicForm";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";

export default function PostRequirement() {
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    phone: "",
    city: "",
    localities: "",
    budget: "",
    details: "",
    otherRequirement: "",
  });

  /* ------------------ Helpers ------------------ */

  const clearError = (field) => {
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!category) {
      newErrors.category = "Please select a category";
    }

    if (!form.phone || !/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (category === "Other") {
      if (!form.otherRequirement.trim()) {
        newErrors.otherRequirement = "Please describe your requirement";
      }
    } else {
      if (!form.city.trim()) {
        newErrors.city = "City is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ------------------ Submit ------------------ */

  const submitRequirement = async () => {
    if (!validate()) return;

    const finalDetails =
      category === "Other"
        ? form.otherRequirement.trim()
        : form.details?.trim() || "";

    const body = {
      category,
      phone: form.phone,
      city: form.city,
      localities: form.localities,
      budget: form.budget,
      details: finalDetails,
    };

    setLoading(true);

    try {
      const res = await fetch("/api/requirements", {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed");

      window.location.href = "/success";
    } catch (err) {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  /* ------------------ UI ------------------ */

  return (
    <div className="pt-6 pb-12 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 border">

        {/* HEADER */}
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Tell us what you need
        </h1>
        <p className="text-gray-600 mb-8">
          Post once — verified specialists will contact you.
        </p>

        {/* CATEGORY */}
        <div className="mb-8">
          <label className="font-semibold block mb-2">
            What are you looking for? <span className="text-red-500">*</span>
          </label>

          <CategoryDropdown
            value={category}
            onChange={(val) => {
              setCategory(val);
              setErrors({});
              setForm({
                phone: form.phone,
                city: "",
                localities: "",
                budget: "",
                details: "",
                otherRequirement: "",
              });
            }}
          />

          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        {/* OTHER CATEGORY */}
        {category === "Other" && (
          <div className="mb-8">
            <label className="font-semibold block mb-2">
              Describe your requirement <span className="text-red-500">*</span>
            </label>

            <textarea
              rows={4}
              value={form.otherRequirement}
              onChange={(e) => {
                setForm({ ...form, otherRequirement: e.target.value });
                clearError("otherRequirement");
              }}
              className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 ${
                errors.otherRequirement ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.otherRequirement && (
              <p className="text-red-500 text-sm mt-1">
                {errors.otherRequirement}
              </p>
            )}
          </div>
        )}

        {/* DYNAMIC FORM */}
        {category && category !== "Other" && (
          <div className="mb-8">
            <DynamicForm
              category={category}
              form={form}
              setForm={(data) => {
                setForm(data);
                setErrors({});
              }}
            />

            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}

            {/* Optional helper text */}
            <p className="text-sm text-gray-400 mt-2">
              Additional details are optional — specialists can clarify on call.
            </p>
          </div>
        )}

        {/* PHONE */}
        <div className="mb-8">
          <label className="font-semibold block mb-2">
            Your Phone Number <span className="text-red-500">*</span>
          </label>

          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={form.phone}
            onChange={(e) => {
              setForm({
                ...form,
                phone: e.target.value.replace(/\D/g, ""),
              });
              clearError("phone");
            }}
            placeholder="10-digit mobile number"
            className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />

          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}

          <p className="text-sm text-gray-500 mt-2">
            🔒 Your number stays private and is shared only with verified specialists.
          </p>
        </div>

        {/* SUBMIT */}
        <div className="mt-10 flex justify-center">
          <Button
            onClick={submitRequirement}
            disabled={loading}
            className={`px-8 py-3 text-lg min-w-[220px] flex items-center justify-center gap-2 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span>Submitting...</span>
              </>
            ) : (
              "Submit Requirement"
            )}
          </Button>
        </div>

      </div>
    </div>
  );
}
