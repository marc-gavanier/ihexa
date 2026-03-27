import { Schema } from 'effect';
import { defineModel, type Model } from '@/libraries/effect';

export const FIRSTNAME_MAX_LENGTH = 100;

export const Firstname = defineModel(
  Schema.Trim.pipe(Schema.nonEmptyString(), Schema.maxLength(FIRSTNAME_MAX_LENGTH), Schema.brand('Firstname'))
);
export type Firstname = Model.TypeOf<typeof Firstname>;
