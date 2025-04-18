import React from 'react';
import { CheckIcon } from 'lucide-react';
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
        localize('com_subscription_free_feature_2'),
        localize('com_subscription_free_feature_3'),
        localize('com_subscription_free_feature_4'),
      ],
      buttonText: localize('com_subscription_current_plan'),
      onClick: () => {
        console.log('Free plan selected');
        onOpenChange(false);
      },
    },
    {
      name: localize('com_subscription_basic'),
      price: localize('com_subscription_basic_price'),
      features: [
        localize('com_subscription_basic_feature_1'),
        localize('com_subscription_basic_feature_2'),
        localize('com_subscription_rolling_credits'),
        localize('com_subscription_no_daily_limits'),
      ],
      buttonText: localize('com_subscription_upgrade'),
      onClick: () => {
        console.log('Basic plan selected');
        onOpenChange(false);
      },
    },
    {
      name: localize('com_subscription_standard'),
      price: localize('com_subscription_standard_price'),
      features: [
        localize('com_subscription_standard_feature_1'),
        localize('com_subscription_standard_feature_2'),
        localize('com_subscription_rolling_credits'),
        localize('com_subscription_no_daily_limits'),
      ],
      buttonText: localize('com_subscription_upgrade'),
      recommended: true,
      onClick: () => {
        console.log('Standard plan selected');
        onOpenChange(false);
      },
    },
    {
      name: localize('com_subscription_pro'),
      price: localize('com_subscription_pro_price'),
      features: [
        localize('com_subscription_pro_feature_1'),
        localize('com_subscription_pro_feature_2'),
        localize('com_subscription_rolling_credits'),
        localize('com_subscription_no_daily_limits'),
      ],
      buttonText: localize('com_subscription_upgrade'),
      onClick: () => {
        console.log('Pro plan selected');
        onOpenChange(false);
      },
    },
    {
      name: localize('com_subscription_enterprise'),
      price: localize('com_subscription_enterprise_price'),
      features: [
        localize('com_subscription_enterprise_feature_1'),
        localize('com_subscription_enterprise_feature_2'),
        localize('com_subscription_rolling_credits'),
        localize('com_subscription_no_daily_limits'),
      ],
      buttonText: localize('com_subscription_upgrade'),
      onClick: () => {
        console.log('Enterprise plan selected');
        onOpenChange(false);
      },
    },
  ];

  const creditPackages: CreditPackage[] = [
    {
      amount: '500',
      price: '$4.95',
      onClick: () => {
        console.log('500 credits purchased');
        onOpenChange(false);
      },
    },
    {
      amount: '1,500',
      price: '$9.95',
      onClick: () => {
        console.log('1,500 credits purchased');
        onOpenChange(false);
      },
    },
    {
      amount: '5,000',
      price: '$19.95',
      onClick: () => {
        console.log('5,000 credits purchased');
        onOpenChange(false);
      },
    },
    {
      amount: '18,000',
      price: '$39.95',
      onClick: () => {
        console.log('18,000 credits purchased');
        onOpenChange(false);
      },
    },
    {
      amount: '50,000',
      price: '$79.95',
      onClick: () => {
        console.log('50,000 credits purchased');
        onOpenChange(false);
      },
    },
  ];

  return (
    <OGDialog open={open} onOpenChange={onOpenChange}>
      <OGDialogContent className="max-h-[85vh] w-11/12 max-w-5xl overflow-auto">
        <OGDialogHeader>
          <OGDialogTitle className="text-2xl font-bold">
            {localize('com_subscription_plans')}
          </OGDialogTitle>
        </OGDialogHeader>

        <div className="space-y-8">
          {/* Subscription Plans */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">{localize('com_subscription_monthly')}</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-xl border p-4 shadow-sm transition-all duration-200 hover:shadow-md ${
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
                  <div className="mt-2 text-xl font-bold">{plan.price}</div>
                  <ul className="mt-3 flex-1 space-y-2 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckIcon className="mr-2 mt-1 h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`mt-4 w-full ${
                      plan.recommended
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 dark:text-black'
                        : 'bg-surface-secondary text-text-primary hover:bg-surface-hover'
                    }`}
                    onClick={plan.onClick}
                    size="sm"
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-3 text-sm text-text-secondary">
              {localize('com_subscription_credits_rolling_note')}
            </div>
          </div>

          {/* Buy Credits - Pay as you go */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">{localize('com_subscription_pay_as_you_go')}</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {creditPackages.map((pack) => (
                <div
                  key={pack.amount}
                  className="flex flex-col rounded-xl border border-border-medium bg-surface-primary p-4 text-center shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  <div className="text-lg font-semibold">{pack.amount} {localize('com_credits')}</div>
                  <div className="mt-2 text-lg font-bold">{pack.price}</div>
                  {pack.bonus && (
                    <div className="mt-1 text-sm font-medium text-green-600 dark:text-green-400">
                      {pack.bonus}
                    </div>
                  )}
                  <Button
                    className="mt-4 w-full bg-surface-secondary text-text-primary hover:bg-surface-hover"
                    onClick={pack.onClick}
                    size="sm"
                  >
                    {localize('com_buy_now')}
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-3 text-sm text-text-secondary">
              {localize('com_subscription_payg_never_expire')}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3 border-t border-border-medium pt-4 text-sm text-text-secondary">
          <p>{localize('com_subscription_omnexa_credit_note')}</p>
          <p>{localize('com_subscription_web_search_credit_note')}</p>
          <p>{localize('com_subscription_terms')}</p>
        </div>
      </OGDialogContent>
    </OGDialog>
  );
};

export default SubscriptionModal;
