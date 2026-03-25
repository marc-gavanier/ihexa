import { Schema } from 'effect';

export interface Model<S extends Schema.Schema.AnyNoContext> {
  (input: Schema.Schema.Encoded<S>): Schema.Schema.Type<S>;
  readonly schema: S;
}

export namespace Model {
  export type TypeOf<M extends Model<Schema.Schema.AnyNoContext>> = M extends Model<infer S> ? Schema.Schema.Type<S> : never;
  export type EncodedOf<M extends Model<Schema.Schema.AnyNoContext>> =
    M extends Model<infer S> ? Schema.Schema.Encoded<S> : never;
}

export const defineModel = <S extends Schema.Schema.AnyNoContext>(
  schema: S,
  transform: (input: Schema.Schema.Encoded<S>) => Schema.Schema.Encoded<S> = (input) => input
): Model<S> => Object.assign((input: Schema.Schema.Encoded<S>) => Schema.decodeSync(schema)(transform(input)), { schema });
