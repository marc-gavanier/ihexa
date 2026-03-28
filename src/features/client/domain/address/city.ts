import { brand, nonEmptyString, Trim } from 'effect/Schema';
import { defineModel, type Model } from '@/libraries/effect';

export const City = defineModel(Trim.pipe(nonEmptyString({ message: () => 'required' }), brand('City')));
export type City = Model.TypeOf<typeof City>;
