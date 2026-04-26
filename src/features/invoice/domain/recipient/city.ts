import { defineModel, type Model } from '@arckit/effect';
import { Schema } from 'effect';

export const City = defineModel(Schema.String.pipe(Schema.nonEmptyString(), Schema.brand('City')));
export type City = Model.TypeOf<typeof City>;
