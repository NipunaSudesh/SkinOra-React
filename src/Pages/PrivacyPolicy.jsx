import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold text-primary mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-4">
          At <span className="font-semibold">Skinora</span>, we value your
          privacy and are committed to protecting your personal information.
        </p>

        <section className="mb-5">
          <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
          <p className="text-gray-600">
            We collect information such as your name, email address, and other
            details when you register, place orders, or contact us.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="text-xl font-semibold mb-2">
            How We Use Your Information
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>To provide and improve our services</li>
            <li>To process orders and payments</li>
            <li>To communicate updates and offers</li>
          </ul>
        </section>

        <section className="mb-5">
          <h2 className="text-xl font-semibold mb-2">Data Security</h2>
          <p className="text-gray-600">
            We implement security measures to protect your personal data from
            unauthorized access.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="text-xl font-semibold mb-2">Third-Party Services</h2>
          <p className="text-gray-600">
            We do not sell or trade your personal information to third parties.
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-6">
          Last updated: {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
