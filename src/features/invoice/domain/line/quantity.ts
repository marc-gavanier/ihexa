import { Schema } from 'effect';
import { defineModel, type Model } from '@/libraries/effect';

export const Quantity = defineModel(Schema.Number.pipe(Schema.int(), Schema.greaterThanOrEqualTo(1), Schema.brand('Quantity')));
export type Quantity = Model.TypeOf<typeof Quantity>;
