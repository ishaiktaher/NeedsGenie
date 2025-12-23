"use client";

import { useState, useRef } from "react";

export default function CreatableMultiSelect({
  label,
  value = [],
  options = [],
  placeholder,
  error,
  onChange,
}) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const filtered = options.filter(
    (o) =>
      o.toLowerCase().includes(input.toLowerCase()) &&
      !value.includes(o)
  );

  const addItem = (item) => {
    if (!item.trim()) return;
    if (value.includes(item)) return;

    onChange([...value, item]);
    setInput("");
    setOpen(false);
  };

  const removeItem = (item) => {
    onChange(value.filter((v) => v !== item));
  };

  return (
    <div ref={ref} className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      {/* Selected chips */}
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((v) => (
          <span
            key={v}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {v}
            <button onClick={() => removeItem(v)}>×</button>
          </span>
        ))}
      </div>

      {/* Input */}
      <input
        value={input}
        placeholder={placeholder}
        onChange={(e) => {
          setInput(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addItem(input);
          }
        }}
        className={`w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />

      {/* Dropdown */}
      {open && (filtered.length > 0 || input) && (
        <div className="absolute z-20 w-full bg-white border rounded-lg mt-1 shadow-lg max-h-56 overflow-auto">
          {filtered.map((o) => (
            <button
              key={o}
              onClick={() => addItem(o)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {o}
            </button>
          ))}

          {input && !options.includes(input) && (
            <button
              onClick={() => addItem(input)}
              className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50"
            >
              Add “{input}”
            </button>
          )}
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
