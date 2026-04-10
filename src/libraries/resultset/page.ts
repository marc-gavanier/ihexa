import { brand, greaterThanOrEqualTo, int, Number as SchemaNumber } from 'effect/Schema';
import { defineModel, type Model } from '@/libraries/effect';

export const Page = defineModel(SchemaNumber.pipe(int(), greaterThanOrEqualTo(1), brand('Page')), (value) =>
  Math.max(1, Math.round(value))
);
export type Page = Model.TypeOf<typeof Page>;
