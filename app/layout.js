import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "NeedsGenie",
  description: "Your requirements fulfilled by verified specialists",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased min-h-screen">
        <Header />
        <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
        <footer className="w-full py-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} NeedsGenie · All rights reserved
        </footer>
      </body>
    </html>
  );
}
