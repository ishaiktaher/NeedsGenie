export default function Spinner({ size = "md", color = "white" }) {
  const sizeMap = {
    sm: "h-3 w-3 border-2",
    md: "h-4 w-4 border-2",
    lg: "h-6 w-6 border-4",
  };

  const colorMap = {
    white: "border-white border-t-transparent",
    blue: "border-blue-600 border-t-transparent",
    gray: "border-gray-500 border-t-transparent",
  };

  return (
    <span
      className={`
        ${sizeMap[size] || sizeMap.md}
        ${colorMap[color] || colorMap.white}
        rounded-full animate-spin
      `}
    />
  );
}
