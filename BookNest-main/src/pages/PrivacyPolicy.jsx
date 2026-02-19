import React from 'react';
const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">Privacy Policy</h1>

      <p className="mb-4">
        At <strong>BookNest</strong>, we value your privacy and are committed to
        protecting your personal information. This policy outlines how we collect,
        use, and safeguard your data.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        We collect information you provide during registration, such as your name,
        email, and preferences. We may also collect anonymous usage data through
        cookies and analytics tools.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4">
        <li>To personalize your reading and browsing experience</li>
        <li>To improve our website functionality</li>
        <li>To send important updates and newsletters</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">3. Data Security</h2>
      <p className="mb-4">
        We implement appropriate security measures to protect your data from
        unauthorized access or disclosure.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">4. Third-Party Sharing</h2>
      <p className="mb-4">
        We do not sell or share your personal information with third parties,
        except as required by law or for essential service providers.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">5. Your Choices</h2>
      <p className="mb-4">
        You may update your account information or unsubscribe from communications
        at any time through your profile settings.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">6. Updates to This Policy</h2>
      <p className="mb-4">
        We may update this policy occasionally. Changes will be posted here with an
        updated revision date.
      </p>

      <p className="mt-8 text-sm text-gray-600">
        Last updated: June 15, 2025
      </p>
    </div>
  );
};

export default Privacy;
