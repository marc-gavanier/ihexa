import type { PaymentTerms } from '@/features/settings/domain/payment-terms';
import { PAYMENT_METHODS } from '@/features/settings/domain/payment-terms/payment-method';

export type ConfigurePaymentTermsViewModel = {
  readonly startingPoint: string;
  readonly days: string;
  readonly endOfMonth: boolean;
  readonly penaltyRate: string;
  readonly earlyPaymentDiscountTag: string;
  readonly discountRate: string;
  readonly discountDelayThreshold: string;
  readonly paymentMethods: Record<string, boolean>;
  readonly iban: string;
};

const EMPTY_PAYMENT_METHODS: Record<string, boolean> = Object.fromEntries(PAYMENT_METHODS.map((m) => [m, false]));

const EMPTY_PAYMENT_TERMS: ConfigurePaymentTermsViewModel = {
  startingPoint: '',
  days: '',
  endOfMonth: false,
  penaltyRate: '',
  earlyPaymentDiscountTag: '',
  discountRate: '',
  discountDelayThreshold: '',
  paymentMethods: EMPTY_PAYMENT_METHODS,
  iban: ''
};

export const presentPaymentTerms = (paymentTerms: PaymentTerms | null): ConfigurePaymentTermsViewModel =>
  paymentTerms
    ? {
        startingPoint: paymentTerms.deadline.startingPoint,
        days: String(paymentTerms.deadline.days),
        endOfMonth: paymentTerms.deadline.endOfMonth,
        penaltyRate: String(paymentTerms.penaltyRate),
        earlyPaymentDiscountTag: paymentTerms.earlyPaymentDiscount._tag,
        discountRate:
          paymentTerms.earlyPaymentDiscount._tag === 'WithDiscount'
            ? String(paymentTerms.earlyPaymentDiscount.discountRate)
            : '',
        discountDelayThreshold:
          paymentTerms.earlyPaymentDiscount._tag === 'WithDiscount'
            ? String(paymentTerms.earlyPaymentDiscount.discountDelayThreshold)
            : '',
        paymentMethods: Object.fromEntries(PAYMENT_METHODS.map((m) => [m, paymentTerms.paymentMethods.includes(m)])),
        iban: paymentTerms.iban ?? ''
      }
    : EMPTY_PAYMENT_TERMS;

export const showDeadlineDays = (startingPoint: string): boolean => startingPoint === 'from_invoice_date';

export const showEndOfMonth = (startingPoint: string): boolean => startingPoint === 'from_invoice_date';

export const showDiscountFields = (earlyPaymentDiscountTag: string): boolean => earlyPaymentDiscountTag === 'WithDiscount';

// biome-ignore lint/complexity/useLiteralKeys: required by noPropertyAccessFromIndexSignature
export const showIban = (paymentMethods: Record<string, boolean>): boolean => paymentMethods['bank_transfer'] === true;
