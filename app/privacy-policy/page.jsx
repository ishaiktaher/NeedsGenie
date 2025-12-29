export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-4">
          At <strong>NeedsGenie</strong>, your privacy is important to us. This
          policy explains how we collect, use, and protect your information.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          Information We Collect
        </h2>
        <p className="text-gray-600">
          We collect basic information such as name, phone number, location,
          and service preferences when you submit a requirement or register
          as a specialist.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          How We Use Your Information
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>To connect users with relevant specialists</li>
          <li>To share verified requirements</li>
          <li>To improve platform quality</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          Data Sharing
        </h2>
        <p className="text-gray-600">
          We do not sell or publicly display your contact details. Information
          is shared only when necessary to fulfill a request.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          Data Security
        </h2>
        <p className="text-gray-600">
          We take reasonable measures to protect your data from unauthorized
          access or misuse.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          Contact Us
        </h2>
        <p className="text-gray-600">
          If you have questions about this Privacy Policy, contact us at:
        </p>
        <p className="text-gray-700 mt-2">
          📧 needsgenieapp@gmail.com <br />
          📱 WhatsApp: 9052555510
        </p>

        <p className="text-xs text-gray-400 mt-10">
          Last updated: {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}
