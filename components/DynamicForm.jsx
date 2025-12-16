"use client";
import Input from "./Input";

export default function DynamicForm({ category, form, setForm }) {
  if (!category) return <p className="text-gray-500 text-center mt-6">Select a category above</p>;
  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  return (
    <div className="mt-6 flex flex-col gap-4">
      <Input label="City" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Enter city" />
      <Input label="Preferred Localities" value={form.localities} onChange={(e) => update("localities", e.target.value)} placeholder="Ex: Kondapur, Miyapur" />
      <Input label="Budget / Price Range" value={form.budget} onChange={(e) => update("budget", e.target.value)} placeholder="Ex: 20k-30k or 50 Lakhs" />

      {category === "Residential Rentals" && (
        <>
          <Input label="BHK" value={form.bhk} onChange={(e) => update("bhk", e.target.value)} placeholder="Ex: 2BHK" />
          <Input label="Furnishing" value={form.furnishing} onChange={(e) => update("furnishing", e.target.value)} placeholder="Furnished / Semi / Unfurnished" />
        </>
      )}

      {category === "Used Cars" && (
        <>
          <Input label="Make" value={form.make} onChange={(e) => update("make", e.target.value)} placeholder="Ex: Hyundai" />
          <Input label="Model" value={form.model} onChange={(e) => update("model", e.target.value)} placeholder="Ex: i20" />
          <Input label="Year" value={form.year} onChange={(e) => update("year", e.target.value)} placeholder="2018" />
        </>
      )}

      {category === "Loans" && (
        <>
          <Input label="Loan Type" value={form.loanType} onChange={(e) => update("loanType", e.target.value)} placeholder="Ex: Personal" />
          <Input label="Amount Needed" value={form.amount} onChange={(e) => update("amount", e.target.value)} placeholder="10 Lakhs" />
        </>
      )}

      <textarea className="border border-gray-300 rounded-lg p-3 h-24 focus:border-blue-600" placeholder="Additional details..." value={form.details} onChange={(e) => update("details", e.target.value)} />
    </div>
  );
}