declare const ValueObjectBrand: unique symbol;

export type ValueObject<T> = Readonly<T> & {
  readonly [ValueObjectBrand]: true;
};

export const toValueObject = <T>(value: T): ValueObject<T> =>
  value as ValueObject<T>;
