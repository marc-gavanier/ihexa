import { defineModel, type Model } from '@arckit/effect';
import { brand, nonEmptyString, pattern, Trim } from 'effect/Schema';

export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const Email = defineModel(
  Trim.pipe(
    nonEmptyString({ message: () => 'required' }),
    pattern(EMAIL_PATTERN, { message: () => 'invalid' }),
    brand('Email')
  ),
  (input) => input.toLowerCase()
);

export type Email = Model.TypeOf<typeof Email>;
