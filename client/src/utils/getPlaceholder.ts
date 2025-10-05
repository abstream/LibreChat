import type { LocalizeFunction } from '~/common';

interface ModelWithCost {
  cost?: number;
  name?: string;
  label?: string;
  id?: string;
}

type SearchType = 'fast' | 'deep' | 'no';

/**
 * Get search cost based on search type
 */
const getSearchCost = (searchType: SearchType): number => {
  switch (searchType) {
    case 'fast':
      return 1;
    case 'deep':
      return 5;
    case 'no':
    default:
      return 0;
  }
};

/**
 * Function to get placeholder text based on dynamic model cost and search type
 * @param model - The model name from conversation.model
 * @param localize - The localization function
 * @param selectedModel - The selected model object with cost property
 * @param searchType - The current search type (fast/deep/no)
 * @returns Placeholder text with cost information or fallback
 */
export const getPlaceholder = (
  model: string | null | undefined,
  localize: LocalizeFunction,
  selectedModel?: ModelWithCost | null,
  searchType: SearchType = 'no',
): string => {
  // Early return for missing model
  if (!model) {
    return '';
  }

  // Early return if no selectedModel provided
  if (!selectedModel) {
    return '';
  }

  const isOmnexioSearchModel = selectedModel.label === 'Omnexio Search';

  let totalCost: number;

  if (isOmnexioSearchModel) {
    // For Omnexio Search model, cost is only based on search type
    totalCost = getSearchCost(searchType);
  } else {
    // For other models, add search cost to base model cost
    const baseCost = selectedModel.cost ?? 0;
    const searchCost = getSearchCost(searchType);
    totalCost = baseCost + searchCost;
  }

  // Early return if total cost is 0 or undefined
  if (totalCost === 0) {
    return '';
  }

  // Generate cost-based placeholder
  const creditText = totalCost === 1 ? 'credit' : 'credits';
  return `[${model}] costs ${totalCost} ${creditText}`;
};

export default getPlaceholder;
