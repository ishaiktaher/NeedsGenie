export default function Input({ label, type = "text", value, onChange, placeholder, className = "" }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={
          "border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-600 focus:outline-none " +
          className
        }
      />
    </div>
  );
}