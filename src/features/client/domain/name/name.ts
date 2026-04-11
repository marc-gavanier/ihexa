import { Schema } from 'effect';
import { defineModel, type Model } from '@/libraries/effect';
import { Firstname } from './firstname';
import { Lastname } from './lastname';

export const Name = defineModel(Schema.Struct({ firstname: Firstname.schema, lastname: Lastname.schema }));

export type Name = Model.TypeOf<typeof Name>;
