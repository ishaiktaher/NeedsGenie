"use client";
import { useState } from "react";
import { CATEGORIES } from "@/lib/categories";

export default function CategoryDropdown({ value, onChange }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = CATEGORIES.filter((cat) =>
    cat.toLowerCase().includes(query.toLowerCase())
  );

  const showOther = !filtered.includes("Other");

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search or select a category"
        value={query || value}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange("");
          setOpen(true);
        }}
        className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500"
      />

      {open && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-auto">

          {/* MATCHING CATEGORIES */}
          {filtered.map((cat) => (
            <div
              key={cat}
              onClick={() => {
                onChange(cat);
                setQuery("");
                setOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                cat === "Other" ? "font-semibold text-blue-600" : ""
              }`}
            >
              {cat}
            </div>
          ))}

          {/* ALWAYS SHOW OTHER */}
          {showOther && (
            <>
              <div className="border-t my-1" />
              <div
                onClick={() => {
                  onChange("Other");
                  setQuery("");
                  setOpen(false);
                }}
                className="px-4 py-2 cursor-pointer font-semibold text-blue-600 hover:bg-blue-50"
              >
                Other (Describe your requirement)
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
