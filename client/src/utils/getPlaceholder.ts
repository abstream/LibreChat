import type { LocalizeFunction } from '~/common';

interface ModelWithCost {
  cost?: number;
  name?: string;
  label?: string;
  id?: string;
}

/**
 * Function to get placeholder text based on dynamic model cost
 * @param model - The model name from conversation.model
 * @param localize - The localization function
 * @param selectedModel - The selected model object with cost property
 * @returns Placeholder text with cost information or fallback
 */
export const getPlaceholder = (
  model: string | null | undefined,
  localize: LocalizeFunction,
  selectedModel?: ModelWithCost | null,
): string => {
  // Early return for missing model
  if (!model) {
    return localize('com_endpoint_ai');
  }

  // Early return if no selectedModel provided
  if (!selectedModel) {
    return localize('com_endpoint_ai');
  }

  // Extract cost from selectedModel
  const cost = selectedModel.cost;

  // Early return if cost is not defined
  if (cost === undefined || cost === null) {
    return localize('com_endpoint_ai');
  }

  // Generate cost-based placeholder
  const creditText = cost === 1 ? 'credit' : 'credits';
  return `[${model}] costs ${cost} ${creditText}`;
};

export default getPlaceholder;
