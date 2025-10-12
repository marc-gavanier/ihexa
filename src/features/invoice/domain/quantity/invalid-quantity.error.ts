export type InvalidQuantityError = {
  readonly _tag: 'InvalidQuantityError';
  readonly value: number;
};

export const InvalidQuantityError = (value: number): InvalidQuantityError => ({
  _tag: 'InvalidQuantityError',
  value,
});
