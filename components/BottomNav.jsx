"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const tabs = [
    { name: "Home", href: "/", icon: "🏠" },
    { name: "Post", href: "/post-requirement", icon: "➕" },
    { name: "Dashboard", href: "/specialist/dashboard", icon: "📋" },
    { name: "Profile", href: "/specialist/profile", icon: "👤" }
  ];
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-screen-sm bg-white border-t flex justify-around py-2">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`${pathname === tab.href ? "text-blue-600 font-semibold" : "text-gray-500"} flex flex-col items-center text-sm`}
        >
          <span className="text-lg">{tab.icon}</span>
          {tab.name}
        </Link>
      ))}
    </div>
  );
}