import { clearSellerStore } from './seller.store';

export * from './seller.store';

export const clearSettings = (): void => {
  clearSellerStore();
};
