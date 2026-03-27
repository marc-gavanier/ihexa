import { Schema } from 'effect';
import { defineModel, type Model } from '@/libraries/effect';

export const City = defineModel(Schema.Trim.pipe(Schema.nonEmptyString(), Schema.brand('City')));
export type City = Model.TypeOf<typeof City>;
