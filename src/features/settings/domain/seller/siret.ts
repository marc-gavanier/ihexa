import { defineModel, type Model } from '@arckit/effect';
import { brand, nonEmptyString, pattern, Trim } from 'effect/Schema';

export const SIRET_PATTERN = /^\d{14}$/;

export const Siret = defineModel(
  Trim.pipe(nonEmptyString({ message: () => 'required' }), pattern(SIRET_PATTERN, { message: () => 'invalid' }), brand('Siret'))
);

export type Siret = Model.TypeOf<typeof Siret>;
