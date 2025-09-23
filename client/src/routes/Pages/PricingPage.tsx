import React, { useMemo, useState } from 'react';
import { CheckIcon, Loader2 } from 'lucide-react';
import { Button } from '~/components/ui';
import { useSEO } from '~/hooks/useSEO';
import { useMediaQuery } from '~/hooks';
import { useGetOmnexioPricingSubscriptionPlans } from '~/data-provider';
import { SEO_DATA } from '~/seo/seoData';
import Header from './Header';
import Footer from './Footer';
import StickyShareButton from '~/components/ui/StickyShareButton';
import { ThemeSelector } from '@librechat/client';

interface SubscriptionPlan {
  id: number;
  name: string;
  price: string;
  features: string[];
  buttonText: string;
  recommended?: boolean;
  isFree?: boolean;
}

export default function PricingPage() {
  const subscriptionPlansQuery = useGetOmnexioPricingSubscriptionPlans();
  const [processingId, setProcessingId] = useState<number | null>(null);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  useSEO(SEO_DATA.pricing);

  const handleJoinPlan = (planId: number): void => {
    if (processingId !== null) return;

    setProcessingId(planId);

    setTimeout(() => {
      window.location.href = '/register';
    }, 500);
  };

  const isPlanFree = (plan: any): boolean => {
    return plan.name.toLowerCase().includes('free') || parseInt(plan.id) === 1;
  };

  const createPlanObject = (plan: any): SubscriptionPlan => {
    return {
      id: parseInt(plan.id),
      name: plan.name,
      price: plan.label,
      features: plan.features,
      buttonText: 'Sign up',
      recommended: plan.isRecommended,
      isFree: isPlanFree(plan),
    };
  };

  const sortPlansWithFreeLast = (plans: SubscriptionPlan[]): SubscriptionPlan[] => {
    const paidPlans = plans.filter((plan) => !plan.isFree);
    const freePlans = plans.filter((plan) => plan.isFree);
    return [...paidPlans, ...freePlans];
  };

  const subscriptionPlans = useMemo(() => {
    if (!subscriptionPlansQuery.data?.length) return [];

    const transformedPlans = subscriptionPlansQuery.data.map((plan) => createPlanObject(plan));

    return sortPlansWithFreeLast(transformedPlans);
  }, [subscriptionPlansQuery.data]);

  const calculateFreeFeatureColumns = (
    features: string[],
  ): { columns: number; itemsPerColumn: number } => {
    const maxRows = 2;
    const totalFeatures = features.length;

    if (totalFeatures <= maxRows) {
      return { columns: 1, itemsPerColumn: totalFeatures };
    }

    const columns = Math.ceil(totalFeatures / maxRows);
    const itemsPerColumn = Math.ceil(totalFeatures / columns);

    return { columns, itemsPerColumn };
  };

  const createFeatureColumns = (features: string[]): string[][] => {
    const { columns, itemsPerColumn } = calculateFreeFeatureColumns(features);
    const featureColumns: string[][] = [];

    for (let i = 0; i < columns; i++) {
      const start = i * itemsPerColumn;
      const end = start + itemsPerColumn;
      featureColumns.push(features.slice(start, end));
    }

    return featureColumns;
  };

  const renderFeatureColumn = (columnFeatures: string[], columnIndex: number): JSX.Element => (
    <div key={columnIndex} className="space-y-1">
      {columnFeatures.map((feature, featureIndex) => (
        <div key={featureIndex} className="flex items-start">
          <CheckIcon className="mr-1 mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
          <span>{feature}</span>
        </div>
      ))}
    </div>
  );

  const renderFreeFeatures = (features: string[]): JSX.Element => {
    const featureColumns = createFeatureColumns(features);
    const { columns } = calculateFreeFeatureColumns(features);

    return (
      <div className={`grid grid-cols-${columns} gap-2 text-sm`}>
        {featureColumns.map(renderFeatureColumn)}
      </div>
    );
  };

  const renderPlanFeatures = (features: string[]): JSX.Element => (
    <ul className="mt-3 flex-1 space-y-2 text-sm">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <CheckIcon className="mr-2 mt-1 h-4 w-4 text-green-500" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );

  const renderProcessingButton = (): JSX.Element => (
    <div className="flex items-center justify-center">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Loading...
    </div>
  );

  const renderFreePlanButton = (plan: SubscriptionPlan): JSX.Element => {
    const isProcessing = processingId === plan.id;
    const buttonStyles = isSmallScreen ? 'mt-4 w-full' : '';
    const inlineStyles = isSmallScreen ? {} : { width: '280px' };

    return (
      <Button
        className={`bg-[#2f7ff7] text-white hover:bg-[#2f7ff7]/90 ${buttonStyles}`}
        style={inlineStyles}
        onClick={() => handleJoinPlan(plan.id)}
        disabled={processingId !== null}
        size="sm"
      >
        {isProcessing ? renderProcessingButton() : plan.buttonText}
      </Button>
    );
  };

  const renderPlanButton = (plan: SubscriptionPlan): JSX.Element => {
    const isProcessing = processingId === plan.id;

    return (
      <Button
        className={`mt-4 w-full ${
          plan.recommended
            ? 'bg-black text-white hover:bg-primary/90'
            : 'bg-[#2f7ff7] text-white hover:bg-[#2f7ff7]/90'
        }`}
        onClick={() => handleJoinPlan(plan.id)}
        disabled={processingId !== null}
        size="sm"
      >
        {isProcessing ? renderProcessingButton() : plan.buttonText}
      </Button>
    );
  };

  const renderRecommendedBadge = (): JSX.Element => (
    <div className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white dark:text-black">
      Recommended
    </div>
  );

  const getCardClasses = (plan: SubscriptionPlan): string => {
    const baseClasses =
      'relative flex flex-col rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md';
    const heightClass = plan.isFree ? 'p-3' : 'p-4';
    const spanClass = plan.isFree ? 'col-span-full' : '';
    const borderClass = plan.recommended
      ? 'border-primary bg-primary/10 dark:border-primary/70 dark:bg-primary/80'
      : 'border-border-medium bg-surface-primary bg-white';

    return `${baseClasses} ${heightClass} ${spanClass} ${borderClass}`;
  };

  const renderFreePlanHeader = (plan: SubscriptionPlan): JSX.Element => (
    <div className="flex-shrink-1 mr-20">
      <h3 className="text-base font-semibold">{plan.name}</h3>
      <div className="mt-1 text-lg font-bold">{plan.price}</div>
    </div>
  );

  const renderFreePlanContent = (plan: SubscriptionPlan): JSX.Element => {
    if (isSmallScreen) {
      return renderPaidPlanContent(plan);
    }

    return (
      <div className="flex items-center justify-between gap-4">
        {renderFreePlanHeader(plan)}
        <div className="min-w-0 flex-1">{renderFreeFeatures(plan.features)}</div>
        <div className="flex-shrink-0">{renderFreePlanButton(plan)}</div>
      </div>
    );
  };

  const renderPaidPlanContent = (plan: SubscriptionPlan): JSX.Element => (
    <>
      <h3 className="text-lg font-semibold">{plan.name}</h3>
      <div className="mt-2 text-xl font-bold">{plan.price}</div>
      {plan.isFree && isSmallScreen
        ? renderPlanFeatures(plan.features)
        : renderPlanFeatures(plan.features)}
      {plan.isFree ? renderFreePlanButton(plan) : renderPlanButton(plan)}
    </>
  );

  const renderPlanCard = (plan: SubscriptionPlan): JSX.Element => (
    <div key={plan.id} className={getCardClasses(plan)}>
      {plan.recommended && renderRecommendedBadge()}
      {plan.isFree ? renderFreePlanContent(plan) : renderPaidPlanContent(plan)}
    </div>
  );

  const shareData = useMemo(
    () => ({
      title: 'Omnexio AI Pricing - Choose Your Perfect Plan',
      text: 'Explore flexible pricing plans for Omnexio AI. Access dozens of AI models and agents with options for every need - from free plans to unlimited access.',
      url: window.location.href,
    }),
    [],
  );

  if (subscriptionPlansQuery.isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="absolute bottom-0 left-0 md:m-4">
          <ThemeSelector />
        </div>

        <div className="flex items-center justify-center py-20">
          <div className="text-lg text-gray-600 dark:text-gray-300">Loading pricing plans...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <div className="absolute bottom-0 left-0 md:m-4">
        <ThemeSelector />
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {subscriptionPlans.map(renderPlanCard)}
        </div>
      </div>

      <Footer />

      <StickyShareButton title={shareData.title} text={shareData.text} url={shareData.url} />
    </div>
  );
}
