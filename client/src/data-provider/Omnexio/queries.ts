import { useQuery } from '@tanstack/react-query';
import { QueryKeys, dataService } from 'librechat-data-provider';
import type { QueryObserverResult, UseQueryOptions } from '@tanstack/react-query';
import { getOmnexioChatModels } from 'librechat-data-provider/src/data-service';

/**
 * Hook for getting Omnexio user balance
 */
export const useGetOmnexioUserBalance = (
  config?: UseQueryOptions<string>,
): QueryObserverResult<string> => {
  return useQuery<string>([QueryKeys.omnexioBalance], () => dataService.getOmnexioUserBalance(), {
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
    ...config,
    enabled: true,
  });
};

/**
 * Hook for getting Omnexio subscription plans
 */
export const useGetOmnexioSubscriptionPlans = (
  config?: UseQueryOptions<string>,
): QueryObserverResult<any> => {
  return useQuery<string>(
    [QueryKeys.omnexioSubscriptionPlans],
    () => dataService.getOmnexioSubscriptionPlans(),
    {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
      ...config,
      enabled: true,
    },
  );
};

/**
 * Hook for getting Omnexio subscription plans
 */
export const useGetOmnexioChatModels = (
  config?: UseQueryOptions<string>,
): QueryObserverResult<any> => {
  return useQuery<string>([QueryKeys.omnexioChatModels], () => dataService.getOmnexioChatModels(), {
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
    ...config,
    enabled: true,
  });
};
