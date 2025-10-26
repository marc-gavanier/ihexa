declare const AggregateRootBrand: unique symbol;

export type AggregateRoot<T> = Readonly<T> & {
  readonly [AggregateRootBrand]: true;
};

export const toAggregateRoot = <T>(value: T): AggregateRoot<T> => value as AggregateRoot<T>;
