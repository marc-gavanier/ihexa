import { Schema } from 'effect';
import { defineModel, type Model } from '@/libraries/effect';

export const Street = defineModel(Schema.String.pipe(Schema.nonEmptyString(), Schema.brand('Street')));
export type Street = Model.TypeOf<typeof Street>;
