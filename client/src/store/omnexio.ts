import { atom, atomFamily } from 'recoil';

// Add this new atom to store the selected model information
export const selectedModelState = atom({
  key: 'selectedModelState',
  default: null as any, // Replace 'any' with your ChatModel interface type
});

// If you need it per conversation, use atomFamily instead:
export const selectedModelByConvoId = atomFamily({
  key: 'selectedModelByConvoId',
  default: null as any, // Replace 'any' with your ChatModel interface type
});

export default {
  selectedModelState,
  selectedModelByConvoId,
};
