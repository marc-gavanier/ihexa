import { clearPaymentTermsStore } from './payment-terms.store';
import { clearSellerStore } from './seller.store';

export * from './payment-terms.store';
export * from './seller.store';

export const clearSettings = (): void => {
  clearSellerStore();
  clearPaymentTermsStore();
};
