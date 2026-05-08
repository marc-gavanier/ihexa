import { Schema } from 'effect';
import {
  DiscountDelayThreshold,
  DiscountRate,
  noDiscount,
  withDiscount
} from '@/features/settings/domain/payment-terms/early-payment-discount';
import { Iban } from '@/features/settings/domain/payment-terms/iban';
import { DeadlineStartingPoint } from '@/features/settings/domain/payment-terms/payment-deadline';
import { PaymentMethod } from '@/features/settings/domain/payment-terms/payment-method';
import type { PaymentTerms } from '@/features/settings/domain/payment-terms/payment-terms';
import { PenaltyRate } from '@/features/settings/domain/payment-terms/penalty-rate';
import type { paymentTermsTable } from './payment-terms.table';

type PaymentTermsRow = typeof paymentTermsTable.$inferSelect;

export const paymentTermsToDomain = (row: PaymentTermsRow): PaymentTerms => {
  const paymentMethods = Schema.decodeUnknownSync(Schema.NonEmptyArray(PaymentMethod))(row.paymentMethods.split(','));

  return {
    deadline: {
      startingPoint: Schema.decodeUnknownSync(DeadlineStartingPoint)(row.startingPoint),
      days: row.days,
      endOfMonth: row.endOfMonth
    },
    penaltyRate: PenaltyRate(row.penaltyRate),
    earlyPaymentDiscount:
      row.discountTag === 'WithDiscount' && row.discountRate != null && row.discountDelayThreshold != null
        ? withDiscount(DiscountRate(row.discountRate), DiscountDelayThreshold(row.discountDelayThreshold))
        : noDiscount,
    paymentMethods,
    ...(row.iban != null ? { iban: Iban(row.iban) } : {})
  };
};

export const paymentTermsFromDomain = (paymentTerms: PaymentTerms): PaymentTermsRow => ({
  startingPoint: paymentTerms.deadline.startingPoint,
  days: paymentTerms.deadline.days,
  endOfMonth: paymentTerms.deadline.endOfMonth,
  penaltyRate: paymentTerms.penaltyRate,
  discountTag: paymentTerms.earlyPaymentDiscount._tag,
  discountRate:
    paymentTerms.earlyPaymentDiscount._tag === 'WithDiscount' ? paymentTerms.earlyPaymentDiscount.discountRate : null,
  discountDelayThreshold:
    paymentTerms.earlyPaymentDiscount._tag === 'WithDiscount' ? paymentTerms.earlyPaymentDiscount.discountDelayThreshold : null,
  paymentMethods: paymentTerms.paymentMethods.join(','),
  iban: paymentTerms.iban ?? null
});
