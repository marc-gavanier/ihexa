import { defineModel, type Model } from '@arckit/effect';
import { Schema } from 'effect';

export const Firstname = defineModel(
  Schema.String.pipe(Schema.nonEmptyString(), Schema.maxLength(100), Schema.brand('Firstname'))
);
export type Firstname = Model.TypeOf<typeof Firstname>;
