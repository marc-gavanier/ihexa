export type InvalidCityError = {
  readonly _tag: 'InvalidCityError';
  readonly value: string;
};

export const InvalidCityError = (value: string): InvalidCityError => ({
  _tag: 'InvalidCityError',
  value,
});
