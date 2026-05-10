import { defineModel, type Model } from '@arckit/effect';
import { brand, nonEmptyString, pattern, Trim } from 'effect/Schema';

export const PHONE_PATTERN = /^\+\d{9,15}$/;

export const Phone = defineModel(
  Trim.pipe(
    nonEmptyString({ message: () => 'required' }),
    pattern(PHONE_PATTERN, { message: () => 'invalid' }),
    brand('ClientPhone')
  )
);

export type Phone = Model.TypeOf<typeof Phone>;
