import type { PaymentTerms } from '../../domain/payment-terms';

let PAYMENT_TERMS: PaymentTerms | undefined;

export const paymentTermsStore = (): { get: () => PaymentTerms | undefined; set: (paymentTerms: PaymentTerms) => void } => ({
  get: () => PAYMENT_TERMS,
  set: (paymentTerms: PaymentTerms) => {
    PAYMENT_TERMS = paymentTerms;
  }
});

export const clearPaymentTermsStore = (): void => {
  PAYMENT_TERMS = undefined;
};
