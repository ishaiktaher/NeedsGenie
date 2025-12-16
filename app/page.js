import Link from "next/link";
import { ShieldCheck, PhoneOff, Zap } from "lucide-react";

export default function Home() {
  const TrustCard = ({ icon, title, text }) => {
    return (
      <div className="flex gap-4">
        <div className="flex-shrink-0">{icon}</div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 mt-1">{text}</p>
        </div>
      </div>
    );
  };
  return (
    <main>
      {/* HERO */}
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <div>
            <h1 className="text-5xl font-extrabold leading-tight">
              Tell us what you need.
              <br />
              <span className="text-blue-600">We’ll get it done.</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Post your requirement once — verified professionals reach out with
              real solutions. No spam. No chaos.
            </p>

            <div className="mt-8">
              <Link
                href="/post-requirement"
                className="inline-flex items-center justify-center px-10 py-4 bg-blue-600 text-white rounded-xl text-lg font-medium shadow hover:bg-blue-700 transition"
              >
                Post Your Requirement
              </Link>
            </div>

            <p className="mt-3 text-sm text-gray-400">
              Your phone number is kept confidential.
            </p>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
              alt="Professionals collaborating"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>
      {/* TRUST */}
      <section className="py-14 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <TrustCard
            icon={<ShieldCheck className="h-6 w-6 text-blue-600" />}
            title="Verified Specialists"
            text="Only manually reviewed professionals get access to your request."
          />

          <TrustCard
            icon={<PhoneOff className="h-6 w-6 text-blue-600" />}
            title="No Spam Calls"
            text="Your contact is shared only with relevant, verified specialists."
          />

          <TrustCard
            icon={<Zap className="h-6 w-6 text-blue-600" />}
            title="Fast Response"
            text="Get human responses, not bots or listings."
          />
        </div>
      </section>
      {/* SPECIALIST CTA */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold">
              Are you a professional specialist?
            </h3>
            <p className="text-gray-300 mt-2">
              Receive genuine, high-intent client requests.
            </p>
          </div>

          <Link
            href="/specialist/register"
            className="px-8 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Register as a Specialist
          </Link>
        </div>
      </section>
    </main>
  );
}
