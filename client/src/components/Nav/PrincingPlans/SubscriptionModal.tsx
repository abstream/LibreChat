import React, { useState } from 'react';
import { CheckIcon, Loader2 } from 'lucide-react';
import {
  OGDialog,
  OGDialogContent,
  OGDialogHeader,
  OGDialogTitle,
  Button,
} from '~/components/ui';
import { useLocalize } from '~/hooks';
import { useCreateOmnexioSubscription } from '~/data-provider';

interface SubscriptionPlan {
  id: number;
  name: string;
  price: string;
  features: string[];
  buttonText: string;
  recommended?: boolean;
  onClick: () => void;
}

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ open, onOpenChange }) => {
  const localize = useLocalize();
  const [processingId, setProcessingId] = useState<number | null>(null);
  const createSubscription = useCreateOmnexioSubscription();

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 1,
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
        setProcessingId(1);
        createSubscription.mutate({ subscriptionId: 1 }, {
          onSettled: () => setProcessingId(null),
        });
      },
    },
    {
      id: 2,
      name: 'Starter',
      price: '$4.95/month',
      features: [
        '500 credits per month',
        'Access to standard features',
        localize('com_subscription_rolling_credits'),
        localize('com_subscription_no_daily_limits'),
      ],
      buttonText: localize('com_subscription_upgrade'),
      onClick: () => {
        console.log('Starter plan selected');
        setProcessingId(2);
        createSubscription.mutate({ subscriptionId: 2 }, {
          onSettled: () => setProcessingId(null),
        });
      },
    },
    {
      id: 3,
      name: 'Plus',
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
        setProcessingId(3);
        createSubscription.mutate({ subscriptionId: 3 }, {
          onSettled: () => setProcessingId(null),
        });
      },
    },
    {
      id: 4,
      name: 'Premium',
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
        setProcessingId(4);
        createSubscription.mutate({ subscriptionId: 4 }, {
          onSettled: () => setProcessingId(null),
        });
      },
    },
    {
      id: 5,
      name: 'Pro',
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
        setProcessingId(5);
        createSubscription.mutate({ subscriptionId: 5 }, {
          onSettled: () => setProcessingId(null),
        });
      },
    },
    {
      id: 6,
      name: 'Enterprise',
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
        setProcessingId(6);
        createSubscription.mutate({ subscriptionId: 6 }, {
          onSettled: () => setProcessingId(null),
        });
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.id}
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
                        : 'bg-surface-secondary text-primary-foreground bg-[#2f7ff7] hover:bg-[#2f7ff7]/90'
                    }`}
                    onClick={plan.onClick}
                    disabled={processingId !== null}
                    size="sm"
                  >
                    {processingId === plan.id ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {localize('com_ui_processing')}
                      </div>
                    ) : (
                      plan.buttonText
                    )}
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-3 text-sm text-text-secondary">
              {localize('com_subscription_credits_rolling_note')}
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
