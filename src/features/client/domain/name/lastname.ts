import { brand, maxLength, nonEmptyString, Trim } from 'effect/Schema';
import { defineModel, type Model } from '@/libraries/effect';

export const LASTNAME_MAX_LENGTH = 100;

export const Lastname = defineModel(
  Trim.pipe(
    nonEmptyString({ message: () => 'required' }),
    maxLength(LASTNAME_MAX_LENGTH, { message: () => 'maxLength' }),
    brand('Lastname')
  )
);
export type Lastname = Model.TypeOf<typeof Lastname>;
