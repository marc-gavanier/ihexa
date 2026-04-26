import { defineModel, type Model } from '@arckit/effect';
import { brand, maxLength, nonEmptyString, Trim } from 'effect/Schema';

export const STREET_MAX_LENGTH = 255;

export const Street = defineModel(
  Trim.pipe(
    nonEmptyString({ message: () => 'required' }),
    maxLength(STREET_MAX_LENGTH, { message: () => 'maxLength' }),
    brand('Street')
  )
);

export type Street = Model.TypeOf<typeof Street>;
