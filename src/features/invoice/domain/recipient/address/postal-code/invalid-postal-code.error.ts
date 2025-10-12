export type InvalidPostalCodeError = {
  readonly _tag: 'InvalidPostalCodeError';
  readonly value: string;
};

export const InvalidPostalCodeError = (
  value: string,
): InvalidPostalCodeError => ({
  _tag: 'InvalidPostalCodeError',
  value,
});
