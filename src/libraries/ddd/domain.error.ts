export type DomainError<TTag extends string, TValue> = {
  readonly _tag: TTag;
  readonly value: TValue;
};

export const hasDomainError = <TTag extends { _tag: string } | object>(
  entityOrError: TTag
): entityOrError is Extract<TTag, { _tag: TTag extends { _tag: infer TTag extends string } ? TTag : never }> =>
  '_tag' in entityOrError;
