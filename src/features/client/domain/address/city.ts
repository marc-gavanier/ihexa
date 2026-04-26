import { defineModel, type Model } from '@arckit/effect';
import { brand, maxLength, nonEmptyString, Trim } from 'effect/Schema';

export const CITY_MAX_LENGTH = 255;

export const City = defineModel(
  Trim.pipe(
    nonEmptyString({ message: () => 'required' }),
    maxLength(CITY_MAX_LENGTH, { message: () => 'maxLength' }),
    brand('City')
  )
);

export type City = Model.TypeOf<typeof City>;
