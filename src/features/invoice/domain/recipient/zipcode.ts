import { defineModel, type Model } from '@arckit/effect';
import { Schema } from 'effect';

export const Zipcode = defineModel(Schema.String.pipe(Schema.pattern(/^\d{5}$/), Schema.brand('Zipcode')));
export type Zipcode = Model.TypeOf<typeof Zipcode>;
