import { brand, greaterThanOrEqualTo, int, Number as SchemaNumber } from 'effect/Schema';
import { defineModel, type Model } from '@/libraries/effect';

export const PageSize = defineModel(SchemaNumber.pipe(int(), greaterThanOrEqualTo(1), brand('PageSize')), (value) =>
  Math.max(1, Math.round(value))
);
export type PageSize = Model.TypeOf<typeof PageSize>;
