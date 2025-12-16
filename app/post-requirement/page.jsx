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

  const validate = () => {
    const newErrors = {};

    if (!category) newErrors.category = "Please select a category";

    if (!form.phone || !/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (category === "Other" && !form.otherRequirement.trim()) {
      newErrors.otherRequirement = "Please describe your requirement";
    }

    if (category !== "Other") {
      if (!form.city) newErrors.city = "City is required";
      if (!form.details) newErrors.details = "Please add requirement details";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitRequirement = async () => {
    const finalDetails =
      category === "Other"
        ? form.details?.trim()
        : form.details;

    if (!form.phone || !finalDetails) {
      alert("Please fill all required fields");
      return;
    }

    const body = {
      category,
      ...form,
      details: finalDetails,
    };

    setLoading(true);

    try {
      await fetch("/api/requirements", {
        method: "POST",
        body: JSON.stringify(body),
      });

      window.location.href = "/success";
    } catch (err) {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="pt-6 pb-12 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 border">

        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Tell us what you need
        </h1>
        <p className="text-gray-600 mb-8">
          Post once — verified specialists will contact you.
        </p>

        {/* CATEGORY */}
        <div className="mb-8">
          <label className="font-semibold block mb-2">
            What are you looking for?
          </label>

          <CategoryDropdown value={category} onChange={setCategory} />

          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        {/* OTHER CATEGORY */}
        {category === "Other" && (
          <div className="mb-8">
            <label className="font-semibold block mb-2">
              Describe your requirement
            </label>

            <textarea
              rows={4}
              value={form.otherRequirement}
              onChange={(e) =>
                setForm({ ...form, otherRequirement: e.target.value })
              }
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
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
            <DynamicForm category={category} form={form} setForm={setForm} />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            {errors.details && (
              <p className="text-red-500 text-sm">{errors.details}</p>
            )}
          </div>
        )}

        {/* PHONE */}
        <div className="mb-8">
          <label className="font-semibold block mb-2">
            Your Phone Number
          </label>

          <input
            type="tel"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            placeholder="10-digit mobile number"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
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
            disabled={!category || !form.phone || loading}
            className={`px-8 py-3 text-lg min-w-[220px] flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : ""
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
