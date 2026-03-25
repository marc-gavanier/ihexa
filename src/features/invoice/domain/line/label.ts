import { Schema } from 'effect';
import { defineModel, type Model } from '@/libraries/effect';

export const Label = defineModel(Schema.String.pipe(Schema.nonEmptyString(), Schema.maxLength(200), Schema.brand('Label')));
export type Label = Model.TypeOf<typeof Label>;
