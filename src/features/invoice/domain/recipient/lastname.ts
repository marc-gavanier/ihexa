import { Schema } from 'effect';
import { defineModel, type Model } from '@/libraries/effect';

export const Lastname = defineModel(
  Schema.String.pipe(Schema.nonEmptyString(), Schema.maxLength(100), Schema.brand('Lastname'))
);
export type Lastname = Model.TypeOf<typeof Lastname>;
