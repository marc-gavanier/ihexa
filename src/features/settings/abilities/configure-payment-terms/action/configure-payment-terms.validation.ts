import { Schema } from 'effect';
import { DiscountDelayThreshold, DiscountRate } from '@/features/settings/domain/payment-terms/early-payment-discount';
import { Iban } from '@/features/settings/domain/payment-terms/iban';
import {
  DEADLINE_STARTING_POINTS,
  type DeadlineStartingPoint,
  MAX_DAYS_WITH_EOM,
  MAX_DAYS_WITHOUT_EOM
} from '@/features/settings/domain/payment-terms/payment-deadline';
import { PAYMENT_METHODS, type PaymentMethod } from '@/features/settings/domain/payment-terms/payment-method';
import { PenaltyRate } from '@/features/settings/domain/payment-terms/penalty-rate';

const DeadlineStartingPointFromString = Schema.String.pipe(
  Schema.nonEmptyString({ message: () => 'required' }),
  Schema.filter((s): s is DeadlineStartingPoint => (DEADLINE_STARTING_POINTS as readonly string[]).includes(s), {
    message: () => 'invalid'
  })
);

const PaymentMethodFromString = Schema.String.pipe(
  Schema.nonEmptyString({ message: () => 'required' }),
  Schema.filter((s): s is PaymentMethod => (PAYMENT_METHODS as readonly string[]).includes(s), { message: () => 'invalid' })
);

const EARLY_PAYMENT_DISCOUNT_TAGS = ['NoDiscount', 'WithDiscount'] as const;
type EarlyPaymentDiscountTag = (typeof EARLY_PAYMENT_DISCOUNT_TAGS)[number];

const EarlyPaymentDiscountTagFromString = Schema.String.pipe(
  Schema.nonEmptyString({ message: () => 'required' }),
  Schema.filter((s): s is EarlyPaymentDiscountTag => (EARLY_PAYMENT_DISCOUNT_TAGS as readonly string[]).includes(s), {
    message: () => 'invalid'
  })
);

export const configurePaymentTermsValidation = Schema.Struct({
  startingPoint: DeadlineStartingPointFromString,
  days: Schema.Number.pipe(Schema.int({ message: () => 'invalid' }), Schema.nonNegative({ message: () => 'invalid' })),
  endOfMonth: Schema.optionalWith(Schema.Boolean, { exact: true }),
  penaltyRate: PenaltyRate.schema,
  earlyPaymentDiscountTag: EarlyPaymentDiscountTagFromString,
  discountRate: Schema.optionalWith(DiscountRate.schema, { exact: true }),
  discountDelayThreshold: Schema.optionalWith(DiscountDelayThreshold.schema, { exact: true }),
  paymentMethods: Schema.NonEmptyArray(PaymentMethodFromString),
  iban: Schema.optionalWith(Iban.schema, { exact: true })
}).pipe(
  Schema.filter((data) =>
    data.earlyPaymentDiscountTag === 'WithDiscount' && data.discountRate == null
      ? { path: ['discountRate'], message: 'required' }
      : undefined
  ),
  Schema.filter((data) =>
    data.earlyPaymentDiscountTag === 'WithDiscount' && data.discountDelayThreshold == null
      ? { path: ['discountDelayThreshold'], message: 'required' }
      : undefined
  ),
  Schema.filter((data) =>
    data.startingPoint === 'from_invoice_date' &&
    (data.endOfMonth === true ? data.days > MAX_DAYS_WITH_EOM : data.days > MAX_DAYS_WITHOUT_EOM)
      ? { path: ['days'], message: data.endOfMonth === true ? 'exceeds_max_eom' : 'exceeds_max' }
      : undefined
  ),
  Schema.filter((data) =>
    data.paymentMethods.includes('bank_transfer') && data.iban == null ? { path: ['iban'], message: 'required' } : undefined
  )
);

export type ConfigurePaymentTermsFormData = typeof configurePaymentTermsValidation.Type;
export type ConfigurePaymentTermsInput = typeof configurePaymentTermsValidation.Encoded;
