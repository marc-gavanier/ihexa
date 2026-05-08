import { defineModel, type Model } from '@arckit/effect';
import { Schema } from 'effect';

export const DiscountRate = defineModel(
  Schema.Number.pipe(Schema.positive({ message: () => 'invalid' }), Schema.brand('DiscountRate'))
);

export type DiscountRate = Model.TypeOf<typeof DiscountRate>;

export const DiscountDelayThreshold = defineModel(
  Schema.Number.pipe(
    Schema.int({ message: () => 'invalid' }),
    Schema.positive({ message: () => 'invalid' }),
    Schema.brand('DiscountDelayThreshold')
  )
);

export type DiscountDelayThreshold = Model.TypeOf<typeof DiscountDelayThreshold>;

export type NoDiscount = {
  readonly _tag: 'NoDiscount';
};

export type WithDiscount = {
  readonly _tag: 'WithDiscount';
  readonly discountRate: DiscountRate;
  readonly discountDelayThreshold: DiscountDelayThreshold;
};

export type EarlyPaymentDiscount = NoDiscount | WithDiscount;

export const noDiscount: NoDiscount = { _tag: 'NoDiscount' };

export const withDiscount = (discountRate: DiscountRate, discountDelayThreshold: DiscountDelayThreshold): WithDiscount => ({
  _tag: 'WithDiscount',
  discountRate,
  discountDelayThreshold
});
