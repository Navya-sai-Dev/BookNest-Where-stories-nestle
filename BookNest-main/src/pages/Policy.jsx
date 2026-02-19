import React from "react";

const Policy = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-6 text-gray-800">

        <br/>
        <br/>
        <br/>
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Privacy Policy</h1>

      <p className="mb-4">
        Welcome to <strong>BookNest</strong>. Your privacy is important to us. This Privacy Policy outlines how we collect, use, and safeguard your information.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Personal information like name, email, and contact details during registration.</li>
        <li>Browsing activity and preferences within the BookNest platform.</li>
        <li>Book search and reading history (for personalized recommendations).</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4">
        <li>To personalize your book browsing experience.</li>
        <li>To provide customer support and service updates.</li>
        <li>To send newsletters or promotional materials (optional).</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Data Security</h2>
      <p className="mb-4">
        We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell or share your personal data with third parties unless required by law or with your consent.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <ul className="list-disc list-inside mb-4">
        <li>You can view and update your profile information anytime.</li>
        <li>You can request data deletion by contacting our support.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this policy occasionally. We will notify users via email or platform notification about significant changes.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Contact Us</h2>
      <p>
        If you have any questions about this policy, please contact us at:{" "}
        <span className="text-blue-600">support@booknest.com</span>
      </p>
    </div>
  );
};

export default Policy;
