"use client";

import { useEffect, useRef, useState } from "react";

export default function SearchableSelect({
  label,
  value,
  options,
  onChange,
  error,
  placeholder = "Select",
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative" ref={ref}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full rounded-lg border px-4 py-3 text-left bg-white ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        {value || placeholder}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-30 mt-1 w-full rounded-lg border bg-white shadow">
          {/* Search */}
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search state..."
            className="w-full px-3 py-2 border-b outline-none"
          />

          {/* Options */}
          <ul className="max-h-56 overflow-auto">
            {filtered.length === 0 && (
              <li className="px-4 py-2 text-sm text-gray-500">
                No results
              </li>
            )}

            {filtered.map((o) => (
              <li
                key={o}
                onClick={() => {
                  onChange(o);
                  setOpen(false);
                  setQuery("");
                }}
                className="cursor-pointer px-4 py-2 hover:bg-blue-50"
              >
                {o}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
