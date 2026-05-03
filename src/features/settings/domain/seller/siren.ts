import { defineModel, type Model } from '@arckit/effect';
import { brand, nonEmptyString, pattern, Trim } from 'effect/Schema';

export const SIREN_PATTERN = /^\d{9}$/;

export const Siren = defineModel(
  Trim.pipe(nonEmptyString({ message: () => 'required' }), pattern(SIREN_PATTERN, { message: () => 'invalid' }), brand('Siren'))
);

export type Siren = Model.TypeOf<typeof Siren>;
