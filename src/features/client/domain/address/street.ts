import { Schema } from 'effect';
import { defineModel, type Model } from '@/libraries/effect';

export const Street = defineModel(Schema.Trim.pipe(Schema.nonEmptyString(), Schema.brand('Street')));
export type Street = Model.TypeOf<typeof Street>;
