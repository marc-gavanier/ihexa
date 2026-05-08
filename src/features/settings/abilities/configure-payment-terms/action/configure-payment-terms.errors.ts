export const CONFIGURE_PAYMENT_TERMS_ERRORS = {
  UponReceiptWithEndOfMonth: 'error.uponReceiptWithEndOfMonth',
  BankTransferRequiresIban: 'error.bankTransferRequiresIban',
  EarlyPaymentDiscountNotSpecified: 'error.earlyPaymentDiscountNotSpecified',
  PaymentDeadlineExceedsMaxDays: 'error.paymentDeadlineExceedsMaxDays'
} as const;

export type ConfigurePaymentTermsErrorKey =
  (typeof CONFIGURE_PAYMENT_TERMS_ERRORS)[keyof typeof CONFIGURE_PAYMENT_TERMS_ERRORS];
