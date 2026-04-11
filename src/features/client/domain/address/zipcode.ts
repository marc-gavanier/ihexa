import { brand, nonEmptyString, pattern, Trim } from 'effect/Schema';
import { defineModel, type Model } from '@/libraries/effect';

export const ZIPCODE_PATTERN = /^\d{5}$/;

export const Zipcode = defineModel(
  Trim.pipe(
    nonEmptyString({ message: () => 'required' }),
    pattern(ZIPCODE_PATTERN, { message: () => 'invalid' }),
    brand('Zipcode')
  )
);

export type Zipcode = Model.TypeOf<typeof Zipcode>;
