"use client";

import { useEffect, useState } from "react";

export default function AutocompleteInput({
  label,
  value,
  onChange,
  fetchOptions,
  onSelect,
  error,
  disabled,
}) {
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
  // ❌ Never search on mount
  if (!fetchOptions) return;

  // ❌ Never search for empty or short input
  if (!value || value.trim().length < 3) {
    setOptions([]);
    return;
  }

  const controller = new AbortController();

  const timer = setTimeout(async () => {
    try {
      const res = await fetchOptions(value, controller.signal);
      setOptions(res || []);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error(err);
      }
    }
  }, 400);

  return () => {
    controller.abort();
    clearTimeout(timer);
  };
}, [value, fetchOptions]);



  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <input
        value={value}
        disabled={disabled}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className={`w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />

      {open && options.length > 0 && (
        <ul className="absolute z-30 mt-1 max-h-52 w-full overflow-auto rounded-lg border bg-white shadow">
          {options.map((o, i) => (
            <li
              key={i}
              onMouseDown={() => {
                onSelect ? onSelect(o) : onChange(o);
                setOpen(false);
              }}
              className="cursor-pointer px-4 py-2 hover:bg-blue-50"
            >
              {o.label || o}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
