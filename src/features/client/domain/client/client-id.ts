import { defineModel, type Model } from '@arckit/effect';
import { Schema } from 'effect';

export const ClientId = defineModel(Schema.UUID.pipe(Schema.brand('ClientId')));

export type ClientId = Model.TypeOf<typeof ClientId>;
