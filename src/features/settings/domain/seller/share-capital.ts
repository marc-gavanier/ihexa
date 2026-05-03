import { defineModel, type Model } from '@arckit/effect';
import { Schema } from 'effect';

export const ShareCapital = defineModel(
  Schema.Number.pipe(Schema.positive({ message: () => 'invalid' }), Schema.brand('ShareCapital'))
);

export type ShareCapital = Model.TypeOf<typeof ShareCapital>;
