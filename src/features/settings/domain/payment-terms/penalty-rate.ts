import { defineModel, type Model } from '@arckit/effect';
import { Schema } from 'effect';

export const PenaltyRate = defineModel(
  Schema.Number.pipe(Schema.positive({ message: () => 'invalid' }), Schema.brand('PenaltyRate'))
);

export type PenaltyRate = Model.TypeOf<typeof PenaltyRate>;
