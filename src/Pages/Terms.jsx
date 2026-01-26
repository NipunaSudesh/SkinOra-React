import React from "react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">
          Terms & Conditions
        </h1>

        <p className="text-gray-600 mb-6 text-sm text-center">
          Last updated: January 2026
        </p>

        {/* Section 1 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700">
            By accessing or using Skinora, you agree to be bound by these Terms
            and Conditions. If you do not agree, please do not use our services.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            2. User Accounts
          </h2>
          <p className="text-gray-700">
            You are responsible for maintaining the confidentiality of your
            account and password. Any activity under your account is your
            responsibility.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            3. Products & Services
          </h2>
          <p className="text-gray-700">
            We strive to display accurate product information. However, we do
            not guarantee that descriptions, prices, or availability are always
            error-free.
          </p>
        </div>

        {/* Section 4 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            4. Prohibited Activities
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Using the site for unlawful purposes</li>
            <li>Attempting to access other users’ accounts</li>
            <li>Uploading malicious or harmful content</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            5. Termination
          </h2>
          <p className="text-gray-700">
            We reserve the right to suspend or terminate your account if you
            violate these terms without prior notice.
          </p>
        </div>

        {/* Section 6 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            6. Limitation of Liability
          </h2>
          <p className="text-gray-700">
            Skinora shall not be liable for any indirect or incidental damages
            resulting from the use of our services.
          </p>
        </div>

        {/* Section 7 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            7. Contact Us
          </h2>
          <p className="text-gray-700">
            If you have any questions about these Terms, please contact us at{" "}
            <span className="font-medium text-primary">
              support@skinora.com
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
