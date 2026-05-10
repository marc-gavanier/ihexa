import { defineModel, type Model } from '@arckit/effect';
import { brand, maxLength, nonEmptyString, Trim } from 'effect/Schema';

export const DENOMINATION_SOCIALE_MAX_LENGTH = 400;

export const DenominationSociale = defineModel(
  Trim.pipe(
    nonEmptyString({ message: () => 'required' }),
    maxLength(DENOMINATION_SOCIALE_MAX_LENGTH, { message: () => 'maxLength' }),
    brand('DenominationSociale')
  )
);

export type DenominationSociale = Model.TypeOf<typeof DenominationSociale>;
