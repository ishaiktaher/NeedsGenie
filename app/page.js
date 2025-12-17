import Link from "next/link";
import { ShieldCheck, PhoneOff, Zap } from "lucide-react";

export default function Home() {
  const TrustCard = ({ icon, title, text }) => (
    <div className="flex gap-4 items-start">
      <div className="mt-1">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-1 leading-relaxed">{text}</p>
      </div>
    </div>
  );

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Tell us what you need.
              <br />
              <span className="text-blue-600">
                The right specialist will find you.
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Post your requirement once. Verified professionals reach out with
              real solutions — no spam, no listings.
            </p>

            <div className="mt-10 flex items-center gap-6">
              <Link
                href="/post-requirement"
                className="inline-flex items-center justify-center px-10 py-4 bg-blue-600 text-white rounded-xl text-lg font-medium shadow-lg hover:bg-blue-700 transition"
              >
                Post Your Requirement
              </Link>

              <span className="text-sm text-gray-400">
                Free · Takes under a minute
              </span>
            </div>

            <p className="mt-4 text-sm text-gray-400">
              🔒 Your phone number is shared only with verified specialists.
            </p>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80"
              alt="Professionals collaborating"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-14">
          <TrustCard
            icon={<ShieldCheck className="h-7 w-7 text-blue-600" />}
            title="Verified Specialists Only"
            text="Every specialist is manually reviewed before being allowed to contact users."
          />

          <TrustCard
            icon={<PhoneOff className="h-7 w-7 text-blue-600" />}
            title="No Spam, Ever"
            text="Your contact details are never public or sold. Only relevant professionals can reach you."
          />

          <TrustCard
            icon={<Zap className="h-7 w-7 text-blue-600" />}
            title="Faster Than Searching"
            text="Skip endless calls and browsing. Let specialists come to you."
          />
        </div>
      </section>

      {/* SPECIALIST CTA */}
      <section className="bg-gray-900 text-white w-full">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold">
              Are you an industry specialist?
            </h3>
            <p className="text-gray-300 mt-2">
              Receive genuine, high-intent client requirements instead of
              chasing leads.
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
