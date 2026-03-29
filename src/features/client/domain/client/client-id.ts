import { Schema } from 'effect';
import { defineModel, type Model } from '@/libraries/effect';

export const ClientId = defineModel(Schema.UUID.pipe(Schema.brand('ClientId')));
export type ClientId = Model.TypeOf<typeof ClientId>;
