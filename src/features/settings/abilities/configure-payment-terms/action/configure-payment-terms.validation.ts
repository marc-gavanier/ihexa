import { Schema } from 'effect';
import { DiscountDelayThreshold, DiscountRate } from '@/features/settings/domain/payment-terms/early-payment-discount';
import { Iban } from '@/features/settings/domain/payment-terms/iban';
import {
  DEADLINE_STARTING_POINTS,
  type DeadlineStartingPoint
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

const EarlyPaymentDiscountValidation = Schema.Union(
  Schema.Struct({ _tag: Schema.Literal('NoDiscount') }),
  Schema.Struct({
    _tag: Schema.Literal('WithDiscount'),
    discountRate: DiscountRate.schema,
    discountDelayThreshold: DiscountDelayThreshold.schema
  })
);

export const configurePaymentTermsValidation = Schema.Struct({
  startingPoint: DeadlineStartingPointFromString,
  days: Schema.Number.pipe(Schema.int({ message: () => 'invalid' }), Schema.nonNegative({ message: () => 'invalid' })),
  endOfMonth: Schema.optionalWith(Schema.Boolean, { exact: true }),
  penaltyRate: PenaltyRate.schema,
  earlyPaymentDiscount: Schema.optionalWith(EarlyPaymentDiscountValidation, { exact: true }),
  paymentMethods: Schema.NonEmptyArray(PaymentMethodFromString),
  iban: Schema.optionalWith(Iban.schema, { exact: true })
});

export type ConfigurePaymentTermsFormData = typeof configurePaymentTermsValidation.Type;
export type ConfigurePaymentTermsInput = typeof configurePaymentTermsValidation.Encoded;
