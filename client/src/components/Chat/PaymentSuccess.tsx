import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '~/components/ui';
import { useSEO } from '~/hooks/useSEO';
import Header from './Header';
import Footer from './Footer';
import { useFileMapContext } from '~/Providers';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const fileMap = useFileMapContext();

  useSEO({
    title: 'Payment Successful - Omnexio',
    description: 'Thank you for your subscription! Your payment has been processed successfully.',
  });

  const handleContinue = () => {
    navigate('/c/new');
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-2xl px-4 py-16">
          <div className="rounded-lg bg-white p-8 text-center shadow-sm dark:bg-gray-800">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <svg
                className="h-8 w-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Payment Successful!
            </h1>

            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
              Thank you for subscribing to Omnexio! Your payment has been processed successfully.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                onClick={handleContinue}
                className="bg-blue-600 px-8 py-3 text-lg hover:bg-blue-700"
              >
                Chat Now
              </Button>
            </div>

            <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              <p>
                A confirmation email has been sent to your registered email address. If you have any
                questions, please contact our support team.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
