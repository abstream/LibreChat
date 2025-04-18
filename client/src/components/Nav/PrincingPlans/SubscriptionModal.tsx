import React from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import {
  OGDialog,
  OGDialogContent,
  OGDialogHeader,
  OGDialogTitle,
  Button,
} from '~/components/ui';
import { useLocalize } from '~/hooks';

interface SubscriptionPlan {
  name: string;
  price: string;
  features: string[];
  buttonText: string;
  recommended?: boolean;
  onClick: () => void;
}

interface CreditPackage {
  amount: string;
  price: string;
  bonus?: string;
  onClick: () => void;
}

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ open, onOpenChange }) => {
  const localize = useLocalize();

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      name: localize('com_subscription_free'),
      price: localize('com_subscription_free_price'),
      features: [
        localize('com_subscription_free_feature_1'),
        '5 messages per day',
        localize('com_subscription_free_feature_3'),
      ],
      buttonText: localize('com_subscription_current_plan'),
      onClick: () => {
        console.log('Free plan selected');
        onOpenChange(false);
      },
    },
    {
      name: localize('com_subscription_premium'),
      price: localize('com_subscription_premium_price'),
      features: [
        '5,000 credits per month',
        localize('com_subscription_premium_feature_2'),
        localize('com_subscription_premium_feature_3'),
        localize('com_subscription_premium_feature_4'),
      ],
      buttonText: localize('com_subscription_upgrade'),
      recommended: true,
      onClick: () => {
        console.log('Premium plan selected');
        onOpenChange(false);
      },
    },
  ];

  const creditPackages: CreditPackage[] = [
    {
      amount: '500',
      price: '$4.99',
      onClick: () => {
        console.log('500 credits purchased');
        onOpenChange(false);
      },
    },
    {
      amount: '1,000',
      price: '$9.99',
      onClick: () => {
        console.log('1,000 credits purchased');
        onOpenChange(false);
      },
    },
    {
      amount: '5,000',
      price: '$39.99',
      bonus: '+500 bonus',
      onClick: () => {
        console.log('5,000 credits purchased');
        onOpenChange(false);
      },
    },
    {
      amount: '10,000',
      price: '$69.99',
      bonus: '+2,000 bonus',
      onClick: () => {
        console.log('10,000 credits purchased');
        onOpenChange(false);
      },
    },
  ];

  return (
    <OGDialog open={open} onOpenChange={onOpenChange}>
      <OGDialogContent className="max-h-[85vh] w-11/12 max-w-4xl overflow-auto">
        <OGDialogHeader>
          <OGDialogTitle className="text-2xl font-bold">
            {localize('com_subscription_plans')}
          </OGDialogTitle>
        </OGDialogHeader>

        <div className="space-y-8">
          {/* Subscription Plans */}
          <div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-xl border p-6 shadow-sm transition-all duration-200 hover:shadow-md ${
                    plan.recommended
                      ? 'border-primary bg-primary/5 dark:border-primary/70'
                      : 'border-border-medium bg-surface-primary'
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold dark:text-black text-white">
                      {localize('com_subscription_recommended')}
                    </div>
                  )}
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <div className="mt-2 text-2xl font-bold">{plan.price}</div>
                  <ul className="mt-4 flex-1 space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckIcon className="mr-2 mt-1 h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`mt-6 w-full ${
                      plan.recommended
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 dark:text-black'
                        : 'bg-surface-secondary text-text-primary hover:bg-surface-hover'
                    }`}
                    onClick={plan.onClick}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Buy Credits */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">{localize('com_buy_credits')}</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {creditPackages.map((pack) => (
                <div
                  key={pack.amount}
                  className="flex flex-col rounded-xl border border-border-medium bg-surface-primary p-4 text-center shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  <div className="text-xl font-semibold">{pack.amount} {localize('com_credits')}</div>
                  <div className="mt-2 text-lg font-bold">{pack.price}</div>
                  {pack.bonus && (
                    <div className="mt-1 text-sm font-medium text-green-600 dark:text-green-400">
                      {pack.bonus}
                    </div>
                  )}
                  <Button
                    className="mt-4 w-full bg-surface-secondary text-text-primary hover:bg-surface-hover"
                    onClick={pack.onClick}
                  >
                    {localize('com_buy_now')}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-border-medium pt-4 text-center text-sm text-text-secondary">
          {localize('com_subscription_terms')}
        </div>
      </OGDialogContent>
    </OGDialog>
  );
};

export default SubscriptionModal;
