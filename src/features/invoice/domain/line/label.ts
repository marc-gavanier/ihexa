import { defineModel, type Model } from '@arckit/effect';
import { Schema } from 'effect';

export const Label = defineModel(Schema.String.pipe(Schema.nonEmptyString(), Schema.maxLength(200), Schema.brand('Label')));
export type Label = Model.TypeOf<typeof Label>;
