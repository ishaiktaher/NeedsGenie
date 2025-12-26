import Link from "next/link";

export default function HowItWorks() {
  return (
    <main className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* HERO */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center">
          How NeedsGenie works
        </h1>

        <p className="mt-4 text-center text-gray-600 max-w-3xl mx-auto">
          NeedsGenie connects people with verified industry specialists —
          transparently, quickly, and without spam.
        </p>

        {/* AUDIENCE SPLIT */}
        <div className="mt-16 grid gap-12 md:grid-cols-2">

          {/* FOR USERS */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              For people posting a requirement
            </h2>

            <p className="text-gray-600 mb-6">
              Tell us what you need and let the right specialists reach out.
            </p>

            <div className="space-y-6">
              <Step
                number="1"
                title="Post your requirement"
                text="Share your need in under a minute. It’s completely free."
              />
              <Step
                number="2"
                title="Get matched with specialists"
                text="Only verified professionals relevant to your requirement are notified."
              />
              <Step
                number="3"
                title="Receive calls & choose"
                text="Specialists contact you directly. You choose who to work with."
              />
            </div>

            <div className="mt-8">
              <Link
                href="/post-requirement"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Post a Requirement
              </Link>

              <p className="mt-3 text-sm text-gray-500">
                Free · No spam · No middlemen
              </p>
            </div>
          </section>

          {/* FOR SPECIALISTS */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              For industry specialists
            </h2>

            <p className="text-gray-600 mb-6">
              Get genuine, high-intent client requirements without cold outreach.
            </p>

            <div className="space-y-6">
              <Step
                number="1"
                title="Register as a specialist"
                text="Create your profile and tell us what industries and locations you serve."
              />
              <Step
                number="2"
                title="Get matched with requirements"
                text="Relevant client requirements are shared with you based on your expertise."
              />
              <Step
                number="3"
                title="Connect & convert"
                text="Reach out directly to interested users and close deals faster."
              />
            </div>

            <div className="mt-8">
              <Link
                href="/specialist/register"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Join as a Specialist
              </Link>

              <p className="mt-3 text-sm text-gray-500">
                Verified profiles · High-intent leads
              </p>
            </div>
          </section>
        </div>

        {/* TRUST FOOTER */}
        <div className="mt-20 text-center text-sm text-gray-500">
          NeedsGenie never shares your contact details publicly and only connects
          users with relevant, verified specialists.
        </div>

      </div>
    </main>
  );
}

/* ---------- Helper ---------- */

function Step({ number, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold flex items-center justify-center">
        {number}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-1">{text}</p>
      </div>
    </div>
  );
}
