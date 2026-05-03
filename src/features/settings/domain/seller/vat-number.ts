import { defineModel, type Model } from '@arckit/effect';
import { brand, nonEmptyString, pattern, Trim } from 'effect/Schema';

export const VAT_NUMBER_PATTERN = /^FR\d{2}\d{9}$/;

export const VatNumber = defineModel(
  Trim.pipe(
    nonEmptyString({ message: () => 'required' }),
    pattern(VAT_NUMBER_PATTERN, { message: () => 'invalid' }),
    brand('VatNumber')
  )
);

export type VatNumber = Model.TypeOf<typeof VatNumber>;
