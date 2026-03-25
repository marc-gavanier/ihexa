import { Schema } from 'effect';
import { defineModel, type Model } from '@/libraries/effect';

export const LASTNAME_MAX_LENGTH = 100;

export const Lastname = defineModel(
  Schema.String.pipe(Schema.nonEmptyString(), Schema.maxLength(LASTNAME_MAX_LENGTH), Schema.brand('Lastname'))
);
export type Lastname = Model.TypeOf<typeof Lastname>;
