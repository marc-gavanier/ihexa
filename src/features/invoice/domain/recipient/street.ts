import { defineModel, type Model } from '@arckit/effect';
import { Schema } from 'effect';

export const Street = defineModel(Schema.String.pipe(Schema.nonEmptyString(), Schema.brand('Street')));
export type Street = Model.TypeOf<typeof Street>;
