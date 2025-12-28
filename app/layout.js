import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "NeedsGenie",
  description: "Your requirements fulfilled by verified specialists",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased min-h-screen">
        <Header />
        {children}
        <section className="sm:pt-2">
        <Footer />
        </section>
      </body>
    </html>
  );
}
