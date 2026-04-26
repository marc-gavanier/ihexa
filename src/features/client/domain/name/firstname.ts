import { defineModel, type Model } from '@arckit/effect';
import { brand, maxLength, nonEmptyString, Trim } from 'effect/Schema';

export const FIRSTNAME_MAX_LENGTH = 100;

export const Firstname = defineModel(
  Trim.pipe(
    nonEmptyString({ message: () => 'required' }),
    maxLength(FIRSTNAME_MAX_LENGTH, { message: () => 'maxLength' }),
    brand('Firstname')
  )
);

export type Firstname = Model.TypeOf<typeof Firstname>;
