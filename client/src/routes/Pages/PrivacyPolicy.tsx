import React from 'react';
import Footer from '~/routes/Pages/Footer';

/**
 * Component for displaying the Privacy Policy page
 * @returns Privacy Policy React component
 */
export default function PrivacyPolicy() {
  return (
    <>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-semibold">Privacy Policy</h1>

        <div className="dark:prose-invert">
          <p className="mb-4">
            This Privacy Policy describes how your personal information is collected, used, and
            shared when you use our application.
          </p>

          <h2 className="mb-4 mt-6 text-xl font-medium">Information We Collect</h2>
          <p className="mb-4">
            We collect information that you provide directly to us, such as when you create an
            account, update your profile, use interactive features, or otherwise communicate with
            us.
          </p>

          <h2 className="mb-4 mt-6 text-xl font-medium">How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to provide, maintain, and improve our services,
            including to process transactions, send notifications, and prevent fraud.
          </p>

          <h2 className="mb-4 mt-6 text-xl font-medium">Sharing Your Information</h2>
          <p className="mb-4">
            We may share your information with third-party service providers who require access to
            such information to perform services on our behalf.
          </p>

          <h2 className="mb-4 mt-6 text-xl font-medium">Data Retention</h2>
          <p className="mb-4">
            We will retain your information for as long as your account is active or as needed to
            provide you services, comply with our legal obligations, resolve disputes, and enforce
            our agreements.
          </p>

          <h2 className="mb-4 mt-6 text-xl font-medium">Changes</h2>
          <p className="mb-4">
            We may update this privacy policy from time to time in order to reflect changes to our
            practices or for other operational, legal, or regulatory reasons.
          </p>

          <h2 className="mb-4 mt-6 text-xl font-medium">Contact Us</h2>
          <p className="mb-4">
            For more information about our privacy practices, if you have questions, or if you would
            like to make a complaint, please contact us.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
