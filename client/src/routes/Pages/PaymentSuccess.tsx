import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useGetStartupConfig } from '~/data-provider';
import { Button } from '~/components/ui';
import { useSEO } from '~/hooks/useSEO';
import Header from '~/routes/Pages/Header';
import Footer from '~/routes/Pages/Footer';

declare global {
  interface Window {
    gtag: any;
    dataLayer: any;
    fbq: any;
  }
}

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: config } = useGetStartupConfig();

  const sessionId = searchParams.get('session_id');
  const planName = searchParams.get('plan');
  const amount = searchParams.get('amount');

  useSEO({
    title: 'Payment Successful - Omnexio',
    description: 'Thank you for your subscription! Your payment has been processed successfully.',
    robots: 'noindex, nofollow',
  });

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    trackPaymentSuccess();
  }, [sessionId, planName, amount]);

  const trackPaymentSuccess = () => {
    if (typeof window === 'undefined') {
      return;
    }

    if (window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: sessionId,
        value: amount ? parseFloat(amount) : undefined,
        currency: 'USD',
        items: [
          {
            item_id: planName || 'subscription',
            item_name: planName || 'Omnexio Subscription',
            category: 'subscription',
            quantity: 1,
            price: amount ? parseFloat(amount) : undefined,
          },
        ],
      });
    }

    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'purchase',
        ecommerce: {
          transaction_id: sessionId,
          value: amount ? parseFloat(amount) : undefined,
          currency: 'USD',
          items: [
            {
              item_id: planName || 'subscription',
              item_name: planName || 'Omnexio Subscription',
              item_category: 'subscription',
              quantity: 1,
              price: amount ? parseFloat(amount) : undefined,
            },
          ],
        },
      });
    }

    if (window.fbq) {
      window.fbq('track', 'Purchase', {
        value: amount ? parseFloat(amount) : undefined,
        currency: 'USD',
        content_name: planName || 'Omnexio Subscription',
        content_category: 'subscription',
      });
    }
  };

  const handleContinue = () => {
    navigate('/c/new');
  };

  return (
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
            {planName && (
              <span className="mt-2 block text-sm font-medium text-blue-600 dark:text-blue-400">
                Plan: {planName}
              </span>
            )}
          </p>

          {sessionId && (
            <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Transaction ID: <span className="font-mono">{sessionId}</span>
              </p>
            </div>
          )}

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
  );
}
