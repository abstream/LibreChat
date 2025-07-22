import React from 'react';
import Header from '~/routes/Pages/Header';
import Footer from '~/routes/Pages/Footer';
import { useSEO } from '~/hooks/useSEO';
import { SEO_DATA } from '~/seo/seoData';

/**
 * Component for displaying the Contact Us page
 * @returns Contact Us React component
 */
export default function ContactUs() {
  useSEO(SEO_DATA.terms);

  return (
    <>
      <Header />
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="mb-6 text-3xl font-semibold text-gray-800">Contact Us</h1>
          <p className="mb-6 text-lg leading-relaxed text-gray-600">
            If you have any questions, feedback, or need new features, we'd love to hear from you.
            Our team is here to help and improve your experience.
          </p>
          <p className="mb-4 text-gray-600">
            <b className="text-gray-800">Email us:</b>{' '}
            <a
              href="mailto:support@omnexio.ai"
              className="text-blue-600 underline transition-colors duration-200 hover:text-blue-800"
            >
              support@omnexio.ai
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
