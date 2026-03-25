import { Schema } from 'effect';
import { defineModel, type Model } from '@/libraries/effect';

export const Firstname = defineModel(
  Schema.String.pipe(Schema.nonEmptyString(), Schema.maxLength(100), Schema.brand('Firstname'))
);
export type Firstname = Model.TypeOf<typeof Firstname>;
