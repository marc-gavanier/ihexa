import { Schema } from 'effect';
import { defineModel, type Model } from '@/libraries/effect';

export const ZIPCODE_PATTERN = /^\d{5}$/;

export const Zipcode = defineModel(Schema.String.pipe(Schema.pattern(ZIPCODE_PATTERN), Schema.brand('Zipcode')));
export type Zipcode = Model.TypeOf<typeof Zipcode>;
