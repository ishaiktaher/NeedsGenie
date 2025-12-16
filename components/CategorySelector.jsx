"use client";
export default function CategorySelector({ category, setCategory }) {
  const categories = [
    "Residential Rentals", "Residential Buy/Sell", "Commercial", "Industrial",
    "Used Cars", "Loans", "Professional Services", "Government Services",
    "IT Services", "Business Buy/Sell"
  ];
  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`py-2 px-3 rounded-lg border text-sm \${category === cat ? "bg-blue-600 text-white" : "bg-white border-gray-300 text-gray-700"}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}