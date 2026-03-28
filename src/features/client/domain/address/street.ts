import { brand, nonEmptyString, Trim } from 'effect/Schema';
import { defineModel, type Model } from '@/libraries/effect';

export const Street = defineModel(Trim.pipe(nonEmptyString({ message: () => 'required' }), brand('Street')));
export type Street = Model.TypeOf<typeof Street>;
