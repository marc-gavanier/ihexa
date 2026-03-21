import { Schema } from 'effect';
import { Firstname } from './firstname';
import { Lastname } from './lastname';

export const Name = Schema.Struct({
  firstname: Firstname,
  lastname: Lastname
});
export type Name = typeof Name.Type;
