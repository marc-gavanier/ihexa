import { defineModel, type Model } from '@arckit/effect';
import { Schema } from 'effect';
import { Firstname } from './firstname';
import { Lastname } from './lastname';

export const Name = defineModel(Schema.Struct({ firstname: Firstname.schema, lastname: Lastname.schema }));

export type Name = Model.TypeOf<typeof Name>;
