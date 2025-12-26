"use client";

import { useEffect, useRef, useState , forwardRef} from "react";

const ChipInput = forwardRef(({ onFocus, label, value = [], onChange, placeholder = "Type and press comma", error }, ref) => {
  const [input, setInput] = useState("");
  const wrapperRef = useRef(null);

  const addChip = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (value.includes(trimmed)) return;

    onChange([...value, trimmed]);
    setInput("");
  };

  const removeChip = (chip) => {
    onChange(value.filter((c) => c !== chip));
  };

  const handleKeyDown = (e) => {
    if (e.key === "," || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      addChip(input);
    } else if (e.key === "Backspace" && !input) {
      removeChip(value[value.length - 1]);
      setInput(value[value.length - 1]);
    }
  };

  // ✅ Create chip when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        addChip(input);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [input]);

  return (
    <div ref={wrapperRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <div
        className={`flex flex-wrap items-center gap-2 rounded-lg border px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        {value.map((chip) => (
          <span
            key={chip}
            className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
          >
            {chip}
            <button
              type="button"
              onClick={() => removeChip(chip)}
              className="text-blue-700 hover:text-blue-900"
            >
              ×
            </button>
          </span>
        ))}

        <input
        ref={ref}
        onFocus={onFocus}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 min-w-[120px] border-none outline-none py-1"
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
);

export default ChipInput;