import { Schema } from 'effect';
import { defineModel, type Model } from '@/libraries/effect';

export const Zipcode = defineModel(Schema.String.pipe(Schema.pattern(/^\d{5}$/), Schema.brand('Zipcode')));
export type Zipcode = Model.TypeOf<typeof Zipcode>;
