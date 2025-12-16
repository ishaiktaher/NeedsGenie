export default function Button({
  children,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      {...props}
      className={`
        inline-flex items-center justify-center
        px-6 py-3 rounded-lg
        font-medium
        bg-blue-600 text-white
        hover:bg-blue-700
        disabled:opacity-60 disabled:cursor-not-allowed
        transition
        ${className}
      `}
    >
      {children}
    </button>
  );
}
