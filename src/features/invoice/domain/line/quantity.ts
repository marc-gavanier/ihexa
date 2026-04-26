import { defineModel, type Model } from '@arckit/effect';
import { Schema } from 'effect';

export const Quantity = defineModel(Schema.Number.pipe(Schema.int(), Schema.greaterThanOrEqualTo(1), Schema.brand('Quantity')));
export type Quantity = Model.TypeOf<typeof Quantity>;
